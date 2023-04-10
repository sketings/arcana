const fs = require('fs');
const path = require('path');

// Get list of modules
const modulesFile = path.join(__dirname, '../modules.json');
const modules = JSON.parse(fs.readFileSync(modulesFile));

let copyLines = '';
for (const module of modules) {
  copyLines += `COPY ./modules/${module.folderName} /app/${module.name}\n`;
}

// Generate Dockerfile content
const dockerfileContent = `
# Étape de construction
FROM node:16-alpine AS builder
WORKDIR /app

ENV ENV PRODUCTION

COPY package.json yarn.lock ./
RUN cd /app \
    && yarn install --pure-lockfile

${copyLines}

COPY . .

# Transpile TypeScript en JavaScript
RUN yarn build

# Étape de production
FROM node:16-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production=true
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/src/app.js"]
`;

// Write Dockerfile
fs.writeFileSync(path.join(__dirname, '../Dockerfile'), dockerfileContent);

console.log('Dockerfile generated successfully');
