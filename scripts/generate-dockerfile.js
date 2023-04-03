const fs = require('fs');
const path = require('path');

// Get list of modules
const modulesFile = path.join(__dirname, '../modules.json');
const modules = JSON.parse(fs.readFileSync(modulesFile));

let copyLines = '';
for (const module of modules) {
  copyLines += `COPY ${module.path} /app/${module.name}\n`;
}

// Generate Dockerfile content
const dockerfileContent = `
# Étape de construction
FROM node:16-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --production

${copyLines}

COPY . .

# Transpile TypeScript en JavaScript
RUN npm run build

# Étape de production
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/src/app.js"]
`;

// Write Dockerfile
fs.writeFileSync(path.join(__dirname, '../Dockerfile'), dockerfileContent);

console.log('Dockerfile generated successfully');
