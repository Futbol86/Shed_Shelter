import React from 'react';
import PropTypes from 'prop-types';
import {FormattedNumber} from 'react-intl';
import {Field} from 'redux-form';
import {Label, InputGroup, InputGroupAddon} from 'reactstrap';

import {FieldButtonCheckbox, FieldInputPure} from "../../../../../components/common/Form";

const BayConfigBayListItem = ({bayNo, bayId, minBayLength, maxBayLength, isLocked, handleBaySizeChange}) => (
    <tr>
        <td className="text-right">
            <Label className="col-form-label">
                {bayNo}
            </Label>
        </td>
        <td className="text-center">
            <InputGroup>
                <Field name={`${bayId}.actualSize`} type="number"
                       component={FieldInputPure} readOnly={isLocked}
                       parse = {(value) => value && parseInt(value, 10)}
                       onBlur={handleBaySizeChange}
                />
                <InputGroupAddon addonType="append">
                    <Field name={`${bayId}.isLocked`} type="number" component={FieldButtonCheckbox}
                           iconChecked="icon-lock" iconUnchecked="icon-lock-open" />
                </InputGroupAddon>
            </InputGroup>
        </td>
        <td className="text-right">
            <Label className="col-form-label">
                <FormattedNumber value={minBayLength}/>
                {' '} - {' '}
                <FormattedNumber value={maxBayLength}/>
            </Label>
        </td>
    </tr>
);

BayConfigBayListItem.propTypes = {
    bayNo: PropTypes.number,
    bayId: PropTypes.string,
    minBayLength: PropTypes.number,
    maxBayLength: PropTypes.number,
};

export default BayConfigBayListItem;