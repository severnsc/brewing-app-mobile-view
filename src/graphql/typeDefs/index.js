import { makeExecutableSchema } from "graphql-tools";
import errorDef from "./error";
import userDef from "./user";
import locationDef from "./location";

const typeDefs = [userDef, errorDef, locationDef];

export default makeExecutableSchema({ typeDefs });
