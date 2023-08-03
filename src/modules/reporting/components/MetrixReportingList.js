import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Table} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import Pagination from '../../../components/common/Pagination';
import MetrixReportingListItemComponent from './MetrixReporting/MetrixReportingListItem';
import MetrixReportingListFilter from '../containers/MetrixReportingListFilter';

const MetrixReportingList = ({
    quotes, supplyDataEntries, tradeDataEntries, reportableItems = [], pagination, onChangePage, handleExportExcelFile
}) => {
    const showAllItems     = reportableItems.indexOf("allItems") !== -1;  
    const showDeliveryDate = showAllItems || reportableItems.indexOf("deliveryDate") !== -1;
    const showSalesPerson  = showAllItems || reportableItems.indexOf("salesPerson") !== -1;
    const showBuildingType = showAllItems || reportableItems.indexOf("buildingType") !== -1;
    const showTotalM3      = showAllItems || reportableItems.indexOf("totalM3") !== -1;
    const showTotalM2      = showAllItems || reportableItems.indexOf("totalM2") !== -1;
    const showTotalSupplyCost = showAllItems || reportableItems.indexOf("totalSupplyCost") !== -1;
    const showIndividualSuppliers = showAllItems || reportableItems.indexOf("individualSuppliers") !== -1;
    const showOther        = showAllItems || reportableItems.indexOf("other") !== -1;
    const showIndividualTrades = showAllItems || reportableItems.indexOf("individualTrades") !== -1;
    const showEstimatedWholesaleMargin = showAllItems || reportableItems.indexOf("estimatedWholesaleMargin") !== -1;
    const showEstimatedRetailMargin = showAllItems || reportableItems.indexOf("estimatedRetailMargin") !== -1;
    const showActualKitMargin   = showAllItems || reportableItems.indexOf("actualKitMargin") !== -1;
    const showTotalTradeRevenue = showAllItems || reportableItems.indexOf("totalTradeRevenue") !== -1;
    const showCombinedMargins   = showAllItems || reportableItems.indexOf("combinedMargins") !== -1;
    const showClientExperience  = showAllItems || reportableItems.indexOf("clientExperience") !== -1;

    const showColumns = {
        showDeliveryDate, showSalesPerson, showBuildingType, showTotalM3, showTotalM2, showTotalSupplyCost,
        showIndividualSuppliers, showOther, showIndividualTrades, showEstimatedWholesaleMargin, showEstimatedRetailMargin,
        showActualKitMargin, showTotalTradeRevenue, showCombinedMargins, showClientExperience
    };

    return (
        <div className="animated fadeIn">
            <Card>
                <CardHeader>
                    <h2>
                        <FormattedMessage id="app.reporting.Metrix_Reporting" defaultMessage='Metrix Reporting' />
                    </h2>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <div className="mb-2">
                                <MetrixReportingListFilter />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th><FormattedMessage id="app.reporting.User_Name" defaultMessage="User Name"/></th>
                                        <th><FormattedMessage id="app.clients.Client_Name" defaultMessage="Client Name"/></th>
                                        <th><FormattedMessage id="app.order.Job_Number" defaultMessage="Job Number"/></th>
                                        <th><FormattedMessage id="app.reporting.Quote_Date" defaultMessage="Quote Date"/></th>
                                        <th><FormattedMessage id="app.order.Status" defaultMessage="Status"/></th>
                                        <th><FormattedMessage id="app.order.Job_Status" defaultMessage="Job Status"/></th>
                                        { showDeliveryDate && <th><FormattedMessage id="app.reporting.Delivery_Date" defaultMessage="Delivery Date"/></th> }
                                        { showSalesPerson  && <th><FormattedMessage id="app.reporting.Sale_Person" defaultMessage="Sale Person"/></th> }
                                        { showBuildingType && <th><FormattedMessage id="app.docs.Building_Type" defaultMessage="Building Type"/></th> }
                                        { showTotalM3 && <th><FormattedMessage id="app.reporting.Total_M3" defaultMessage="Total M3"/></th> }
                                        { showTotalM2 && <th><FormattedMessage id="app.reporting.Total_M2" defaultMessage="Total M2"/></th> }
                                        { showTotalSupplyCost && <th><FormattedMessage id="app.reporting.Total_Supply_Cost" defaultMessage="Total Supply Cost"/></th> }
                                        { 
                                            showIndividualSuppliers &&
                                            <React.Fragment>
                                                <th><FormattedMessage id="app.reporting.Supplier_1" defaultMessage="Supplier 1"/></th>
                                                <th><FormattedMessage id="app.reporting.Supplier_2" defaultMessage="Supplier 2"/></th>
                                                <th><FormattedMessage id="app.reporting.Supplier_3" defaultMessage="Supplier 3"/></th>
                                                <th><FormattedMessage id="app.reporting.Supplier_4" defaultMessage="Supplier 4"/></th>
                                                <th><FormattedMessage id="app.reporting.Supplier_5" defaultMessage="Supplier 5"/></th>
                                                <th><FormattedMessage id="app.reporting.Supplier_6" defaultMessage="Supplier 6"/></th>
                                                <th><FormattedMessage id="app.reporting.Supplier_7" defaultMessage="Supplier 7"/></th>
                                                <th><FormattedMessage id="app.reporting.Supplier_8" defaultMessage="Supplier 8"/></th>
                                                <th><FormattedMessage id="app.reporting.Supplier_Other" defaultMessage="Other"/></th>
                                            </React.Fragment>
                                        }
                                        { showTotalSupplyCost && <th><FormattedMessage id="app.reporting.Total_Trade_Cost" defaultMessage="Total Trade Cost"/></th> }
                                        {
                                            showIndividualTrades &&
                                            <React.Fragment>
                                                <th><FormattedMessage id="app.reporting.Trade_1" defaultMessage="Trade 1"/></th>
                                                <th><FormattedMessage id="app.reporting.Trade_2" defaultMessage="Trade 2"/></th>
                                                <th><FormattedMessage id="app.reporting.Trade_3" defaultMessage="Trade 3"/></th>
                                                <th><FormattedMessage id="app.reporting.Trade_4" defaultMessage="Trade 4"/></th>
                                                <th><FormattedMessage id="app.reporting.Trade_5" defaultMessage="Trade 5"/></th>
                                                <th><FormattedMessage id="app.reporting.Trade_Other" defaultMessage="Other"/></th>
                                            </React.Fragment>
                                        }
                                        { showEstimatedWholesaleMargin && <th><FormattedMessage id="app.reporting.Estimated_Wholesale_Margin" defaultMessage="Estimated Wholesale Margin"/></th> }
                                        { showEstimatedRetailMargin && <th><FormattedMessage id="app.reporting.Estimated_Retail_Margin" defaultMessage="Estimated Retail Margin"/></th> }
                                        { showActualKitMargin && <th><FormattedMessage id="app.reporting.Actual_Kit_Margin" defaultMessage="Actual Kit Margin"/></th> }
                                        { showTotalTradeRevenue && <th><FormattedMessage id="app.reporting.Total_Trade_Revenue" defaultMessage="Total Trade Revenue"/></th> }
                                        { showCombinedMargins && <th><FormattedMessage id="app.reporting.Combined_Margins" defaultMessage="Combined Margins"/></th> }
                                        { showClientExperience && <th><FormattedMessage id="app.reporting.Client_Experience" defaultMessage="Client Experience"/></th> }
                                        <th><FormattedMessage id="app.order.Created_At" defaultMessage="Created At"/></th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {(quotes && quotes.length > 0)
                                        ? quotes.map((quote, idx) => (
                                            <MetrixReportingListItemComponent key={idx} quote={quote} supplyDataEntries={supplyDataEntries} 
                                                                              tradeDataEntries={tradeDataEntries} showColumns={showColumns}/>
                                        ))
                                        : <tr><td colSpan={34}><FormattedMessage id="app.reporting.No_Metrix_Reporting_Found" defaultMessage="No Metrix Reporting Found" /></td></tr>
                                    }
                                </tbody>
                            </Table>

                            <Pagination pagination={pagination} onChangePage={onChangePage} />
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <div className='d-flex justify-content-end'>
                        <Button color="secondary" onClick={handleExportExcelFile}>
                            <i className="fa fa-file-excel-o" /> <FormattedMessage id="app.reporting.Export_Report_Excel" defaultMessage="Export Report Excel"/>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
};

MetrixReportingList.propTypes = {
    quotes: PropTypes.array,
};

export default MetrixReportingList;