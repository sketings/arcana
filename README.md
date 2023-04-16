<p align="center">
<img src="https://img.shields.io/github/license/sketings/arcana" />
</p>

## Description

A TypeScript framework for building modular applications. Modules are separated into small applications that can function alone or communicate with each other via a common state. The framework allows developers to add features to their application using as many module as they want

## Docker

```
node .\scripts\generate-nginx-conf.js
node .\scripts\generate-dockerfile.js
node .\scripts\generate-docker-compose.js
docker build -t arcana:dev -f .\Dockerfile .
docker run -p 3000:3000 -e ENV=PRODUCTION arcana:dev
```