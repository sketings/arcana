const fs = require('fs');
const path = require('path');

// Get list of modules
const modulesFile = path.join(__dirname, '../modules.json');
const modules = JSON.parse(fs.readFileSync(modulesFile));

let moduleToCopy = '';
let modulePackageJsonToCopy = '';
let commandToRun = '';
for (const module of modules) {
  moduleToCopy += `COPY ./modules/${module.folderName} /app/modules/${module.folderName}\n`;
  modulePackageJsonToCopy += `COPY ./modules/${module.folderName}/package.json  /app/dist/modules/${module.folderName}/\n`;
  commandToRun += `RUN yarn --cwd /app/dist/modules/${module.folderName} install --pure-lockfile --production=true \n`;
}

// Generate Dockerfile content
const dockerfileContent = `
# Build construction
FROM node:16-alpine AS builder
WORKDIR /app

# Set environment variables
ENV ENV PRODUCTION

# Install dependencies
COPY package.json yarn.lock ./
COPY . .
RUN yarn --cwd /app/dist install --pure-lockfile\n

# Copy modules
${moduleToCopy}

# Transpile TypeScript en JavaScript
RUN yarn build

# Install dependencies
COPY package.json yarn.lock ./dist/
RUN yarn --cwd /app/dist install --pure-lockfile --production=true \n

# Copy package.json for each module
${modulePackageJsonToCopy}

# Install dependencies
${commandToRun}

CMD ["node", "dist/src/app.js"]
# CMD sleep infinity

`;

// Write Dockerfile
fs.writeFileSync(path.join(__dirname, '../Dockerfile'), dockerfileContent);

console.log('Dockerfile generated successfully');
