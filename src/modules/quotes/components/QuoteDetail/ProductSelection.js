import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Alert, CardFooter, Button } from 'reactstrap';
import {FormattedMessage} from 'react-intl';

import ProductSelectionItem from "./ProductSelectionItem";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';

const ProductSelection = ({products, productId, submitting, invalid, pristine, error, handleGoTab, handleProductChange}) => (
    <React.Fragment>
        <Row>
            {Object.keys(products).map(key =>
                <Col key={key} xs="12" lg="6" md="6">
                    <h6 className="border-bottom pb-2">
                        <strong>{key}</strong>
                    </h6>
                    <div className="container">
                        {products[key].map((item, idx) =>
                            <ProductSelectionItem key={idx} item={item} productId={productId} handleProductChange={handleProductChange} />)
                        }
                    </div>
                    <br />
                </Col>
            )}
        </Row>
        <CardFooter className="d-flex justify-content-between">
            {error && <Alert color="danger"><FormattedMessage id="app.Error" defaultMessage="Error" />: {error}</Alert>}

            {(productId) ?
                <Button color="dark" onClick={() => handleGoTab(1)}>
                    <FormattedMessage id="app.quotes.Building_Detail" defaultMessage="Building Detail" /> <i className="icon-arrow-right" />
                </Button>
                :
                <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                             data-spinner-lines={12} className="btn btn-dark" type="submit"
                             loading={submitting} disabled={submitting || invalid || pristine}>
                    <FormattedMessage id="app.quotes.Select_Product_and_Next" defaultMessage="Select Product and Next" />
                </LaddaButton>
            }
        </CardFooter>
    </React.Fragment>
);

ProductSelection.propTypes = {
    products: PropTypes.object
};

export default ProductSelection;