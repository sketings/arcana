const fs = require('fs');
const path = require('path');

// Get list of modules
const modulesFile = path.join(__dirname, '../modules.json');
const modules = JSON.parse(fs.readFileSync(modulesFile));

// TODO: here
// Réflection a avoir:
// - si le module est isolé, on utilise le nom du module comme nom de domaine ou pas (ex: api.app.arcana)
// ou on laisse tout sur le même domaine (ex: app.arcana) et on change le port
// De plus il faudrait donner la possiblité de customiser l'url de l'api sur tout pour le cas de la production
for (const module of modules) {
  let test = '';
  if (module.isolated) {
    test = `http://${module.name}:${module.port ?? 80}}`;
  } else {
    test = `http://app:${module.port ?? 80}}`;
  }

  if(!module.port){
    console.log(`
    The module '${module.name}' doesn't have a port. 
    We will use the default port 80. 
    If you want to change it, please add a port property in the module.json file.
    It can cause problems if you have multiple modules without port.
    `);
  }

 const nginxModuleConfig = `
 server {
    listen ${module.port ?? 80};
    # mettre le nom de domaine d'api'
    server_name app.arcana www.app.arcana;
    location / {
        proxy_pass 
    }
}
`; 

  fs.writeFileSync(path.join(__dirname, `../integration/nginx/modules/${module.name}.conf`), nginxModuleConfig);
  console.log(`Nginx config for ${module.name} generated`);
}

