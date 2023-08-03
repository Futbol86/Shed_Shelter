import { schema } from 'normalizr';
import { SCHEMA_CLIENTS } from "./constants";

const client = new schema.Entity(SCHEMA_CLIENTS);
export const clientsSchema = [ client ];