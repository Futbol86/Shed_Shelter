export default {
    items: [
        {
            divider: true
        },
        {
            title: true,        // Not a title
            name: 'SECTIONDEALER SECTION',
            wrapper: {            // optional wrapper object
                element: '',        // required valid HTML5 element tag
                attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
            },
            class: ''             // optional class names space delimited list for title item ex: "text-center"
        },
        {
            name: 'Sales Management',
            url: '/dealers/sales',
            icon: 'icon-people',
            children: [
                {
                    name: 'All Sales Users',
                    url: '/dealer/users/list',
                    icon: 'icon-people'
                }
            ]
        }
    ]
};
