# Eliana & N25x · 3D-Abenteuer

**© 2026 Natalie Ragulina. All rights reserved.**

Konzept und künstlerische Leitung: **Natalie Ragulina**. Entwicklung, Übersetzung, ursprüngliche Illustrationen und Modellierung mit KI-Unterstützung. Es werden weder kommerzielle Berufserfahrung noch prozentuale Arbeitsanteile behauptet.

Das neue Spiel läuft eigenständig unter `/Netaniya/eliana-n25x/3d/`. Der frühere Bild-Quest unter `/Netaniya/eliana-n25x/` bleibt erhalten. Sein Spielstand `eliana-n25x.save.v1` wird weder gelesen noch verändert. Die 3D-Version verwendet `eliana-n25x.3d.v1`.

## Spielen

WASD oder Pfeiltasten bewegen Eliana relativ zur Kamera. Umschalt lässt sie rennen. Die Maus mit gedrückter Taste ziehen, um die Kamera zu drehen; das Mausrad verändert den Abstand. E interagiert mit einem erreichbaren Objekt; Esc oder P pausiert. Auf Touchscreens: linker Stick für Bewegung, freie rechte Bildfläche für die Kamera, große Aktions- und Renntasten rechts. Getrennte Pointer-IDs und Pointer Capture ermöglichen gleichzeitige Bewegung und Kameradrehung.

Lies die Nachricht, finde drei Komponenten, starte am Terminal den Scan von N25x und repariere den Anschluss. Der Roboter muss den Knoten tatsächlich erreichen. Anschließend fährt das Tor hoch. Erst das Hindurchgehen beendet den Abschnitt und vergibt Punkte. Sechs kleine, begehbare Bezirke führen zum abschließenden Signal: Stadt, stilles Viertel, Forschungscampus, Garten, Wohnsektor und Höhenstation. Notrelais haben eine Reihenfolge; weitere Bezirke verwenden Archive, Ventile, Verteiler und Baken.

Der Entdeckermodus hat keinen Zeitdruck. Im Zeitbonus-Modus zählt nur die aktive Spielzeit; Menüs, Pausen und versteckte Tabs zählen nicht. Pro Bezirk gibt es 350 Grundpunkte und höchstens 120 Bonuspunkte. Beste Ergebnisse werden pro Modus gespeichert und nicht durch Wiederholung addiert.

## Technik und Grenzen

- Lokal eingebundenes Three.js r160, kein CDN und kein Serverkonto. Das Gelände ist eben und begrenzt. Volumetrische Gebäude und Geräte haben Kreis/AABB-Kollisionen mit kleinen Bewegungsschritten gegen Durchtunneln. Kamera-Raycasts begrenzen den Abstand vor Wänden.
- N25x folgt über ein rasterbasiertes Wegenetz mit kontinuierlich geprüften Verbindungssegmenten. Bewegung verwendet dieselben Hindernisse wie Eliana. Es gibt kein Teleportieren zur Erfüllung eines Auftrags.
- Eliana und N25x sind **vorläufige, original im Code erstellte, gegliederte 3D-Modelle** mit geometrischem Gesicht, Haaren, Händen, Hüft-, Knie-, Schulter- und Ellbogengelenken. Sie verwenden prozedurale Stand-, Geh-, Lauf- und Arbeitsanimationen. Dies sind echte Volumenmodelle, keine Porträtflächen, aber **keine fotorealistischen gescannten Figuren**. Für genaue Ähnlichkeit wird eine entsprechend lizenzierte GLB/glTF-Figur mit vollständigem Körper, Gesichtstexturen, Skelett und passenden Animationen benötigt. Die vorhandenen Porträtbilder allein liefern diese Daten nicht.
- Alle sechs Abschnitte teilen eine kompakte Grundrissstruktur, mit verschiedenen Materialien, Beleuchtung, Architekturdetails und Aufgabenobjekten. Dies ist eine erste spielbare 3D-Fassung, kein fertiges kommerzielles Spiel mit sechs großen individuellen Welten.
- Die Grafik begrenzt die Pixeldichte; der sparsame Modus verzichtet auf dynamische Schatten. Die benötigte Bildrate hängt vom Gerät ab. Physische Android-/iOS-Geräte müssen separat geprüft werden.
- Originale synthetische Musik/Atmosphäre und Effekte einschließlich Schritte. Audio beginnt erst nach Benutzereingabe; Browser können Audio blockieren. Lautstärke, Stummschaltung und Pausen gelten gemeinsam.

## Build und Prüfungen

```sh
node portfolio/eliana-n25x/3d/build.mjs
node scripts/build-pages.mjs
npm test --prefix portfolio/eliana-n25x
node --test tests/pages.test.mjs
```

Die vorhandenen npm-Abhängigkeiten müssen zuvor mit `npm ci --ignore-scripts` im jeweiligen Projekt installiert sein. Die gemeinsame Pages-Pipeline baut die frühere und die neue Version. `3d/dist` ist erzeugte Ausgabe und wird nicht eingecheckt. Produktionsdateien und Offline-Inventar entstehen aus derselben Liste. Im Browser verwendet `?qa=1` eine lesbare Positions-/Animationsanzeige; sie bietet keine Teleport- oder Abschlussfunktion.

Die neuen automatischen Tests prüfen physische Wege durch alle sechs Missionen, Hindernisse und Tore, Roboterwege, Spielregeln, Punkte, sichere Spielstände, Übersetzungen, Modellgelenke, Dateiintegrität und einen Service-Worker mit abgeschalteter Test-Netzwerkfunktion. Diese Tests sind **keine** Prüfung auf physischen Geräten und ersetzen kein echtes Browser-Durchspielen.

## Installation und Offline

Der Manifest-Scope und der Service Worker sind auf `3d/` beschränkt. Vor einer Offline-Bereitschaftsmeldung werden alle 15 notwendigen Programm-, Modellgenerator-, Font-, Icon- und Lizenzdateien aus dem Cache gelesen und mit SHA-256 gegen das Build-Inventar geprüft. Modelle und Materialtexturen entstehen lokal aus diesen Dateien. Der Worker entfernt ausschließlich ältere `en25x3d-`-Caches. Die frühere Version bleibt getrennt.

Erst nach der bestätigten Dateiprüfung kann der Spieler ohne Netz erneut öffnen. Die tatsächliche Installation und ein Neustart ohne Netz auf einem physischen Gerät sind eine zusätzliche Geräteprüfung; es wird kein entsprechender Test behauptet, bevor er stattgefunden hat.

## Lizenzen

- Originalcode, Figurenentwurf und Gestaltung: Copyright-Hinweis oben; keine allgemeine Nutzungslizenz durch öffentliche Einsicht.
- Three.js r160: MIT, Copyright © 2010–2023 three.js authors; unveränderter Lizenztext in `vendor/LICENSE.three.txt`. Quelle: `https://github.com/mrdoob/three.js/tree/r160`.
- Manrope: SIL Open Font License; Autoren und Bedingungen stehen in der ursprünglichen `assets/OFL.txt`, die in die Ausgabe kopiert wird.
- Keine heruntergeladenen Fremdmodelle, Bewegungsclips oder Tonaufnahmen. Keine kostenpflichtigen Dienste.

English documentation: [README.en.md](README.en.md).

Bestätigtes Browser-Durchspielen und echte Screenshots: [Prüfbericht](../../../docs/eliana-n25x/README.md). Physische Geräte sind ausdrücklich von der Chromium-Emulation getrennt.

Neue Farbgestaltung und aktuelle Spielaufnahmen: [Vivid technology update](../../../docs/eliana-n25x/bright-update/README.md).
