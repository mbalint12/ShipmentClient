import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const handleChildClick = (e) => {
    e.stopPropagation();
}

const parcel = (props) => {
    return (
        <Aux>
            <tr>
                <td>{props.parcel.parcelNo}</td>
                <td>{props.parcel.recipientName}</td>
                <td>{props.parcel.destinationCountry}</td>
                <td>{props.parcel.weight}</td>
                <td>{props.parcel.price}</td>
                <td>
                    <Button disabled={props.delete_disabled} className="btn-danger" onClick={(e) => {handleChildClick(e); props.setConfirmOpen(true); props.parcelToDelete(props.parcel.parcelId)}}>Delete</Button>
                </td>
            </tr>
        </Aux>
    )
}

export default parcel;