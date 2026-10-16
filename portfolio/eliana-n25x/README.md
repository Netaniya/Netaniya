# N25x · Lern- und Kreativwerkstatt

**Schöpferin, ursprüngliche Idee, Konzept und künstlerische Leitung: Natalie Ragulina.**
**© 2026 Natalie Ragulina. All rights reserved.**

[App öffnen](https://netaniya.github.io/Netaniya/eliana-n25x/workshop/) · [English](README.en.md) · [Русский](README.ru.md)

Eine mobile Lernwerkstatt mit einem originalen humanoiden Roboter, praktischen Aufgaben und eigenen Projekten. Entwicklung, Übersetzungen und technische Prüfungen mit KI-Unterstützung unter Leitung der Urheberin. Das aktuelle Studio verwendet nur N25x; frühere Spiele sind separat archiviert.

## Ausprobieren

Oben die Oberflächensprache wählen: Deutsch, English, Русский oder Українська. Beim ersten Besuch ist Deutsch aktiv. Den Roboter gestalten und unter **Lernen** die Mathematik-Werkstatt, Sprachunterricht oder Programmierung öffnen. Unter **Gestalten → Klavier und Komposition** mit mehreren Fingern oder A W S E D F T G Y H U J K spielen, aufnehmen, Stimmen ergänzen, Noten bearbeiten und exportieren.

## Tatsächlicher Umfang

- **48 mathematische Aufgabenfamilien / 12.288 Zahlenvarianten** mit Erklärung, Beispiel, Lösungsweg, Fehlerwiederholung und fortsetzbarem Selbsttest. Klassen sind Schwierigkeitsorientierung; ein vollständiger nationaler Lehrplan ist nicht geprüft.
- **12 Themen / 120 Ausgangssätze pro Sprache / zehn Sprachen**: insgesamt 1.200 übersetzte Texte. Lesen, Schreiben und Satzbau. Einstiegsmaterial mit KI-Unterstützung; eine Prüfung durch Muttersprachler steht aus. **Der vollständige Weg bis C1 ist noch nicht fertig.**
- Deutsch, Englisch, Georgisch, Ukrainisch, Russisch, Mandarin, Spanisch, Französisch, Italienisch und Japanisch. Hören nutzt eine installierte lokale Gerätestimme, falls vorhanden; keine aufgenommenen Muttersprachlerstimmen.
- **20 ausführbare Programmiermissionen**, 95 normale und Grenzfall-Eingaben, Codeeditor, Vorhersage, Korrektur und Erklärungen. Begrenzter JavaScript-Interpreter für Zahlen, Logik, Bedingungen, Schleifen und Funktionen.
- **Klavier A0–C8**, Akkordaufnahme, bis zu vier Spuren, 64 Takte, 2.048 Noten und 32 gleichzeitige Stimmen. Tonhöhe, Beginn und Dauer bearbeiten; originale synthetische Klavier-/Bass-/Glockenklänge; MIDI, WAV und JSON exportieren.
- Quiz, verzweigte Geschichten, Schreibwerkzeuge, frühere kreative Projekte, Punkte und validierter Dateiaustausch bleiben verfügbar.

[Lernumfang und Ausbauplan](workshop/LEARNING-PLAN.ru.md) · [Technik](workshop/README.en.md) · [Prüfungen](../../docs/eliana-n25x-workshop/README.ru.md)

## Installation und Offline-Kopie

Die Oberfläche nutzt 16 px für normalen Lesetext, 14 px für ergänzende Texte und kräftige Akzentfarben auf dunklem Hintergrund. Die Telefon-Navigation verwendet 13 px.

Android/Chrome: Menü → App installieren. iPhone/Safari: Teilen → Zum Home-Bildschirm. Desktop: Installation im unterstützten Browser. Es ist eine installierbare Web-App; eine Veröffentlichung in App-Stores wird nicht behauptet. Zuerst online öffnen und unter ⚙ die Dateiprüfung abwarten: 30 notwendige Ressourcen werden per SHA-256 geprüft. Optionale lokale Sprechstimmen hängen vom Gerät ab.

Unter ⚙ **App als HTML herunterladen** wählen. Die eigenständige Datei enthält Module, Robotergrafik, Schrift und Lizenzen. [HTML-Kopie öffnen](https://netaniya.github.io/Netaniya/eliana-n25x/workshop/download/N25x-Studio.html). Ein Dateibetrachter auf dem Telefon führt möglicherweise kein JavaScript aus. Website und lokale Datei können unterschiedliche Speicher haben; Profile exportieren und importieren. Browser können lokale Daten entfernen, daher Sicherungen behalten.

Für Updates die installierte Web-App online öffnen, vollständig schließen und erneut öffnen. Eine heruntergeladene HTML-Datei aktualisiert sich nicht selbst: eine neue Kopie über denselben Link herunterladen. Vor dem Wechsel den bisherigen lokalen Profilstand exportieren, damit Roboter, Punkte und Projekte bei Bedarf importiert werden können.

## Prüfung durch Arbeitgeber

JavaScript-ES-Module, Three.js, Web Audio, begrenzte Interpreter, responsives HTML/CSS, PWA, Node/linkedom/VM-Tests und echte Chromium-Actions. Keine Konten, Nachrichten, freie Cloud-KI-Unterhaltung, Cloud-Synchronisierung oder kostenpflichtigen APIs.

```sh
cd portfolio/eliana-n25x
npm ci --ignore-scripts
npm run build
npm run check
npm test
python3 -m http.server 8080 --bind 127.0.0.1 --directory workshop/dist
```

Dann `http://localhost:8080/` öffnen. CI verwendet Node.js 24. Im Stamm: `node scripts/build-pages.mjs` und `node --test tests/pages.test.mjs`. Automatische Tests, Chromium mit Desktop/Touch-Emulation und echte Geräteinstallationen werden getrennt dokumentiert. [Aktuelle Veröffentlichung](../../docs/eliana-n25x-workshop/publication.json).

Der Schlüssel `eliana-n25x.workshop.v1` bleibt kompatibel; bisherige Roboter, Punkte und Projekte werden erhalten. [Bilderquest](https://netaniya.github.io/Netaniya/eliana-n25x/) und [3D-Abenteuer](https://netaniya.github.io/Netaniya/eliana-n25x/3d/) haben eigene Speicherstände.

## Urheberrecht

Natalie Ragulina verantwortet die menschliche Idee, Konzeption, Figurenwahl und künstlerische Leitung. KI-Unterstützung wird offengelegt; kommerzielle Referenzen und prozentuale Beiträge werden nicht erfunden. Private Originalfotos werden im neuen Studio nicht verwendet. [Urheberrechtsvermerk](LICENSE.md). Three.js: MIT; Manrope: SIL OFL; [Bildnachweise](assets/credits.json).
