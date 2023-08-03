import React from 'react';
import {Route, Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {menuRoutes} from "../../../config";


//-- TODO: Breadcrumb --> Hard-coded now :-(
const routes = menuRoutes;

/**
 * Find route name: support \d+ --> :id
 *
 * @param url
 */
const findRouteName = url => {
    let newUrl = url;
    if (/\/(\d+)\/?/.test(url))
        newUrl = url.replace(/\/(\d+)\/?/, '/:id');
    return routes[newUrl];
};

const getPaths = (pathname) => {
    const paths = ['/'];

    if (pathname === '/') return paths;

    pathname.split('/').reduce((prev, curr, index) => {
        let currPath = `${prev}/${curr}`;
        if (/^\d+$/.test(curr))
            currPath = `${prev}/:id`;
        paths.push(currPath);
        return currPath;
    });
    return paths;
};

const BreadcrumbsItem = ({match, ...rest}) => {
    const routeName = findRouteName(match.url);
    // console.log("match.url", match.url, " | name: ", routeName);
    if (routeName) {
        return (
            match.isExact ?
                (
                    <BreadcrumbItem active>{routeName}</BreadcrumbItem>
                ) :
                (
                    <BreadcrumbItem>
                        <Link to={match.url || ''}>
                            {routeName}
                        </Link>
                    </BreadcrumbItem>
                )
        );
    }
    return null;
};

const Breadcrumbs = ({location : {pathname}, match, ...rest}) => {
    const paths = getPaths(pathname);
    const items = paths.map((path, i) => <Route key={i++} path={path} component={BreadcrumbsItem}/>);
    return (
        <Breadcrumb>
            {items}
        </Breadcrumb>
    );
};

export default props => (
    <div>
        <Route path="/:path" component={Breadcrumbs} {...props} />
    </div>
);
