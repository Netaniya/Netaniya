# Eliana & N25x · Robot Studio

[English](README.en.md) · [Studio öffnen](https://netaniya.github.io/Netaniya/eliana-n25x/workshop/)

**© 2026 Natalie Ragulina. All rights reserved.**

Konzept, Figuren und künstlerische Leitung: **Natalie Ragulina**. Entwicklung, Übersetzungen und technische Prüfungen mit KI-Unterstützung. Keine erfundenen kommerziellen Referenzen oder prozentualen Beitragsangaben.

Eine mobile Web-App: eigenen Roboter gestalten, kleine Aufgaben verstehen und etwas Eigenes herstellen. Eliana und N25x begleiten als benannte Mentorfiguren. Es gibt nur motivierende Spielpunkte, keine Zahlungen, Geldprämien oder verkäuflichen Guthaben.

## Ausprobieren

1. Beim ersten Besuch Deutsch; im Begrüßungsfenster oder unter ⚙ die Sprache wechseln. Deutsch, Englisch, Russisch und Ukrainisch sind vollständig enthalten.
2. Roboter benennen; Kopf, Hände, Füße/Räder/Schwebebasis, Farbe, Sprechweise, Interesse und Erklärungsstil wählen. Änderungen sind sofort am animierten 3D-Modell sichtbar. Antippen lässt es winken; die Ansicht kann optional gedreht werden. Es gibt keinen Bewegungs-Joystick.
3. Unter **Lernen** Mathematik, englische Wörter oder Pfeilprogramme wählen. Die tägliche Einheit erzeugt lokal drei neue Mathematikaufgaben für das gewählte Niveau. Kein Zeitdruck und keine Strafe für einen ausgelassenen Tag.
4. Unter **Gestalten** eine achtschrittige Melodie komponieren und als echte WAV-Datei exportieren; oder eine Bewegungsfolge für den Roboter bauen. Eigene Projekte lassen sich speichern und wieder öffnen. Die Roboterkarte enthält die tatsächliche 3D-Ansicht als PNG.
5. Mit Punkten zusätzliche Farben und sichtbare Module freischalten. Aufgaben, Tagesbonus und Projekte können dieselbe Belohnung nicht beliebig wiederholen.

Desktop: Navigation links, Roboter und Werkzeuge nebeneinander. Telefon: untere Navigation, große berührbare Schaltflächen und eigener vertikaler Aufbau. Die Oberfläche braucht keine Kameradrehung, um Aufgaben zu bedienen.

## Lernumfang und Grenzen

- 33 feste Originalübungen, 11 Schwierigkeitsstufen, dazu täglich reproduzierbar erzeugte Aufgaben: Addition, Multiplikation, Division, Brüche, Dezimalzahlen, Prozente, negative Zahlen, lineare Gleichungen, Potenzen, einfache quadratische Gleichungen und ausgewertete Polynomableitungen.
- Die Klassenangabe 1–11 ist eine Orientierung. Das ist kein vollständiger, nach einem bestimmten nationalen Lehrplan geprüfter Schulkurs.
- Rechenwerkstatt: Klammern, Brüche, Prozente, Polynome in `x`, lineare/quadratische Gleichungen und `d/dx x^3`. Begrenzter Parser; Benutzereingaben werden nie als JavaScript ausgeführt. Allgemeine Textaufgaben, Brüche mit Variablen im Nenner, trigonometrische Funktionen und offene KI-Unterhaltung sind nicht enthalten.
- Zwölf englische Wortübungen und drei eigene Programmierlabyrinthe mit ausführbaren Schritten und Hindernissen. Kein generischer KI-Tutor und keine API-Aufrufe.
- Interessen verändern die Lichtfarbe; Sprechstil verändert Ansprache und Ausdruck. „Mit Beispielen“ zeigt den Rechenschritt direkt; andere Erklärungsstile lassen den Hinweis optional.

## Speichern und offline

Profil, Roboter, Punkte, Erfolge und gespeicherte Projekte bleiben browserlokal unter `eliana-n25x.workshop.v1`. Keine Konten, Cloud-Synchronisierung oder soziale Kontaktfunktionen. Profil unter ⚙ als JSON exportieren und auf einem anderen Gerät importieren. Ein neues Profil ersetzt ausschließlich dieses Studio-Profil nach Bestätigung. Die ursprünglichen Spiele und ihre Speicherstände bleiben erhalten:

- [Ursprünglicher Bilderquest](https://netaniya.github.io/Netaniya/eliana-n25x/): `eliana-n25x.save.v1`
- [3D-Abenteuer](https://netaniya.github.io/Netaniya/eliana-n25x/3d/): `eliana-n25x.3d.v1`

Auf unterstützten Browsern über „App installieren“/„Zum Startbildschirm“ installieren; am iPhone im Teilen-Menü. Es ist eine Web-App, keine native APK. Erster Online-Aufruf erforderlich. Der eigene Service Worker prüft SHA-256 sämtlicher 17 Programm-, Grafik-, Schrift- und Lizenzdateien, bevor er Offline-Bereitschaft meldet. Die Bestätigung steht unter ⚙. Nur ältere `en25xstudio-`-Caches werden bereinigt. Browser können lokalen Speicher entfernen; eine exportierte Kopie schützt den Fortschritt.

## Technik und Lizenzen

Lokales Three.js r160 (MIT, [Lizenz](../3d/vendor/LICENSE.three.txt)); keine CDN-Laufzeitabhängigkeit. Originale prozedurale, gegliederte 3D-Robotermodelle, Studiolicht und Animationen. Web Audio erzeugt die Klänge nach einer Nutzeraktion; Lautstärke und Stummschaltung unter ⚙. WAV-Export erzeugt PCM-Audiodaten.

Manrope von Mikhail Sharanda, Mirko Velimirović und Community unter SIL OFL: [Schriftlizenz](../assets/OFL.txt). Die vorhandenen Mentorporträts wurden mit KI anhand freigegebener Referenzen erstellt: [Bildnachweise](../assets/credits.json). Die private Originalfotografie wird nicht veröffentlicht. Porträts sind Illustrationen; eine exakt nachgebildete animierte menschliche Gesichtsfigur wird nicht behauptet. Keine zusätzlichen fremden Modelle, Animationen oder Tonaufnahmen.

## Prüfen

Vom Spielordner `portfolio/eliana-n25x`:

```sh
npm ci --ignore-scripts
npm run build
npm run check
npm test
```

Gesamtausgabe: `node scripts/build-pages.mjs`; Portfolioprüfungen: `node --test tests/pages.test.mjs` aus dem Repository-Stamm.

Die zwölf automatischen Studio-Tests prüfen Mathematik (einschließlich 1.980 erzeugter Tagesaufgaben), Punkte, Profilvalidierung, echte Modellgeometrie und Gelenke, WAV-Daten, vollständige Cache-Inventare, kalte Offline-Navigation und beschädigte Ressourcen. Das sind keine Geräteprüfungen.

`.github/workflows/eliana-workshop-browser.yml` führt echtes Chromium mit SwiftShader aus: Desktop sowie emuliertes Telefon mit tatsächlichen Klicks/Tastatur-/Touch-Eingaben, ohne Einspritzen von Lernfortschritt oder Punkten. Es exportiert Screenshots, echte Nutzerdateien und `verification.json`. Der aktuelle bestätigte Stand steht in [PROGRESS.ru.md](PROGRESS.ru.md). Physische Android-/iOS-Geräte und eine echte Installation müssen getrennt geprüft werden.
