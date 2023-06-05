import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `
    type Product {
        id: ID!
        name: String
        price: Int
        category: Category
    }

    type Category {
        id: ID!
        name: String
    }

    type Query {
        products: [Product]
    }

    input ProductInput {
        name: String
        price: Int
    }

    type Mutation {
        addProduct(product: ProductInput): Product
        alteraProduct(product: ProductInput): Product
        deleteProduct(id: ID!): Boolean
    }
`;


const products = [
    {
        id: 1,
        name: 'Samsung Galaxy A54',
        price: 1000,
        category: {
            id: 1,
            name: 'Celular'
        }
    },
    {
        id: 2,
        name: 'Samsung Galaxy S22',
        price: 2000,
        category: {
            id: 1,
            name: 'Celular'
        }
    },
    {
        id: 3,
        name: 'Iphone 13',
        price: 5000,
        category: {
            id: 1,
            name: 'Celular'
        }
    },
];

const resolvers = {
    Query: {
        products: () => {
            return products; 
        }
    },
    Mutation: {
        addProduct: (_, { product }) => {
            return { id: 4, ...product }; 
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