import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import CombinationBayPartition from "../../containers/QuoteDetail/BuildingDetail/CombinationBayPartition";
import MezzanineLevelPartition from "../../containers/QuoteDetail/AnnexeAwnings/MezzanineLevelPartition";
import AnnexesProfile from "../../containers/QuoteDetail/AnnexeAwnings/AnnexesProfile";
import AwningOverhangeDraw from "../../containers/QuoteDetail/AnnexeAwnings/AwningOverhangDraw";
import BuildingDetail from "../../containers/QuoteDetail/BuildingDetail";

const AnnexeAwnings = ({bays, isSkillionRoof, productId, changeFieldValue, handleGoTab,
                           submitting, invalid, pristine, error, submitSucceeded,
                           initNewRoofSkylightItems}) => (

    <React.Fragment>
        <Row>
            <Col xs="12" lg="7">
                <Card>
                    <CardHeader>
                        <FormattedMessage id="app.quotes.Building_Profile" defaultMessage="Building Profile"/>
                    </CardHeader>
                    <CardBody style={{backgroundColor: 'lightgray'}}>
                        <Row>
                            <Col xs="12">
                                <AnnexesProfile productId={productId} bays={bays} changeFieldValue={changeFieldValue}
                                                initNewRoofSkylightItems={initNewRoofSkylightItems}
                                                isSkillionRoof={isSkillionRoof}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col xs="12" lg="5">
                <Card>
                    <CardHeader>
                        <FormattedMessage id="app.quotes.Combination" defaultMessage="Combination"/>
                    </CardHeader>
                    <CardBody style={{backgroundColor: 'lightgray'}}>
                        <Row>
                            <Col xs="12">
                                <CombinationBayPartition bays={bays} changeFieldValue={changeFieldValue}
                                                         initNewRoofSkylightItems={initNewRoofSkylightItems}
                                                         editableAnnexe={true}/>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>

        <Row>
            <Col xs="12" md="7" lg="7">
                <Card>
                    <CardHeader>
                        <FormattedMessage id="app.quotes.Awning_Overhangs" defaultMessage="Awning & Overhangs"/>
                    </CardHeader>
                    <CardBody style={{backgroundColor: 'lightgray'}}>
                        <Row>
                            <Col xs="12">
                                <AwningOverhangeDraw isSkillionRoof={isSkillionRoof} />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col xs="12" md="5" lg="5">
                <Card>
                    <CardHeader>
                        <FormattedMessage id="app.quotes.Mezzanine" defaultMessage="Mezzanine"/>
                    </CardHeader>
                    <CardBody style={{backgroundColor: 'lightgray'}}>
                        <Row>
                            <Col xs="12">
                                <MezzanineLevelPartition bays={bays} changeFieldValue={changeFieldValue} />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </React.Fragment>
);

AnnexeAwnings.propTypes = {
    product: PropTypes.object,
    buildingDetail: PropTypes.object,
    changeFieldValue: PropTypes.func
};

export default AnnexeAwnings;