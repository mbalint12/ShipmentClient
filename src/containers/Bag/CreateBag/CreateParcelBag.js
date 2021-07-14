import React, { Component } from 'react';
import Input from '../../../UI/Inputs/Input';
import { Form, Button, FormGroup, Col } from 'react-bootstrap';
import { returnParcelBagInputConfiguration } from '../../../Utility/InputConfiguration';
import * as formUtilityActions from '../../../Utility/FormUtility';
import { connect } from 'react-redux';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import SuccessModal from '../../../components/Modals/SuccessModal/SuccessModal';
import ErrorModal from '../../../components/Modals/ErrorModal/ErrorModal';
import ReactTooltip from 'react-tooltip';

class CreateBag extends Component {
    state = {
        bagForm: {},
        isFormValid: false
    }
    componentDidMount = () =>{
        this.setState({ bagForm: returnParcelBagInputConfiguration() });
    }
    handleChangeEvent = (event, id) => {
		const updatedBagForm = { ...this.state.bagForm };
		updatedBagForm[id] = formUtilityActions.executeValidationAndReturnFormElement(event, updatedBagForm, id);

		const counter = formUtilityActions.countInvalidElements(updatedBagForm);

		this.setState({ bagForm: updatedBagForm, isFormValid: counter === 0 })
	}
    createBag = (event) => {
		event.preventDefault();

		const bagToCreate = {
			bagNo: this.state.bagForm.bagNo.value,
			type: 0,
		}
		const url = '/api/bags/shipment:'+this.props.match.params.id;
		this.props.onCreateBag(url, bagToCreate, { ...this.props });
	}

    redirectToShipmentDetails = () => {
		this.props.history.push('/shipmentDetails/'+this.props.match.params.id);
	}
    
    render() {
        const formElementsArray = formUtilityActions.convertStateToArrayOfFormObjects({ ...this.state.bagForm });
        return (
            <div className="well" key={'div1'}>
                <h1>
                    Create bag of parcels
                </h1>
                <br />
                <Form onSubmit={this.createBag}>
                    {
						formElementsArray.map(element => {
							return <div data-tip={element.config.tooltip} key={'div2'+element.id}><Input label={element.config.label} 
							key={element.id} elementType={element.config.element} id={element.id} 
							type={element.config.type} value={element.config.value} 
							changed={(event) => this.handleChangeEvent(event, element.id)}
							errorMessage={element.config.errorMessage} 
							invalid={!element.config.valid} shouldValidate={element.config.validation}
							touched={element.config.touched} 
							blur={(event) => this.handleChangeEvent(event, element.id)} />
                            <ReactTooltip /></div>
						})
					}
                    <br />
                    <FormGroup>
                        <Col md={1}>
							  <Button type='submit' disabled={!this.state.isFormValid}>Create</Button>
						</Col>
                        <Col md={1}>
							   <Button onClick={this.redirectToShipmentDetails}>Cancel</Button>
						 </Col>
                    </FormGroup>
                    <br />
                </Form>
                <SuccessModal show={this.props.showSuccessModal} 
					   modalHeaderText={'Success'} 
					   modalBodyText={'Bag of parcels created successfully'}
					   okButtonText={'OK'} 
					   successClick={() => this.props.onCloseSuccessModal('/shipmentDetails/'+this.props.match.params.id, { ...this.props })} />

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
        showSuccessModal: state.repository.showSuccessModal,
        showErrorModal: state.errorHandler.showErrorModal,
        errorMessage: state.errorHandler.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateBag: (url, bag, props) => dispatch(repositoryActions.postData(url, bag, props)),
        onCloseSuccessModal: (url, props) => dispatch(repositoryActions.closeSuccessModal(props, url)),
        onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBag);