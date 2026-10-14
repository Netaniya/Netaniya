"""Reproducible evaluation of saved answers; no API requests or third-party packages."""
import argparse
import json
import time
from datetime import datetime, timezone
from pathlib import Path

ENGINE_VERSION = "1.0.1"
JS_WHITESPACE = "\u0009\u000a\u000b\u000c\u000d\u0020\u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff"

def output_valid(output):
    return isinstance(output, str) and len(output.encode("utf-16-le", errors="surrogatepass")) // 2 <= 20000

def reject_constant(value):
    raise ValueError("invalid_json_constant")

def same(a, b):
    # bool is a subclass of int in Python; JSON booleans are not numbers.
    if isinstance(a, bool) or isinstance(b, bool):
        return type(a) is type(b) and a == b
    if isinstance(a, (int, float)) and isinstance(b, (int, float)):
        return a == b
    return type(a) is type(b) and a == b

def grade(item, output):
    if not output_valid(output):
        raise ValueError("invalid_output")
    try:
        parsed = json.loads(output, parse_constant=reject_constant)
    except (ValueError, TypeError):
        parsed = None
    valid = isinstance(parsed, dict)
    checks = []
    for rule in item["checks"]:
        op = rule["op"]
        if op == "json_valid":
            passed = valid
        elif op == "json_keys":
            passed = valid and sorted(parsed) == sorted(rule["value"])
        elif op == "json_field":
            passed = valid and rule["field"] in parsed and same(parsed[rule["field"]], rule["value"])
        elif op == "exact_text":
            passed = output.strip(JS_WHITESPACE) == rule["value"]
        elif op == "excludes":
            passed = rule["value"] not in output
        else:
            raise ValueError("unsupported_rule")
        checks.append({**rule, "pass": passed})
    passed_count = sum(c["pass"] for c in checks)
    return {"case_id": item["id"], "score": passed_count / len(checks), "passed": passed_count == len(checks), "checks": checks}

def evaluate(payload, dataset):
    if not isinstance(payload, dict) or not isinstance(payload.get("case_ids"), list) or not isinstance(payload.get("outputs"), dict):
        raise ValueError("invalid_input")
    ids = payload["case_ids"]
    if not ids or any(not isinstance(i, str) for i in ids) or len(ids) != len(set(ids)) or any(i not in [c["id"] for c in dataset["cases"]] for i in ids):
        raise ValueError("invalid_cases")
    for candidate in ("a", "b"):
        if not isinstance(payload["outputs"].get(candidate), dict) or any(not output_valid(payload["outputs"][candidate].get(i)) for i in ids):
            raise ValueError("invalid_output")
    results = {}
    for candidate in ("a", "b"):
        rows = [{**grade(c, payload["outputs"][candidate][c["id"]]), "weight": c["weight"]} for c in dataset["cases"] if c["id"] in ids]
        results[candidate] = {"score": sum(r["score"] * r["weight"] for r in rows) / sum(r["weight"] for r in rows), "passed": sum(r["passed"] for r in rows), "total": len(rows), "rows": rows}
    return {"schema_version": 1, "engine_version": ENGINE_VERSION, "dataset_id": dataset["id"], "source": "saved_outputs", "model_calls": 0, "model_latency_ms": None, "model_cost_eur": None, "results": results}

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, help="Exported report or {case_ids, outputs} JSON; defaults to demo samples")
    parser.add_argument("--output", type=Path, help="Write report to JSON file; otherwise stdout")
    parser.add_argument("--dataset", type=Path, help="Path to fixtures.json (optional)")
    args = parser.parse_args()
    nearby = Path(__file__).resolve().with_name("fixtures.json")
    dataset_path = args.dataset or (nearby if nearby.exists() else Path(__file__).resolve().parents[1] / "src/fixtures.json")
    dataset = json.loads(dataset_path.read_text(encoding="utf-8"))
    payload = json.loads(args.input.read_text(encoding="utf-8")) if args.input else {"case_ids": [c["id"] for c in dataset["cases"]], "outputs": {k: {c["id"]: c["outputs"][k] for c in dataset["cases"]} for k in ("a", "b")}}
    started = time.perf_counter()
    report = evaluate(payload, dataset)
    report.update({"outputs": payload["outputs"], "case_ids": payload["case_ids"], "created_at": datetime.now(timezone.utc).isoformat(), "validation_ms": (time.perf_counter() - started) * 1000, "runtime": "python"})
    text = json.dumps(report, ensure_ascii=False, indent=2)
    if args.output:
        args.output.write_text(text + "\n", encoding="utf-8")
    else:
        print(text)

if __name__ == "__main__":
    main()
