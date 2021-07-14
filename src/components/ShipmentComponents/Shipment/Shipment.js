import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Moment from 'react-moment';
import { Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const redirectToShipmentDetails = (id, history) => {
    history.push('/shipmentDetails/' + id);
}

const handleChildClick = (e) => {
    e.stopPropagation();
}

const shipment = (props) => {
    return (
        <Aux>
            <tr onClick={() => redirectToShipmentDetails(props.shipment.shipmentId, props.history)}>
                <td>{props.shipment.shipmentNo}</td>
				<td>{props.airport}</td>
				<td>{props.shipment.flightNo}</td>
                <td><Moment format="DD/MM/YYYY">{props.shipment.flightDate}</Moment></td>
				<td>{props.shipment.finalized ? 'Yes' : 'No'}</td>
                <td>
                    <Button className="btn-danger" disabled={props.shipment.finalized} onClick={(e) => {handleChildClick(e); props.setConfirmOpen(true); props.shipmentToDelete(props.shipment.shipmentId)}}>Delete</Button>
                </td>
            </tr>
        </Aux>
    )
}

export default shipment;