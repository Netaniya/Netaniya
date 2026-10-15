# Motion Atelier

**Mehrseitiges Automotive-Lernprojekt von Natalie Ragulina (Netaniya).**

[Live-Demo](https://motion-atelier-neta26.wellolm4.chatgpt.site) · [English](README.en.md)

Eine eigenständige Fahrzeugkollektion mit großzügiger Typografie, heller Architektur, sattem Blau und einer langsamen, überspringbaren Fahrzeugankunft. **Zehn echte HTML-Seiten**, deutsche Erstansicht sowie vollständige englische, russische und ukrainische Oberflächen.

## Funktionen

- Drei originale, mit KI erzeugte elektrische Konzeptfahrzeuge und einzelne Modellseiten.
- Katalog mit Filter, Sortierung und direktem Modellvergleich.
- Fahrzeugfinder mit transparenten Auswahlregeln für Budget, Sitzplätze und Priorität; unerfüllbare Anforderungen werden benannt.
- Konfigurator mit Lackierung, Rädern, Interieur, Preisaufschlüsselung und angepasster Modellreichweite. Farbvisualisierung ist illustrativ; Räder und Interieur werden im Text zusammengefasst.
- Teilbare Konfigurationslinks, JSON-Export und browserlokale Garage mit Wiederherstellung und Löschbestätigung.
- Reiseplanung zwischen zwölf europäischen Städten: öffentlicher OSRM-Routendienst mit OpenStreetMap-Daten, schematischer Routenverlauf, Energiebedarf, Ladestopps und Kostenrechnung.
- Aktuelle Wetterdaten am Ziel von Open-Meteo, ausschließlich nach Klick. Externe Daten werden validiert; Fehler nicht als Live-Ergebnis ausgegeben.
- Bei Routenausfall ist eine **ausdrücklich gewählte grobe Schätzung** verfügbar: Luftlinie × 1,25, 80 km/h mittlere Geschwindigkeit. Keine Straßenroute.
- Kein Konto, kein Tracking, keine Geolokalisierung, keine Zahlung und kein API-Schlüssel. Externe Dienste erhalten bei Abfrage die ausgewählten Stadtkoordinaten und technisch die Browseranfrage.

## Ehrliche Grenzen

Dies ist ein **Lernprojekt**, kein Fahrzeugangebot. Alle Fahrzeugdaten und Preise sind erfunden. Reichweite = nutzbare Batterie ÷ Modellverbrauch × 100, keine WLTP-Messung. Keine Verbindung zu BMW oder anderen Herstellern.

Die Ladeplanung nimmt konstanten Verbrauch und mittlere Ladeleistung an, lädt bei Bedarf bis höchstens 80 % und hält die gewählte Reserve ein. Tatsächliche Ladesäulen, deren Verfügbarkeit, Ladekurven, Wettereffekte auf Verbrauch und Verkehrslage sind nicht eingebunden. Die Wetteranzeige ist eine gesonderte Information, kein Eingangsparameter des Energieverbrauchs.

Der Finder verwendet Regeln; ein Live-LLM ist nicht angeschlossen. Open-Meteo wird in der kostenlosen, nichtkommerziellen API-Variante verwendet. Öffentliche Dienste haben kein zugesagtes SLA. Bei kommerziellem Betrieb müssen deren Nutzungsbedingungen und Infrastruktur neu geprüft werden.

## Technik und Prüfung

Buildless **HTML, CSS und JavaScript-ES-Module**. Keine Laufzeitbibliothek. `linkedom` ist ausschließlich eine Entwicklungsabhängigkeit für DOM-Tests.

```sh
npm ci
npm run build
npm run check
npm test
```

Statisch `dist/` bereitstellen. Alle Unterseiten besitzen eigene HTML-Dokumente. Für lokale manuelle Prüfung kann ein beliebiger statischer Webserver verwendet werden.

**30 automatische Prüfungen bestanden.** Automatische Tests prüfen Konfigurationskombinationen, Preise in Eurocent, Energieerhaltung und Ladegrenzen, Eingabevalidierung, vier Sprachen, Speicherung, UI-Aktionen und Fehler-/Wettlaufszenarien. DOM-Tests ersetzen keine visuelle Browserprüfung. Eine abschließende mobile und Desktop-Sichtprüfung der veröffentlichten Version steht noch aus.

## Quellen und Zusammenarbeit

- Routen: [OSRM](https://project-osrm.org/), [API-Dokumentation](https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md), [Nutzungsregeln](https://github.com/Project-OSRM/osrm-backend/wiki/Api-usage-policy).
- Kartendaten: [© OpenStreetMap contributors, ODbL](https://www.openstreetmap.org/copyright). Die lokale Grafik zeigt eine schematische Koordinatenspur; der Link öffnet eine echte Karte beim Anbieter.
- Wetter: [Open-Meteo](https://open-meteo.com/), CC BY 4.0; [API](https://open-meteo.com/en/docs), [kostenlose nichtkommerzielle Nutzung](https://open-meteo.com/en/pricing).
- Die Bilder wurden mit ImageGen erstellt; keine Herstellerfotos oder Markenlogos.

Natalie bestimmte Produkt, Mehrsprachigkeit, mehrseitige Struktur, mittige Typografie, blaue Farbwelt und die Idee der fließenden Ankunft. Code, Bilder und automatische Prüfungen entstanden mit KI-Unterstützung. Das Projekt stellt nachprüfbare Lernpraxis dar und behauptet keinen kommerziellen Einsatz.
