import { schema } from 'normalizr';
import {
    SCHEMA_ORDERS,
    SCHEMA_ORDER_NOTES,
    SCHEMA_SUPPLY_DATA_ENTRIES,
    SCHEMA_SUPPLY_DATA_ENTRY_STAFFS
} from "./constants";

const order = new schema.Entity(SCHEMA_ORDERS);
const orderNote = new schema.Entity(SCHEMA_ORDER_NOTES);
const supplyDataEntry = new schema.Entity(SCHEMA_SUPPLY_DATA_ENTRIES);
const supplyDataEntryStaff = new schema.Entity(SCHEMA_SUPPLY_DATA_ENTRY_STAFFS);

export const ordersSchema = [ order ];
export const orderNotesSchema = [ orderNote ];
export const supplyDataEntriesSchema = [ supplyDataEntry ];
export const supplyDataEntryStaffsSchema = [ supplyDataEntryStaff ];