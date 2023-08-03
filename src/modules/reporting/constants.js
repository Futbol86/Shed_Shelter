export const MODULE_ID      = 'reporting';
export const API_SUB_URL    = '/reporting';
export const API_SUB_URL_SHED_INFORMATION = '/shed-informations';
export const API_SUB_URL_EXPORT_METRIX_RP_EXCEL = '/export-metrix-report-excel';

export const REPORTING_DETAIL_FORM_NAME     = 'REPORTING_DETAIL_FORM_NAME';
export const METRIX_REPORTING_LIST_FORM_NAME     = 'METRIX_REPORTING_LIST_FORM_NAME';

export const REPORT_FILTER_OPTIONS = [
    {id: 1, value: "quoteDate", name: "Created Date"},
    {id: 2, value: "updatedDate", name: "Updated Date"}
];

export const METRIX_REPORTING_SEARCHABLE_ITEMS = [
    // { id: 1,  code: "allItems", name: "All Items", },
    { id: 1,  code: "deliveryDate", name: "Delivery Date", },
    { id: 2,  code: "sent", name: "Sent Jobs", },
    { id: 3,  code: "userName", name: "User Name", },
    { id: 4,  code: "completed", name: "Completed Jobs", },
    { id: 5,  code: "active", name: "Active Jobs", },
    { id: 6,  code: "dormant", name: "Dormant Jobs", },
    { id: 7,  code: "dead", name: "Dead Jobs", },
]

export const METRIX_REPORTING_REPORTABLE_ITEMS = [
    { id: 1,  code: "allItems", name: "All Items", },
    { id: 2,  code: "deliveryDate", name: "Delivery Date", },
    { id: 3,  code: "salesPerson", name: "Sales Person", },
    { id: 4,  code: "buildingType", name: "Building Type", },
    { id: 5,  code: "totalM3", name: "Total M3", },
    { id: 6,  code: "totalM2", name: "Total M2", },
    { id: 7,  code: "totalSupplyCost", name: "Total Supply Cost", },
    { id: 8,  code: "individualSuppliers", name: "Individual Suppliers", },
    { id: 9,  code: "other", name: "Other", },
    { id: 10, code: "individualTrades", name: "Individual Trades", },
    { id: 11, code: "estimatedWholesaleMargin", name: "Estimated Wholesale Margin", },
    { id: 12, code: "estimatedRetailMargin", name: "Estimated Retail Margin", },
    { id: 13, code: "actualKitMargin", name: "Actual Kit Margin", },
    { id: 14, code: "totalTradeRevenue", name: "Total Trade Revenue", },
    { id: 15, code: "combinedMargins", name: "Combined Margins", },
    { id: 16, code: "clientExperience", name: "Client Experience", },
]

export const RP_REPORTING   = 'reporting';