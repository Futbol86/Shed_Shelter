import React, {Component} from 'react';
import LoadingBar from 'react-redux-loading-bar';
import {
    NavbarToggler,
    NavbarBrand,
    Nav, NavItem, NavLink
} from 'reactstrap';
import {FormattedMessage} from 'react-intl';

import HeaderDropdown from "./HeaderDropdown";

import {auth} from '../../../services';

class Header extends Component {

    sidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-hidden');
    }

    sidebarMinimize(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-minimized');
    }

    mobileSidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-mobile-show');
    }

    // asideToggle(e) {
    //   e.preventDefault();
    //   document.body.classList.toggle('aside-menu-hidden');
    // }

    render() {
        const dealerLogo = auth.getDealerLogo();

        return (
            <header className="app-header navbar">
                <LoadingBar showFastActions style={{ backgroundColor: 'red', marginTop: '27px' }}  />
                <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
                    <span className="navbar-toggler-icon"></span>
                </NavbarToggler>
                <NavbarBrand href="#" style={dealerLogo ? {backgroundImage: `url(${dealerLogo})`} : {}}></NavbarBrand>
                <NavbarToggler className="d-md-down-none mr-auto" onClick={this.sidebarToggle}>
                    <span className="navbar-toggler-icon"></span>
                </NavbarToggler>
                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3">
                        <NavLink href="#"><FormattedMessage id="app.Dashboard" defaultMessage="Dashboard" /></NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink href="#"><FormattedMessage id="app.Users" defaultMessage="Users" /></NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink href="#"><FormattedMessage id="app.Settings" defaultMessage="Settings" /></NavLink>
                    </NavItem>
                    <HeaderDropdown />
                </Nav>
            </header>
        );
    }
}

export default Header;
