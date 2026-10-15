# AI Quality Lab

Ein interaktives Lernprojekt von **Natalie Ragulina (Netaniya)** zur reproduzierbaren Prüfung gespeicherter Antwortvarianten.

![ai-quality-lab · Deutsch](../../assets/screenshots/quality-lab.png)

**[Live-Demo](https://ai-quality-lab-neta26.wellolm4.chatgpt.site)** · [English](README.en.md) · [Русский](README.ru.md)

## Was funktioniert?

- Acht deutsche Testfälle: JSON-Struktur, Routing, Beträge, Datumsformat, Werkzeugauswahl, fehlende Daten, E-Mail-Anonymisierung und fremde Anweisungen im Dokument.
- Zwei bearbeitbare, handgeschriebene Beispielvarianten. Testfälle einzeln oder nach Gruppe auswählen.
- Serverseitige Regeln mit sichtbaren Einzelergebnissen, Teilpunkten und gewichteten Scores.
- JSON-Bericht einschließlich Antworten, Testauswahl, Zeitstempel, Engine-Version und gemessener Prüfdauer.
- Reproduzierbarer Python-Evaluator ohne externe Pakete. Python und JavaScript werden auf gleiche Ergebnisse innerhalb der Gleitkomma-Präzision geprüft.
- Deutsch beim ersten Besuch, außerdem Englisch, Russisch und Ukrainisch. Die Testdaten bleiben auf Deutsch, damit derselbe Katalog in allen UI-Sprachen geprüft wird.
- Responsive Oberfläche, Uhr für Europe/Berlin, tatsächlicher Laufzeit-Timer, Fortschritt nach abgeschlossenen Prüfungen und Unterstützung für reduzierte Animation.

## Ehrlicher Umfang

Dies ist ein **Lern- und Portfolioprojekt**, kein kommerziell eingesetztes System. Die Beispielantworten stammen nicht aus API-Aufrufen bestimmter Modelle. Es gibt keine verbundene KI, keine API-Kosten und keine behaupteten Modell-Latenzen. Die angezeigte Prüfdauer misst nur die Regelprüfung; der Laufzeit-Timer umfasst auch die Netzwerkanfragen. Die Regeln bewerten einen engen Katalog, nicht allgemeine Intelligenz, semantische Richtigkeit oder umfassende Sicherheit. Ein hoher Score ersetzt keine fachliche Prüfung.

Die Web-Demo verwendet einen **JavaScript Worker**. **Python ist der separat ausführbare Referenz-Evaluator**, nicht die Hosting-Laufzeit der Website. Eingaben werden im Browser lokal gespeichert, sofern der Browser dies erlaubt, und zum Prüfen an den Worker gesendet. Ohne lokalen Speicher bleibt die Sitzung nutzbar; die Oberfläche weist auf fehlende Speicherung hin. Die App speichert sie auf dem Server nicht und verwendet keine Analyse- oder Tracking-Skripte. Keine vertraulichen Daten eingeben.

## Bewertung

Jede Regel erhält 0 oder 1. Der Testscore ist der Anteil bestandener Regeln. Der Gesamtscore ist `sum(testscore × testgewicht) / sum(testgewicht)`. Ein Test gilt nur bei vollständig bestandenen Regeln als bestanden. Die Beispielwerte sind: A = 4/8 vollständige Tests und 51,28 %; B = 7/8 und 84,62 %. B scheitert gezielt am Fall T08. Diese Zahlen sind Ergebnisse der Beispiele, kein Vergleich echter Modelle.

## Lokal prüfen

Node.js 22+ und Python 3.10+, keine installierten Projekt-Abhängigkeiten erforderlich:

```bash
npm run build
npm test
npm run validate
python3 python/evaluator.py --output report.json
python3 python/evaluator.py --input exported-report.json --output replay.json
```

Alternativ `evaluator.py` und `fixtures.json` von der Website in denselben Ordner herunterladen und `python3 evaluator.py` ausführen. Ein anderer Testdatenpfad kann mit `--dataset fixtures.json` angegeben werden. Importierte Berichte liefern die Antworten und Testauswahl; Ergebnisse werden neu berechnet.

## Aufbau

`src/fixtures.json` enthält den offenen Testkatalog. `src/engine.mjs` enthält den JavaScript-Prüfer. `src/state.mjs` verwirft veraltete Berichte beim Wiederherstellen. `src/ui.mjs`, `src/i18n.mjs`, `src/style.css` und `src/page.html` bilden die Oberfläche. `scripts/generate.mjs` erzeugt den eigenständigen Worker mit eingebetteten Assets. `python/evaluator.py` ist der Python-Prüfer. `tests/` prüft Ergebnisse, Grenzfälle, Python-Parität, HTTP-Endpunkte, Übersetzungen und UI-Interaktionen mit einem DOM-Testdouble. Diese Tests ersetzen keine visuelle Browserprüfung.

## Projektarbeit

Ich habe das Projektziel, die vier Sprachen, die Gestaltung sowie die gewünschten Animationen und Zeitangaben festgelegt. Ich habe die erste Oberfläche auf dem Smartphone geprüft und konkrete Änderungen an Typografie und Aufbau veranlasst. Der KI-Assistent hat Code, automatische Tests, technische Korrekturen und Veröffentlichung im Rahmen unserer gemeinsamen Entwicklung umgesetzt.

## Nächster möglicher Schritt

Eine echte Modellanbindung kann später ergänzt werden: Schlüssel ausschließlich serverseitig, begrenzte Aufrufe, nachvollziehbare Herkunft der Antworten und tatsächliche Verbrauchsdaten. Diese Funktionen sind in der aktuellen Version nicht implementiert.


## Oberfläche

Die überarbeitete Oberfläche verwendet eine kompakte Arbeitsansicht, lesbare Beschriftungen und Testkarten auf Mobilgeräten. Animationen beschränken sich auf laufende Prüfungen und Ergebnisbalken. Der lokal ausgelieferte Font Quality Sans ist eine umbenannte, reduzierte Fassung von Noto Sans für lateinische und kyrillische Zeichen. Quelle und SIL Open Font License sind in `assets/fonts/OFL.txt` dokumentiert. Die Fontdateien liegen für den eigenständigen Worker als Base64-Text vor.


Der Python-Evaluator verwendet dieselben Regeln für äußere Unicode-Leerzeichen und die Antwortlänge in UTF-16-Einheiten wie die Web-Version. Exportierte Berichte sowie die herunterladbaren Python-Dateien werden durch einen eigenständigen Replay-Test geprüft.

32 automatische Prüfungen bestanden. Natalie prüfte die erste Gestaltung auf dem Smartphone und verlangte eine klarere Typografie sowie eine kompakte Arbeitsansicht ohne dekorative Punkte; die Änderungen wurden mit KI-Unterstützung umgesetzt.

## React / TypeScript und FastAPI

[Separat ausführbare Implementierung](fullstack/README.md): React-Client, Python/FastAPI-API, gemeinsame Prüfkriterien und optionale Generierung über die serverseitige Responses API. 17 Backend- und 8 Client-Tests bestanden. Ein echter Modellaufruf ist noch nicht verifiziert. Die öffentliche Worker-Demo behält ihren Modus mit gespeicherten Beispielen.

## Vier vollständige Testkataloge
Titel, Aufgaben, Beispielantworten und sprachabhängige Prüfregeln folgen der gewählten Sprache. Berichte enthalten Sprache und Datensatz-ID; der heruntergeladene Katalog passt zur Auswahl. Eigene Antworten bleiben erhalten. Nach einem Sprachwechsel ist ein neuer Prüflauf erforderlich. Python und JavaScript liefern in allen vier Sprachen dieselben fachlichen Ergebnisse.
