import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `
    type Book {
        id: ID!
        title: String
        author: String
    }

    type Technologie {
        id: ID!
        name: String
    }

    type Query {
        books: [Book]
        newBooks: [Book]
        technologies: [Technologie]
    }

    type Mutation {
        addTechnologies(name: String!): Technologie
    }
`;


const books = [
    {
        id: 1,
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        id: 2,
        title: 'City of Glass',
        author: 'Paul Auster',
    },
    {
        id: 3,
        title: 'Teste',
        author: 'teste',
    },
];


let technologiesList = [];

const resolvers = {
    Query: {
        books: () => {
            return books; 
        },
        newBooks: () => {
            throw new Error('Não foi possível conectar com o servidor')
        },
        technologies: () => {
            return technologiesList;
        }
    },
    Mutation: {
        addTechnologies: (_, { name }) => {
            const newTechnologie = {
                id: technologiesList.length + 1, 
                name: name
            };

            technologiesList.push(newTechnologie);

            return newTechnologie;
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);