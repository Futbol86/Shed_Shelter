import React, {Component} from 'react';
import {Form, Row, Col, Label} from 'reactstrap';
import {Field} from "redux-form";
import {FormattedMessage} from "react-intl";
import {FieldDropdownList} from "../../../components/common/Form";
import {FORM_TYPES} from "../constants";
import OfficeFormSheetContainer from "../containers/FormSheet/OfficeFormSheet";
import SafetyFormSheetContainer from "../containers/FormSheet/SafetyFormSheet";

class FormSheet extends Component {
    render(){
        const {quoteId, formType} = this.props;

        const listFormType = FORM_TYPES.map(item => { 
            return {
                name: item.name,
                code: item.code 
            }
        });

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col md="2">
                        <FormattedMessage id="app.docs.Select_Form_Type" defaultMessage="Select Form Type"/>:
                    </Col>
                    <Col md="2">
                        <Field name="formType" className="mb-4"
                            textField="name" valueField="code" titleOption="-- SELECT --"
                            data={listFormType}
                            component={FieldDropdownList} />
                    </Col>
                </Row>
                <Row>
                    {
                        formType === "office-forms" && <Col md="12"><OfficeFormSheetContainer quoteId={quoteId}/></Col>
                    }
                    {
                        formType === "safety-forms" && <Col md="12"><SafetyFormSheetContainer quoteId={quoteId}/></Col>
                    }
                </Row>
            </div>
        );
    }
}

export default FormSheet;