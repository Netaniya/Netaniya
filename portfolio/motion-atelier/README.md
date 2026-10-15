# Motion Atelier

**Mehrseitiges Automotive-Lernprojekt von Natalie Ragulina (Netaniya).**

[Live-Demo](https://netaniya.github.io/Netaniya/motion-atelier) · [English](README.en.md)

Eine interaktive Fahrzeugkollektion mit echten Fotografien von Tesla Model S, Model Y und Cybertruck, selbst gehosteter Manrope-Schrift und sattem Blau. Ein kurzer, überspringbarer Realfilm eines fahrenden Tesla Model S eröffnet die Anwendung. **Zehn echte HTML-Seiten**, deutsche Erstansicht sowie vollständige englische, russische und ukrainische Oberflächen.

## Darstellung

Dunkle Ansicht beim ersten Besuch, jederzeit umschaltbar auf hell. Die Auswahl bleibt im Browser über alle Unterseiten erhalten. Hauptüberschriften sind zentriert, ohne Satzpunkte und bei zweiteiligen Titeln auf getrennten Zeilen ohne führenden Gedankenstrich. Die Fotos werden vollständig in ihren Rahmen eingepasst; die mobile Ansicht stapelt Text und Foto. Das Intro zeigt einen etwa fünfsekündigen, verlangsamten Ausschnitt echter Fahrfilmaufnahmen. Es startet bei jedem neuen Aufruf der Startseite; ein Replay ist direkt im Hauptbereich verfügbar. Mobile Größenänderungen schließen es nicht mehr vorzeitig. Der Film läuft inline. Die Begleitmusik wird automatisch beim Filmstart versucht und kann ausgeschaltet werden. Blockiert der Browser den Ton, bleibt der Film nutzbar und die Taste bietet das Einschalten der Musik an; falls Autoplay blockiert wird, erscheint eine Abspieltaste. Bei reduzierter Bewegung wird der Film übersprungen. Manrope wird einschließlich kyrillischer Zeichen lokal ausgeliefert.

## Projektzeile und Karte

Oben auf jeder Seite und im Intro: **Natalie (Netaniya) Ragulina** sowie Datum und Uhrzeit in **Europe/Berlin**. Die Uhr aktualisiert sich ohne Neurendern der Seite und berücksichtigt Sommer-/Winterzeit.

Nach einer Routenberechnung lädt die Anwendung lokal bereitgestelltes **Leaflet 1.9.4** und zeigt die validierte OSRM-Geometrie auf OpenStreetMap-Kacheln. Start und Ziel sind markiert; Zoom und Gesamtstreckenansicht sind verfügbar. Grobe Schätzungen bleiben gestrichelt und ausdrücklich als solche bezeichnet. Bei Bibliotheks- oder Kachelausfall bleibt eine gekennzeichnete schematische Strecke mit Wiederholoption sichtbar. Keine Geolokalisierung und keine angeblich realen Ladestationen. Kartenanfragen gehen nach der Berechnung direkt vom Browser an OpenStreetMap; keine Vorab- oder Offline-Kachelpakete.

## Bewegung und Bedienung

- Sanfte Seitenübergänge mit Cross-Document View Transitions, wo unterstützt; kurze Ausblendung als Fallback. Kein SPA-Routing und keine künstlichen Ladebildschirme.
- Überschriften, Texte und Fotos erscheinen beim Scrollen einmal; bereits sichtbare Inhalte bleiben bei Sprach- und Formularänderungen sichtbar.
- Das mobile Menü öffnet sich ohne Neurendern der Seite, mit `aria-expanded`, Fokussteuerung und inaktiven Links im geschlossenen Zustand.
- Sichtbar markierte Fahrzeugauswahl und eine schwebende Vergleichsleiste; die Auswahl bleibt im Browser erhalten.
- Letzte Konfiguration, Reset und klare Speicherbestätigung; explizite Konfigurationslinks haben Vorrang vor gespeicherten Einstellungen.
- Alle Bewegungen respektieren reduzierte Bewegung. Ohne IntersectionObserver bleiben sämtliche Inhalte sichtbar.

## Funktionen

- Drei reale Fahrzeugmodelle auf echten Fotos und einzelne Modellseiten. Technische Zahlen und Preise sind ausdrücklich illustrative Testdaten.
- Katalog mit Filter, Sortierung, gespeichertem Auswahlzustand und direktem Modellvergleich.
- Fahrzeugfinder mit transparenten Auswahlregeln für Budget, Sitzplätze und Priorität; unerfüllbare Anforderungen werden benannt.
- Konfigurator mit Lackierung, Rädern, Interieur, Preisaufschlüsselung und angepasster Modellreichweite. Die gewählte Lackfarbe wird im Konfigurator und in der Garage visualisiert. Aus den Originalfotos mit KI-Unterstützung abgeleitete Freisteller und ein Browser-Farbshader erhalten Licht, Form und geschützte Glasbereiche; die Bildschirmfarben sind Näherungen. Räder und Interieur erscheinen in der Zusammenfassung.
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

**67 automatische Prüfungen bestanden.** Automatische Tests prüfen Konfigurationskombinationen, Preise in Eurocent, Energieerhaltung und Ladegrenzen, Eingabevalidierung, vier Sprachen, Speicherung, UI-Aktionen und Fehler-/Wettlaufszenarien. DOM-Tests ersetzen keine visuelle Browserprüfung. Eine abschließende mobile und Desktop-Sichtprüfung der veröffentlichten Version steht noch aus.

## Quellen und Zusammenarbeit

- Karte: [Leaflet](https://leafletjs.com/) 1.9.4, [BSD-2-Clause](dist/assets/vendor/leaflet/LICENSE), lokal bereitgestellt und mit den offiziellen SRI-Prüfsummen abgeglichen. Kacheln von [OpenStreetMap](https://www.openstreetmap.org/copyright), [Nutzungsregeln](https://operations.osmfoundation.org/policies/tiles/); Best-Effort-Dienst ohne zugesagtes SLA.
- Routen: [OSRM](https://project-osrm.org/), [API-Dokumentation](https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md), [Nutzungsregeln](https://github.com/Project-OSRM/osrm-backend/wiki/Api-usage-policy).
- Kartendaten: [© OpenStreetMap contributors, ODbL](https://www.openstreetmap.org/copyright). Die lokale Grafik zeigt eine schematische Koordinatenspur; der Link öffnet eine echte Karte beim Anbieter.
- Wetter: [Open-Meteo](https://open-meteo.com/), CC BY 4.0; [API](https://open-meteo.com/en/docs), [kostenlose nichtkommerzielle Nutzung](https://open-meteo.com/en/pricing).
- Fahrzeugfotos: Dllu (Model S), Kevauto (Model Y), Mr.choppers (Cybertruck), über Wikimedia Commons; CC BY-SA 4.0 bzw. 3.0. Straßenfoto: Mirko Fabian, Unsplash-Lizenz. Autoren, Originalseiten und Lizenzen stehen sichtbar auf der [Projektseite](https://netaniya.github.io/Netaniya/motion-atelier/about/) sowie in [photo-credits.json](dist/assets/photo-credits.json). Die Originalfotos wurden nur in Größe und Format angepasst. Für den Konfigurator wurden separate Freisteller und blaue Grundlackierungen mit KI-Unterstützung abgeleitet; die Farbvorschau wird im Browser berechnet. Quellen, Änderungen und Share-Alike-Lizenzen: [paint-preview-credits.json](dist/assets/paint-preview-credits.json).
- Film: [Tesla Loveday: „Energy“](https://commons.wikimedia.org/wiki/File:Tesla_Loveday-_%22Energy%22.webm), Atellani LLC, [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). Ausschnitt 40,6–43,3 s, auf 50 % verlangsamt mit Bildinterpolation, ohne Ton, verkleinert und neu kodiert. Kein Herstellerauftrag oder Sponsoring.
- Musik: [„Dream Culture“](https://www.incompetech.com/music/royalty-free/index.html?isrc=USUAN1300046), Kevin MacLeod (incompetech.com), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Ausschnitt 12,0–17,3 s, reduzierte Lautstärke sowie Ein- und Ausblendung; [vollständige Angaben](dist/assets/intro-music-credits.json). Wird zum Filmstart angefragt; der Browser entscheidet über Ton-Autoplay. Eine Ausschalt- bzw. Einschalt-Taste bleibt sichtbar.
- [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope), Mikhail Sharanda und Mirko Velimirovic, [SIL Open Font License 1.1](dist/assets/fonts/OFL.txt).

Natalie bestimmte Produkt, Mehrsprachigkeit, mehrseitige Struktur, mittige Typografie, blaue Farbwelt und die Idee der fließenden Ankunft. Code und automatische Prüfungen entstanden mit KI-Unterstützung; die Fotografien stammen von den oben genannten Urhebern. Das Projekt stellt nachprüfbare Lernpraxis dar und behauptet keinen kommerziellen Einsatz.

## Autorschaft und öffentliche Dateien

[NOTICE.md](NOTICE.md) dokumentiert die menschliche Produktleitung, KI-Unterstützung und getrennte Medienlizenzen. Dieses Projekt vergibt keine zusätzliche Open-Source-Lizenz. Ein öffentliches Repository und Browsercode können technisch kopiert werden; der Hinweis ist kein technischer Kopierschutz. Im veröffentlichten Anwendungscode sind keine API-Schlüssel oder Zugangsdaten vorgesehen. Die Prüfung häufiger Schlüssel- und Passwortmuster fand keine Treffer; dies ersetzt kein vollständiges Sicherheitsaudit.
