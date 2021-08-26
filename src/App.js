
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { AddEvent } from "./components/AddEvent";
import { EditEvent } from "./components/EditEvent";
import { GlobalProvider } from "./context/GlobalState";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div style={{ maxWidth: "30rem", margin: "4rem auto" }}>
      <GlobalProvider>
        <Router>
          <Switch>
            {/* <Route exact path="/" component={() => <Home events={events} setEvents={setEvents} />} /> */}
            <Route exact path="/" component={Home} />
            <Route path="/add" component={AddEvent} />
            <Route path="/edit/:id" component={EditEvent} />
          </Switch>
        </Router>
      </GlobalProvider>
    </div>
  )
}

export default App
