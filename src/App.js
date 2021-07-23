import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import People from "./components/People";
import Person from "./components/Person";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={People} />
        <Route exact path="/:id" component={Person} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
