import React, {Component} from 'react';
import {connect} from 'react-redux';

import ProfileChangeAvatarComponent from "../components/ProfileChangeAvatar";
import auth from "../../../services/auth";

class ProfileChangeAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = { files: [] };
    }

    onDrop = (files) => {
        this.setState({
            files
        });
    };

    render() {
        let currentAvatar = null;
        const userData = auth.getUserFromStorage();
        if (userData && userData.avatar)
            currentAvatar = userData.avatar;
        return (
            <ProfileChangeAvatarComponent currentAvatar={currentAvatar}
                                          onDrop={this.onDrop} files={this.state.files} />
        );
    }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, null)(ProfileChangeAvatar);