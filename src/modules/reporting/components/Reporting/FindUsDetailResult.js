import React from 'react';
import { Row, Col, Label, Table } from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {FIND_US_CONTENTS} from '../../../quotes/constants';
const FindUsDetailResult = ({ countFindUs, findUsData }) => {
    return (
        <Row>
            {FIND_US_CONTENTS && FIND_US_CONTENTS.map((cat, idx1) => {
                return (
                    <Col xs="6" key={idx1}>
                        <Label>
                            {cat.name}
                        </Label>
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
                                {(cat && cat.details) ?
                                    cat.details && cat.details.map((subCat, idx2) =>
                                    {
                                        const countCategory = findUsData[cat.value] && findUsData[cat.value][subCat.value]
                                            ? findUsData[cat.value][subCat.value] : 0;
                                        return (
                                            <tr key={100 * idx1 + idx2}>
                                                <td>{subCat.id}</td>
                                                <td>{subCat.name}</td>
                                                <td>{countCategory}</td>
                                                <td>{(100 * countCategory / countFindUs).toFixed(1)}%</td>
                                            </tr>
                                        );
                                    })
                                    : null
                                }
                            </tbody>
                        </Table>
                    </Col>
                );
            })}
        </Row>           
    )
};

export default FindUsDetailResult;