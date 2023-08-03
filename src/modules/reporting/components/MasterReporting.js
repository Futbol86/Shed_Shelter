import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import Tabs from 'react-responsive-tabs';
import ReportingContainer from "../containers/Reporting";
import MetrixReportingListContainer from "../containers/MetrixReportingList";

const MasterReporting = ({tabIndex, isAnAdmin, handleTabChange}) => {
    let tabItems = [
        {
            key: 0,
            tabClassName: 'tab',
            panelClassName: 'tab-content tab-pane',
            title: 'Reporting',
            getContent: () => <ReportingContainer />
        }
    ];

    if(isAnAdmin) {
        tabItems.push({
            key: 1,
            tabClassName: 'tab',
            panelClassName: 'tab-content tab-pane',
            title: 'Metrix',
            getContent: () => <MetrixReportingListContainer />
        });
    }

    return (
        <div className="animated fadeIn">
            <Card>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <Tabs items={tabItems} selectedTabKey={tabIndex} transformWidth={400} onChange={handleTabChange}/>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
};

export default MasterReporting;