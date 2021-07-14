import React, { Component } from 'react';
import Input from '../../../UI/Inputs/Input';
import { Form, Button, FormGroup, Col } from 'react-bootstrap';
import { returnCreateInputConfiguration } from '../../../Utility/InputConfiguration';
import * as formUtilityActions from '../../../Utility/FormUtility';
import { connect } from 'react-redux';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import SuccessModal from '../../../components/Modals/SuccessModal/SuccessModal';
import ErrorModal from '../../../components/Modals/ErrorModal/ErrorModal';
import ReactTooltip from 'react-tooltip';

class CreateShipment extends Component {
    state = {
        shipmentForm: {},
        isFormValid: false
    }

    componentDidMount = () =>{
		let url = '/api/shipments/airports';
		this.props.onGetData(url, { ...this.props });
        this.setState({ shipmentForm: returnCreateInputConfiguration() });
    }
	
	handleChangeEvent = (event, id) => {
		const updatedShipmentForm = { ...this.state.shipmentForm };
		updatedShipmentForm[id] = formUtilityActions.executeValidationAndReturnFormElement(event, updatedShipmentForm, id);

		const counter = formUtilityActions.countInvalidElements(updatedShipmentForm);

		this.setState({ shipmentForm: updatedShipmentForm, isFormValid: counter === 0 })
	}
	
	createShipment = (event) => {
		event.preventDefault();

		const shipmentToCreate = {
			shipmentNo: this.state.shipmentForm.shipmentNo.value,
			airport: parseInt(this.state.shipmentForm.airport.value),
			flightNo: this.state.shipmentForm.flightNo.value,
			flightDate: this.state.shipmentForm.flightDate.value
		}

		const url = '/api/shipments';
		this.props.onCreateShipment(url, shipmentToCreate, { ...this.props });
	}
	
	redirectToShipmentList = () => {
		this.props.history.push('/shipment-list');
	}
    
    render() { 
		const formElementsArray = formUtilityActions.convertStateToArrayOfFormObjects({ ...this.state.shipmentForm });
        return ( 
			<div className="well" key={'div1'}>
				<h1>
					Create new shipment
				</h1>
				<br />
				<Form onSubmit={this.createShipment}>
					{
						formElementsArray.map(element => {
							return <div data-tip={element.config.tooltip} key={'div2'+element.id}> <Input label={element.config.label} data={this.props.data}
							key={element.id} elementType={element.config.element} id={element.id} 
							type={element.config.type} value={element.config.value} 
							changed={(event) => this.handleChangeEvent(event, element.id)}
							errorMessage={element.config.errorMessage} 
							invalid={!element.config.valid} shouldValidate={element.config.validation}
							touched={element.config.touched} 
							blur={(event) => this.handleChangeEvent(event, element.id)} />
							<ReactTooltip key={element.id+'tooltip'}/> </div>
						})
					}
					<br />
					<FormGroup>
						 <Col md={1}>
							  <Button key={'b1'} type='submit' disabled={!this.state.isFormValid}>Create</Button>
						 </Col>
						 <Col md={1}>
							   <Button key={'b2'} onClick={this.redirectToShipmentList}>Cancel</Button>
						 </Col>
					</FormGroup>
					<br />
				</Form>
				<SuccessModal show={this.props.showSuccessModal} 
					   modalHeaderText={'Success'} 
					   modalBodyText={'Shipment created successfully'}
					   okButtonText={'OK'} 
					   successClick={() => this.props.onCloseSuccessModal('/shipment-list', { ...this.props })} />

				<ErrorModal show={this.props.showErrorModal} 
						modalHeaderText={'Error'} 
						modalBodyText={this.props.errorMessage}
						okButtonText={'OK'} closeModal={() => this.props.onCloseErrorModal()} />
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
        onCreateShipment: (url, shipment, props) => dispatch(repositoryActions.postData(url, shipment, props)),
        onCloseSuccessModal: (url, props) => dispatch(repositoryActions.closeSuccessModal(props, url)),
        onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(CreateShipment);