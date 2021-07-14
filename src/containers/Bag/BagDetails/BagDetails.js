import React, { Component } from 'react';
import { Form, Button, FormGroup, Col, Row, Table } from 'react-bootstrap';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import { connect } from 'react-redux';
import SuccessModal from '../../../components/Modals/SuccessModal/SuccessModal';
import ErrorModal from '../../../components/Modals/ErrorModal/ErrorModal';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Parcel from '../../../components/ParcelComponents/Parcel/Parcel';
import ConfirmDialog from '../../../components/Dialogs/ConfirmDialog';

class BagDetails extends Component {
	constructor (props) {
		super(props)
		this.state = { dialogOpen: false, parcelToDelete: null, ...this.state };
        this.setConfirmOpen = this.setConfirmOpen.bind(this);
        this.parcelToDelete = this.parcelToDelete.bind(this);
	}

	componentDidMount = () => {
		const id = this.props.match.params.id;
		const url = '/api/bags/' + id;
		this.props.onGetBagById(url, { ...this.props });
	}

	redirectToShipmentDetails = () => {
		this.props.history.push('/shipmentDetails/'+this.props.data.shipmentId);
	}

	redirectToCreateParcel = (id, history) => {
		history.push('/createParcel/bag:'+id);
	}

	deleteParcel = (id) => {
		const url = "/api/parcels/" + id;

		this.props.onDeleteParcel(url, { ...this.props });
	}

	parcelToDelete = (id) => {
        this.setState({parcelToDelete: id});
    }

    setConfirmOpen = (a) => {
		this.setState({dialogOpen: a});
	}

    render() { 
		let parcels = [];
		let bag = {bagNo: '', letterCount: '', weight: '', price: ''};
		let content = '';
		if (this.props.data && this.props.data.bag && this.props.data.bag.parcels &&
			this.props.data.bag.parcels.length > 0) {
		parcels = this.props.data.bag.parcels.map((parcel) => {
			return (
				<Parcel key={parcel.parcelId} parcel={parcel} setConfirmOpen={this.setConfirmOpen} 
				delete_disabled={this.props.data.bag.finalized} parcelToDelete={this.parcelToDelete}{...this.props} />
			)
		});
		}
        if (this.props.data && this.props.data.bag) {
            bag = this.props.data.bag;
			if (this.props.data.bag.type === 0) {
				content = (<div className="well">
				<h1>
					Bag of parcels [{bag.bagNo}]
				</h1>
					<Form onSubmit={() => {console.log("");}}>
					<br />
					<FormGroup>
					<Col md={2}>
						<Button disabled={this.props.data.bag.finalized} onClick={ () => this.redirectToCreateParcel(this.props.match.params.id, this.props.history)}>Add parcel</Button>
					</Col>
					<Col md={1}>
						<Button onClick={this.redirectToShipmentDetails}>Back</Button>
					</Col>
					</FormGroup>
				</Form>
				<Aux>
					<br />
					<h3>
						List of parcels:
					</h3>
					<Row>
						<Col md={12}>
							<Table responsive striped>
								<thead>
									<tr>
										<th>Parcel number</th>
										<th>Recipient name</th>
										<th>Destination country</th>
										<th>Weight</th>
										<th>Price</th>
										<th>Delete</th>
									</tr>
								</thead>
								<tbody>
									{parcels}
								</tbody>
							</Table>
						</Col>
					</Row>
					<ConfirmDialog
                            key={'dialog'}
                            title="Delete parcel?"
                            open={this.state.dialogOpen}
                            setOpen={this.setConfirmOpen}
                            onConfirm={ () => {this.deleteParcel(this.state.parcelToDelete);}}
                        >
                            Are you sure you want to delete this parcel?
                        </ConfirmDialog>
				</Aux>
				<SuccessModal show={this.props.showSuccessModal} modalHeaderText={'Success'} 
					modalBodyText={'Parcel deleted successfully'}
					okButtonText={'OK'} 
					successClick={() => {this.props.onCloseSuccessModal('/bagDetails/'+this.props.match.params.id, { ...this.props }); window.location.reload();}} />
				<ErrorModal show={this.props.showErrorModal} modalHeaderText={'Error'} 
					modalBodyText={this.props.errorMessage}
					okButtonText={'OK'} 
					closeModal={() => this.props.onCloseErrorModal()} />
				</div>);
				
			}
			else {
				content = (
					<div className="well">
						<h1>
							Bag of letters [{bag.bagNo}]
						</h1>
						<h4>
							Number of letters: {bag.letterCount}
						</h4>
						<h4>
							Weight: {bag.weight}
						</h4>
						<h4>
							Price: {bag.price}
						</h4>
						<Row>
							<Button onClick={this.redirectToShipmentDetails}>Back</Button>
						</Row>
					</div>
				);
			}
        }
        return (  
			<div>{content}</div>
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
        onGetBagById: (url, props) => dispatch(repositoryActions.getData(url, props)),
		onDeleteParcel: (url, props) => dispatch(repositoryActions.deleteData(url, props)),
        onCloseSuccessModal: (url, props) => dispatch(repositoryActions.closeSuccessModal(props, url)),
        onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(BagDetails);