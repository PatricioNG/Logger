import { Route, Switch } from "react-router-dom";
import UserApp from "./components/user-application/UserApp";
import WelcomeScreen from "./components/WelcomeScreen";
import './style/main.css';

export default function App() {


  return (
    <div className="app">
      <Switch>
        <Route path="/users" render={() => <UserApp />} />
        <Route path="/" render={() => <WelcomeScreen />} />
      </Switch>
    </div>
  );
}
