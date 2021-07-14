export const convertStateToArrayOfFormObjects = (formObject) => {
    const formElementsArray = [];
    for (let key in formObject) {
        formElementsArray.push({
            id: key,
            config: formObject[key]
        });
    }

    return formElementsArray;
}

const checkValidity = (value, pattern, validation) => {
    let validationObject = {
        isValid: true,
        errorMessage: ''
    };

    if (validation) {
        if (validation.required) {
            validationObject.isValid = (value.trim() !== '' && value.trim().match(pattern));
            if (!validationObject.isValid) {
                validationObject.errorMessage = value.trim() === '' ? 'Field is required' : 'Invalid format';
            }
        }
        return validationObject;
    }
    else {
        return validationObject;
    }
}

export const executeValidationAndReturnFormElement = (event, updatedShipmentForm, id) => {
    let formElement = { ...updatedShipmentForm[id] };
    formElement.value = id === 'flightDate' ? event : event.target.value;
    formElement.touched = true;

    const validationResponse = checkValidity(formElement.value, formElement.pattern, formElement.validation);

    formElement.valid = validationResponse.isValid;
    formElement.errorMessage = validationResponse.errorMessage;

    return formElement;
}

export const countInvalidElements = (shipmentForm) => {
    let countInvalidElements = 0;
    for (let element in shipmentForm) {
        if (!shipmentForm[element].valid) {
            countInvalidElements = countInvalidElements + 1;
            break;
        }
    }
    return countInvalidElements;
}

