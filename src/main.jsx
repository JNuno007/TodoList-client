import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Login from "./pages/Login";
import Project from "./pages/Project";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRouter from "./auth/PrivateRouter";
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <div>
        <Router>
          <Switch>
            <PrivateRouter exact path='/' component={Project} />
            <Route exact path='/login' component={Login} />
            <PrivateRouter exact path='/projects' component={Project} />
            <Redirect to='/' />
          </Switch>
        </Router>
        <ToastContainer />
      </div>
  </React.StrictMode>,
  document.getElementById('root')
)
