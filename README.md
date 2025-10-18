# Kickstart a new Docusaurus-Project

* prepare a new git-repository

* clone this `docker-base-repository`
    ```bash
    git clone <git_url>
    cd <directory>
    rm -rf .git
    git init
    git add .
    git commit -m "init"
    git remote add origin <remote repository URL>
    git push origin develop -u --force
    ```

* search and replace all `example` to your project-name (eg. `engadinerpost`)
    * in `docker-compose.override.yml`

* remove dummy-content
    * `docs/*`, `blog/*`, `src/pages/*`

* Remove the lines above and fill in some project-description below

* commit and push your work



## how to deploy to github pages

* On GitHub create a new Repository (https://docusaurus.io/docs/deployment#deploying-to-github-pages )
    * Ex "gammetermedia.github.io"
* Go in new Repository
    * Settings
    * Pages
    * Build and Deployment -> Source GitHub Actions
* `git remote set-url origin <<insert new repository>>`


# Project name
{Project description}


## get up and running on a new machine
```bash
make start
make full-init
```

### New Versions


Create New Version of Home Doc
```bash
docker exec -it website_manuals_docusaurus npm run docusaurus docs: version(Name of the New Version)
```

Create Nev Version of Other areas

```bash
docker exec -it website_manuals_docusaurus npm run docusaurus docs:version:(Area of the New Version)(Name of the New Version)
docker exec -it website_manuals_docusaurus npm run docusaurus docs:version:typo3 1.0
```

---
## problems with Bootstrap-Grid ore Masonry-Layout ?
    docker exec example_docusaurus npm install masonry-layout
    docker exec example_docusaurus npm install react-bootstrap bootstrap



---

## Plugins

### multiple doc Files
```bash
docker exec -it website_manuals_docusaurus npm install --save @docusaurus/plugin-content-docs
```

---

## Create New Component

```bash
make new-Component
```

----------
### Marker-Creator
[Marker-Creator](http://localhost/dev/Marker-Creator/)

