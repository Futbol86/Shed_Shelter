import React from 'react';
import {FormattedDate, FormattedTime} from 'react-intl';
import PropTypes from "prop-types";

const TextMessageListItem = ({ textMessage }) => {
    return (
        <tr>
            <td>{textMessage.index}</td>
            <td>
                <span>{textMessage.senderIdentity}</span>
            </td>
            <td>
                <span>{textMessage.phoneMobile}</span>
            </td>
            <td>
                <span>{textMessage.content}</span>
            </td>
            <td>
                <span>{textMessage.sentStatus}</span>
            </td>
            <td>
                <FormattedDate value={textMessage.updatedAt}/>
                {' '}
                <FormattedTime value={textMessage.updatedAt} />
            </td>
        </tr>
    )
};

TextMessageListItem.propTypes = {
    textMessage: PropTypes.object
};

export default TextMessageListItem;