const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Product {
        _id: ID!
        title: String!
        description: String!
        price: Int!
        veg:String!
        imageUrl: String!
        createdAt: String!
        updatedAt: String!
    }
    type Orders{
        orders:[Order]

    }
type Order {
        _id:ID!
        products:[CartProd]
    }
    type CartProducts{
        products:[CartProd]

    }

    type User {
        _id: ID!
        email: String!
        password: String
    }
    type Products {
        products: [Product!]!
    }
     type CartProd {
        product: Product!
        quantity:Int!
    }


    input UserInputData {
        email: String!
        password: String!
    }

    input ProductInputData {
        title: String!
        description: String!
        price: Int!
        veg:String!
        imageUrl: String!
    }
      type AuthData {
        token: String!
        userId: String!
    }
    type Details{
        _id: ID!
        firstName: String!
         lastName: String!
         email: String!
         city: String!
         phoneNumber: Float!
         bankAccount: String!
         streetLine1: String!
    }

    type RootQuery {
        user: User!
        products: Products!
        login(email: String!, password: String!): AuthData!
        getDetails(phoneNumber:Float!):Details
        getPreviousOrders:Orders!
    
    }

    type RootMutation {
    
        editProfile(firstName: String!, lastName: String!,email: String!, city: String!): Boolean
        createProduct(productInput: ProductInputData): Product!
        addProduct(id:ID!):Boolean
        
        postOrder:Boolean
        deleteProduct(id:ID!):Boolean
        deletePost(id: ID!): Boolean
        updateStatus(status: String!): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
