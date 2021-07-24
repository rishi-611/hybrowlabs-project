import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import People from "./components/People";
import Person from "./components/Person";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={People} />
            <Route exact path="/people/:name" component={Person} />
          </Switch>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.Fragment>
  );
};

export default App;
