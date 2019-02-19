import { makeExecutableSchema } from "graphql-tools";
import errorDef from "./error";
import userDef from "./user";
import locationDef from "./location";

const allDefs = [errorDef, userDef, locationDef];

const typeDefs = allDefs.join("\n");

export default typeDefs;
