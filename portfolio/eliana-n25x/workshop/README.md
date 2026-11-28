# N25x · technische Hinweise

**Schöpferin, ursprüngliche Idee, Konzept und künstlerische Leitung: Natalie Ragulina.**
**© 2026 Natalie Ragulina. All rights reserved.** Entwicklung und Lernmaterialien mit KI-Unterstützung.

[Aktueller Funktionsumfang und Installation](../README.md) · [English technical notes](README.en.md) · [Lernumfang und Ausbauplan](LEARNING-PLAN.ru.md)

Die aktuelle Werkstatt zeigt nur N25x. Das menschliche Porträt wird nicht in den Build übernommen. Der originale gegliederte 3D-Humanoid nutzt lokal gebündeltes Three.js r160 (MIT), Manrope steht unter SIL OFL. Klänge und Musikinstrumente werden lokal synthetisiert; keine fremden Klavieraufnahmen.

48 Mathematikfamilien liefern 12.288 Zahlenvarianten mit Lösungen und Wiederholung. Zehn Sprachen enthalten jeweils 120 Ausgangsaussagen in zwölf Themen. 20 Programmiermissionen haben 95 Prüfeingaben. Das Klavier umfasst A0–C8, Aufnahme, mehrere Spuren, Notenbearbeitung und MIDI/WAV/JSON. Die Modulaufteilung ist in den englischen technischen Hinweisen beschrieben.

Der Build prüft 30 notwendige Offline-Ressourcen mit SHA-256. Die vollständige HTML-Kopie `download/N25x-Studio.html` enthält 20 eingebettete Module. Der frühere Dateiname bleibt als Online-Kompatibilitätskopie erhalten. Lokale Sprechstimmen sind optional und nicht enthalten. Lesen, Schreiben und Satzbau funktionieren ohne Stimme.

Vom Spielordner: `npm ci --ignore-scripts`, `npm run build`, `npm run check`, `npm test`. Im Stamm: `node scripts/build-pages.mjs` und `node --test tests/pages.test.mjs`. CI nutzt Node.js 24. 88 automatisierte Projekttests und zwölf Portfolioprüfungen sind von echten Chromium-Läufen und physischen Geräten zu unterscheiden.

Der Speicher bleibt unter `eliana-n25x.workshop.v1` kompatibel. Profile und Projekte lassen sich übertragen; Website und lokale Datei können getrennte Speicher haben. Aktuelle Ergebnisse: [publication.json](../../../docs/eliana-n25x-workshop/publication.json). Physische Geräte und Installation sind separat zu prüfen. Das Sprachmaterial ist noch nicht durch Muttersprachler geprüft; der vollständige C1-Weg ist noch nicht fertig. Konten, freier KI-Chat, Nachrichten und Zahlungen sind nicht angeschlossen.

## Academy-Erweiterung (Entwicklungszweig)
14 Sprachthemen mit 136 Ausgangssätzen pro Sprache; sechs Fachkurse (Logik, Physik, Biologie, Geografie, digitale Kompetenz und Musiktheorie) mit 61 Aufgaben in 23 Stufen. Mathe und Programmierung in je vier Stufen. Kandidat: Veröffentlichung und vollständige Browser-Abnahme noch offen. Keine CEFR-Zertifizierung.

## Academy-Kandidat
Lokale Wiederholungsplanung pro Sprache und Fertigkeit (1/3/7/14/30 Tage, UTC-Tage); Fehler und Hilfen setzen die Wiederholung zurück. Frühzeitiges Üben verlängert das Intervall nicht. [Menschlicher kreativer Beitrag](CONTRIBUTIONS.de.md). Browser-Abnahme noch offen.

## Aktueller Entwicklungsstand — 28.11.2026
Der Entwicklungszweig umfasst 16 Sprachthemen, je 152 Sätze in zehn Sprachen (1.520 Übersetzungen, 4.560 Übungsformen), 80 Grammatikthemen mit 320 Aufgaben, 32 Programmiermissionen in sieben Stufen, 61 Fachaufgaben in 23 Stufen, 24 Klavierübungen in sechs Stufen und acht Rhythmusübungen. Frühere Zahlen beschreiben ältere Versionen. Direkte Quellcodeprüfungen waren erfolgreich; Browser-Abnahme und Veröffentlichung stehen noch aus. Keine CEFR-Zertifizierung.

Musik-Erweiterung: fünf Stufen zur Erkennung aufsteigender melodischer Intervalle, 13 Halbtonabstände, 39 Fragen je vollständigem Durchgang, separat gespeicherter Fortschritt. Hör- und Browser-Abnahme stehen noch aus.

Notenlesen: fünf Stufen, 40 einzelne Noten, Violin- und Bassschlüssel, Hilfslinien und Vorzeichen; lokale Fortschrittsspeicherung. Kein Partitureditor. Browser- und Schriftprüfung noch offen.

Akkorderkennung: vier Stufen, neun Akkordtypen in Grundstellung, 27 Fragen je Durchgang, hörbare Referenzbeispiele, lokaler Fortschritt. Umkehrungen und Stimmführung werden nicht bewertet. Hör- und Browser-Abnahme offen.

Praktische Harmonielehre: sechs Stufen, 24 Aufgaben zum Akkordaufbau und zu Umkehrungen; Auswahl einzelner Tasten, Prüfung der exakten Tonhöhen und separate Fortschritte. Keine Stimmführungsbewertung; Browser-Abnahme offen.

Grammatik: 88 Themen, 352 Aufgaben, je 20 Themen in Deutsch und Englisch, je sechs in den übrigen acht Sprachen. Sprachprüfung und CI dieser Erweiterung stehen aus.

Einheitliche Lernübersicht: sechs getrennte Fortschrittsanzeigen für Mathematik, Sprachübungen, Grammatik, Programmierung, Fachkurse und Musik sowie gespeicherte kreative Projekte. Keine Änderung von Profilen oder Punkten. Der aktive Pull Request vermeidet doppelte CI-Läufe.

Mathematik: 52 Themen mit je 256 Varianten (13.312); Fachkurse: 73 Fragen in 29 Stufen. Bestehende Aufgabenkennungen bleiben stabil. Browser-Abnahme dieser Erweiterung offen.

Programmieren: 36 Missionen, acht Stufen, 182 Testfälle; vier fächerübergreifende Aufgaben. Begrenzter Lerninterpreter, keine vollständige JavaScript-Laufzeit. Browser-Abnahme offen.

ELIANA: erste prozedurale 3D-Iteration mit Titanoptik, blauen Sensoren und Explosionsansicht. Logo und gespeicherte Profile bleiben erhalten; filmreife Modellierung und Browser-Abnahme stehen aus.
