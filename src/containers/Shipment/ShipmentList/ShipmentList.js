import React, { Component } from 'react';
import { Table, Col, Row, Button } from 'react-bootstrap';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { connect } from 'react-redux';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import Shipment from '../../../components/ShipmentComponents/Shipment/Shipment';
import SuccessModal from '../../../components/Modals/SuccessModal/SuccessModal';
import ErrorModal from '../../../components/Modals/ErrorModal/ErrorModal';
import ConfirmDialog from '../../../components/Dialogs/ConfirmDialog';

class ShipmentList extends Component {
    constructor (props) {
		super(props)
		this.state = { dialogOpen: false, shipmentToDelete: null, ...this.state };
        this.setConfirmOpen = this.setConfirmOpen.bind(this);
        this.shipmentToDelete = this.shipmentToDelete.bind(this);
	}
	componentDidMount = () => {
		let url = '/api/shipments';
		this.props.onGetData(url, { ...this.props });
	}
    redirectToCreateShipment = () => {
        this.props.history.push('/createShipment');
    }

    deleteShipment = (id) => {
		const url = "/api/shipments/" + id;

		this.props.onDeleteShipment(url, { ...this.props });
	}
    shipmentToDelete = (id) => {
        this.setState({shipmentToDelete: id});
    }
    setConfirmOpen = (a) => {
		this.setState({dialogOpen: a});
	}

    render() {
        let shipments = [];
		if (this.props.data && this.props.data.shipment && this.props.data.shipment.length > 0
            && this.props.data.airports) {
		shipments = this.props.data.shipment.map((shipment) => {
			return (
				<Shipment key={shipment.shipmentId} shipment={shipment}
                airport={this.props.data.airports.find(x => x.value === shipment.airport).name}
                setConfirmOpen={this.setConfirmOpen} shipmentToDelete={this.shipmentToDelete}
                {...this.props}/>
			)
		})
		}
        return (
            <div className="well">
                <h1>
                    List of shipments
                </h1>
                <h3>
                    Click shipment to view details and manage contents
                </h3>
            <Aux>
                <Row>
                    <Col md={2}>
                        <Button onClick={this.redirectToCreateShipment}>
                            Create new shipment
                        </Button>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md={12}>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>Shipment number</th>
                                    <th>Airport</th>
                                    <th>Flight number</th>
                                    <th>Flight date</th>
									<th>Finalized</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shipments}
                            </tbody>
                        </Table>
                        <ConfirmDialog
                            key={'dialog'}
                            title="Delete shipment?"
                            open={this.state.dialogOpen}
                            setOpen={this.setConfirmOpen}
                            onConfirm={ () => {this.deleteShipment(this.state.shipmentToDelete);}}
                        >
                            Are you sure you want to delete this shipment?
                        </ConfirmDialog>
                    </Col>
                </Row>
                <SuccessModal key={'success'} show={this.props.showSuccessModal} modalHeaderText={'Success'}
                    modalBodyText={'Shipment deleted successfully'}
                    okButtonText={'OK'}
                    successClick={() => {this.props.onCloseSuccessModal('/shipment-list', { ...this.props }); window.location.reload();}} />
                <ErrorModal key={'error'} show={this.props.showErrorModal} modalHeaderText={'Error'}
                    modalBodyText={this.props.errorMessage}
                    okButtonText={'OK'}
                    closeModal={() => this.props.onCloseErrorModal()} />
            </Aux>
            </div>
        )
    
}
}

const mapStateToProps = (state) => {     
		return {  
		    data: state.repository.data,
            showSuccessModal: state.repository.showSuccessModal,
            showErrorModal: state.errorHandler.showErrorModal,
            errorMessage: state.errorHandler.errorMessage     
		} 
}
const mapDispatchToProps = (dispatch) => {
	 return {
		 onGetData: (url, props) => dispatch(repositoryActions.getData(url, props)),
         onDeleteShipment: (url, props) => dispatch(repositoryActions.deleteData(url, props)),
         onCloseSuccessModal: (url, props) => dispatch(repositoryActions.closeSuccessModal(props, url)),
         onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal())
	} 
}
	
export default connect(mapStateToProps, mapDispatchToProps)(ShipmentList);