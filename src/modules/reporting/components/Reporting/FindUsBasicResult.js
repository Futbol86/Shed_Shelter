import React from 'react';
import {Table} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {FIND_US_CONTENTS} from '../../../quotes/constants';

const FindUsBasicResult = ({ countFindUs, findUsData }) => {
    return (
        <Table responsive striped>
            <thead>
                <tr>
                    <th><FormattedMessage id="app.reporting.ID" defaultMessage="ID" /></th>
                    <th><FormattedMessage id="app.reporting.Category" defaultMessage="Category" /></th>
                    <th><FormattedMessage id="app.reporting.Number" defaultMessage="Number" /></th>
                    <th><FormattedMessage id="app.reporting.Percent" defaultMessage="Percent" /></th>
                </tr>
            </thead>
            <tbody>
                {(countFindUs && findUsData) ?
                    FIND_US_CONTENTS && FIND_US_CONTENTS.map((cat, idx) =>
                    {
                        const countCategory = findUsData[cat.value] ? findUsData[cat.value].total : 0;
                        return (
                            <tr key={idx}>
                                <td>{cat.id}</td>
                                <td>{cat.name}</td>
                                <td>{countCategory}</td>
                                <td>{(100 * countCategory / countFindUs).toFixed(1)}%</td>
                            </tr>
                            );
                    })
                    : null
                }
                {(!countFindUs || !findUsData) &&
                    <tr><td colSpan={4}><FormattedMessage id="app.reporting.No_Reporting_Found" defaultMessage='No Reporting Found' /></td></tr>
                }
            </tbody>
        </Table>              
    )
};

export default FindUsBasicResult;