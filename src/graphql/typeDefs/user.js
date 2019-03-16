const userDef = `
    type User {
        id: String
        username: String
        email: String
        errors: [Error]
    }

    input UserInput {
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    input UserEdit {
        username: String
        email: String
        errors: [Error]
    }
`;

export default userDef;
