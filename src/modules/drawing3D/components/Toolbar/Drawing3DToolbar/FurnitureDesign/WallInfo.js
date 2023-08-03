import React from 'react';
import { Field, FieldArray } from "redux-form";
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { Row, Col, Button, Label } from 'reactstrap';
import { 
    FURNITURE_WALL_TYPES, FURNITURE_WALL_HEIGHT_TYPES, FURNITURE_STUD_SIZE, 
    WALL_CLADDING_TYPES, WALL_CLADDING_MATERIALS, EXTERN_WALL_CLADDINGS, FURNITURE_DOOR_TYPES, 
    SIMULATE_3D_SCALE 
} from '../../../../constants';

const WallInfoComponent = ({ selectedWall }) => {
    const { name } = selectedWall || {};

    const { 
        wallType, wallHeightType, wallLength, 
        wallHeight, minWallHeight, maxWallHeight, leftWallHeight, rightWallHeight, 
        studSize, studDistance,
        wallCladdingType, wallCladdingMaterial, externWallCladding, 
    } = selectedWall && selectedWall.wallParams || {};

    let wallTypeName = FURNITURE_WALL_TYPES[wallType]?.name;
    let wallHeightTypeName = FURNITURE_WALL_HEIGHT_TYPES[wallHeightType]?.name;
    let studSizeName = FURNITURE_STUD_SIZE[studSize]?.name;
    let wallCladdingTypeName = WALL_CLADDING_TYPES[wallCladdingType]?.name;
    let wallCladdingMaterialName = WALL_CLADDING_MATERIALS[wallCladdingMaterial]?.name;
    let externWallCladdingName = EXTERN_WALL_CLADDINGS[externWallCladding]?.name;

    return (
        <div>
            <Row className="mt-4">
                <Col md={12}>
                    <h5><strong><u><FormattedMessage id="app.drawing3D.Wall_Detail" defaultMessage="Wall Detail"/></u></strong></h5>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Wall_Name" defaultMessage="Wall Name"/></strong>
                </Col>
                <Col md={6}>
                    {name}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Wall_Type" defaultMessage="Wall Type"/></strong>
                </Col>
                <Col md={6}>
                    {wallTypeName}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Wall_Height_Type" defaultMessage="Wall Height Type"/></strong>
                </Col>
                <Col md={6}>
                    {wallHeightTypeName}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Length" defaultMessage="Length"/></strong>
                </Col>
                <Col md={6}>
                    <FormattedNumber value={wallLength/SIMULATE_3D_SCALE}/>{` m`}
                </Col>
            </Row>
            {
                wallHeight &&
                <Row className="mt-2">
                    <Col md={6}>
                        <strong><FormattedMessage id="app.drawing3D.Height" defaultMessage="Height"/></strong>
                    </Col>
                    <Col md={6}>
                        <FormattedNumber value={wallHeight/SIMULATE_3D_SCALE}/>{` m`}
                    </Col>
                </Row>
            }
            {
                minWallHeight &&
                <Row className="mt-2">
                    <Col md={6}>
                        <strong><FormattedMessage id="app.drawing3D.Min_Height" defaultMessage="Min Height"/></strong>
                    </Col>
                    <Col md={6}>
                        <FormattedNumber value={minWallHeight/SIMULATE_3D_SCALE}/>{` m`}
                    </Col>
                </Row>
            }
            {
                maxWallHeight &&
                <Row className="mt-2">
                    <Col md={6}>
                        <strong><FormattedMessage id="app.drawing3D.Max_Height" defaultMessage="Max Height"/></strong>
                    </Col>
                    <Col md={6}>
                        <FormattedNumber value={maxWallHeight/SIMULATE_3D_SCALE}/>{` m`}
                    </Col>
                </Row>
            }
            {
                leftWallHeight &&
                <Row className="mt-2">
                    <Col md={6}>
                        <strong><FormattedMessage id="app.drawing3D.Left_Height" defaultMessage="Min Height"/></strong>
                    </Col>
                    <Col md={6}>
                        <FormattedNumber value={leftWallHeight/SIMULATE_3D_SCALE}/>{` m`}
                    </Col>
                </Row>
            }
            {
                rightWallHeight &&
                <Row className="mt-2">
                    <Col md={6}>
                        <strong><FormattedMessage id="app.drawing3D.Right_Height" defaultMessage="Max Height"/></strong>
                    </Col>
                    <Col md={6}>
                        <FormattedNumber value={rightWallHeight/SIMULATE_3D_SCALE}/>{` m`}
                    </Col>
                </Row>
            }
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Stud_Size" defaultMessage="Stud Size"/></strong>
                </Col>
                <Col md={6}>
                    {studSizeName}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Stud_Distance" defaultMessage="Stud Distance"/></strong>
                </Col>
                <Col md={6}>
                    <FormattedNumber value={studDistance/SIMULATE_3D_SCALE}/>{` m`}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={6}>
                    <strong><FormattedMessage id="app.drawing3D.Wall_Cladding_Type" defaultMessage="Wall Cladding Type"/></strong>
                </Col>
                <Col md={6}>
                    {wallCladdingTypeName}
                </Col>
            </Row>
            {
                wallCladdingMaterial &&
                <Row className="mt-2">
                    <Col md={6}>
                        <strong><FormattedMessage id="app.drawing3D.Wall_Cladding_Material" defaultMessage="Wall Cladding Material"/></strong>
                    </Col>
                    <Col md={6}>
                        {wallCladdingMaterialName}
                    </Col>
                </Row>
            }
            {
                externWallCladding &&
                <Row className="mt-2">
                    <Col md={6}>
                        <strong><FormattedMessage id="app.drawing3D.Extern_Wall_Cladding" defaultMessage="Extern Wall Cladding"/></strong>
                    </Col>
                    <Col md={6}>
                        {externWallCladdingName}
                    </Col>
                </Row>
            }
        </div>
    )
};

export default WallInfoComponent;