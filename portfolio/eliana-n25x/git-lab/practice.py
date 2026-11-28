# © 2026 Natalie Ragulina (Netaniya). All rights reserved.
"""Run real Git commands in a temporary, disposable local repo. Never push."""
import os
import pathlib
import subprocess
import tempfile

def practice():
    with tempfile.TemporaryDirectory(prefix="n25x-git-") as directory:
        repo = pathlib.Path(directory) / "practice"
        repo.mkdir()
        env = {k:v for k,v in os.environ.items() if not k.startswith("GIT_")}
        env.update(GIT_CONFIG_NOSYSTEM="1", GIT_CONFIG_GLOBAL=os.devnull, GIT_TERMINAL_PROMPT="0", GIT_AUTHOR_NAME="N25X Learner", GIT_AUTHOR_EMAIL="learner@example.invalid", GIT_COMMITTER_NAME="N25X Learner", GIT_COMMITTER_EMAIL="learner@example.invalid", LC_ALL="C")
        def git(*args):
            result = subprocess.run(["git", "-C", str(repo), *args], env=env, check=True, capture_output=True, text=True, timeout=10)
            print("git", *args, flush=True)
            return result.stdout.strip()
        def check(value, message):
            if not value:
                raise AssertionError(message)
        git("init", "-b", "main", "--template=")
        git("config", "--local", "core.hooksPath", str(repo / ".git" / "no-hooks"))
        path = repo / "README.md"
        path.write_text("N25X project\n", encoding="utf-8")
        git("add", "README.md")
        git("commit", "-m", "Initial commit")
        path.write_text("N25X project\nFirst change\n", encoding="utf-8")
        check(git("status", "--porcelain") == "M README.md", "working-tree change")
        git("add", "README.md")
        check(git("diff", "--cached", "--name-only") == "README.md", "staged change")
        git("commit", "-m", "Update README")
        git("switch", "-c", "feature")
        path.write_text("N25X project\nFirst change\nFeature\n", encoding="utf-8")
        git("add", "README.md")
        git("commit", "-m", "Feature README")
        feature = git("rev-parse", "HEAD")
        git("switch", "main")
        check("Feature" not in path.read_text(encoding="utf-8"), "branch file restored")
        git("merge", "--ff-only", "feature")
        check(git("rev-parse", "HEAD") == feature, "fast-forward")
        check("Feature" in path.read_text(encoding="utf-8"), "merged content")
        check(git("rev-list", "--count", "HEAD") == "3", "history count")
        check(not git("status", "--porcelain"), "clean tree")
        check(not git("remote"), "no remotes")
        print(git("log", "--oneline"))
        print("PASS: real local Git practice; temporary repository removed on exit.")

if __name__ == "__main__":
    practice()
