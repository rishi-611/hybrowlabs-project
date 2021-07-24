import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import People from "./components/People";
import Person from "./components/Person";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={People} />
            <Route exact path="/:id" component={Person} />
          </Switch>
        </BrowserRouter>
      </QueryClientProvider>
    </React.Fragment>
  );
};

export default App;
