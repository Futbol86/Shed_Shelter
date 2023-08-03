import { schema } from 'normalizr';
import {
    SCHEMA_CONTRUCTIONS,
    SCHEMA_CONTRUCTION_NOTES,
    SCHEMA_CONTRUCTION_DATA_ENTRIES,
    SCHEMA_CONTRUCTION_DATA_ENTRY_STAFFS
} from "./constants";

const contruction = new schema.Entity(SCHEMA_CONTRUCTIONS);
const contructionNote = new schema.Entity(SCHEMA_CONTRUCTION_NOTES);
const contructionDataEntry = new schema.Entity(SCHEMA_CONTRUCTION_DATA_ENTRIES);
const contructionDataEntryStaff = new schema.Entity(SCHEMA_CONTRUCTION_DATA_ENTRY_STAFFS);

export const contructionsSchema = [ contruction ];
export const contructionNotesSchema = [ contructionNote ];
export const contructionDataEntriesSchema = [ contructionDataEntry ];
export const contructionDataEntryStaffsSchema = [ contructionDataEntryStaff ];