import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Home from "./components/Home/home";
import About from "./components/About/about";
import Service from "./components/Service/service";
import Contact from "./components/Contact/contact";

const Homepage = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route path="/about">
                    <About />
                </Route>

                <Route path="/service">
                    <Service />
                </Route>

                <Route path="/contact">
                    <Contact />
                </Route>
            </Switch>
        </Router>
    );
};

export default Homepage;
