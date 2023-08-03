import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MODAL_TYPE_CONFIRMATION } from '../../../constants';

import MyPortal from '../MyPortal';

class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    onClose(){
        this.toggle();
        if(this.props.item.onClose){
            this.props.item.onClose();
            this.props.onClose(this.props.item);
        } else {
            this.props.onClose(this.props.item);
        }
    }
    onConfirm(){
        this.toggle();
        if(this.props.item.onConfirm){
            this.props.item.onConfirm();
            this.props.onClose(this.props.item);
        }
    }
    render() {
        const { type } = this.props.item;
        if (type === MODAL_TYPE_CONFIRMATION) {
            const { text, id } = this.props.item;
            return (
                <Modal isOpen={this.state.modal} toggle={this.toggle} id={`modal-${id}`}>
                    <ModalHeader>
                        Confirmation
                    </ModalHeader>

                    <ModalBody>
                        <div dangerouslySetInnerHTML={{__html: text}}></div>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="success" onClick={() => this.onConfirm()}>Confirm</Button>
                        <Button color="danger" onClick={() => this.onClose()}>Close</Button>
                    </ModalFooter>
                </Modal>
            )
        } else if (type === 'custom') { //-- TODO: Add more types
            const { content } = this.props.item;
            return (
                <div className="modal-wrapper">
                    <div className="modal">
                        <button className="close" onClick={() => this.onClose()}>&times;</button>
                        <div dangerouslySetInnerHTML={{__html: content}}></div>
                    </div>
                </div>
            )
        }
        return (
            <div />
        );
    }
}

class ModalsComponent extends Component {
    render() {
        const {modals, closeModalAction} = this.props;
        const modalsList = modals.map((item, i) => (
            <MyPortal key={i}>
                <ModalComponent item={item}
                                onClose={(item) => closeModalAction(item)}
                                onConfirm={(item) => closeModalAction(item)}
                />
            </MyPortal>
        ));
        return (
            <div className="modals">
                {modalsList}
            </div>
        );
    }
}

export default ModalsComponent;