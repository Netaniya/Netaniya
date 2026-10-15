# Motion Atelier

**Mehrseitiges Automotive-Lernprojekt von Natalie Ragulina (Netaniya).**

[Live-Demo](https://motion-atelier-neta26.wellolm4.chatgpt.site) · [English](README.en.md)

Eine interaktive Fahrzeugkollektion mit echten Fotografien von Tesla Model S, Model Y und Cybertruck, selbst gehosteter Manrope-Schrift und sattem Blau. Ein kurzer, überspringbarer Realfilm eines fahrenden Tesla Model S eröffnet die Anwendung. **Zehn echte HTML-Seiten**, deutsche Erstansicht sowie vollständige englische, russische und ukrainische Oberflächen.

## Darstellung

Dunkle Ansicht beim ersten Besuch, jederzeit umschaltbar auf hell. Die Auswahl bleibt im Browser über alle Unterseiten erhalten. Hauptüberschriften sind zentriert, ohne Satzpunkte und bei zweiteiligen Titeln auf getrennten Zeilen ohne führenden Gedankenstrich. Die Fotos werden vollständig in ihren Rahmen eingepasst; die mobile Ansicht stapelt Text und Foto. Das Intro zeigt einen etwa fünfsekündigen, verlangsamten Ausschnitt echter Fahrfilmaufnahmen. Es startet bei jedem neuen Aufruf der Startseite; ein Replay ist direkt im Hauptbereich verfügbar. Mobile Größenänderungen schließen es nicht mehr vorzeitig. Der Film ist stumm und inline; falls Autoplay blockiert wird, erscheint eine Abspieltaste. Bei reduzierter Bewegung wird der Film übersprungen. Manrope wird einschließlich kyrillischer Zeichen lokal ausgeliefert.

## Funktionen

- Drei reale Fahrzeugmodelle auf echten Fotos und einzelne Modellseiten. Technische Zahlen und Preise sind ausdrücklich illustrative Testdaten.
- Katalog mit Filter, Sortierung und direktem Modellvergleich.
- Fahrzeugfinder mit transparenten Auswahlregeln für Budget, Sitzplätze und Priorität; unerfüllbare Anforderungen werden benannt.
- Konfigurator mit Lackierung, Rädern, Interieur, Preisaufschlüsselung und angepasster Modellreichweite. Lackierung, Räder und Interieur erscheinen in der Auswahl und Preisübersicht; das Originalfoto bleibt unverändert.
- Teilbare Konfigurationslinks, JSON-Export und browserlokale Garage mit Wiederherstellung und Löschbestätigung.
- Reiseplanung zwischen zwölf europäischen Städten: öffentlicher OSRM-Routendienst mit OpenStreetMap-Daten, schematischer Routenverlauf, Energiebedarf, Ladestopps und Kostenrechnung.
- Aktuelle Wetterdaten am Ziel von Open-Meteo, ausschließlich nach Klick. Externe Daten werden validiert; Fehler nicht als Live-Ergebnis ausgegeben.
- Bei Routenausfall ist eine **ausdrücklich gewählte grobe Schätzung** verfügbar: Luftlinie × 1,25, 80 km/h mittlere Geschwindigkeit. Keine Straßenroute.
- Kein Konto, kein Tracking, keine Geolokalisierung, keine Zahlung und kein API-Schlüssel. Externe Dienste erhalten bei Abfrage die ausgewählten Stadtkoordinaten und technisch die Browseranfrage.

## Ehrliche Grenzen

Dies ist ein **Lernprojekt**, kein Fahrzeugangebot. Modellnamen und Fotografien sind real; die technischen Zahlen, Optionen und Preise sind illustrative Testdaten. Reichweite = nutzbare Batterie ÷ Modellverbrauch × 100, keine WLTP-Messung. Keine Verbindung zu Tesla, BMW oder anderen Herstellern.

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

**41 automatische Prüfungen bestanden.** Automatische Tests prüfen Konfigurationskombinationen, Preise in Eurocent, Energieerhaltung und Ladegrenzen, Eingabevalidierung, vier Sprachen, Speicherung, UI-Aktionen und Fehler-/Wettlaufszenarien. DOM-Tests ersetzen keine visuelle Browserprüfung. Eine abschließende mobile und Desktop-Sichtprüfung der veröffentlichten Version steht noch aus.

## Quellen und Zusammenarbeit

- Routen: [OSRM](https://project-osrm.org/), [API-Dokumentation](https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md), [Nutzungsregeln](https://github.com/Project-OSRM/osrm-backend/wiki/Api-usage-policy).
- Kartendaten: [© OpenStreetMap contributors, ODbL](https://www.openstreetmap.org/copyright). Die lokale Grafik zeigt eine schematische Koordinatenspur; der Link öffnet eine echte Karte beim Anbieter.
- Wetter: [Open-Meteo](https://open-meteo.com/), CC BY 4.0; [API](https://open-meteo.com/en/docs), [kostenlose nichtkommerzielle Nutzung](https://open-meteo.com/en/pricing).
- Fahrzeugfotos: Dllu (Model S), Kevauto (Model Y), Mr.choppers (Cybertruck), über Wikimedia Commons; CC BY-SA 4.0 bzw. 3.0. Straßenfoto: Mirko Fabian, Unsplash-Lizenz. Autoren, Originalseiten und Lizenzen stehen sichtbar auf der [Projektseite](https://motion-atelier-neta26.wellolm4.chatgpt.site/about/) sowie in [photo-credits.json](dist/assets/photo-credits.json). Nur Größen- und Formatkonvertierung; keine KI-Bildbearbeitung.
- Film: [Tesla Loveday: „Energy“](https://commons.wikimedia.org/wiki/File:Tesla_Loveday-_%22Energy%22.webm), Atellani LLC, [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). Ausschnitt 40,6–43,3 s, auf 50 % verlangsamt mit Bildinterpolation, ohne Ton, verkleinert und neu kodiert. Kein Herstellerauftrag oder Sponsoring.
- [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope), Mikhail Sharanda und Mirko Velimirovic, [SIL Open Font License 1.1](dist/assets/fonts/OFL.txt).

Natalie bestimmte Produkt, Mehrsprachigkeit, mehrseitige Struktur, mittige Typografie, blaue Farbwelt und die Idee der fließenden Ankunft. Code und automatische Prüfungen entstanden mit KI-Unterstützung; die Fotografien stammen von den oben genannten Urhebern. Das Projekt stellt nachprüfbare Lernpraxis dar und behauptet keinen kommerziellen Einsatz.
