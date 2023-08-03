import React, {Component} from 'react';
import {Table, Row, Col} from 'reactstrap';

import BayConfigBayListItem from "../../../containers/QuoteDetail/BuildingDetail/BayConfigBayListItem";

class BayConfigBayList extends Component {
    render() {
        const {fields, minBayLength, maxBayLength, handleBaySizeChange} = this.props;
        //-- {(numberOfBays) && [...Array(numberOfBays).keys()].map((_, idx) =>

        return (
            <Row className="p-2">
                <Col xs="12">
                    <Table hover bordered striped responsive size="sm">
                        <thead>
                        <tr>
                            <th className="text-right">Bay #</th>
                            <th className="text-center">Actual</th>
                            <th className="text-right">Engineering Range</th>
                        </tr>
                        </thead>
                        <tbody>
                        {fields && fields.map((bay, idx) =>
                            <BayConfigBayListItem key={idx} bayNo={idx + 1} bayId={bay}
                                                  maxBayLength={maxBayLength} minBayLength={minBayLength}
                                                  handleBaySizeChange={handleBaySizeChange}
                            />
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        );
    }
}

export default BayConfigBayList;