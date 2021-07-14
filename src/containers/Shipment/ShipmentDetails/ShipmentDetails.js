import React, { Component } from 'react';
import { Form, Button, FormGroup, Col, Row, Table } from 'react-bootstrap';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import { connect } from 'react-redux';
import moment from 'moment';
import Moment from 'react-moment';
import SuccessModal from '../../../components/Modals/SuccessModal/SuccessModal';
import ErrorModal from '../../../components/Modals/ErrorModal/ErrorModal';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Bag from '../../../components/BagComponents/Bag/Bag';
import ConfirmDialog from '../../../components/Dialogs/ConfirmDialog';

class ShipmentDetails extends Component {
	constructor (props) {
		super(props)
		this.state = { dialogOpen: false, dialog2Open: false, bagToDelete: null, ...this.state };
        this.setConfirmOpen = this.setConfirmOpen.bind(this);
		this.setConfirm2Open = this.setConfirm2Open.bind(this);
        this.bagToDelete = this.bagToDelete.bind(this);
	}

	componentDidMount = () => {
		const id = this.props.match.params.id;
		const url = '/api/shipments/' + id;
		this.props.onGetShipmentById(url, { ...this.props });
	}

	redirectToShipmentList = () => {
		this.props.history.push('/shipment-list');
	}

	redirectToCreateParcelBag = (id, history) => {
		history.push('/createParcelBag/shipment:'+id);
	}

	redirectToCreateLetterBag = (id, history) => {
		history.push('/createLetterBag/shipment:'+id);
	}

	finalizeShipment = () => {
		const shipmentToFinalize = {
			shipmentId: this.props.data.shipment[0].shipmentId,
			shipmentNo: this.props.data.shipment[0].shipmentNo,
			airport: this.props.data.shipment[0].airport,
			flightNo: this.props.data.shipment[0].flightNo,
			flightDate: this.props.data.shipment[0].flightDate,
			finalized: true
		}
		const url = '/api/shipments/'+this.props.data.shipment[0].shipmentId;
		this.props.onFinalizeShipment(url, shipmentToFinalize, { ...this.props });
	}

	deleteBag = (id) => {
		const url = "/api/bags/" + id;

		this.props.onDeleteBag(url, { ...this.props });
	}

	bagToDelete = (id) => {
        this.setState({bagToDelete: id});
    }

    setConfirmOpen = (a) => {
		this.setState({dialogOpen: a});
	}

	setConfirm2Open = (a) => {
		this.setState({dialog2Open: a});
	}

    render() { 
		let bags = [];
		let shipment = {shipmentNo: '', finalized: false, flightDate: '', flightNo: '', airport:''};
		let airports = {};
		let airport_name = '';
		let can_finalize = false;
		let finalize_text = ''
		let current_date = moment();
		if (this.props.data && this.props.data.shipment && this.props.data.shipment[0].bags &&
			this.props.data.shipment[0].bags.length > 0) {
		bags = this.props.data.shipment[0].bags.map((bag) => {
			return (
				<Bag key={bag.bagId} bag={bag} 
				setConfirmOpen={this.setConfirmOpen} bagToDelete={this.bagToDelete}
				{...this.props} />
			)
		});
		}
		if (this.props.data && this.props.data.shipment && this.props.data.shipment.length > 0 && this.props.data.airports) {
			shipment = this.props.data.shipment[0];
			airports = this.props.data.airports;
			airport_name = airports.find(x => x.value === shipment.airport).name;
			if (!this.props.data.shipment[0].finalized && !current_date.isAfter(this.props.data.shipment[0].flightDate)
				&& this.props.data.shipment[0].bags && this.props.data.shipment[0].bags.length > 0) {
				can_finalize = true;
				finalize_text = 'Shipment is ready for finalization.'
				this.props.data.shipment[0].bags.forEach(bag => {
					if (bag.type === 0 && bag.parcels.length <= 0) {
						can_finalize = false;
						finalize_text = 'Shipment cannot be finalized with empty parcel bags.'
					}
				});
			}
			if (!this.props.data.shipment[0].finalized && current_date.isAfter(this.props.data.shipment[0].flightDate)) {
				finalize_text = 'Flight date is overdue, shipment cannot be finalized.'
			}
			else if (!this.props.data.shipment[0].finalized && !current_date.isAfter(this.props.data.shipment[0].flightDate)
			&& this.props.data.shipment[0].bags && this.props.data.shipment[0].bags.length <= 0) {
				finalize_text = 'Shipment can be finalized after adding bags.'
			}
		}
        return (  
            <div className="well">
				<h1>
					Details of shipment [{shipment.shipmentNo}]
				</h1>
				<h4>(Airport: {airport_name},  
				 Flight number: {shipment.flightNo},   Flight date:<Moment format="DD/MM/YYYY">{shipment.flightDate}</Moment>)
				 </h4>
				<h3>
					{shipment.finalized ? 'Shipment is finalized, contents can only be viewed.' : 
					finalize_text}
				</h3>

                <Form onSubmit={() => {console.log("");}}>
					<br />
					<FormGroup>
					<Col md={2}>
						<Button disabled={shipment.finalized} onClick={ () => this.redirectToCreateParcelBag(this.props.match.params.id, this.props.history)}>Add bag of parcels</Button>
					</Col>
					<Col md={2}>
						<Button disabled={shipment.finalized} onClick={ () => this.redirectToCreateLetterBag(this.props.match.params.id, this.props.history)}>Add bag of letters</Button>
					</Col>
					<Col md={2}>
						<Button disabled={!can_finalize} onClick={ () => this.setConfirm2Open(true) }>Finalize shipment</Button>
					</Col>
					<Col md={1}>
						<Button onClick={this.redirectToShipmentList}>Back</Button>
					</Col>
					</FormGroup>
				</Form>
				<Aux>
					<br />
					<h3>
						List of bags: click bag to view details and manage parcels
					</h3>
					<Row>
						<Col md={12}>
							<Table responsive striped>
								<thead>
									<tr>
										<th>Bag number</th>
										<th>Type</th>
										<th>Number of items</th>
										<th>Weight</th>
										<th>Price</th>
										<th>Delete</th>
									</tr>
								</thead>
								<tbody>
									{bags}
								</tbody>
							</Table>
						</Col>
					</Row>
					<ConfirmDialog
						key={'dialog-delete'}
						title="Delete bag?"
						open={this.state.dialogOpen}
						setOpen={this.setConfirmOpen}
						onConfirm={ () => {this.deleteBag(this.state.bagToDelete);}}
					>
						Are you sure you want to delete this bag?
					</ConfirmDialog>
					<ConfirmDialog
						key={'dialog-finalize'}
						title="Finalize shipment?"
						open={this.state.dialog2Open}
						setOpen={this.setConfirm2Open}
						onConfirm={this.finalizeShipment}
					>
						No more bags can be added after finalizing.
					</ConfirmDialog>
				</Aux>
				<SuccessModal show={this.props.showSuccessModal} modalHeaderText={'Success'} 
					modalBodyText={'Action completed successfully'}
					okButtonText={'OK'} 
					successClick={() => {this.props.onCloseSuccessModal('/shipmentDetails/'+this.props.match.params.id, { ...this.props }); window.location.reload();}} />
				<ErrorModal show={this.props.showErrorModal} modalHeaderText={'Error'} 
					modalBodyText={this.props.errorMessage}
					okButtonText={'OK'} 
					closeModal={() => this.props.onCloseErrorModal()} />
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
        onGetShipmentById: (url, props) => dispatch(repositoryActions.getData(url, props)),
		onFinalizeShipment: (url, shipment, props) => dispatch(repositoryActions.putData(url, shipment, props)),
		onDeleteBag: (url, props) => dispatch(repositoryActions.deleteData(url, props)),
        onCloseSuccessModal: (url, props) => dispatch(repositoryActions.closeSuccessModal(props, url)),
        onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ShipmentDetails);