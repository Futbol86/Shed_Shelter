import React from 'react';
import {Row, Col, Label} from 'reactstrap';
import {FormattedMessage} from 'react-intl';
import {Field} from 'redux-form';

class CombinationBayWorkingComponent extends React.Component{
    render() {
        return(
            <React.Fragment>
                <Row>
                    <Col xs = "6">
                        <Label className = "col-form-label font-weight-bold">
                            <FormattedMessage id = "app.quotes.Working_Component" defaultMessage = "Working Component"/>
                        </Label>
                    </Col>
                    <Col xs = "3">
                        <Label className="col-form-label">
                            <Field name="workingComponent" component="input" type="radio"
                                value={1} parse={value => Number(value)}
                            />
                            {' '}
                            <FormattedMessage id="app.quotes.Slab" defaultMessage="Slab" />
                        </Label>
                    </Col>
                    <Col xs = "3">
                        <Label className="col-form-label">
                            <Field name="workingComponent" component="input" type="radio"
                                value={2} parse={value => Number(value)}
                            />
                            {' '}
                            <FormattedMessage id="app.quotes.Awning" defaultMessage="Awning" />
                        </Label>
                    </Col>
                </Row>          
            </React.Fragment>
        )
    }
};
export default CombinationBayWorkingComponent;