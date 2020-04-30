import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Main from "./pages/Main"
import Caso from "./pages/Caso"

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/caso/:id" exact component={Caso} />
        </Switch>
    </BrowserRouter>
);

export default Routes;