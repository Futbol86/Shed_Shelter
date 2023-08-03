import React from 'react';
import { Table } from 'reactstrap';

import TrackingListItem from "./TrackingListItem";

const TrackingList = ({ checkList, handleOptionClick, handleLockUnlockClick, handleDeliveryDateSave }) => {
    return (
        <Table responsive striped>
            <tbody>
                {checkList.map(({item, itemId, isLocked, isChecked, isNA}, idx) => {
                    return <TrackingListItem key={idx} item={item} itemId={itemId}
                        isLocked={isLocked} isChecked={isChecked} isNA={isNA}
                        handleOptionClick={handleOptionClick}
                        handleLockUnlockClick={handleLockUnlockClick}
                        handleDeliveryDateSave={handleDeliveryDateSave}
                    />
                })}
            </tbody>
        </Table>
    )
};

export default TrackingList;