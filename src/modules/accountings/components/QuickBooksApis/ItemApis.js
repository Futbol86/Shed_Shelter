import React, {Component} from 'react';
import { Field, FieldArray } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import { Col, Row, Button, Label, Card, CardHeader, CardBody, CardFooter, Table, Form } from 'reactstrap';
import { FieldInputPure, FieldDropdownList, FieldLevelValidation } from "../../../../components/common/Form";

import CreateNewItemComponent from './ItemApis/CreateNewItem';
import CreateNewCategoryContainer from '../../containers/QuickBooksApis/ItemApis/CreateNewCategory';
import GetListItemComponent from './ItemApis/GetListItem';
import GetOneItemComponent from './ItemApis/GetOneItem';

class ItemApis extends Component {
    render() {
        const {
            ItemId,
            quickBooksItems, quickBooksItem,
            quickBooksItemError,
            doQuickBooksGetItems, doQuickBooksGetAItem,
            handleUpdateItem
        } = this.props;
        
        return (
            <div className="animated fadeIn">         
                <Card>
                    <CardHeader>
                        <h2>
                            Item APIs
                        </h2>
                    </CardHeader>
                    <CardBody>
                        <CreateNewItemComponent {...this.props}/>
                        <hr />
                        <CreateNewCategoryContainer />
                        <hr />
                        <GetListItemComponent quickBooksItems={quickBooksItems}
                                              doQuickBooksGetItems={doQuickBooksGetItems}
                                              handleUpdateItem={handleUpdateItem} />                  
                        <hr/>
                        <GetOneItemComponent ItemId={ItemId}
                                             quickBooksItem={quickBooksItem} 
                                             doQuickBooksGetAItem={doQuickBooksGetAItem} />
                    </CardBody>
                    <CardFooter>
                        <span className='text-danger'>{quickBooksItemError}</span>
                    </CardFooter>
                </Card>
            </div>
        )
    }
}

export default ItemApis;