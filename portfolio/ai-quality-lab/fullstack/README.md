# AI Quality Lab · React / TypeScript + FastAPI

[English](README.en.md) · [Русский](README.ru.md) · [Öffentliche Worker-Demo](https://ai-quality-lab-neta26.wellolm4.chatgpt.site)

Eine separat ausführbare Full-stack-Implementierung desselben Lernprojekts: React-Oberfläche, typisierte HTTP-Anfragen, Python/FastAPI-Backend und gemeinsame Prüflogik. Die öffentliche Worker-Demo bleibt unverändert; dieser Ordner enthält die lokale React-/Python-Version.

## Ausprobieren

Node.js 22.12+ oder 24+, Python 3.12. Aus dem geklonten Repository:

~~~sh
cd portfolio/ai-quality-lab/fullstack
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements-dev.txt
cd frontend
npm ci
npm run build
npm test
cd ..
.venv/bin/python -m pytest tests -q
.venv/bin/uvicorn backend.app:app --host 127.0.0.1 --port 8000
~~~

Dann **http://127.0.0.1:8000** öffnen. Beispielantworten lassen sich ohne Schlüssel bearbeiten, vergleichen und als JSON-Bericht exportieren. Interaktive API-Dokumentation: **http://127.0.0.1:8000/docs**.

Windows: beim Erstellen der Umgebung `python` verwenden; `.venv/bin/python` durch `.venv\Scripts\python.exe` und `.venv/bin/uvicorn` durch `.venv\Scripts\uvicorn.exe` ersetzen.

Für die Entwicklung: API wie oben starten; in einem zweiten Terminal im Ordner `frontend` `npm run dev` ausführen. Vite leitet `/api` an das lokale Backend weiter.

## Funktionen

- Acht feste deutsche Testfälle, Auswahl einzelner Fälle und zwei editierbare Antwortvarianten.
- Gemeinsame Python-Prüflogik, gewichtete Ergebnisse und sichtbare Einzelregeln.
- Vier UI-Sprachen; Deutsch beim Start. Aufgaben bleiben für vergleichbare Ergebnisse deutsch.
- JSON-Export einschließlich Antworten, Auswahl, Ergebnissen und tatsächlicher Prüfdauer.
- Optionaler serverseitiger OpenAI-Responses-API-Adapter; manuell geänderte Ausgaben verlieren ihre Modellzuordnung.
- Kein Browserzugriff auf den Provider-Schlüssel; der separate Zugangscode bleibt nur im Arbeitsspeicher des Clients.

## Optionale echte Modellaufrufe

Standardmäßig deaktiviert. Für einen echten Aufruf sind **alle vier** serverseitigen Variablen aus `.env.example` nötig:

| Variable | Bedeutung |
| --- | --- |
| `QUALITY_LAB_ENABLE_LIVE=true` | Live-Modus ausdrücklich aktivieren |
| `OPENAI_API_KEY` | Provider-Schlüssel, ausschließlich auf dem Server |
| `OPENAI_MODEL` | Für das eigene API-Projekt freigegebenes Modell |
| `QUALITY_LAB_GENERATION_TOKEN` | Separater zufälliger Zugangscode, mindestens 32 Zeichen |

Variablen über die Shell oder den Deployment-Secret-Manager setzen und den Server neu starten; `.env` wird nicht automatisch geladen. Im UI erscheint dann die Modellkonfiguration. Der Zugangscode ist **nicht** der API-Schlüssel.

Nur der ausgewählte feste Testprompt wird an `https://api.openai.com/v1/responses` gesendet. A und B verwenden dasselbe konfigurierte Modell mit unterschiedlichen Anweisungen. Es gibt keine Werkzeuge, freien Proxy-Aufrufe oder automatischen Wiederholungen. Der Request setzt `store: false` und `max_output_tokens: 512`. `store: false` ist keine Zusage, dass beim Anbieter keinerlei Aufbewahrung stattfindet.

Standardlimit: 20 Versuche pro Stunde und Prozess, auch Fehler zählen. Neustarts und mehrere Prozesse haben getrennte Zähler. Ein verbindliches Ausgabenlimit muss zusätzlich im API-Projekt gesetzt werden. Modellaufrufe können Kosten verursachen; der Code berechnet keine erfundenen Eurobeträge.

## API und Architektur

~~~mermaid
flowchart TD
    A["React / TypeScript"] --> B["FastAPI"]
    B --> C["Gemeinsamer Python-Evaluator"]
    B --> D["Responses API · optional"]
~~~

`GET /api/config` liefert den Verbindungsstatus ohne Geheimnisse. `GET /api/cases` liefert den offenen Testkatalog. `POST /api/evaluate` prüft Antworten. `POST /api/generate` erfordert Konfiguration und den Header `X-Generation-Token`.

Der Export enthält nur Modellbelege, deren Text noch mit dem geprüften Text übereinstimmt. Der Evaluator selbst tätigt keine Modellaufrufe. Es gibt keine serverseitige Speicherung der Eingaben und keine Kontenverwaltung; dies ist eine lokale Referenzimplementierung. Vor öffentlichem Betrieb wären verwaltete Authentifizierung und ein persistentes, verteiltes Budget nötig.

## Prüfstand

**17 API-Tests und 8 Client-Tests bestanden**, TypeScript-Prüfung und Produktionsbuild erfolgreich. Provider-Vertrag, Timeout, Fehlerantworten, Zugangsschutz, Budget, Bericht und Herkunftskennzeichnung werden mit einem simulierten HTTP-Provider getestet. **Ein tatsächlicher Modellaufruf ist noch nicht verifiziert.** Docker-Build und visuelle Browser-/Mobilprüfung sind nicht ausgeführt.

Dockerfile vorhanden; aus dem übergeordneten Ordner `portfolio/ai-quality-lab`:

~~~sh
docker build -f fullstack/Dockerfile -t quality-lab-fullstack .
docker run --rm -p 127.0.0.1:8000:8000 quality-lab-fullstack
~~~

## Projektarbeit

Portfolio von Natalie Ragulina (Netaniya), gemeinsam mit KI-Unterstützung entwickelt. Projektziel und Anforderungen wurden vom Eigentümer vorgegeben; Code, Tests und diese technische Erweiterung wurden vom KI-Assistenten umgesetzt.

API-Vertrag: [OpenAI Responses](https://developers.openai.com/api/docs/guides/migrate-to-responses).
