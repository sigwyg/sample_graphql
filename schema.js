const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql');
const fetch = require('node-fetch');

const BASE_URL = 'https://swapi.co/api';

const PersonType = new GraphQLObjectType({
    "name": 'Person',
    "description": 'A person or character within the Star Wars universe.',
    "fields": () => ({
        "name": { type: GraphQLString },
        "birth_year": { type: GraphQLString },
        "gender": { type: GraphQLString }
    })
});

const QueryType = new GraphQLObjectType({
    "name": 'Query',
    "description": 'my optional description',
    "fields": () => ({
        "people": {
            "type": new GraphQLList(PersonType),
            "resolve": () => (
                fetch(`${BASE_URL}/people/`)
                    .then(res => res.json())
                    .then(json => json.results)
            )
        }
    })
});

const schema = new GraphQLSchema({query: QueryType});
module.exports = schema;
