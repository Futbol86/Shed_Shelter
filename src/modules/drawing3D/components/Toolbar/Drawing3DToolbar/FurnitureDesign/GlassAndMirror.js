import React, { Component } from 'react';
import { Field } from "redux-form";
import LaddaButton, { L, EXPAND_LEFT } from 'react-ladda';
import { Form, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { GLASS_OR_MIRROR_OPIONS } from '../../../../constants';
import { FieldInputPure, FieldDropdownList } from "../../../../../../components/common/Form";
import GlassInfoComponent from './GlassInfo';
import MirrorInfoComponent from './MirrorInfo';

class GlassAndMirrorComponent extends Component {
    render () {
        const { 
            glassOrMirrorOption, selectedGlassItem, selectedMirrorItem, isViewDetail,
            handleGlassIconDragStart, handleMirrorIconDragStart, 
            duplicateGlassItem, duplicateMirrorItem, removeGlassItem, removeMirrorItem, deSelectedGlassItem, deSelectedMirrorItem,
            handleSubmit, submitting, pristine, invalid
        } = this.props;

        let glassOrMirrorOptionList = [];

        GLASS_OR_MIRROR_OPIONS.map(item => {
            glassOrMirrorOptionList.push({ code: item.code, name: item.name, })
        });
        
        return (
            <React.Fragment>
                {
                    !((selectedGlassItem || selectedMirrorItem) && isViewDetail) &&
                    <div>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-2">
                                <Col xs={12}>
                                    <strong><FormattedMessage id="app.drawing3D.Type" defaultMessage="Type"/>:</strong>
                                </Col>
                                <Col xs={12} className="mt-1">
                                    <Field name="glassMirrorSettings.glassOrMirrorOption" textField="name" valueField="code" titleOption="-- Select --"
                                        data={glassOrMirrorOptionList} component={FieldDropdownList} />
                                </Col>
                            </Row>
                            {
                                glassOrMirrorOption === "glass" &&
                                <React.Fragment>
                                    <Row className="mb-2">
                                        <Col xs={12}>
                                            <strong><FormattedMessage id="app.drawing3D.Width" defaultMessage="Width (m)"/>:</strong>
                                            <Field name="glassMirrorSettings.glassWidth" type="number" component={FieldInputPure}
                                                parse={(value) => value && parseFloat(value)}/>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col xs={12}>
                                            <strong><FormattedMessage id="app.drawing3D.Height" defaultMessage="Height (m)"/>:</strong>
                                            <Field name="glassMirrorSettings.glassHeight" type="number" component={FieldInputPure}
                                                parse={(value) => value && parseFloat(value)}/>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col xs={12}>
                                            <strong><FormattedMessage id="app.drawing3D.Depth" defaultMessage="Depth (m)"/>:</strong>
                                            <Field name="glassMirrorSettings.glassDepth" type="number" component={FieldInputPure}
                                                parse={(value) => value && parseFloat(value)}/>
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            }
                            {
                                glassOrMirrorOption === "mirror" &&
                                <React.Fragment>
                                    <Row className="mb-2">
                                        <Col xs={12}>
                                            <strong><FormattedMessage id="app.drawing3D.Width" defaultMessage="Width (m)"/>:</strong>
                                            <Field name="glassMirrorSettings.mirrorWidth" type="number" component={FieldInputPure}
                                                parse={(value) => value && parseFloat(value)}/>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col xs={12}>
                                            <strong><FormattedMessage id="app.drawing3D.Height" defaultMessage="Height (m)"/>:</strong>
                                            <Field name="glassMirrorSettings.mirrorHeight" type="number" component={FieldInputPure}
                                                parse={(value) => value && parseFloat(value)}/>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col xs={12}>
                                            <strong><FormattedMessage id="app.drawing3D.Depth" defaultMessage="Depth (m)"/>:</strong>
                                            <Field name="glassMirrorSettings.mirrorDepth" type="number" component={FieldInputPure}
                                                parse={(value) => value && parseFloat(value)}/>
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            }
                            <hr />
                            {
                                glassOrMirrorOption &&
                                <React.Fragment>
                                    <Row className="mt-2 mb-2">
                                        <Col xs={12} className="text-center">
                                            <img id= {`${glassOrMirrorOption}-icon`} draggable={true} 
                                                src={`/assets/furnitures/icons/glass_mirrors/${glassOrMirrorOption}.png`} 
                                                title="Drag and Drop into scene"
                                                onDragStart={
                                                    (evt) => glassOrMirrorOption === "glass" ? 
                                                                handleGlassIconDragStart(evt, `${glassOrMirrorOption}-icon`)  
                                                            : handleMirrorIconDragStart(evt, `${glassOrMirrorOption}-icon`) 
                                                }
                                                style={{zIndex: -100, cursor:'pointer'}}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-2 mb-4">
                                        <Col xs={12} className='text-center'>
                                            <span><i>You need at least 1 wall to attach {glassOrMirrorOption}</i></span>
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            }
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
                    </div>
                }
                {
                    selectedGlassItem && isViewDetail && 
                    <GlassInfoComponent selectedGlassItem={selectedGlassItem} 
                                        duplicateGlassItem={duplicateGlassItem} 
                                        removeGlassItem={removeGlassItem} 
                                        deSelectedGlassItem={deSelectedGlassItem}/>
                }
                {
                    selectedMirrorItem && isViewDetail && 
                    <MirrorInfoComponent selectedMirrorItem={selectedMirrorItem} 
                                         duplicateMirrorItem={duplicateMirrorItem} 
                                         removeMirrorItem={removeMirrorItem} 
                                         deSelectedMirrorItem={deSelectedMirrorItem}/>
                }
            </React.Fragment>
        )
    }
};

export default GlassAndMirrorComponent;