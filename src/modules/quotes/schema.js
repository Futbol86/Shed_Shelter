import { schema } from 'normalizr';
import { SCHEMA_QUOTES } from "./constants";

const quote = new schema.Entity(SCHEMA_QUOTES);
export const quotesSchema = [ quote ];