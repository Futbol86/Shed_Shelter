import React from 'react';
import { Field } from "redux-form";
import { FieldInputPure } from "../../../../../../components/common/Form";
import { FormattedNumber } from 'react-intl';
import { Row, Col, Button } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

const GlassInfoComponent = ({ 
        selectedGlassItem, duplicateGlassItem, removeGlassItem, deSelectedGlassItem 
    }) => {
    const { name } = selectedGlassItem;
    const { glassWidth, glassHeight, glassDepth } = selectedGlassItem && selectedGlassItem.informations || {};

    return (
        <React.Fragment>
            <Row className="mt-2">
                <Col md={12} className="d-flex flex-wrap justify-content-end">
                    <Button color="" onClick={deSelectedGlassItem}>
                        <img src={`/assets/furnitures/icons/toolbars/back.png`} 
                             style={{zIndex: -100}} className="img-fluid" title='Back'/> 
                        <br /> <FormattedMessage id="app.drawing3D.Back" defaultMessage="Back"/>
                    </Button>
                    <Button color="" onClick={duplicateGlassItem}>
                        <img src={`/assets/furnitures/icons/toolbars/duplicate.png`} 
                             style={{zIndex: -100}} className="img-fluid" title='Duplicate'/> 
                        <br /> <FormattedMessage id="app.drawing3D.Duplicate" defaultMessage="Duplicate"/>
                    </Button>
                    <Button color="" onClick={removeGlassItem}>
                        <img src={`/assets/furnitures/icons/toolbars/remove.png`} 
                             style={{zIndex: -100}} className="img-fluid" title='Remove'/> 
                        <br /> <FormattedMessage id="app.drawing3D.Remove" defaultMessage="Remove"/>
                    </Button>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={12}>
                    <h5>
                        <strong>
                            <u><FormattedMessage id="app.drawing3D.Glass_Detail" defaultMessage="Glass Detail"/></u>
                        </strong>
                    </h5>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Name" defaultMessage="Name"/></strong>
                </Col>
                <Col md={6}>
                    {name}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Width" defaultMessage="Width"/></strong>
                </Col>
                <Col md={6}>
                    <FormattedNumber value={glassWidth}/>{` m`}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Height" defaultMessage="Height"/></strong>
                </Col>
                <Col md={6}>
                    <FormattedNumber value={glassHeight}/>{` m`}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Depth" defaultMessage="Depth"/></strong>
                </Col>
                <Col md={6}>
                    <FormattedNumber value={glassDepth}/>{` m`}
                </Col>
            </Row>
        </React.Fragment>
    )
};

export default GlassInfoComponent;