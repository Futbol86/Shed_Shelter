export default {
    items: [
        {
            name: 'Dashboard',
            url: '/dashboard',
            icon: 'icon-speedometer',
            // badge: {
            //     variant: 'info',
            //     text: 'NEW'
            // }
        },
        // {
        //     divider: true
        // },
        // {
        //     title: true,        // Not a title
        //     name: 'USER SECTION',
        //     wrapper: {            // optional wrapper object
        //         element: '',        // required valid HTML5 element tag
        //         attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        //     },
        //     class: ''             // optional class names space delimited list for title item ex: "text-center"
        // },
        {
            name: 'Client Management',
            url: '/clients',
            icon: 'icon-people',
            children: [
                {
                    name: 'All Clients',
                    url: '/clients/list',
                    icon: 'icon-people'
                },
                {
                    name: 'Add New Client',
                    url: '/clients/add',
                    icon: 'icon-plus'
                },
            ]
        },

        {
            name: 'Existing Quotes',
            url: '/quotes',
            icon: 'icon-layers',
            children: [
                {
                    name: 'All Quotes',
                    url: '/quotes/list',
                    icon: 'icon-list'
                },
                {
                    name: 'Add New Quote',
                    url: '/clients/add',
                    icon: 'icon-plus'
                },
            ]
        },

        {
            name: 'Order Documents',
            url: '/documents',
            icon: 'icon-docs',
            children: [
                {
                    name: 'Contract Terms',
                    url: '/documents/contract-terms',
                    icon: 'icon-list'
                }
            ]
        },

        {
            name: 'Orders',
            url: '/orders',
            icon: 'icon-basket',
            children: [
                {
                    name: 'All Orders',
                    url: '/orders/list',
                    icon: 'icon-list'
                },
                {
                    name: 'Processing Shared Orders',
                    url: '/orders/shared-orders/list/processing',
                    icon: 'icon-share'
                },
                {
                    name: 'Closed Shared Orders',
                    url: '/orders/shared-orders/list/closed',
                    icon: 'icon-close'
                },
                {
                    name: 'All Supply Data Entries',
                    url: '/orders/supply-data-entries/list',
                    icon: 'icon-people'
                },
                {
                    name: 'Add Supply Data Entry',
                    url: '/orders/supply-data-entries/add',
                    icon: 'icon-plus'
                },
            ]
        },

        {
            name: 'Contructions',
            url: '/contructions',
            icon: 'icon-wrench',
            children: [
                {
                    name: 'All Contructions',
                    url: '/contructions/list',
                    icon: 'icon-list'
                },
                {
                    name: 'All Shared Contructions (Processing)',
                    url: '/contructions/shared-contructions/list/processing',
                    icon: 'icon-share'
                },
                {
                    name: 'All Shared Contructions (Closed)',
                    url: '/contructions/shared-contructions/list/closed',
                    icon: 'icon-close'
                },
                {
                    name: 'All Contruction Data Entries',
                    url: '/contructions/contruction-data-entries/list',
                    icon: 'icon-people'
                },
                {
                    name: 'Add Contruction Data Entry',
                    url: '/contructions/contruction-data-entries/add',
                    icon: 'icon-plus'
                },
                {
                    name: 'Contruction Planners',
                    url: '/contructions/contruction-planners',
                    icon: 'icon-clock'
                },
            ]
        },

        {
            name: 'Payment & Job Tracker',
            url: '/payment-and-job-tracker',
            icon: 'icon-credit-card',
            children: [
                {
                    name: 'Job Tracking',
                    url: '/payment-and-job-tracker/job-tracking',
                    icon: 'icon-eye'
                },
            ]
        },

        {
            name: 'Drawing 3D',
            url: '/drawing3D',
            icon: 'icon-wrench',
            children: [
                {
                    name: 'Drawing 3D',
                    url: '/drawing3D/main',
                    icon: 'icon-people'
                },
                {
                    name: 'Drawing 3D Libraries',
                    url: '/drawing3D/libraries',
                    icon: 'icon-people'
                }
            ]
        },

        {
            name: 'Accountings',
            url: '/accountings',
            icon: 'icon-wrench',
            children: [
                {
                    name: 'QuickBooks APIs',
                    url: '/accountings/quickbooks-apis',
                    icon: 'icon-people'
                },
                {
                    name: 'MyOb APIs',
                    url: '/accountings/myob-apis',
                    icon: 'icon-people'
                }
            ]
        },
    ]
};
