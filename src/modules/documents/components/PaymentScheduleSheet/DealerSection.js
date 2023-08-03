import React from 'react';
import { Row, Col, Label } from 'reactstrap';
import {FormattedMessage} from "react-intl";
import {Field} from "redux-form";
import {FieldInputPure} from "../../../../components/common/Form";

const DealerSection = ({dealerInfo, userInfo, logoPath}) => {
    if (!dealerInfo)
        return null;

    return (
        <React.Fragment>
            <Row>
                <Col md="8" className="pb-2">
                    <Row className="pb-1">
                        <Col xs={6}>
                            <strong>
                                {dealerInfo.tradingName}{' '}
                                <FormattedMessage id="app.docs.Authorised_Dealer" defaultMessagedocs="Authorised Dealer" />
                            </strong>
                        </Col>
                        <Col xs={6}>
                            <Field name="nssJobId" type="text" component={FieldInputPure}
                                   className="form-control form-control-sm ml-1 mr-1"
                                   label="NSS Job ID" readOnly={true}
                            />
                        </Col>
                    </Row>

                    <Row className="pb-1 ">
                        <Col xs={6} className="d-flex flex-column">
                            <Row><Col>
                                {dealerInfo.tradingName}
                            </Col></Row>
                            <Row><Col>
                                {dealerInfo.officeAddress && dealerInfo.officeAddress.split('\n').map((item, key) => {
                                    return <span key={key}>{item}<br/></span>
                                })}
                            </Col></Row>
                        </Col>
                        <Col xs={6}>
                            <Row>
                                <Col xs={4}>
                                    <strong>
                                        <FormattedMessage id="app.docs.PH" defaultMessage="PH" />:
                                    </strong>
                                </Col>
                                <Col xs={8}>
                                    {dealerInfo.officePhone}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}>
                                    <strong>
                                        <FormattedMessage id="app.docs.MOB" defaultMessage="MOB" />:
                                    </strong>
                                </Col>
                                <Col xs={8}>
                                    {userInfo.phone}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}>
                                    <strong>
                                        <FormattedMessage id="app.clients.Fax" defaultMessage="Fax" />:
                                    </strong>
                                </Col>
                                <Col xs={8}>
                                    {dealerInfo.officeFax}
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="pb-1 pl-1">
                        <Col xs={6}>
                            <strong>
                                <FormattedMessage id="app.docs.Current_License_Nos" defaultMessage="Current License No/s" />:
                            </strong>
                        </Col>
                        <Col xs={6}>
                            {dealerInfo.bln}
                        </Col>
                    </Row>

                    <Row className="pb-1 pl-1">
                        <Col xs={6}>
                            <strong>
                                <FormattedMessage id="app.Email" defaultMessagedocs="Email" />:
                            </strong>
                        </Col>
                        <Col xs={6}>
                            <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
                        </Col>
                    </Row>
                </Col>


                <Col md="3" className="pb-2 d-flex flex-row offset-1">
                    <img src={logoPath} style={{maxHeight: '105px', width: '100%', border: 'none'}} />

                    {/*<div className="d-flex flex-row justify-content-center"*/}
                         {/*style={*/}
                             {/*(logoPath) ? {*/}
                                     {/*backgroundImage:  `url(${logoPath})`,*/}
                                     {/*backgroundSize: "cover",*/}
                                     {/*WebkitBackgroundSize: "cover",*/}
                                     {/*MozBackgroundSize: "cover",*/}
                                     {/*OBackgroundSize: "cover",*/}
                                     {/*width: "100%",*/}
                                     {/*maxHeight: "105px"*/}
                                 {/*}*/}
                                 {/*: {width: "100%"}*/}
                         {/*}*/}
                    {/*>*/}

                    {/*</div>*/}
                </Col>
            </Row>

        </React.Fragment>
    );
};

export default DealerSection;