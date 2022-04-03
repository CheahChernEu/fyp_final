import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Provider } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import Routes from "./routes";
import store from "./store";
import * as action from "./store/actions";
store.dispatch(action.authCheck());

const stripePromise = loadStripe(
    "pk_test_51KjCibLroMhKOKfoup1NmOhShBZdK3rPR3cVU2AwjAjmoogcqN0MAvXfhUk4gJJy4vjz8iEN4F331tCI8v1DeMQA00t418FV4i"
);

ReactDOM.render(
    <Elements stripe={stripePromise}>
        <Provider store={store}>
            <Router>
                <Switch>
                    <Routes />
                </Switch>
            </Router>
        </Provider>
    </Elements>,

    // <App />,
    document.getElementById("app")
);
