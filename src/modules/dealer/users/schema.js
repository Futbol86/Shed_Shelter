import { schema } from 'normalizr';
import { SCHEMA_USERS } from "../constants";

const user = new schema.Entity(SCHEMA_USERS);
export const usersSchema = [ user ];