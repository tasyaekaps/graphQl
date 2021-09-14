const fs = require('fs');
const path = require('path');

const UserMutation = require('./user/Mutation.js');
const ProductMutation = require('./product/Mutation.js');
const TransactionMutation = require('./transaction/Mutation.js');

const UserQuery = require('./user/Query.js');
const ProductQuery = require('./product/Query.js');
const TransactionQuery = require('./transaction/Query.js');

const UserSchema = require('./user/Schema.js');
const ProductSchema = require('./product/Schema.js');
const TransactionSchema = require('./transaction/Schema.js');

const DATASOURCES = 'datasources';
const SCHEMA = 'Schema.js';
const QUERY = 'Query.js';
const MUTATION = 'Mutation.js';

const requiredFiles = [SCHEMA, QUERY, MUTATION];

module.exports = models => {
  const typeDefs = [
    UserMutation.typeDefs,
    ProductMutation.typeDefs,
    TransactionMutation.typeDefs
    UserQuery.typeDefs,
    ProductQuery.typeDefs,
    TransactionQuery.typeDefs,
    UserSchema.typeDefs,
    ProductSchema.typeDefs,
    TransactionSchema.typeDefs
  ];
  
  const resolvers = {
    Mutation: {
      ...UserMutation.resolvers.Mutation,
      ...ProductMutation.resolvers.Mutation,
      ...TransactionMutation.resolvers.Mutation
    },
    Query: {
      ...UserQuery.resolvers.Query,
      ...ProductQuery.resolvers.Query,
      ...TransactionQuery.resolvers.Query
    },
    ...UserSchema.resolvers,
    ...ProductSchema.resolvers,
    ...TransactionSchema.resolvers
  };
  
  const queries_mutations_concat = typeDefs.reduce(
    (accumulator, typeDefSingleItem) => {
      if (typeDefSingleItem.includes('Mutation')) {
        const { methods, rest } = extractMutation(typeDefSingleItem);
        
        if (rest.length) {
          accumulator.typeDefsNew.push(rest);
        }
        
        accumulator.mutations = accumulator.mutations.concat(methods);
        //
      } else if (typeDefSingleItem.includes('Query')) {
        const { methods, rest } = extractQuery(typeDefSingleItem);
        if (rest.length) {
          accumulator.typeDefsNew.push(rest);
        }
        
        accumulator.queries = accumulator.queries.concat(methods);
        //
      } else {
        const typeDefTrim = typeDef
          .split('\n')
          .filter(s => s.trim().length)
          .join('\n');
        accumulator.typeDefsNew.push(typeDefTrim);
      }
    },
    {
      typeDefsNew: [...typeDefs],
      queries: [],
      mutations: []
    }
  );
  
  // Destruct --> men-de-strukturisasi
  const {
    queries,
    mutations,
    typeDefsNew
  } = queries_mutations_concat;

  typeDefsNew.push(mergeQuery(queries));
  typeDefsNew.push(mergeMutation(mutations));

  return {
    typeDefsNew,
    resolvers
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
