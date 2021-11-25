import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-notifications-component/dist/theme.css";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import login from "./components/login";
import dashboard from "./components/Home";
import recentcalls from "./components/recentcalls";
import contacts from "./components/contacts";
import allGroups from "./components/groups";
import Managedls from "./components/managedls";
import "../src/stylesheets/modal.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Sidebar />
        <Switch>
          <Route exact path="/" component={login} />
          <Route exact path="/login" component={login} />
          <Route exact path="/dashboard" component={dashboard} />
          <Route exact path="/recentcalls" component={recentcalls} />
          <Route exact path="/contacts" component={contacts} />
          <Route exact path="/groups" component={allGroups} />
          <Route exact path="/managedls" component={Managedls} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
