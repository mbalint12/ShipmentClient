import React, { Component } from 'react';
import Input from '../../../UI/Inputs/Input';
import { Form, Button, FormGroup, Col } from 'react-bootstrap';
import { returnParcelInputConfiguration } from '../../../Utility/InputConfiguration';
import * as formUtilityActions from '../../../Utility/FormUtility';
import { connect } from 'react-redux';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import SuccessModal from '../../../components/Modals/SuccessModal/SuccessModal';
import ErrorModal from '../../../components/Modals/ErrorModal/ErrorModal';
import ReactTooltip from 'react-tooltip';

class CreateParcel extends Component {
    state = {
        parcelForm: {},
        isFormValid: false
    }
    componentDidMount = () =>{
        this.setState({ parcelForm: returnParcelInputConfiguration() });
    }
    handleChangeEvent = (event, id) => {
		const updatedParcelForm = { ...this.state.parcelForm };
		updatedParcelForm[id] = formUtilityActions.executeValidationAndReturnFormElement(event, updatedParcelForm, id);

		const counter = formUtilityActions.countInvalidElements(updatedParcelForm);

		this.setState({ parcelForm: updatedParcelForm, isFormValid: counter === 0 })
	}
    createParcel = (event) => {
		event.preventDefault();

		const parcelToCreate = {
			parcelNo: this.state.parcelForm.parcelNo.value,
			recipientName: this.state.parcelForm.recipientName.value,
			destinationCountry: this.state.parcelForm.destinationCountry.value,
			weight: parseFloat(this.state.parcelForm.weight.value),
            price: parseFloat(this.state.parcelForm.price.value)
		}
		const url = '/api/parcels/bag:'+this.props.match.params.id;
		this.props.onCreateParcel(url, parcelToCreate, { ...this.props });
	}

    redirectToBagDetails = () => {
		this.props.history.push('/bagDetails/'+this.props.match.params.id);
	}

    render() {
        const formElementsArray = formUtilityActions.convertStateToArrayOfFormObjects({ ...this.state.parcelForm });
        return (
            <div className="well" key={'div1'}>
                <h1>
                    Create new parcel
                </h1>
                <br />
                <Form onSubmit={this.createParcel}>
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
                            <ReactTooltip key={element.id+'tooltip'}/></div>
						})
					}
                    <br />
                    <FormGroup>
                        <Col md={1}>
							  <Button type='submit' disabled={!this.state.isFormValid}>Create</Button>
						</Col>
                        <Col md={1}>
							   <Button onClick={this.redirectToBagDetails}>Cancel</Button>
						 </Col>
                    </FormGroup>
                    <br />
                </Form>
                <SuccessModal show={this.props.showSuccessModal} 
					   modalHeaderText={'Success'} 
					   modalBodyText={'Parcel created successfully'}
					   okButtonText={'OK'} 
					   successClick={() => this.props.onCloseSuccessModal('/bagDetails/'+this.props.match.params.id, { ...this.props })} />

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
        onCreateParcel: (url, parcel, props) => dispatch(repositoryActions.postData(url, parcel, props)),
        onCloseSuccessModal: (url, props) => dispatch(repositoryActions.closeSuccessModal(props, url)),
        onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateParcel);