import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../ModalStyles.css';

const successModal = (props) => {
    return (
            <Modal show={props.show} backdrop="static" animation={false}>
                <Modal.Header>
                    {props.modalHeaderText}
                </Modal.Header>
                <Modal.Body>
                    <p>{props.modalBodyText}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.successClick}>{props.okButtonText}</Button>
                </Modal.Footer>
            </Modal>
    )
}
 
export default successModal;