import React from 'react';
import {Field} from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import {FormattedMessage} from "react-intl";
import { Button, Row, Col, Label } from 'reactstrap';
import FieldDatePicker from "../../../../components/common/Form/FieldDatePicker";

const TrackingListItem = ({ 
    item, itemId, isLocked, isChecked, isNA, submitting, pristine, invalid, 
    handleLockUnlockClick, handleOptionClick, handleDeliveryDateSave 
}) => {
    const GREEN_COLOR = "#5cb85c";
    return (
        <tr>
            <td>
                <div style={{backgroundColor: isChecked || isNA ? GREEN_COLOR : item.bgColor, width: "50px"}} align="center">
                    {itemId}
                </div>
            </td>
            <td>
                <div>
                    <div>{item.name}</div>                          
                    {item.id === 18 &&      
                        <div className='float-right'>
                            <Row>
                                <Col md="6">
                                    <Field  name="deliveryDate" type="date" component={FieldDatePicker}
                                            className="form-control form-control-sm"
                                            placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy"/>
                                    </Col>
                                <Col md="6">
                                    <button type="button" className="btn btn-primary" onClick={handleDeliveryDateSave}>
                                        <i className="fa fa-save" /> {' '}
                                        <FormattedMessage id="app.Save" defaultMessage="Save"/>
                                    </button>
                                </Col>
                            </Row>
                        </div>
                    }
                </div>
            </td>
            <td align="right">
                {isLocked ?
                    <React.Fragment>
                        <Label className="text-red">(Locked)</Label>
                        {' '}
                    </React.Fragment>
                    : null
                }
                { item && item.options && item.options.map((option, idx) => {
                    const color = ((option.value === 'isChecked' && isChecked) || (option.value === 'isNA' && isNA)) ? "success" : option.color;
                    return (
                        <React.Fragment key={idx}>
                            <Button style={{width: "55px"}}
                                value={`${item.value}.${option.value}`} 
                                color={color}
                                disabled={isLocked}
                                onClick={handleOptionClick}
                            >
                                {option.name}
                            </Button>
                            {' '}
                        </React.Fragment>
                    )})
                }
                {isLocked ?
                    <button className="btn btn-link" title="Unlock This Option" onClick={() => handleLockUnlockClick(item.value, isLocked)} style={{width: "30px"}}>
                        <i className="icon-lock"/>
                    </button>
                    :
                    <button className="btn btn-link" title="Lock This Option" onClick={() => handleLockUnlockClick(item.value, isLocked)} style={{width: "30px"}}>
                        <i className="icon-lock-open"/>
                    </button>
                }
            </td>
        </tr>
                                
    )
};

export default TrackingListItem;
