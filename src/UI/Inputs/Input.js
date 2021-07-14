import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { FormGroup, Col, FormControl, FormLabel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Input.css';

const input = (props) => {
    let inputField = null;
    let errorMessage = <br/>;

    if(props.invalid && props.shouldValidate && props.touched){
        errorMessage = (<em>{props.errorMessage}</em>);
    }
	
	switch (props.elementType) {
    case 'input':
        inputField = (
            <FormGroup controlId={props.id}>
				<span>
                <Col className={FormLabel} sm={2}>
                    {props.label}
                </Col>
                <Col sm={6}>
                    <FormControl type={props.type} value={props.value} onChange={props.changed} onBlur={props.blur} />
                </Col>
                <Col>
                    {errorMessage}
                </Col>
				</span><br />
            </FormGroup>
        )
        break;
    case 'select':
        let airports = [];
        if (props.data && props.data.length > 0)
        {
            airports = props.data.map((airport) => {
            return <option key={airport.value} value={airport.value}>{airport.name}</option>
        })}
        inputField = (
            <FormGroup controlId={props.id}>
                <span>
                    <Col className={FormLabel} sm={2}>
                        {props.label}
                    </Col>
                    <Col sm={6}>
                        <FormControl as="select" type={props.type} value={props.value} onChange={props.changed} onBlur={props.blur} >
                            {airports}
                        </FormControl>
                    </Col>
                    <Col>
                        {errorMessage}
                    </Col>
                </span><br />
            </FormGroup>
        )
        break;
    case 'datePicker':
        inputField = (
            <FormGroup controlId={props.id}>
				<span>
                <Col className={FormLabel} sm={2}>
                    {props.label}
                </Col>
                <Col sm={6}>
                    <DatePicker selected={props.value} dateFormat="MM/DD/YYYY" readOnly
                        onChange={props.changed} className='datePickerControl' 
                        showYearDropdown dropdownMode="select"/>
                </Col>
                <Col>
                    {errorMessage}
                </Col>
				</span><br />
            </FormGroup>
        )
        break;
    default: inputField = null;
}
    
    return (
        <Aux>
            {inputField}
        </Aux>
    )
}
 
export default input;