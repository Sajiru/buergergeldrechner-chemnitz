Hierbei handelt es sich um ein Projekt im Rahmen der [Smart City Challange](https://digitalcampus.leipzig.de/sccl-2024/) Leipzig 2024 zum Themen ["Bürgergeldrechner+ - Dein individueller Anspruchsrechner"](https://digitalcampus.leipzig.de/sccl-wettbewerbsbedingungen-2024/buergergeldrechner-dein-individueller-anspruchsrechner/).

## Anforderungen

> Wie gelingt es, mit wenigen Eingaben einen möglichst genauen Anspruch auf Bürgergeld zu berechnen und damit Orientierung für Grundsicherungssuchende zu schaffen ?

### Fachliche Anforderungen

- Das angestrebte Webtool soll anhand eines Webformulars die Prüfung des Anspruches mit möglichst genauen Näherungswerten erreichen
- Inhaltlich sind die Fragen in verschiedene, optisch erkennbare Kategorien unterteilt, welche intuitiv bzw. anhand von allgemeinen Angaben befüllt werden können.
- Sobald man in das nächste Eingabefeld wechselt, werden in einfacher Sprache Hinweise zur Angabe angezeigt.
- Eine Erklärung zu Datenschutz und -sicherheit ist dennoch ratsam, um die Nutzer:innen aufzuklären.
- Neben dem Ergebnis werden entsprechende Verlinkungen und Webseiten zur weiteren Antragstellung angezeigt, ebenso ist die Einbindung von Flyern und Informationsmaterial möglich.
- Letztendlich soll nicht nur das Ergebnis der Berechnung, sondern eine kurze Schritt-für-Schritt Anleitung zur Antragstellung erkennbar sein.
- Das Ergebnis soll Client-seitig temporär gespeichert werden, um die Möglichkeit zu bieten, die Berechnung zu speichern und später fortzusetzen.\*
- Es gibt einen Fortschrittsbalken, der anzeigt, wie viele Fragen noch zu beantworten sind.\*
- Es gibt eine Art Outline, die anzeigt in welchem Pfad des Entscheidungsbaum man sich gerade befindet.\*
- Sollte gängie Accessability-Standards erfüllen.\*

### Technische Anforderungen

- Das Webtool soll später über die Website bspw. des Jobcenters Leipzig oder der Stadt Leipzig zugänglich sein.
- Technisch werden die Eingaben durch Javascript-Funktionen verarbeitet und direkt im Webbrowser das Ergebnis errechnet.
- Dabei kommt es an keiner Stelle zur Speicherung der Daten, es wird keine Schnittstelle zu einer Datenbank benötigt, da die Formulareingaben direkt im Formular genutzt werden.
- Die Anwendung soll auf allen gängigen Endgeräten (Desktop, Tablet, Smartphone) funktionieren. \*

## ToDos

- [ ] Ergebnisansicht
- [ ] Form-Validation pro Step
- [ ] Optisch erkennbare Kategorien
- [ ] Hinweise zur Angabe (Tooltips)
- [ ] Clientseitig speichern
- [ ] Accessability-Standards
- [ ] Automatisches Akzeptieren von Eingaben (vgl. Typeform)

## Architektur

Der Bürgergeldanspruch richtet sich maßgeblich nach der Bedarfsgemeinschaft, deren Eigenschaften sowie Einkommen und Ausgaben. Daher wird im ersten Teil des Rechners die Bedarfsgemeinschaft beschrieben. Das Ergebnis ist beispielsweise folgendes Objekt:

Alleinstehende Person

```json
// community
[
  {
    "name": "Antragsteller",
    "type": "adult",
    "isPregnant": false
  }
]
```

Person mit Partner und Kind

```json
// community
[
  {
    "name": "Antragsteller",
    "type": "adult",
    "isPregnant": false
  },
  {
    "name": "Partner",
    "type": "adult",
    "isPregnant": false
  },
  {
    "name": "Kind 1",
    "type": "child",
    "isPregnant": false,
    "age": "0-3"
  }
]
```

Aus der Beschreibung der Bedarfsgemeinschaft ergibt sich der Regelbedarf. Anschließend wird nach den Ausgaben gefragt:

- Kaltmiete
- Nebenkosten
- Heizkosten

Aus der Summe der Ausgaben und der Regelbedarfe ergibt sich der Gesamtbedarf der Bedarfsgemeinschaft.

Anschließend wird das Haushaltseinkommen erfasst.

Um die höhe Freibeträge zu ermitteln wird das Bruttogehalt benötigt. Einige der Freibetragsgrenzen sind:

- 100 - 520 -> 20%
- 520 - 1000 -> 30%
- 1000 - 1200 -> 10%

Zusätzlich gibt es immer einen Freibetrag von 100euro. Beispielrechnung

```
Bruttoeinkommen     165
Grund-Freibetrag    -100
Freibetrag (20%)    -13
Nettoeinkommen      165
Freibetrag-Summe    -113
Resteinkommen       52
```

Resteinkommen ist das "zu berücksichtigendes Einkommen". Der Bürgergeldbedarf wird um diesen Betrag verringert.

## Einkommensarten und deren Freibeträge

Unterschiedliche Einkommensarten haben unterschiedliche Freibeträge. Hinzukommt, dass manche Einkommensarten Freibeträge haben dir nur einmalig angewendet werden können.

| Einkommensart                                              | Freibetrag                                                                                                                               | Einmalig anwendbar        |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| Jede Einkommensart                                         | Nur volljährige Mitlgieder (auch Kindergeld). Bei Einkommen aus Erwebstätigkeit und Selbständigkeit ist dieser Betrag bereits inkludiert | Nein                      |
| Einkommen aus Erwerbstätigkeit                             | Nur Personen die mind. 15 Jahre (erwebsfähig) sind. Tbd: Regelwerk verlink.                                                              | Nein                      |
| \*Einkommen aus Erwerbstätigkeit (Azubi, Student, Schüler) | Nur Personen die max. 25 Jahre sind. Tbd: Regelwerk verlink.                                                                             | Nein                      |
| Einkommen aus Selbstständigkeit                            | Nur Personen die mind. 15 Jahre (erwebsfähig sind). Tbd: Regelwerk verlink.                                                              | Nein                      |
| Elterngeld                                                 | Wird durch Elterngeldstelle festgelegt, Maximum: Elterngeld: 300,00€, Elterngeld Plus: 150,00€                                           | Nein                      |
| BAföG                                                      | 100,00€ Grundabsetzungsbetrag                                                                                                            | Ja, Grundabsetzungsbetrag |
| BAB                                                        | 100,00€ Grundabsetzungsbetrag                                                                                                            | Ja, Grundabsetzungsbetrag |
| Freiwilligendienst, sozialem/ökologischen Jahr             | 556,00€, Person darf maximal 25Jahre alt sein.                                                                                           | Nein                      |
| Unterhaltsbeitrag aus Meisterbafög                         | 100,00€ Grundabsetzungsbetrag                                                                                                            | Ja, Grundabsetzungsbetrag |
| Kurzarbeitergeld                                           | Vgl. Einkommen aus Erwerbstätigkeit. Nur Personen die mind. 15 Jahre (erwebsfähig) sind. Tbd: Regelwerk verlink.                         | Nein                      |
