import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { Form } from 'redux-form';
import {defineMessages, injectIntl} from 'react-intl';

import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';

import ProductSelection from "../containers/QuoteDetail/ProductSelection";
import BuildingDetail from "../containers/QuoteDetail/BuildingDetail";
import BuildingColour from "../containers/QuoteDetail/BuildingColour";
import AnnexeAwnings from "../containers/QuoteDetail/AnnexeAwnings";
import OtherAccessories from "../containers/QuoteDetail/OtherAccessories";
import DrawingMode from "../containers/QuoteDetail/DrawingMode";
import DeliverySummary from "../containers/QuoteDetail/DeliverySummary";
import Administration from "../containers/QuoteDetail/Administration";
import {QUOTE_STATUS_LIST} from "../constants";
import CommonFooterSection from "../containers/QuoteDetail/CommonFooterSection";
import Price from "../containers/QuoteDetail/Price";
import {PRODUCT_CATEGORY_SKILLION_CARPORTS, PRODUCT_CATEGORY_GABLE_CARPORTS} from "../../../constants";

class QuoteAdd extends Component {
    render() {
        const {quoteId, quoteDetails, clientDetail, userDetail, quoteStatus, product, 
            productCategoryId, currentProductId,
            selectedTab, handleGoTab, changeFieldValue, handleSubmit,
            submitting, invalid, pristine, error, submitSucceeded,
            initNewRoofSkylightItems, isRollFormSelected, isPurlinAndGirtSelected, purlinAndGirtType,
            setStageRef, handleDownloadClick, handleSENTClick,
            isAdminMode, quoteUserId, userInfo, quoteDealerId, userAccessModules
        } = this.props;
        const {intl} = this.props;
        const hasAdminTabAccess = true;
        
        //--TODO: Enable administration tab after seding SMS successfully
        // const hasAdminTabAccess = userAccessModules && userAccessModules.length &&
        //    userAccessModules.some(accessModule => accessModule === 'all' || accessModule === 'administration');

        const intlStrings = defineMessages({
            Product_Selection: {
                id: 'app.quotes.Product_Selection',
                defaultMessage: 'Product Selection'
            },
            Building_Detail: {
                id: 'app.quotes.Building_Detail',
                defaultMessage: 'Building Detail'
            },
            Building_Colour: {
                id: 'app.quotes.Building_Colour',
                defaultMessage: 'Building Colour'
            },
            Annexes_n_Awnings: {
                id: 'app.quotes.Annexes_n_Awnings',
                defaultMessage: 'Annexes & Awnings'
            },
            Drawing_Mode: {
                id: 'app.quotes.Drawing_Mode',
                defaultMessage: 'Drawing Mode'
            },
            Other_Accessories: {
                id: 'app.quotes.Other_Accessories',
                defaultMessage: 'Other Accessories'
            },
            Delivery_n_Summary: {
                id: 'app.quotes.Delivery_n_Summary',
                defaultMessage: 'Delivery & Summary'
            },
            Other_Charges: {
                id: 'app.quotes.Other_Charges',
                defaultMessage: 'Other Charges'
            },
            Administration: {
                id: 'app.quotes.Administration',
                defaultMessage: 'Administration'
            }
        });

        const transStrings = {
            Product_Selection: intl.formatMessage(intlStrings.Product_Selection),
            Building_Detail: intl.formatMessage(intlStrings.Building_Detail),
            Building_Colour: intl.formatMessage(intlStrings.Building_Colour),
            Annexes_n_Awnings: intl.formatMessage(intlStrings.Annexes_n_Awnings),
            Drawing_Mode: intl.formatMessage(intlStrings.Drawing_Mode),
            Other_Accessories: intl.formatMessage(intlStrings.Other_Accessories),
            Delivery_n_Summary: intl.formatMessage(intlStrings.Delivery_n_Summary),
            Other_Charges: intl.formatMessage(intlStrings.Other_Charges),
            Administration: intl.formatMessage(intlStrings.Administration)
        };

        let tabItems = [
            {
                key: 0,
                tabClassName: 'nav-item nav-link',
                panelClassName: 'tab-content tab-pane',
                title: transStrings.Product_Selection,
                getContent: () => <ProductSelection categoryId={productCategoryId} handleGoTab={handleGoTab}
                                                    changeFieldValue={changeFieldValue}
                                                    submitting={submitting} invalid={invalid} pristine={pristine} error={error}
                />
            }
        ];
        if (productCategoryId) {
            let currentIndex = 1;
            //-- Building Detail
            tabItems.push(
                {
                    key: currentIndex++,
                    tabClassName: 'nav-item nav-link',
                    panelClassName: 'tab-content tab-pane',
                    title: transStrings.Building_Detail,
                    getContent: () =>   <React.Fragment>
                        <BuildingDetail productId={currentProductId} handleGoTab={handleGoTab}
                                        product={product} productCategoryId={productCategoryId}
                                        isRollFormSelected={isRollFormSelected}
                                        isPurlinAndGirtSelected={isPurlinAndGirtSelected} purlinAndGirtType={purlinAndGirtType}
                                        changeFieldValue={changeFieldValue} quoteDetails = {quoteDetails}
                                        initNewRoofSkylightItems={initNewRoofSkylightItems} clientDetail = {clientDetail}
                                        submitting={submitting} invalid={invalid} pristine={pristine} error={error} submitSucceeded={submitSucceeded}
                        />
                        {isPurlinAndGirtSelected && <Price quoteDetails={quoteDetails} userDetail={userDetail} changeFieldValue = {changeFieldValue} />}
                    </React.Fragment>
                }
            );
            //-- Building Colour
            tabItems.push(
                {
                    key: currentIndex++,
                    tabClassName: 'nav-item nav-link',
                    panelClassName: 'tab-content tab-pane',
                    title: transStrings.Building_Colour,
                    getContent: () =>   <React.Fragment>
                        <BuildingColour productCategoryId={productCategoryId}
                                        handleGoTab={handleGoTab}
                                        changeFieldValue={changeFieldValue}
                                        initNewRoofSkylightItems={initNewRoofSkylightItems}
                                        submitting={submitting} invalid={invalid} pristine={pristine} error={error} submitSucceeded={submitSucceeded}
                        />
                        <Price quoteDetails={quoteDetails} userDetail={userDetail} changeFieldValue = {changeFieldValue}/>
                    </React.Fragment>
                }
            );

            //-- Annexes and Awnings
            if (productCategoryId !== PRODUCT_CATEGORY_SKILLION_CARPORTS && productCategoryId !== PRODUCT_CATEGORY_GABLE_CARPORTS)
                tabItems.push(
                    {
                        key: currentIndex++,
                        tabClassName: 'nav-item nav-link',
                        panelClassName: 'tab-content tab-pane',
                        title: transStrings.Annexes_n_Awnings,
                        getContent: () =>   <React.Fragment>
                            <AnnexeAwnings  productCategoryId={productCategoryId}
                                            handleGoTab={handleGoTab} changeFieldValue={changeFieldValue}
                                            productId={currentProductId}
                                            initNewRoofSkylightItems={initNewRoofSkylightItems}
                                            submitting={submitting} invalid={invalid} pristine={pristine} error={error} submitSucceeded={submitSucceeded}
                            />
                            <Price quoteDetails={quoteDetails} userDetail={userDetail} changeFieldValue = {changeFieldValue}/>
                        </React.Fragment>
                    }
                );

            //-- Drawing Mode
            tabItems.push(
                {
                    key: currentIndex++,
                    tabClassName: 'nav-item nav-link',
                    panelClassName: 'tab-content tab-pane',
                    title: transStrings.Drawing_Mode,
                    getContent: () =>   <React.Fragment>
                        <DrawingMode    productCategoryId={productCategoryId}
                                        handleGoTab={handleGoTab}
                                        changeFieldValue={changeFieldValue}
                                        initNewRoofSkylightItems={initNewRoofSkylightItems}
                                        submitting={submitting} invalid={invalid} pristine={pristine} error={error} submitSucceeded={submitSucceeded}
                                        setStageRef={setStageRef}
                        />
                        <Price quoteDetails={quoteDetails} userDetail={userDetail} changeFieldValue = {changeFieldValue}/>
                    </React.Fragment>
                }
            );
            //-- Other Accessories
            tabItems.push(
                {
                    key: currentIndex++,
                    tabClassName: 'nav-item nav-link',
                    panelClassName: 'tab-content tab-pane',
                    title: transStrings.Other_Accessories,
                    getContent: () =>   <React.Fragment>
                        <OtherAccessories   productCategoryId={productCategoryId}
                                            handleGoTab={handleGoTab} changeFieldValue={changeFieldValue}
                                            initNewRoofSkylightItems={initNewRoofSkylightItems}
                                            submitting={submitting} invalid={invalid} pristine={pristine} error={error} submitSucceeded={submitSucceeded}
                        />
                        <Price quoteDetails={quoteDetails} userDetail={userDetail} changeFieldValue = {changeFieldValue}/>
                    </React.Fragment>
                }
            );
            //-- Delivery and Summary
            tabItems.push(
                {
                    key: currentIndex++,
                    tabClassName: 'nav-item nav-link',
                    panelClassName: 'tab-content tab-pane',
                    title: transStrings.Delivery_n_Summary,
                    getContent: () =>   <React.Fragment>
                        <DeliverySummary    handleGoTab={handleGoTab} changeFieldValue={changeFieldValue}
                                            submitting={submitting} invalid={invalid} pristine={pristine} error={error} submitSucceeded={submitSucceeded}
                        />
                        <Price quoteDetails={quoteDetails} userDetail={userDetail} changeFieldValue = {changeFieldValue}/>
                    </React.Fragment>
                }
            );
            //-- Delivery and Summary
            tabItems.push(
                {
                    key: currentIndex++,
                    tabClassName: 'nav-item nav-link',
                    panelClassName: 'tab-content tab-pane',
                    title: transStrings.Other_Charges,
                    getContent: () => <h2>Other Charges content</h2>
                }
            );

            if (hasAdminTabAccess) {
                //-- Administration
                tabItems.push(
                    {
                        key: currentIndex++,
                        tabClassName: 'nav-item nav-link',
                        panelClassName: 'tab-content tab-pane',
                        title: transStrings.Administration,
                        getContent: () =>   <Administration handleGoTab={handleGoTab} changeFieldValue={changeFieldValue}
                                                            submitting={submitting} invalid={invalid} pristine={pristine} error={error} submitSucceeded={submitSucceeded}
                                            />
                    }
                );
            }
        }

        if (hasAdminTabAccess) {
            //-- Administration
            tabItems.push(
                {
                    key: 1,
                    tabClassName: 'nav-item nav-link',
                    panelClassName: 'tab-content tab-pane',
                    title: transStrings.Administration,
                    getContent: () =>   <Administration handleGoTab={handleGoTab} changeFieldValue={changeFieldValue}
                                                        submitting={submitting} invalid={invalid} pristine={pristine} error={error} submitSucceeded={submitSucceeded}
                                        />
                }
            );
        }
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" className="pb-2">
                        <Form onSubmit={handleSubmit}>
                            <fieldset disabled={((quoteStatus === QUOTE_STATUS_LIST.LOCKED && !isAdminMode)
                                || (quoteStatus === QUOTE_STATUS_LIST.SENT && !isAdminMode))
                                || (!isAdminMode && userInfo && userInfo.id !== quoteUserId && userInfo.id !== quoteDealerId)
                            }>
                                <Tabs items={tabItems} selectedTabKey={productCategoryId && selectedTab}
                                      onChange={(key) => handleGoTab(key)}    />
                                <CommonFooterSection productCategoryId={productCategoryId}
                                                     tabKey={productCategoryId && selectedTab}
                                                     handleGoTab={handleGoTab} submitting={submitting} invalid={invalid}
                                                     pristine={pristine} error={error} submitSucceeded={submitSucceeded}
                                                     quoteId={quoteId} quoteStatus={quoteStatus}
                                                     quoteDetails={quoteDetails} clientDetail={clientDetail}
                                                     handleDownloadClick={handleDownloadClick}
                                                     handleSENTClick={handleSENTClick}
                                                     isAdminMode={isAdminMode}
                                                     quoteUserId={quoteUserId}
                                                     quoteDealerId={quoteDealerId}
                                                     hasAdminTabAccess={hasAdminTabAccess}
                                                     userAccessModules={userAccessModules}
                                />
                            </fieldset>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

QuoteAdd.propTypes = {
    handleSubmit: PropTypes.func
};

export default injectIntl(QuoteAdd);