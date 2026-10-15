# AI Request Desk

**Lern- und Portfolio-Projekt von Natalie Ragulina (Netaniya), gemeinsam mit KI-Unterstützung entwickelt.**

![ai-request-desk · Deutsch](../../assets/screenshots/request-desk.png)

[Live-Demo öffnen — ohne Anmeldung](https://ai-request-desk-neta26.wellolm4.chatgpt.site) · [English](README.en.md) · [Русский](README.ru.md)

## In einer Minute ausprobieren

1. Anfrage **DEMO-104** auswählen und analysieren.
2. **179 €** aus der Nachricht mit **149 €** aus dem fiktiven Rechnungsverzeichnis vergleichen.
3. Antwortentwurf bearbeiten, Änderungen speichern und die Prüfung bestätigen.
4. Entwurf freigeben; anschließend Verlauf und gespeicherten Status prüfen.
5. Eine andere Anfrage öffnen, den Analysefehler testen und die Analyse wiederholen.

Die Oberfläche startet auf Deutsch; Englisch, Russisch und Ukrainisch sind ebenfalls verfügbar. Antwortsprache und Oberflächensprache werden unabhängig gewählt.

## Was das Projekt demonstriert

- Validierung und strukturierte Verarbeitung von Anfragen.
- Rechnungsabgleich mit Beträgen in ganzzahligen Euro-Cent; fehlende und mehrdeutige Angaben bleiben offen.
- Neutrale, bearbeitbare Antwortentwürfe und eine verpflichtende menschliche Freigabe.
- Nachvollziehbare Statusübergänge, Aktionsprotokoll und Speicherung im Browser.
- Fehlerbehandlung mit Wiederholung, ohne Verlust der ursprünglichen Anfrage.
- Responsive Oberfläche, sichere Textausgabe und automatisierte Tests.

## Technische Umsetzung

Vanilla JavaScript, HTML und CSS; getrennte Workflow-Logik, versionierte `localStorage`-Daten und Tests mit `node:test`. Keine externen Pakete und kein Build-Schritt erforderlich.

**Aktueller Stand:** Die Live-Demo verwendet ausdrücklich gekennzeichnete deterministische Regeln, kein live verbundenes LLM. Sie zeigt den Prüf- und Freigabeprozess. Es werden keine Nachrichten versendet, Rechnungen geändert oder Erstattungen ausgelöst. Die Daten sind fiktiv und bleiben auf dem jeweiligen Gerät. Das lokale Protokoll ist kein manipulationssicherer oder authentifizierter Nachweis.

Dies ist ein eigenständiges Lernprojekt, keine kommerzielle Kundenreferenz. React/TypeScript, FastAPI, n8n und Live-LLM-Anbindung sind nicht Teil dieser veröffentlichten Version.

## Mein Beitrag und KI-Unterstützung

Ich habe das Projektziel festgelegt, acht Ablaufregeln geprüft und bestätigt, die vier Sprachen und die Lernprojekt-Kennzeichnung verlangt und die Oberfläche auf dem Smartphone geprüft. Ich habe den Kernablauf einschließlich Entwurfsänderung, Freigabe und Speicherung getestet und konkrete Layout-Korrekturen veranlasst. Der KI-Assistent hat Code, Tests und Dokumentation im Rahmen unserer gemeinsamen Entwicklung umgesetzt.

## Lokal starten und prüfen

Aus dem Ordner `portfolio/ai-request-desk`:

```sh
python3 -m http.server 8080 --directory dist
# http://localhost:8080
node --test test-engine.cjs test-ui.cjs
```

**17 lokale automatische Prüfungen bestanden:** Vergleich, Freigabesperre, Fehler/Wiederholung, Sprachwechsel, Speicherung, veraltete Daten und DOM-Interaktionen. DOM-Prüfungen verwenden ein Test-Double und ersetzen keine vollständige Browser-Prüfung. Die Eigentümerprüfung des Kernablaufs wurde auf einem Smartphone durchgeführt.

© 2026 Natalie Ragulina (Netaniya)
