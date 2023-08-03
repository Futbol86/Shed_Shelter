import React, {Component} from 'react';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import {loadAllProducts} from '../../actions';
import {getProductList} from "../../selectors";
import ProductSelectionComponent from "../../components/QuoteDetail/ProductSelection";
import {getUserAccessProductTypes} from "../../../users/selectors";
import {
    PRODUCT_CATEGORIES,
    PRODUCT_TYPES,
    PRODUCT_CATEGORY_SKILLION_SHEDS
} from "../../../../constants";

class ProductSelection extends Component {
    componentDidMount() {
        const {products} = this.props;
        if (isEmpty(products))    //-- prevent reloading every time tab clicking
            this.props.loadAllProducts();
    }

    handleProductChange = (event) => {
        const productId = Number(event.target.value);
        if (productId) {
            const currentProduct = PRODUCT_TYPES.find(item => item.id === parseInt(productId));
            if (currentProduct && currentProduct.categoryId === PRODUCT_CATEGORY_SKILLION_SHEDS) {
                window.alert(`This product (${currentProduct.name}) is currently under development and not available at this time.`);
            }
        }
    }

    render() {
        const {products, accessProductTypes, ...remainingProps} = this.props;
        let newProducts = {};
        if (!isEmpty(accessProductTypes) && !isEmpty(products)) {
            // if (accessProductTypes.includes('0') || accessProductTypes.includes(0)) //-- All Product Types
            //     newProducts = products;
            // else
            // {
                const productTypeNames = accessProductTypes.map(cateId => {
                    const item = PRODUCT_CATEGORIES.find(cat => cat.id === +(cateId));
                    if (item)
                        return item.label.replace(/\s+/g, '').toLowerCase();
                    else
                        return null;
                });
                // console.log(productTypeNames);

                Object.keys(products).forEach(aCate => {
                    const cateName = aCate.replace(/\s+/g, '').toLowerCase();
                    if (productTypeNames.includes(cateName))
                        newProducts = {
                            ...newProducts,
                            [aCate]: products[aCate],
                        };
                });
            // }
        }

        return (
            <ProductSelectionComponent
                products={newProducts}
                handleProductChange={this.handleProductChange}
                {...remainingProps}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    products: getProductList(state),
    accessProductTypes: getUserAccessProductTypes(state)
});


export default connect(mapStateToProps, {loadAllProducts})(ProductSelection);