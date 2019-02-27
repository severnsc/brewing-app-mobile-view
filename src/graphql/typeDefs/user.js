const userDef = `
    type User {
        id: String
        username: String
        email: String
        errors: [Error]
    }

    input UserEdit {
        username: String
        email: String
        errors: [Error]
    }
`;

export default userDef;
