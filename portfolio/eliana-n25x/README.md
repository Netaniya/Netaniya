# Eliana & N25x


## Neue Version: Robot Studio

Die neue mobile Werkstatt mit persönlichem Roboter, Lernaufgaben, kreativen Werkzeugen und Punkten liegt separat unter **[Robot Studio](workshop/README.md)**. Der unten dokumentierte Bilderquest und das **[3D-Abenteuer](3d/README.md)** bleiben erhalten.

**Ein gemeinsames Zukunftsabenteuer · [English](README.en.md)**

[Spielen](https://netaniya.github.io/Netaniya/eliana-n25x/) · [Offline-Datei herunterladen](https://netaniya.github.io/Netaniya/eliana-n25x/download/eliana-n25x-offline.html)

![Eliana und N25x in der Zukunftsstadt](assets/duo-cover.webp)

Ein fotografisch gestaltetes Point-and-Click-Abenteuer mit sechs eigenständigen Orten: Zukunftsstadt, verlassenes Viertel, Schule, Dachgarten, Zuhause und Relaisstation. Eliana deutet Hinweise; N25x bedient die Geräte. Die Reise hat einen Anfang, sechs spielbare Missionen und einen Abschluss.

## Funktionen

- Sechs unterschiedliche Rätsel: Strompfad, Symbolfolge, Energiebalance, Bewässerungsventile, Startreihenfolge und Signalabgleich.
- Entdeckungsmodus ohne Zeitdruck und Challenge mit Zeitbonus; nachvollziehbare Punkte, persönliche Rekorde und ein optionales Datenmodul pro Ort.
- Vollständige Oberflächen und Missionstexte auf Deutsch, Englisch, Russisch und Ukrainisch; Deutsch beim ersten Besuch.
- Maus, Touch und Tastatur; responsive Oberfläche, vollständig sichtbare Szenen und vergrößerbare Ansicht.
- Browserlokaler Spielstand, Export und geprüfter JSON-Import, bestätigtes Zurücksetzen und Fortsetzen nach Neuladen.
- Installierbare PWA auf unterstützten Browsern. Der Service Worker speichert alle Orte, Porträts, Schriften und Skripte. Ein Erfolg wird erst nach vollständiger Cache-Prüfung angezeigt.
- Eigenständige Offline-HTML-Datei mit eingebetteten Bildern, Schrift und Spiellogik; keine Laufzeitabhängigkeit von CDNs, Konten, Werbung oder kostenpflichtigen APIs.
- Eigene Klänge für Scans, Fundstücke, Fehler, Rätsel und Szenenwechsel; dezente Umgebungstöne ab dem Spieleinstieg, mit Lautstärkeregler und Ausschalter. Reduzierte Bewegung wird respektiert.

## Installation und Bedienung

Im Browsermenü „App installieren“ oder „Zum Startbildschirm“ wählen, falls angeboten. In den Einstellungen „Alle Orte offline speichern“ wählen und die Bestätigung abwarten. Am iPhone wird der Startbildschirm über das Teilen-Menü hinzugefügt. Die Offline-HTML-Datei ist eine zusätzliche Desktop-Option; nicht jeder mobile Dateibetrachter führt JavaScript aus. Es handelt sich um eine Web-App, nicht um eine native APK oder App-Store-Veröffentlichung.

E / N wechselt die Figur. 1–4 untersucht Hinweis, Terminal, Datenmodul und Ausgang. Die Leertaste pausiert. Rätsel werden über beschriftete Schaltflächen und Regler bedient. Spielstände sind geräte- und browserspezifisch; für einen Gerätewechsel vorher exportieren.

## Umsetzung und Beitrag

Konzept, Figurenbenennung, Referenzwahl, Gestaltungsvorgaben und gewünschte Spielmechanik: **Natalie Ragulina**. Implementierung, generierte Szenen, Übersetzungen und automatisierte Prüfungen wurden gemeinsam mit KI-Unterstützung ausgearbeitet. Die Auftraggeberin bewertet das spielbare Ergebnis und steuert die Weiterentwicklung. Es werden keine erfundenen kommerziellen Referenzen oder prozentualen Beitragsangaben verwendet.

Die Bildwelt besteht aus generierten Rasterbildern mit interaktiven Markierungen. Es gibt keine frei begehbare 3D-Welt, keine physikalische Robotersimulation und keinen Live-KI-Charakter. Rätsel, Punkte und Fortschritt werden vollständig im Browser berechnet. [Bild- und Schriftangaben](assets/credits.json).

## Lokal prüfen

```sh
npm ci --ignore-scripts
npm run build
npm run check
npm test
```

ES-Module ohne Runtime-Framework, Web Audio, Web App Manifest und ein auf dieses Spiel begrenzter Service Worker. `build.mjs` erzeugt die Offline-Datei und einen Inhalts-Hash für den Cache. `node_modules`, generierte Downloads und Service-Worker-Ausgabe werden nicht eingecheckt. Der gemeinsame Pages-Build kopiert ausschließlich öffentliche Laufzeitdateien.

Die Tests prüfen beide Spielmodi, das vollständige Durchspielen aller sechs Kapitel in allen vier Sprachen über DOM-Interaktionen, Punktelogik, Rollen und Zugangssperren, Speicherung, Import/Export, Pause und Seitenrückkehr, die eigenständige Offline-Datei sowie Cache-Erfolg und -Fehler. DOM- und Service-Worker-Tests ersetzen keine Sichtprüfung in echten Desktop- und Mobilbrowsern. Eine solche Geräteprüfung ist für diese Veröffentlichung noch offen.

## Copyright

**© 2026 Natalie Ragulina. All rights reserved.** [Copyright notice and third-party licenses](LICENSE.md).

