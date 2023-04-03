const modules = require('./modules.json');

const services = {};

modules.forEach((module) => {
  services[module.name] = {
    image: module.dockerImage,
    ports: [`${module.port}:${module.port}`],
    // autres options pour chaque module
  };
});

const composeFile = {
  version: '3',
  services,
  // autres options pour le fichier docker-compose.yml
};

console.log(JSON.stringify(composeFile, null, 2)); 