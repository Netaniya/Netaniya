# N25x · Robot Studio

**Schöpferin, ursprüngliche Idee, Konzept und künstlerische Leitung: Natalie Ragulina.**
**© 2026 Natalie Ragulina. All rights reserved.**

[English](README.en.md) · [Русский](README.ru.md) · **[App öffnen](https://netaniya.github.io/Netaniya/eliana-n25x/workshop/)** · [HTML-Kopie öffnen](https://netaniya.github.io/Netaniya/eliana-n25x/workshop/download/N25x-Studio.html)

Eine interaktive Lern- und Kreativwerkstatt für Smartphone und Computer. Nutzer gestalten einen persönlichen humanoiden 3D-Roboter, lösen praktische Aufgaben und bauen eigene kleine Projekte. Eliana und N25x begleiten die Werkstatt als benannte Figuren. Entwicklung, Übersetzungen, generierte Porträts und technische Prüfungen entstanden mit KI-Unterstützung nach den Entscheidungen und Vorgaben von Natalie Ragulina.

## In drei Minuten ausprobieren

1. Oben **Sprache der App** wählen: Deutsch, English, Русский oder Українська. Deutsch ist die Voreinstellung; die Wahl wird auf dem Gerät gespeichert.
2. Unter **Mein Roboter** Namen, Körperbau, Paneele und Material gestalten. Tippen lässt den wirklichen 3D-Roboter winken.
3. **Lernen → Programmieren & Ausprobieren** öffnen. Einen Baustein ändern oder JavaScript bearbeiten, das Beispiel starten und alle Prüffälle ausführen.
4. Unter **Gestalten → Mein Quizspiel** Fragen und Antworten schreiben. Die Punktefunktion prüfen und das eigene Spiel ausprobieren.
5. Das Projekt speichern, als spielbares HTML herunterladen oder als Projektdatei zur Weiterbearbeitung übertragen.

## Enthaltene Funktionen

- Originaler artikulierter 3D-Humanoid mit Gelenken und Fingern, konfigurierbaren Materialien und Beleuchtung in einer dunklen Werkstatt.
- Fünf Programmieraufgaben zu Variablen, Bedingungen, Schleifen, Funktionen und Fehlersuche. Der begrenzte JavaScript-Interpreter führt den eigenen Code wirklich aus und zeigt Werte sowie Prüfergebnisse.
- Quiz-Editor mit 1–8 Fragen und eigener Punktefunktion; spielbare Vorschau, HTML-Export und validierter JSON-Austausch.
- Mathematik auf elf Schwierigkeitsstufen, tägliche Aufgaben, lokaler Rechenhelfer und drei ausführbare Wegprogramme.
- Zehn Einstiegssprachen mit insgesamt 60 Wortkarten sowie Auswahl- und Schreibübungen. Die Lernsprache ist von der Sprache der Oberfläche getrennt.
- Kleine Übungssets zu Logik, Physik, Biologie, Geografie und digitalen Fähigkeiten.
- Zwanzig Gestaltungsmöglichkeiten: Quiz, Entscheidungsgeschichte, Texte, Comic-Szenenkarten, Webseite, Checkliste, Timer, Lernkarten, Abzeichen, Sticker, Ideenkarte, Tagesplan, Melodie und Roboterbewegungen. Einige teilen sich denselben Texteditor; Inhalte verfasst der Nutzer selbst.
- Punkte für bestätigte Ergebnisse, freischaltbare Teile, separate Werkzeugentwürfe, lokale Profile und Profil-Import/-Export. Keine Geldprämien oder Käufe mit echtem Geld.
- Vier Oberflächensprachen, große Bedienelemente, eigene synthetische Klänge, Lautstärke, Stummschaltung, installierbare Web-App und eigenständige HTML-Kopie.

## Als App nutzen oder weitergeben

**Android / Chrome:** App-Link öffnen, im Browsermenü **Installieren / App installieren** wählen. Je nach Version liegt dies unter „Installieren und Verknüpfung erstellen“.
**iPhone / Safari:** App-Link öffnen, **Teilen → Zum Home-Bildschirm**; falls angeboten, „Als Web-App öffnen“ aktivieren.
**Computer:** In einem unterstützten Browser das Installationssymbol bzw. „App installieren“ verwenden.

Die erste Nutzung benötigt Internet. Unter **⚙ Einstellungen** auf die Bestätigung der geprüften Offline-Dateien warten. Erst dann wurde die lokale Bereitschaft dieser Version bestätigt. Browser können gespeicherte Daten entfernen; wichtige Profile exportieren. Nachrichten und Cloud-Synchronisierung sind nicht verfügbar.

Unter **⚙ → App als HTML herunterladen** lässt sich eine komplette Datei speichern und weitergeben. Alle Laufzeitmodule, Bilder, Schrift und Lizenzhinweise sind eingebettet. Mit einem modernen Browser öffnen; einfache mobile Dateibetrachter führen JavaScript möglicherweise nicht aus. Die Datei ist eine zusätzliche Offline-Kopie, keine APK und kein App-Store-Paket. Web-App und HTML-Datei können unterschiedliche lokale Profile verwenden; der Profil-Export überträgt Fortschritt.

## Für die technische Prüfung

Persönliches Portfolio-Projekt mit JavaScript-ES-Modulen, HTML/CSS, Three.js, Web Audio, Web App Manifest, Service Worker, Node-Tests und GitHub Actions. Keine Runtime-CDNs, Benutzerkonten, Tracker oder kostenpflichtigen KI-APIs. Der Rechenhelfer und die vorbereiteten N25x-Erklärungen laufen lokal. Es gibt keinen freien KI-Chat, keine aktive soziale Plattform und keine vollständigen zertifizierten Schul- oder Sprachkurse.

```sh
cd portfolio/eliana-n25x
npm ci --ignore-scripts
npm run build
npm run check
npm test
python3 -m http.server 8080 --bind 127.0.0.1 --directory workshop/dist
```

Danach `http://localhost:8080/` öffnen. CI verwendet Node.js 24; Python dient hier nur als optionaler lokaler HTTP-Server. Der gemeinsame Portfolio-Build lautet `node scripts/build-pages.mjs` im Repository-Stamm. Einzelheiten: [technische Studio-Dokumentation](workshop/README.md), [Prüfbelege](../../docs/eliana-n25x-workshop/README.ru.md), [Browser-Workflow](../../.github/workflows/eliana-workshop-browser.yml).

Automatisierte Logik-/DOM-/Cache-Prüfungen, echtes Chromium und physische Geräte werden getrennt dokumentiert. Aktuelle Freigabe und Version stehen in [publication.json](../../docs/eliana-n25x-workshop/publication.json). Eine emulierte Telefonansicht ist kein physisches Android-/iOS-Gerät.

## Frühere Spielversionen

[Illustrierter Quest](https://netaniya.github.io/Netaniya/eliana-n25x/) · [Steuerbares 3D-Abenteuer](https://netaniya.github.io/Netaniya/eliana-n25x/3d/) · [3D-Dokumentation](3d/README.md). Beide Versionen und ihre eigenen Speicherstände bleiben getrennt erhalten.

## Urheberschaft und Lizenzen

Die Idee, Konzeption, Figurenwahl und künstlerische Leitung gehören zu Natalie Ragulinas menschlichem kreativen Beitrag. Der Einsatz von KI wird offen benannt. Die privaten Originalfotos werden nicht verteilt; für das menschliche Gesicht wird keine exakte animierte Rekonstruktion behauptet.

**© 2026 Natalie Ragulina. All rights reserved.** Veröffentlichung erteilt keine allgemeine Wiederverwendungslizenz für die Originalmaterialien. [Copyright-Hinweis](LICENSE.md). Three.js bleibt MIT-lizenziert, Manrope unter SIL OFL; [Bildangaben](assets/credits.json) und Lizenzdateien bleiben erhalten.

[Chrome-Installationshilfe](https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DAndroid) · [Safari-Installationshilfe](https://support.apple.com/guide/iphone/iphea86e5236/ios)
