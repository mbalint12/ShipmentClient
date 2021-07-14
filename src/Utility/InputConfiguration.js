import moment from 'moment';

export const returnInputConfiguration = () => {
    return {
        shipmentNo: {
            element: 'input', type: 'text', value: '', 
            validation: { required: true }, valid: false, touched: false,
            errorMessage: '', label: 'ShipmentNo:'
        },
        airport: {
            element: 'input', type: 'text', value: '', 
            validation: { required: true }, valid: false, touched: false,
            errorMessage: '', label: 'Airport:'
        },
        flightNo: {
            element: 'input', type: 'text', value: '', 
            validation: { required: true }, valid: false, touched: false,
            errorMessage: '', label: 'FlightNo:'
        },
		flightDate: {
			element: 'datePicker', type: 'text', value: moment(),
			valid: true, touched: false,
			errorMessage: '', label: 'FlightDate:'
		}
    }
}

export const returnCreateInputConfiguration = () => {
    return {
        shipmentNo: {
            element: 'input', type: 'text', value: '', pattern: /^[a-zA-Z0-9]{3}[-]{1}[a-zA-Z0-9]{6}$/,
            validation: { required: true }, valid: false, touched: false, tooltip: 'Format: XXX-XXXXXX (X = english letter or number)',
            errorMessage: '', label: 'ShipmentNo:'
        },
        airport: {
            element: 'select', type: 'text', value: 0, pattern: /^\d*$/,
            validation: { required: true }, valid: true, touched: false, tooltip: '',
            errorMessage: '', label: 'Airport:'
        },
        flightNo: {
            element: 'input', type: 'text', value: '', pattern: /^[a-zA-Z]{2}\d{4}$/,
            validation: { required: true }, valid: false, touched: false, tooltip: 'Format: LLNNNN (L = english letter, N = number)',
            errorMessage: '', label: 'FlightNo:'
        },
		flightDate: {
			element: 'datePicker', type: 'text', value: moment(), pattern: /\S*/,
			valid: true, touched: false, tooltip: '',
			errorMessage: '', label: 'FlightDate:'
		}
    }
}

export const returnParcelBagInputConfiguration = () => {
    return {
        bagNo: {
            element: 'input', type: 'text', value: '', pattern: /^[a-zA-Z0-9]{1,15}$/,
            validation: { required: true }, valid: false, touched: false, tooltip: 'Max. length: 15, no special characters',
            errorMessage: '', label: 'Bag number:'
        }
    }
}

export const returnLetterBagInputConfiguration = () => {
    return {
        bagNo: {
            element: 'input', type: 'text', value: '', pattern: /^[a-zA-Z0-9]{1,15}$/,
            validation: { required: true }, valid: false, touched: false, tooltip: 'Max. length: 15, no special characters',
            errorMessage: '', label: 'Bag number:'
        },
        letterCount: {
            element: 'input', type: 'text', value: '', pattern: /^[1-9]{1}\d*$/,
            validation: { required: true }, valid: false, touched: false, tooltip: 'Cannot be 0',
            errorMessage: '', label: 'Number of letters:'
        },
        weight: {
            element: 'input', type: 'text', value: '', pattern: /^\d{1}\d*\.{0,1}\d{0,3}$/,
            validation: { required: true }, valid: false, touched: false, tooltip: 'Max. 3 digits after decimal point',
            errorMessage: '', label: 'Weight:'
        },
        price: {
            element: 'input', type: 'text', value: '', pattern: /^\d{1}\d*\.{0,1}\d{0,2}$/,
            validation: { required: true }, valid: false, touched: false, tooltip: 'Max. 2 digits after decimal point',
            errorMessage: '', label: 'Price:'
        }
    }
}

export const returnParcelInputConfiguration = () => {
    return {
        parcelNo: {
            element: 'input', type: 'text', value: '', pattern: /^[a-zA-Z]{2}\d{6}[a-zA-Z]{2}$/,
            validation: { required: true }, valid: false, touched: false, tooltip: 'Format: LLNNNNNNLL (L = english letter, N = number)',
            errorMessage: '', label: 'Parcel number:'
        },
        recipientName: {
            element: 'input', type: 'text', value: '', pattern: /^[^0-9$&+,:;=?@#|<>^*()%!]{1,100}$/,
            validation: { required: true }, valid: false, touched: false, tooltip: 'Max. 100 characters',
            errorMessage: '', label: 'Recipient name:'
        },
        destinationCountry: {
            element: 'input', type: 'text', value: '', pattern: /^[A-Z]{2}$/,
            validation: { required: true }, valid: false, touched: false, tooltip: '2-letter uppercase country code, e.g. EE',
            errorMessage: '', label: 'Destination country:'
        },
        weight: {
            element: 'input', type: 'text', value: '', pattern: /^\d{1}\d*\.{0,1}\d{0,3}$/,
            validation: { required: true }, valid: false, touched: false, tooltip: 'Max. 3 digits after decimal point',
            errorMessage: '', label: 'Weight:'
        },
        price: {
            element: 'input', type: 'text', value: '', pattern: /^\d{1}\d*\.{0,1}\d{0,2}$/,
            validation: { required: true }, valid: false, touched: false, tooltip: 'Max. 2 digits after decimal point',
            errorMessage: '', label: 'Price:'
        }
    }
}