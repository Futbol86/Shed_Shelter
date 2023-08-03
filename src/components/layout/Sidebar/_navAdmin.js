export default {
    items: [
        {
            divider: true
        },
        {
            title: true,        // Not a title
            name: 'ADMIN SECTION',
            wrapper: {            // optional wrapper object
                element: '',        // required valid HTML5 element tag
                attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
            },
            class: ''             // optional class names space delimited list for title item ex: "text-center"
        },
        {
            name: 'User Management',
            url: '/admin/users',
            icon: 'icon-people',
            children: [
                {
                    name: 'All Users',
                    url: '/admin/users/list',
                    icon: 'icon-people'
                },
                {
                    name: 'Add New User',
                    url: '/admin/users/add',
                    icon: 'icon-plus'
                },
            ]
        }
    ]
};
