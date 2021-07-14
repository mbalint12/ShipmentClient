import React, { Component } from 'react';
import './App.css';
import Layout from '../components/Layout/Layout';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from '../components/ErrorPages/NotFound/NotFound';
import asyncComponent from '../hoc/AsyncComponent/AsyncComponent';
import CreateShipment from './Shipment/CreateShipment/CreateShipment';
import CreateParcelBag from './Bag/CreateBag/CreateParcelBag';
import CreateLetterBag from './Bag/CreateBag/CreateLetterBag';
import ShipmentDetails from './Shipment/ShipmentDetails/ShipmentDetails';
import BagDetails from './Bag/BagDetails/BagDetails';
import CreateParcel from './Parcel/CreateParcel/CreateParcel';

const AsyncShipmentList = asyncComponent(() => {
	return import('./Shipment/ShipmentList/ShipmentList');
});

class App extends Component {
  render() {
    return (
		<BrowserRouter>
			<Layout>
				<Switch>
					<Route path="/" exact component={AsyncShipmentList} />
					<Route path="/shipment-list" component={AsyncShipmentList} />
					<Route path="/createShipment" component={CreateShipment} />
					<Route path="/shipmentDetails/:id" component={ShipmentDetails} />
					<Route path="/createParcelBag/shipment::id" component={CreateParcelBag} />
					<Route path="/createLetterBag/shipment::id" component={CreateLetterBag} />
					<Route path="/bagDetails/:id" component={BagDetails} />
					<Route path="/createParcel/bag::id" component={CreateParcel} />
					<Route path="*" component={NotFound} />
				</Switch>
			</Layout>
		</BrowserRouter>
    );
  }
}

export default App;