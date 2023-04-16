const fs = require('fs');
const path = require('path');

// Get list of modules
const modulesFile = path.join(__dirname, '../modules.json');
const modules = JSON.parse(fs.readFileSync(modulesFile));


let moduleVolume = '';
let modulePort = '';
let linkApp = '';
let isolatedService = '';
const escapeNumber = 6;

for (const module of modules) {
  const tempModuleVolume = `- ./integration/nginx/${module.name}.conf:/etc/nginx/conf.d/${module.name}.conf \n`;
  moduleVolume += ' '.repeat(escapeNumber) + tempModuleVolume;
  if(module.port){
    const tempModulePort = `- "${module.port}:${module.port}" \n`;
    modulePort += ' '.repeat(escapeNumber) + tempModulePort;
  }

  if(module.isolated){
    linkApp += ' '.repeat(escapeNumber) + `- ${module.name} \n`;
    isolatedService += `  
  ${module.name}:
    build:
      context: ./modules/${module.folderName}
      dockerfile: ./Dockerfile-${module.name}
    environment:
      - ENV=PRODUCTION
      # Ajouter la possiblité de passer des variables d'environnement
    ports:
      - "${module.port}:${module.port}"
    `;
  }
}

const dockerComposeContent = `
version: '3.1'

services:
  reverse-proxy:
    image: nginx:latest
    container_name: reverse-proxy
    volumes:
      - ./integration/nginx/core.conf:/etc/nginx/conf.d/core.conf
      - ./integration/nginx/proxy.conf:/etc/nginx/conf.d/proxy.conf
      - ./integration/nginx/html:/var/www/html
      # je dois créer une conf nginx pour chaque module
${moduleVolume}
    ports:
      - "80:80"
      - "443:443"
${modulePort}
    links:
      - app
${linkApp}
      
      # - arcana_fastify
      # - mon_premier_module
  # donner la possibilite dans le script de création d'injecter des variables d'environnement
  # TODO: pour chaque module qui sera ajouté séparement il faudra lui générer un dockerfile spécifique
  app:
    build:
      context: ./
      dockerfile: ./Dockerfile
    environment:
     - ENV=PRODUCTION
${isolatedService}
`;

// Write Docker compose file
fs.writeFileSync(path.join(__dirname, '../docker-compose.yml'), dockerComposeContent);

console.log('Docker compose generated successfully');
