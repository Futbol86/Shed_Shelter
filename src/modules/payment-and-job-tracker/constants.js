export const MODULE_ID = 'payment-and-job-tracker';

export {PAGINATION_ITEMS_PER_PAGE} from '../../constants';

export const MODULE_SUB_ID_JOB_TRACKING     = 'job-tracking';
export const API_SUB_URL                    = '/quote-job-tracking';
export const API_SUB_URL_SHED_INFORMATION   = '/shed-informations';

export const JT_JOB_TRACKING_FORM_NAME          = 'JT_JOB_TRACKING_FORM_NAME';
export const JT_JOB_TRACKING_FORM_NAME_SUBMIT   = 'JT_JOB_TRACKING_FORM_NAME_SUBMIT';
export const JT_JOB_TRACKING_FORM_NAME_SUCCESS  = 'JT_JOB_TRACKING_FORM_NAME_SUCCESS';
export const JT_JOB_TRACKING_FORM_NAME_FAILURE  = 'JT_JOB_TRACKING_FORM_NAME_FAILURE';

export const JT_JOB_TRACKING = 'job-tracking';

export const JOB_CHECK_LIST_ITEMS = [
    { 
        id:         1,
        value:      "preSignCheckList",
        name:       "Job accepted - pre-sign checklist",
        bgColor:    "#f86c6b",
        subListItems: [
            {
                id:         1,
                value:      "clientIDCheckedCopiedAndFiled",
                name:       "Client ID Checked, copied and filed",
                bgColor:    "#f86c6b",
                options: [
                    {id: 1, value: "isChecked", name: "Y", color: "danger"},
                ]
            },
            {
                id:         2,
                value:      "kitPurchaseDocumentHasCorrectLegalName",
                name:       "Kit purchase document has correct Legal Name",
                bgColor:    "#f86c6b",
                options: [
                    {id: 1, value: "isChecked", name: "Y", color: "danger"},
                ]
            },
            {
                id:         3,
                value:      "KitPurchaseDocumentHasCorrectDeliveryAddress",
                name:       "Kit purchase document has correct Delivery Address",
                bgColor:    "#f86c6b",
                options: [
                    {id: 1, value: "isChecked", name: "Y", color: "danger"},
                ]
            },
            {
                id:         4,
                value:      "kitPurchaseDocumentHasCorrectPhoneNumbers",
                name:       "Kit purchase document has correct Phone Numbers",
                bgColor:    "#f86c6b",
                options: [
                    {id: 1, value: "isChecked", name: "Y", color: "danger"},
                ]
            },
            {
                id:         5,
                value:      "kitPurchaseDocumentHasCorrectEmail",
                name:       "Kit purchase document has correct Email, site and Physical Mailing Address",
                bgColor:    "#f86c6b",
                options: [
                    {id: 2, value: "isChecked", name: "Y", color: "danger"},
                ]
            },
        ]
    },
    { 
        id:         2,
        value:      "tradesContract",
        name:       "Trades Contract has correct legal Name, Address, Phone and Email",
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    },
    { 
        id:         3,
        value:      "councilPaperWorkIssued",
        name:       "Council Paper Work issued",
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         4,
        value:      "depositForKitBuildingReceived",
        name:       "Deposit for kit building received",
        bgColor:    "#f86c6b",
        options: [
            {id: 1, value: "isChecked", name: "Y", color: "danger"},
        ]
    }, 
    { 
        id:         5,
        value:      "receiptForDepositIssued",
        name:       "Receipt for deposit issued",
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         6,
        value:      "councilQuoteRequested",
        name:       "Council Quote Requested", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         7,
        value:      "clientInvoicedForCouncilCosts",
        name:       "Client Invoiced for council costs", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         8,
        value:      "homeOwnersWarrantyOrdered",
        name:       "Home Owners Warranty ordered", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         9,
        value:      "clientInvoicedForHomeOwnersWarranty",
        name:       "Client invoiced for Home Owners Warranty", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         10,
        value:      "clientPaidForHomeOwnersWarranty",
        name:       "Client paid for Home Owners Warranty", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         11,
        value:      "engineeringRequested",
        name:       "Engineering Requested",
        bgColor:    "#f86c6b",
        options: [
            {id: 1, value: "isChecked", name: "Y", color: "danger"},
        ]
    }, 
    { 
        id:         12,
        value:      "engineeringReceivedAndAccepted",
        name:       "Engineering received and accepted",
        bgColor:    "#f86c6b",
        options: [
            {id: 1, value: "isChecked", name: "Y", color: "danger"},
        ]
    }, 
    { 
        id:         13,
        value:      "councilPlansLodged",
        name:       "Council Plans Lodged", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         14,
        value:      "councilPlansApproved",
        name:       "Council Plans Approved", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    },  
    { 
        id:         15,
        value:      "manufacturePaymentInvoiced",
        name:       "Manufacture payment invoiced",
        bgColor:    "#f86c6b",
        options: [
            {id: 1, value: "isChecked", name: "Y", color: "danger"},
        ]
    },
    { 
        id:         16,
        value:      "manufacturePaymentReceived",
        name:       "Manufacture payment received",
        bgColor:    "#f86c6b",
        options: [
            {id: 2, value: "isChecked", name: "Y", color: "danger"},
        ]
    },
    { 
        id:         17,
        value:      "receiptForManufacturePaymentIssued",
        name:       "Receipt for Manufacture payment issued",
        bgColor:    "#f86c6b",
        options: [
            {id: 1, value: "isChecked", name: "Y", color: "danger"},
        ]
    },
    { 
        id:         18,
        value:      "deliveryDate",
        name:       "Delivery Date", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isChecked", name: "Y", color: "danger"},
        ]
    },
    { 
        id:         19,
        value:      "plansIssuedForConcrete",
        name:       "Plans issued for concrete", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         20,
        value:      "plansAcceptedForConcrete",
        name:       "Plans accepted for concrete - start date for site works advised", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         21,
        value:      "billOfMaterialsCheckedAgainstContractRequirements",
        name:       "Bill of materials checked against contract requirements",
        bgColor:    "#f86c6b",
        options: [
            {id: 1, value: "isChecked", name: "Y", color: "danger"},
        ]
    },
    { 
        id:         22,
        value:      "orderSentToRollFormSupplier",
        name:       "Order sent to roll form supplier",
        bgColor:    "#f86c6b",
        options: [
            {id: 1, value: "isChecked", name: "Y", color: "danger"},
        ]
    },
    { 
        id:         23,
        value:      "orderAcceptedByRollFormSupplier",
        name:       "Order accepted by roll form supplier",
        bgColor:    "#f86c6b",
        options: [
            {id: 1, value: "isChecked", name: "Y", color: "danger"},
        ]
    },
    { 
        id:         24,
        value:      "ordersSentToOtherSuppliers",
        name:       "Orders sent to other suppliers",
        bgColor:    "#f86c6b",
        options: [
            {id: 1, value: "isChecked", name: "Y", color: "danger"},
        ]
    },
    { 
        id:         25,
        value:      "allOrderAcceptedByOtherSuppliers",
        name:       "All order accepted by other suppliers",
        bgColor:    "#f86c6b",
        options: [
            {id: 1, value: "isChecked", name: "Y", color: "danger"},
        ]
    },
    { 
        id:         26,
        value:      "finalKitInvoiceIssued",
        name:       "Final kit invoice issued",
        bgColor:    "#f86c6b",
        options: [
            {id: 1, value: "isChecked", name: "Y", color: "danger"},
        ]
    },
    { 
        id:         27,
        value:      "finalKitAmountReceived",
        name:       "Final kit amount received",
        bgColor:    "#f86c6b",
        options: [
            {id: 1, value: "isChecked", name: "Y", color: "danger"},
        ]
    },
    { 
        id:         28,
        value:      "receiptIssuedForFinalKitPayment",
        name:       "Receipt issued for final kit payment", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isChecked", name: "Y", color: "warning"},
        ]
    },
    { 
        id:         29,
        value:      "plansIssuedForConstruction",
        name:       "Plans issued for construction", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         30,
        value:      "constructionWoksAccepted",
        name:       "Construction woks accepted and start date scheduled", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         31,
        value:      "consolidationOfItemsConfirmed",
        name:       "Consolidation of items confirmed",
        bgColor:    "#f86c6b",
        options: [
            {id: 1, value: "isChecked", name: "Y", color: "danger"},
        ]
    },
    { 
        id:         32,
        value:      "deliveryAllowedToProceed",
        name:       "Delivery allowed to proceed",
        bgColor:    "#f86c6b",
        options: [
            {id: 1, value: "isChecked", name: "Y", color: "danger"},
        ]
    },
    { 
        id:         33,
        value:      "deliveryCompletedByRollFormWithConsolidatedItems",
        name:       "Delivery completed by roll form with consolidated items",
        bgColor:    "#f86c6b",
        options: [
            {id: 1, value: "isChecked", name: "Y", color: "danger"},
        ]
    },
    { 
        id:         34,
        value:      "concreteWorksInstalled",
        name:       "Concrete works installed", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         35,
        value:      "concreteWorksInvoiced",
        name:       "Concrete works invoiced", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         36,
        value:      "concreteWorksPaidInFullByClient",
        name:       "Concrete works paid in full by client", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         37,
        value:      "marginOnConcretePaidByTrades",
        name:       "Margin on concrete paid by trades", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         38,
        value:      "constructionStarted",
        name:       "Construction started", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         39,
        value:      "constructionCompleted",
        name:       "Construction completed", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         40,
        value:      "buildingInspected",
        name:       "Building inspected", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         41,
        value:      "clientInvoicedForConstruction",
        name:       "Client invoiced for construction", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         42,
        value:      "clientPaidForConstruction",
        name:       "Client paid for construction", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         43,
        value:      "marginPaidByConstructionTrades",
        name:       "Margin paid by construction trades", 
        bgColor:    "#ffc107",
        options: [
            {id: 1, value: "isNA", name: "N/A", color: "warning"},
            {id: 2, value: "isChecked", name: "Y", color: "warning"},
        ]
    }, 
    { 
        id:         44,
        value:      "jobCompleteNoFurtherActionRequired",
        name:       "Job Complete - no further action required",
        bgColor:    "#f86c6b",
        options: [
            {id: 1, value: "isChecked", name: "Y", color: "danger"},
        ]
    },
]