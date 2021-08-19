import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "stores/store";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";

import MainLayout from "layouts/MainLayout";
import AuthRouter from "pages/Auth/Auth";
import Dashboard from "pages/Dashboard/Dashboard";
import User from "pages/User/User";
import Company from "pages/Company/Company";
import Fleet from "pages/Fleet/Fleet";
import Task from "pages/Task/Task";
import Checkpoint from "pages/Checkpoint/Checkpoint";
import UserAdd from "pages/User/UserAdd";
import UserUpdate from "pages/User/UserUpdate";
import CompanyAdd from "pages/Company/CompanyAdd";
import CompanyUpdate from "pages/Company/CompanyUpdate";
import FleetAdd from "pages/Fleet/FleetAdd";
import FleetUpdate from "pages/Fleet/FleetUpdate";
import CheckpointUpdate from "pages/Checkpoint/CheckpointUpdate";
import CheckpointAdd from "pages/Checkpoint/CheckpointAdd";
import TaskAdd from "pages/Task/TaskAdd";
import TaskUpdate from "pages/Task/TaskUpdate";

function App() {
  return (
    <div className="App">
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <Router>
            <Switch>
              <Route path="/auth">
                <AuthRouter />
              </Route>
              <MainLayout>
                <Route path="/dashboard" component={Dashboard} />

                <Switch>
                  <Route path="/task" component={Task} exact />
                  <Route path="/task/add" component={TaskAdd} />
                  <Route path="/task/:id" component={TaskUpdate} />
                </Switch>

                <Switch>
                  <Route path="/user" component={User} exact />
                  <Route path="/user/add" component={UserAdd} />
                  <Route path="/user/:id" component={UserUpdate} />
                </Switch>

                <Switch>
                  <Route path="/company" component={Company} exact />
                  <Route path="/company/add" component={CompanyAdd} />
                  <Route path="/company/:id" component={CompanyUpdate} />
                </Switch>

                <Switch>
                  <Route path="/fleet" component={Fleet} exact />
                  <Route path="/fleet/add" component={FleetAdd} />
                  <Route path="/fleet/:id" component={FleetUpdate} />
                </Switch>

                <Switch>
                  <Route path="/checkpoint" component={Checkpoint} exact />
                  <Route path="/checkpoint/add" component={CheckpointAdd} />
                  <Route path="/checkpoint/:id" component={CheckpointUpdate} />
                </Switch>
              </MainLayout>
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
