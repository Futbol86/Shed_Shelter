import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Dropdown
} from 'reactstrap';
import {FormattedMessage} from 'react-intl';

import DefaultAvatarImg from '../../../styles/img/avatar.svg';
import auth from "../../../services/auth";

class HeaderDropdown extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    /**
     * Trick: I am lazy, so I set avatar and email to state. However, it should only be pushed via props.
     */
    componentWillMount() {
        const userData = auth.getUserFromStorage();
        if (userData && userData.avatar)
            this.setState({avatarImg: userData.avatar});
        else {
            if (DefaultAvatarImg)
                this.setState({avatarImg: DefaultAvatarImg});
            else
                this.setState({avatarImg: "https://2.gravatar.com/avatar/b22214009e74f082dd4e0c44cc9ce559"});
        }

        if (userData && userData.email)
            this.setState({email: userData.email});
        else
            this.setState({email: "shedsshelters@mailinator.com"});
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    dropAccnt() {
        return (
            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav>
                    <img src={this.state.avatarImg} className="img-avatar" alt={this.state.email} />
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem header tag="div" className="text-center">
                        <strong><FormattedMessage id="app.Account" defaultMessage="Profile" /></strong>
                    </DropdownItem>

                    <NavLink to={`/users/profile`} className={`nav-link`}>
                        <DropdownItem>
                            <i className="fa fa-user"></i> <FormattedMessage id="app.Profile" defaultMessage="Profile" />
                        </DropdownItem>
                    </NavLink>
                    {/*<DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>*/}
                    {/*<DropdownItem divider/>*/}
                    <NavLink to={`/auth/logout`} className={`nav-link`}>
                        <DropdownItem>
                            <i className="fa fa-lock"></i> <FormattedMessage id="app.Logout" defaultMessage="Logout" />
                        </DropdownItem>
                    </NavLink>
                </DropdownMenu>
            </Dropdown>
        );
    }

    render() {
        // const {...attributes} = this.props;
        return (
            this.dropAccnt()
        );
    }
}

export default HeaderDropdown;
