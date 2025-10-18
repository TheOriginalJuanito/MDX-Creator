# Docusaurus Notes

## Repository

- [Bitbucket: docker-base-docusaurus](https://bitbucket.org/gammetermedia/docker-base-docusaurus/src)

## Documentation

- [Docusaurus Main Site](https://docusaurus.io/)
- [Deployment to GitHub Pages](https://docusaurus.io/docs/deployment#deploying-to-github-pages)

## Showcase

- **SAC-Bernina CD-Manual:**
  [CD-sac-bernina.ch/cd-manual/logo](https://gammeter-media.github.io/CD-sac-bernina.ch/cd-manual/logo)

## Use Cases

- Wiki
- CD-Manual
- Handbuch

## Vorteile

- **Hosting:**
OpenSource inkl. Hosting auf GitHub » Kunde könnte selber Hand anlegen
Kann auch selbst gehostet werden (Kompilierung in Pipeline und Deployment auf eigenen Server)

----------

## Aufbau

### Ordnerstruktur
- `docs/` Homepage "enthält `index.mdx`"
 - `Manuals/` hier liegt der Content der Seiten
 - `Static/` hier liegt der statische Content (z.B. Bilder, JS, Dokumente...)
 - `src/` hier liegen alle Dateien die verarbeitet werden (z.B. CSS, Komponenten...)


### Dateien
- `docusaurus.config.js` Konfigurationsdatei für die Seite

----------

## Components

Components sind React Komponenten, die in den MDX Dateien verwendet werden können. Um eigene Components zu erstellen, kann der
`make new-component` Befehl verwendet werden.

https://react.dev/reference/react/Component


Alle Components die von Docusaurus kommen können mit `Swizzling` extrahiert werden.

Um alle Components zu sehen, kann der `make Swizzle-list` Befehl verwendet werden.
und um eine Component zu extrahieren, kann der `make Swizzle` Befehl verwendet werden.

Die extrahierten Components werden in den `src/theme/` Ordner gelegt.

----------

## Updaten von Docusaurus
Um die aktuelle Version von Docusaurus zu sehen können sie `make docusaurus-version` verwenden.

Vor dem Updaten von Docusaurus, wird das Löschen des `node_modules` Ordners empfohlen.
Das Updaten kann mit dem `make update-docusaurus` Befehl durchgeführt werden.
----------
