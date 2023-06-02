import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `
    type Produto {
        id: ID!
        nome: String
        preco: Int
        categoria: Categoria
    }

    type Categoria {
        id: ID!
        nome: String
    }

    type Query {
        produtos: [Produto]
    }

    input ProdutoInput {
        nome: String
        preco: Int
    }

    type Mutation {
        addProduto(produto: ProdutoInput): Produto
        alteraProduto(produto: ProdutoInput): Produto
        deleteProduto(id: ID!): Boolean
    }
`;


const produtos = [
    {
        id: 1,
        nome: 'Samsung Galaxy A54',
        preco: 1000,
        categoria: {
            id: 1,
            nome: 'Celular'
        }
    },
    {
        id: 2,
        nome: 'Samsung Galaxy S22',
        preco: 2000,
        categoria: {
            id: 1,
            nome: 'Celular'
        }
    },
    {
        id: 3,
        nome: 'Iphone 13',
        preco: 5000,
        categoria: {
            id: 1,
            nome: 'Celular'
        }
    },
];

const resolvers = {
    Query: {
        produtos: () => {
            return produtos; 
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