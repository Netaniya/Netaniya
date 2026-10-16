# N25x · technische Hinweise

**Schöpferin, ursprüngliche Idee, Konzept und künstlerische Leitung: Natalie Ragulina.**
**© 2026 Natalie Ragulina. All rights reserved.** Entwicklung und Lernmaterialien mit KI-Unterstützung.

[Aktueller Funktionsumfang und Installation](../README.md) · [English technical notes](README.en.md) · [Lernumfang und Ausbauplan](LEARNING-PLAN.ru.md)

Die aktuelle Werkstatt zeigt nur N25x. Das menschliche Porträt wird nicht in den Build übernommen. Der originale gegliederte 3D-Humanoid nutzt lokal gebündeltes Three.js r160 (MIT), Manrope steht unter SIL OFL. Klänge und Musikinstrumente werden lokal synthetisiert; keine fremden Klavieraufnahmen.

48 Mathematikfamilien liefern 12.288 Zahlenvarianten mit Lösungen und Wiederholung. Zehn Sprachen enthalten jeweils 120 Ausgangsaussagen in zwölf Themen. 20 Programmiermissionen haben 95 Prüfeingaben. Das Klavier umfasst A0–C8, Aufnahme, mehrere Spuren, Notenbearbeitung und MIDI/WAV/JSON. Die Modulaufteilung ist in den englischen technischen Hinweisen beschrieben.

Der Build prüft 30 notwendige Offline-Ressourcen mit SHA-256. Die vollständige HTML-Kopie `download/N25x-Studio.html` enthält 20 eingebettete Module. Der frühere Dateiname bleibt als Online-Kompatibilitätskopie erhalten. Lokale Sprechstimmen sind optional und nicht enthalten. Lesen, Schreiben und Satzbau funktionieren ohne Stimme.

Vom Spielordner: `npm ci --ignore-scripts`, `npm run build`, `npm run check`, `npm test`. Im Stamm: `node scripts/build-pages.mjs` und `node --test tests/pages.test.mjs`. CI nutzt Node.js 24. 88 automatisierte Projekttests und zwölf Portfolioprüfungen sind von echten Chromium-Läufen und physischen Geräten zu unterscheiden.

Der Speicher bleibt unter `eliana-n25x.workshop.v1` kompatibel. Profile und Projekte lassen sich übertragen; Website und lokale Datei können getrennte Speicher haben. Aktuelle Ergebnisse: [publication.json](../../../docs/eliana-n25x-workshop/publication.json). Physische Geräte und Installation sind separat zu prüfen. Das Sprachmaterial ist noch nicht durch Muttersprachler geprüft; der vollständige C1-Weg ist noch nicht fertig. Konten, freier KI-Chat, Nachrichten und Zahlungen sind nicht angeschlossen.
