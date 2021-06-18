<p align="center">
  <img src="https://see.fontimg.com/api/renderfont4/owgBd/eyJyIjoiZnMiLCJoIjoyMDAsInciOjEwMDAsImZzIjoyMDAsImZnYyI6IiNGRjEwODciLCJiZ2MiOiIjRkZGRkZGIiwidCI6MX0/Q3Vqbw/roadrage.png"/>
<p>

<p align="center">
  <img src="https://img.shields.io/website?down_color=red&down_message=Down&up_color=green&up_message=Up&url=https%3A%2F%2Fdanielclarke.tech"/>
  <img src="https://img.shields.io/mozilla-observatory/grade/danielclarke.tech?publish"/>
  <img src="https://img.shields.io/github/commit-activity/w/DanielWilliamClarke/Cujo"/>
  <img src="https://img.shields.io/github/last-commit/DanielWilliamClarke/Cujo"/>
  <img src="https://img.shields.io/github/languages/count/DanielWilliamClarke/Cujo"/>
<p>

<p align="center">
  A CV/Portfolio/Blog built in <b>TypeScript</b> using <b>React</b>. with a backend written in <b>Rust</b> using <b>Wordpress</b> for blogging and content.  
<p/>

<p align="center">
 <img src="./portfolio/src/assets/p2_tess.gif"/>
<p/>

---

- [Dependencies](#dependencies)
- [Build Portfolio Locally](#build-portfolio-locally)
- [Build Service Locally](#build-service-locally)
- [Build Portfolio Image](#build-portfolio-image)
- [Build Service Image](#build-service-image)
- [Prod Environment](#prod-environment)
- [Deploy](#deploy)
- [Redeploy](#redeploy)
- [Teardown](#teardown)
- [// Todo](#-todo)
- [// Done](#-done)
  - [Visualisations](#visualisations)
- [Urls](#urls)
- [Resources](#resources)
- [Wordpress plugins](#wordpress-plugins)

---

## Dependencies

- Node
- NPM
- Rust [`Rustup`, `Rustc`, `Cargo`]
- Docker

## Build Portfolio Locally

```bash
# Portfolio
cd portfolio

# Install Dependencies
npm install

# Build portfolio
npm run build

# Run Locally
npm run start
```

## Build Service Locally

```bash
# Service
cd service

# Once only
rustup default nightly

# Build Service
cargo build [--release]

# Run Service locally 
cargo run [--release]

# Test Service 
cargo test [--release]
```

## Build Portfolio Image

```bash
export DOCKER_HUB_USER_REGISTRY=xyz

# With script
./scripts/build-portfolio.sh $DOCKER_HUB_USER_REGISTRY cujo-portfolio

# OR

# Build with Docker: Dev
docker build -f portfolio/Dockerfile -t $DOCKER_HUB_USER_REGISTRY/cujo-portfolio:latest ./portfolio
# Build with Docker: Prod
docker build -f portfolio/Dockerfile -t $DOCKER_HUB_USER_REGISTRY/cujo-portfolio:latest --build-arg BUILD_MODE=":prod" ./portfolio
# Push image
docker push $DOCKER_HUB_USER_REGISTRY/cujo-portfolio:latest
```

## Build Service Image

```bash
export DOCKER_HUB_USER_REGISTRY=xyz

# With script
./scripts/build-service.sh $DOCKER_HUB_USER_REGISTRY cujo-rust

# OR

# Build with Docker
docker build -f service/Dockerfile -t $DOCKER_HUB_USER_REGISTRY/cujo-rust:latest ./service
# Push image
docker push $DOCKER_HUB_USER_REGISTRY/cujo-rust:latest
```

## Prod Environment

For prod deployment an env file is required with  the following parameters specified

```conf
WORDPRESS_DB_PASSWORD=wp_password
MYSQL_ROOT_PASSWORD=sql_password
DOMAIN=localhost
WORDPRESS_DB_NAME=db_name
WORDPRESS_USER_NAME=wp_uiser
WORDPRESS_CLIENT_ID=client_id
WORDPRESS_CLIENT_SECRET=client_secret
```

## Deploy

```bash
# Run with sudo where necessary

# With script
./script/deploy.sh dev(or prod)

# Or ...

# Deploy: Dev
docker-compose -f dev.compose.yaml up

# Deploy: Prod
docker-compose --env-file <SECRET ENV FILE> -f prod.compose.yaml up
```

## Redeploy

```bash
# Run with sudo where necessary

# With script
./scripts/redeploy.sh <DOCKER IMAGE NAME> <CONTAINER NAME> <dev or prod>
```

## Teardown

```bash
# Run with sudo where necessary

# With script
./scripts/teardown dev(or prod) (-v) # to delete volumes

# Or ...

# Teardown: Dev
docker-compose -f dev.compose.yaml down (-v)

# Teardown: Prod
docker-compose --env-file <SECRET ENV FILE> -f prod.compose.yaml down (-v)
```

## // Todo

- [ ] Create Circle CI build pipeline
- [ ] Add Rust code coverage
- [ ] Write front end tests
- [ ] Restyle experience and education so they resemble a timeline
- [ ] Get own logo and assets from designer
- [ ] Write blog

## // Done

- [x] Optimize images (sizes, file encodings - <https://developers.google.com/speed/pagespeed/insights/>)
- [x] Add authentication to wordpress rest api
- [x] Write backend tests
- [x] Get backend service working in prod
- [x] Document backend build and deployment
- [x] Put Blog data access and collation in backend service
- [x] Swap backstretch with a 2d/3d webgl canvas visualistion?
- [x] Swap out static file with Rustlang backend service?
- [x] Formalise colour palette
- [x] Setup SSL correctly.. (ssl-companion is running, it will assign certificates when the window opens again)
- [x] Fix predator/prey image asset
- [x] Finish contact page
- [x] Add site footer
- [x] Proof read profile
- [x] Add asset citations (now using my own images or free stock images only)
- [x] Produce production build for deployment
- [x] Move sharing bar to bottom on mobile devices
- [x] Add jenkins machine to deployment to CI/CD

### Visualisations

- [x] 3D Box wave
- [x] Waves
- [x] Hexagons
- [x] Phylotaxis
- [x] 4D tesseract projection?

## Urls

- <https://danielclarke.tech> - Portfolio
- <https://blog.danielclarke.tech>/... - Wordpress - [Homepage redirects to Portfolio]

##  Resources

- Coding Train - `P5JS` <https://thecodingtrain.com/>
- Lets Get Rusty - `Rust` <https://www.youtube.com/channel/UCSp-OaMpsO8K0KkOqyBl7_w>
- Rust Rest API - `Rust` <https://cloudmaker.dev/how-to-create-a-rest-api-in-rust/>
- Fix Reqwest in Linux - `Rust` <https://stackoverflow.com/questions/52238397/why-does-reqwest-require-an-openssl-installation#52238675>
- Hosting websites using Nginx - `Nginx` <https://blog.harveydelaney.com/hosting-websites-using-docker-nginx/>
- Add Sudoers - `Linux` <https://linuxize.com/post/how-to-add-user-to-sudoers-in-ubuntu/>

## Wordpress plugins

- Simple Website Redirect - <https://wordpress.org/plugins/simple-website-redirect/>
- Disable Comments - <https://wordpress.org/plugins/disable-comments/>
- Syntax-highlighting Code Block (with Server-side Rendering) - <https://en-gb.wordpress.org/plugins/syntax-highlighting-code-block/>
- Reading time - <https://wordpress.org/plugins/reading-time-wp/>
