import React from 'react';
import {Row, Col, Label} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {Field} from 'redux-form';
import AnnexeBuildingDraw from '../../../containers/QuoteDetail/AnnexeAwnings/AnnexeBuildingDraw';
import {FieldInputPure} from "../../../../../components/common/Form";
import AnnexesProfileSlope from "./AnnexesProfileSlope";
import AnnexesProfileAnnexeLeft from "./AnnexesProfileAnnexeLeft";
import AnnexesProfileAnnexeRight from "./AnnexesProfileAnnexeRight";
import AnnexesProfileMezzFloor from "./AnnexesProfileMezzFloor";


class AnnexesProfile extends React.Component {
    render() {
        return (
            <div>
                <div style={{zIndex: -1, width: '100%'}}>
                    <AnnexeBuildingDraw 
                        parentWidth={this.props.size.width} 
                        isSkillionRoof={this.props.isSkillionRoof}
                    />
                </div>

                <div style={{position: 'absolute', zIndex: 100, left: '0px', top: '0px', width: '100%'}}>
                    <AnnexesProfileSlope productId={this.props.productId} />
                </div>

                <div style={{position: 'absolute', zIndex: 200, left: '80px', bottom: '5px'}}>
                    <AnnexesProfileAnnexeLeft isAnnexeLeft={this.props.isAnnexeLeft} 
                                              maxLeftAnnexeHeight = {this.props.maxLeftAnnexeHeight}
                                              handleAnnexeSpanChange = {this.props.handleAnnexeSpanChange}
                    />
                </div>


                <div style={{position: 'absolute', zIndex: 400, right: '30px', bottom: '5px'}}>
                    <AnnexesProfileAnnexeRight isAnnexeRight={this.props.isAnnexeRight}
                                               maxRightAnnexeHeight = {this.props.maxRightAnnexeHeight} 
                                               handleAnnexeSpanChange = {this.props.handleAnnexeSpanChange}
                    />
                </div>

                <div style={{position: 'absolute', zIndex: 300, left: (this.props.size.width/2 - 40), bottom: '5px', width: '50%'}}>
                    <Row>
                        <Col>
                            <Label className="col-form-label pt-0">
                                <FormattedMessage id="app.quotes.Garage_Span" defaultMessage="Garage Span"/>{' '}
                                <Field name="buildingSpan" type="number" component={FieldInputPure}
                                       parse={(value) => value && parseInt(value, 10)}
                                       className="form-control form-control-sm text-right" style={{width: '80px'}}/>
                            </Label>
                        </Col>
                    </Row>
                </div>

                <div style={{position: 'absolute', zIndex: 500, left: (this.props.size.width/2 - 100), top: '50px', width: '50%'}}>
                    <Row>
                        <Col>
                            <FormattedMessage id="app.quotes.Garage_Eave" defaultMessage="Garage Eave"/>:
                            {' '}
                            <Field name="buildingHeight" type="number" component={FieldInputPure}
                                   parse={(value) => value && parseInt(value, 10)}
                                   className="form-control form-control-sm text-right" style={{width: '80px'}}/>
                        </Col>
                    </Row>
                </div>



                <div style={{position: 'absolute', zIndex: 600, left: (this.props.size.width/2 - 100), top: '200px', width: '50%'}}>
                    <AnnexesProfileMezzFloor isMezzanineFloor={this.props.isMezzanineFloor} />
                </div>

            </div>
        );
    }
};
export default AnnexesProfile;