import React from 'react';
import {NavLink} from 'react-router-dom';
import {FormattedDate, FormattedTime, FormattedNumber} from 'react-intl';
import PropTypes from "prop-types";
import {Label, Badge} from 'reactstrap';
import {sum} from 'lodash';
const MAX_DISPLAY_SUPPLIERS = 8, MAX_DISPLAY_TRADES = 5;

const MetrixReportingListItem = ({quote, supplyDataEntries, tradeDataEntries, showColumns}) => {
    const {userDetail, status, jobStatus, clientDetail, jobNumber, quoteDate, shedInformation, accountingDetail, createdAt} = quote;
    const {supplierDetails = [], tradeDetails = []} = accountingDetail || {};

    let deliveryDate = shedInformation ? (shedInformation.deliveryDate) : "";
    let totalM3 = shedInformation ? (shedInformation.span/1000 * shedInformation.width/1000 * shedInformation.height/1000).toFixed(2) : 0;
    let totalM2 = shedInformation ? (shedInformation.span/1000 * shedInformation.width/1000).toFixed(2) : 0;

    let supplierDetailNames = Array(MAX_DISPLAY_SUPPLIERS + 1).fill("");
    let supplierDetailsTotalCost = Array(MAX_DISPLAY_SUPPLIERS + 1).fill(0);
    
    // Id = 100 is other suppliers
    for(let i = 0; i <= MAX_DISPLAY_SUPPLIERS; i++) {
        if(supplierDetails.length > i) {
            if(supplierDetails[i].supplierId !== 100) {
                let findOneSupplyDataEntry = supplyDataEntries.find(item => item.id === supplierDetails[i].supplierId);
                supplierDetailNames[i] = findOneSupplyDataEntry ? findOneSupplyDataEntry.company : "";
                supplierDetailsTotalCost[i] = parseFloat(supplierDetails[i].totalCost);
            } else {
                supplierDetailsTotalCost[MAX_DISPLAY_SUPPLIERS] = parseFloat(supplierDetails[i].totalCost);
                supplierDetailNames[MAX_DISPLAY_SUPPLIERS] = "OTHER";
            }
        }
    }

    let supplierDetailsAllTotalCost = sum(supplierDetailsTotalCost);

    let tradeDetailNames = Array(MAX_DISPLAY_TRADES + 1).fill("");
    let tradeDetailsTotalCost = Array(MAX_DISPLAY_TRADES + 1).fill(0);
    let tradeDetailsRevenueReceiveGST = Array(MAX_DISPLAY_TRADES + 1).fill(0);

    for(let i = 0; i <= MAX_DISPLAY_TRADES; i++) {
        if(tradeDetails.length > i) {
            if(tradeDetails[i].tradeId !== 100) {
                let findOneTradeDataEntry = tradeDataEntries.find(item => item.id === tradeDetails[i].tradeId);
                tradeDetailNames[i] = findOneTradeDataEntry ? findOneTradeDataEntry.tradesRegisteredName : "";
                tradeDetailsTotalCost[i] = parseFloat(tradeDetails[i].totalCost);
                tradeDetailsRevenueReceiveGST[i] = parseFloat(tradeDetails[i].revenueReceiveGSTCost);
            } else {
                tradeDetailNames[MAX_DISPLAY_TRADES] = "OTHER";
                tradeDetailsTotalCost[MAX_DISPLAY_TRADES] = parseFloat(tradeDetails[i].totalCost);
                tradeDetailsRevenueReceiveGST[MAX_DISPLAY_TRADES] = parseFloat(tradeDetails[i].revenueReceiveGSTCost);
            }
        }
    }

    let tradeDetailsAllTotalCost = sum(tradeDetailsTotalCost);
    let tradeDetailsAllRevenueReceiveGST = sum(tradeDetailsRevenueReceiveGST);

    let estimatedWholesaleMargin    = shedInformation && shedInformation.wholeSaleMargin;
    let estimatedRetailMargin       = shedInformation && shedInformation.retailMargin;
    let actualKitMargin             = (shedInformation ? shedInformation.buildingKitTotal : 0) - supplierDetailsAllTotalCost
    let totalTradeRevenue           = tradeDetailsAllRevenueReceiveGST - tradeDetailsAllTotalCost;
    let combinedMargins             = tradeDetailsAllRevenueReceiveGST;

    const {
        showDeliveryDate, showSalesPerson, showBuildingType, showTotalM3, showTotalM2, showTotalSupplyCost,
        showIndividualSuppliers, showOther, showIndividualTrades, showEstimatedWholesaleMargin, showEstimatedRetailMargin,
        showActualKitMargin, showTotalTradeRevenue, showCombinedMargins, showClientExperience
    } = showColumns;

    return (
        <tr>
            <td>{userDetail && (userDetail.firstName + " " + userDetail.lastName)}</td>
            <td>{clientDetail && clientDetail.agentName}</td>
            <td>{jobNumber}</td>
            <td>
                {
                    quoteDate &&
                    <FormattedDate value={quoteDate}>
                        {
                            parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                        }
                    </FormattedDate>
                }
            </td>
            <td>{status}</td>
            <td>   
                {jobStatus !== 'sold' ?
                    <Badge color={(jobStatus === 'active') ? 'success' : ((jobStatus === 'dormant') ? 'warning' : 'dark')}
                           className={(jobStatus === 'dead') ? 'text-red' : ''}
                    >
                        {jobStatus && jobStatus.length && (jobStatus.charAt(0).toUpperCase() + jobStatus.slice(1))}
                    </Badge>
                    :
                    <div>
                        <img src={require('../../../quotes/assets/img/firework.png')} style={{height: '45px', width: '45px' }} />
                    </div>
                }
            </td>
            { 
                showDeliveryDate && 
                <td>
                    <FormattedDate value={deliveryDate}>
                        {
                            parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                        }
                    </FormattedDate>
                </td> 
            }
            { showSalesPerson  && <td>Sale Person</td> }
            { showBuildingType && <td>Building Type</td> }
            { showTotalM3 && <td style={{textAlign: 'right'}}><FormattedNumber value={totalM3} /></td> }
            { showTotalM2 && <td style={{textAlign: 'right'}}>{totalM2}</td> }
            { showTotalSupplyCost &&
                <td style={{textAlign: 'right'}}> 
                    <strong><FormattedNumber value={supplierDetailsAllTotalCost} style="currency" currency='USD'/></strong>
                </td>
            }
            {
                supplierDetailsTotalCost.map((item, idx) => {
                    return (
                        showIndividualSuppliers &&
                        <td key={`supplier_${idx}`}>
                            <FormattedNumber value={item} style="currency" currency='USD'/> 
                            <Label>{(item > 0 ? ` (${supplierDetailNames[idx]})` : '')}</Label>
                        </td>
                    )
                })
            }
            { showTotalSupplyCost && 
                <td style={{textAlign: 'right'}}>
                    <strong><FormattedNumber value={tradeDetailsAllTotalCost} style="currency" currency='USD'/></strong>
                </td>
            }
            {
                tradeDetailsTotalCost.map((item, idx) => {
                    return (
                        showIndividualTrades &&
                        <td key={`trade_${idx}`}>
                            <FormattedNumber value={item} style="currency" currency='USD'/> 
                            <Label>{(item > 0 ? ` (${tradeDetailNames[idx]})` : '')}</Label>
                        </td>
                    )
                })
            }
            {
                showEstimatedWholesaleMargin &&
                <td style={{textAlign: 'right'}}>
                    <FormattedNumber value={estimatedWholesaleMargin} style="currency" currency='USD'/>
                </td>
            }
            {
                showEstimatedRetailMargin &&
                <td style={{textAlign: 'right'}}>
                    <FormattedNumber value={estimatedRetailMargin} style="currency" currency='USD'/>
                </td>
            }
            {
                showActualKitMargin &&
                <td style={{textAlign: 'right'}}>
                    <FormattedNumber value={actualKitMargin} style="currency" currency='USD'/>
                </td>
            }
            {
                showTotalTradeRevenue &&
                <td style={{textAlign: 'right'}}>
                    <strong><FormattedNumber value={totalTradeRevenue} style="currency" currency='USD'/></strong>
                </td>
            }
            {
                showCombinedMargins &&
                <td style={{textAlign: 'right'}}>
                    <FormattedNumber value={combinedMargins} style="currency" currency='USD'/>
                </td>
            }
            {
                showClientExperience &&
                <td style={{textAlign: 'right'}}></td>
            }
            <td>  
                <FormattedDate value={createdAt}>
                    {
                        parts => (<>{parts.split('/')[1]}/{parts.split('/')[0]}/{parts.split('/')[2]}</>)
                    }
                </FormattedDate>
            </td>
        </tr>
    )
};

MetrixReportingListItem.propTypes = {
    quote: PropTypes.object.isRequired
};

export default MetrixReportingListItem;