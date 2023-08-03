import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import {FormattedMessage} from 'react-intl';

import { Row, Col, Label } from 'reactstrap';

const ProductSelectionItem = ({item, productId, handleProductChange}) => (
    <Row>
        <Col className="form-group" xs="12">
            <Field name="productId" id={`product-${item.id}`} component="input" type="radio" value={`${item.id}`}
                   onChange={handleProductChange}
                   style={{verticalAlign: "baseline"}}
                   disabled={productId}
            />{' '}

            <Label for={`product-${item.id}`}>
                <div className='text-red font-weight-bold'>
                    {item.name}
                </div>
            </Label>
            <div className="pl-2">
                <div dangerouslySetInnerHTML={{__html: item.description}} />
                {/*<div>*/}
                {/*    <div>*/}
                {/*        <span className="font-italic">{(item.params.max_span / 1000)}m</span> {' '}*/}
                {/*        <FormattedMessage id="app.quotes.Maximum_Span" defaultMessage="Maximum Span" />*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <span className="font-italic">{(item.params.max_height / 1000)}m</span> {' '}*/}
                {/*        <FormattedMessage id="app.quotes.Maximum_Height" defaultMessage="Maximum Height" />*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <span className="font-italic">{(item.params.max_bayspace / 1000)}m</span> {' '}*/}
                {/*        <FormattedMessage id="app.quotes.Maximum_Bay_Space" defaultMessage="Maximum Bay Space" />*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </Col>
    </Row>
);

ProductSelectionItem.propTypes = {
    item: PropTypes.object
};

export default ProductSelectionItem;