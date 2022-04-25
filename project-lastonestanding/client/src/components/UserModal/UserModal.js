import React, { Component } from 'react';

import validator from 'validator';
import Modal from 'react-responsive-modal';
import {Button, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';

import './UserModal.css';

class UserModal extends Component {
    constructor(props) {
        super();
        this.state = {
            name: ''
        };
        this.closeModal = this.closeModal.bind(this);
    }

    updateName(e) {
        this.setState({ name: e.target.value });
    }

    onSaveName() {
        if(this.state.name.length === 0 || validator.isAlphanumeric(this.state.name)) {
            this.props.saveName(this.state.name);
            this.setState({ name: ''});
            this.props.closeModal();
        } else {
            alert("Invlid Input");
        }
    }

    closeModal() {
        this.setState({ name: ''});
        this.props.closeModal();
    }

    render() {
        return (
            <Modal 
                open={this.props.visible}
                onClose={this.closeModal}
                showCloseIcon = {false}
                closeOnOverlayClick = {false}>
                <div>
                    <ModalHeader>Enter your name below</ModalHeader>
                    <ModalBody>
                        <Input type="text" value={this.state.name} placeholder="Add name" onChange={this.updateName.bind(this)}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                                color='dark' 
                                stype={{marginBottom: '2rem'}}
                                onClick={this.closeModal.bind(this)}
                            >Cancel</Button>
                        <Button
                                color='dark' 
                                stype={{marginBottom: '2rem'}}
                                onClick={this.onSaveName.bind(this)}
                            >Save</Button>
                    </ModalFooter>
                </div>
            </Modal>
        )
    }
}

export default UserModal;
