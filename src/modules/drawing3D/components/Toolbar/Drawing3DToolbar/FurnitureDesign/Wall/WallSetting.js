import React from 'react';
import { Field } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import { Row, Col, Form } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { FieldInputPure, FieldDropdownList } from "../../../../../../../components/common/Form";

import { 
    FURNITURE_WALL_TYPES, FURNITURE_WALL_HEIGHT_TYPES, FURNITURE_STUD_SIZE, 
    FURNITURE_STUD_DISTANCE, CUSTOM_WALL, WALL_CLADDING_TYPES, WALL_CLADDING_NONE,
    WALL_CLADDING_MATERIALS, EXTERN_WALL_CLADDINGS
} from '../../../../../constants';

const WallSettingComponent = ({ 
    wallTypeFormData, wallHeightTypeFormData, wallCladdingTypeFormData, 
    handleSubmit, submitting, pristine, invalid
}) => {
    let wallTypeList = [];
    Object.keys(FURNITURE_WALL_TYPES).map(key => {
        wallTypeList.push({ code: key, name: FURNITURE_WALL_TYPES[key].name, });
    });

    let wallHeightTypeList = [];
    Object.keys(FURNITURE_WALL_HEIGHT_TYPES).map(key => {
        wallHeightTypeList.push({ code: key, name: FURNITURE_WALL_HEIGHT_TYPES[key].name, });
    });
    
    let studSizeList = [];
    Object.keys(FURNITURE_STUD_SIZE).map(key => {
        if(FURNITURE_STUD_SIZE[key].wallType === wallTypeFormData) {
            studSizeList.push({ code: key, name: FURNITURE_STUD_SIZE[key].name, });
        }
    });
    
    let studDistanceList = [];
    Object.keys(FURNITURE_STUD_DISTANCE).map(key => {
        studDistanceList.push({ code: key, name: FURNITURE_STUD_DISTANCE[key].name, });
    });

    let wallCladdingTypeList = [];
    Object.keys(WALL_CLADDING_TYPES).map(key => {
        wallCladdingTypeList.push({ code: key, name: WALL_CLADDING_TYPES[key].name, });
    });

    let wallCladdingMaterialList = [];
    Object.keys(WALL_CLADDING_MATERIALS).map(key => {
        wallCladdingMaterialList.push({ code: key, name: WALL_CLADDING_MATERIALS[key].name, });
    });

    let externWallCladdingList = [];
    Object.keys(EXTERN_WALL_CLADDINGS).map(key => {
        externWallCladdingList.push({ code: key, name: EXTERN_WALL_CLADDINGS[key].name, });
    });

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mt-2">
                <Col xs={12} className="mt-1">
                    <strong><FormattedMessage id="app.drawing3D.Wall_Type" defaultMessage="Wall Type"/>:</strong>
                    <Field name="wallSettings.wallType" textField="name" valueField="code" titleOption="-- Select --"
                           data={wallTypeList} component={FieldDropdownList} />
                </Col>
            </Row>
            <Row className="mt-2">
                <Col xs={12} className="mt-1">
                    <strong><FormattedMessage id="app.drawing3D.Wall_Height_Type" defaultMessage="Wall Height Type"/>:</strong>
                    <Field name="wallSettings.wallHeightType" textField="name" valueField="code" titleOption="-- Select --"
                           data={wallHeightTypeList} component={FieldDropdownList} />
                </Col>
            </Row>
            {
                wallHeightTypeFormData === CUSTOM_WALL &&
                <Row>
                    <Col xs={12}>
                        <strong><FormattedMessage id="app.drawing3D.Wall_Height" defaultMessage="Wall Height (m)"/>:</strong>
                        <Field name="wallSettings.wallHeight" type="number" component={FieldInputPure} 
                               parse={(value) => value && parseFloat(value)} />
                    </Col>
                </Row>
            }
            <Row className="mt-2">
                <Col xs={12} className="mt-1">
                    <strong><FormattedMessage id="app.drawing3D.Wall_Cladding_Type" defaultMessage="Wall Cladding Type"/>:</strong>
                    <Field name="wallSettings.wallCladdingType" textField="name" valueField="code" titleOption="-- Select --"
                           data={wallCladdingTypeList} component={FieldDropdownList} />
                </Col>
            </Row>
            {
                (wallCladdingTypeFormData && wallCladdingTypeFormData !== WALL_CLADDING_NONE) &&
                <React.Fragment>
                    <Row className="mt-2">
                        <Col xs={12} className="mt-1">
                            <strong><FormattedMessage id="app.drawing3D.Wall_Cladding_Material" defaultMessage="Wall Cladding Material"/>:</strong>
                            <Field name="wallSettings.wallCladdingMaterial" textField="name" valueField="code" titleOption="-- Select --"
                                data={wallCladdingMaterialList} component={FieldDropdownList} />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={12} className="mt-1">
                            <strong><FormattedMessage id="app.drawing3D.Extern_Wall_Cladding" defaultMessage="Extern Wall Cladding"/>:</strong>
                            <Field name="wallSettings.externWallCladding" textField="name" valueField="code" titleOption="-- Select --"
                                data={externWallCladdingList} component={FieldDropdownList} />
                        </Col>
                    </Row>
                </React.Fragment>
            }
            <Row className="mt-2">
                <Col xs={12} className="mt-1">
                    <strong><FormattedMessage id="app.drawing3D.Stud_Size" defaultMessage="Stud Size"/>:</strong>
                    <Field name="wallSettings.studSize" textField="name" valueField="code" titleOption="-- Select --"
                           data={studSizeList} component={FieldDropdownList} />
                </Col>
            </Row>
            <Row className="mt-2">
                <Col xs={12} className="mt-1">
                    <strong><FormattedMessage id="app.drawing3D.Stud_Distance" defaultMessage="Stud Distance"/>:</strong>
                    <Field name="wallSettings.studDistance" textField="name" valueField="code" titleOption="-- Select --"
                           data={studDistanceList} component={FieldDropdownList} />
                </Col>
            </Row>
            <Row className="mt-2 mb-2">
                <Col md={12} xs={12} className="d-flex justify-content-center">
                    <LaddaButton data-size={L} data-style={EXPAND_LEFT} data-color="green"
                            data-spinner-lines={12} className="btn btn-dark" type="submit"
                            loading={submitting} disabled={submitting || invalid || pristine}>
                        <i className="icon-note" />{` `}
                        <FormattedMessage id="app.drawing3D.Save_Choice" defaultMessage="Save Choice" />
                    </LaddaButton>
                </Col>
            </Row>
        </Form>
    )
};

export default WallSettingComponent;