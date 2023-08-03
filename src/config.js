export const enabledModules = [
    'auth',
    'users',
    'clients',
    'quotes',
    'dashboard',
    'payment-and-job-tracker',
    'documents',
    //'admin',
    'dealer',
    'reporting',
    'orders',
    'contructions',
    'drawing3D',
    'accountings'
];

export const menuRoutes = {
    '/':                    'Home',
    '/dashboard':           'Dashboard',
    '/users/profile':       'User Profile',
    '/clients':             'All Clients',
    '/clients/:id':         'Client Detail',
    '/clients/edit/:id':    'Edit Client Information',
    '/clients/list':        'List',
    '/clients/add':         'Add New Client',
    '/quotes':              'All Quotes',
    '/quotes/list':         'List',
    '/quotes/add':          'Add New Quote',
    '/documents':           'All Documents',
    '/documents/contract-terms': 'Contract Terms',

    '/reporting':               'Reporting',

    '/orders':              'Orders',
    '/orders/list':         'List',
    '/orders/add/:id':      'Add New Order',
    '/orders/edit/:id':     'Edit Order Information',

    '/orders/shared-orders':             'Shared Orders',
    '/orders/shared-orders/list':        'List',
    '/orders/shared-orders/edit/:id':    'Edit Shared Order Information',

    '/orders/supply-data-entries':              'Supply Data Entries',
    '/orders/supply-data-entries/list':         'List',
    '/orders/supply-data-entries/add':          'Add New Supply Data Entry',
    '/orders/supply-data-entries/edit/:id':     'Edit Supply Data Entry Information',

    '/contructions':              'Contructions',
    '/contructions/list':         'List',
    '/contructions/add/:id':      'Add New Contruction',
    '/contructions/edit/:id':     'Edit Contruction Information',

    '/contructions/shared-contructions':             'Shared Contructions',
    '/contructions/shared-contructions/list':        'List',
    '/contructions/shared-contructions/edit/:id':    'Edit Shared Contruction Information',

    '/contructions/contruction-data-entries':              'Contruction Data Entries',
    '/contructions/contruction-data-entries/list':         'List',
    '/contructions/contruction-data-entries/add':          'Add New Contruction Data Entry',
    '/contructions/contruction-data-entries/edit/:id':     'Edit Contruction Data Entry Information',

    '/drawing3D':                               'Drawing 3D',

    '/payment-and-job-tracker/job-tracking' :       'List',
    '/payment-and-job-tracker/job-tracking/:id':    'Job Tracking Detail',

    '/admin/users':             'All Users',
    '/admin/users/:id':         'User Detail',
    '/admin/users/edit/:id':    'Edit User Information',
    '/admin/users/list':        'List',
    '/admin/users/add':         'Add New User',

    '/dealer/users':             'All Sales Users',
    '/dealer/users/list':        'Sales List',
};