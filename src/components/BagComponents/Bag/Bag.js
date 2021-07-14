import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const redirectToBagDetails = (id, history) => {
    history.push('/bagDetails/' + id);
}

const handleChildClick = (e) => {
    e.stopPropagation();
}

const bag = (props) => {
    return (
        <Aux>
            <tr onClick={() => redirectToBagDetails(props.bag.bagId, props.history)}>
                <td>{props.bag.bagNo}</td>
                <td>{props.bag.type === 0 ? "Parcels" : "Letters"}</td>
                <td>{props.bag.letterCount}</td>
                <td>{props.bag.weight}</td>
                <td>{props.bag.price}</td>
                <td>
                    <Button disabled={props.data.shipment[0].finalized} className="btn-danger" onClick={(e) => {handleChildClick(e); props.setConfirmOpen(true); props.bagToDelete(props.bag.bagId)}}>Delete</Button>
                </td>
            </tr>
        </Aux>
    )
}

export default bag;