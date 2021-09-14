const fs = require('fs');
const path = require('path');


const DATASOURCES = 'datasources';
const SCHEMA = 'Schema.js';
const QUERY = 'Query.js';
const MUTATION = 'Mutation.js';
const requiredFiles = [SCHEMA, QUERY, MUTATION];

module.exports = (args = {}) => {
  const typeDefs = [];
  const resolvers = {};
  const datasources = {};

  let queries = [];
  let mutations = [];

  const modules = fs.readdirSync(__dirname, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const moduleName of modules) {
    const moduleDir = path.join(__dirname, moduleName);
    const files = fs.readdirSync(moduleDir)
      .filter(file => requiredFiles.includes(file));

    if (!files.includes(SCHEMA)) {
      
      continue;
    }

    if (isEmptySchema(moduleDir)) {
     
      continue;
    }

    for (const file of files) {
      const { typeDef, resolver } = require(path.join(moduleDir, file));
      if (typeDef.includes('Mutation')) {
        const { methods, rest } = extractMutation(typeDef);
        if (rest.length) {
          typeDefs.push(rest);
        }
        mutations = mutations.concat(methods);
      } else if (typeDef.includes('Query')) {
        const { methods, rest } = extractQuery(typeDef);
        if (rest.length) {
          typeDefs.push(rest);
        }
        queries = queries.concat(methods);
      } else {
        const typeDefTrim = typeDef
          .split('\n')
          .filter(s => s.trim().length)
          .join('\n');
        typeDefs.push(typeDefTrim);
      }

      for (const field in resolver) {
        if (!resolvers[field]) {
          resolvers[field] = resolver[field];
        } else {
          Object.assign(resolvers[field], resolver[field]);
        }
      }

      
    }

    const datasourcesDir = path.join(moduleDir, DATASOURCES);
    fs.readdirSync(datasourcesDir)
      .filter(file => file.endsWith('-api.js'))
      .forEach(file => {
        const API = require(path.join(datasourcesDir, file));
        if (typeof API !== 'function') return;

        const apiName = `${API.name.charAt(0).toLowerCase()}${API.name.slice(1)}`;
        datasources[apiName] = new API(args);
        
      });

    
  }

  typeDefs.push(mergeQuery(queries));
  typeDefs.push(mergeMutation(mutations));

  return {
    typeDefs,
    resolvers,
    datasources,
  };
};

function extractQuery(typeDef) {
  return extract('Query', typeDef);
}

function extractMutation(typeDef) {
  return extract('Mutation', typeDef);
}

function extract(type, typeDef) {
  const find = `type ${type} {`;
  const length = find.length;
  const fIndex = typeDef.indexOf(find);
  const fIndexLast = typeDef.indexOf(find) + length;
  const lIndex = typeDef.indexOf('}', fIndexLast);

  const methods = typeDef.substring(fIndexLast, lIndex)
    .split('\n')
    .filter(s => s.trim().length);

  const rest = (typeDef.slice(0, fIndex) + typeDef.slice(lIndex + 1))
    .split('\n')
    .filter(s => s.trim().length)
    .join('\n');

  return { methods, rest };
}

function mergeQuery(methods) {
  return merge('Query', methods);
}

function mergeMutation(methods) {
  return merge('Mutation', methods);
}

function merge(type, methods) {
  let lines = [`  type ${type} {`];
  lines = lines.concat(methods);
  lines.push('  }');
  return lines.join('\n');
}

function isEmptySchema(moduleDir) {
  const { typeDef } = require(path.join(moduleDir, SCHEMA));
  const re = /{\s*}/;
  return re.test(typeDef);
}