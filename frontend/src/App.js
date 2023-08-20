import react from "react";
import Landing from "./components/Landing/Landing";
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Restraunt from "./components/Restraunt";
import Menu from "./components/Menu";
import Restraunts from "./components/Restraunts";
import Cart from "./components/Cart";
import UserLogin from "./components/Auth/UserLogin";
import UserRegister from "./components/Auth/UserRegister";
import AdminLogin from "./components/Auth/AdminLogin";
import AdminRegister from "./components/Auth/AdminRegister";
import Admin from "./components/Admin/Admin";
import Order from "./components/Order";
import AdminOrder from "./components/Admin/AdminOrder";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/"><Landing/></Route>
          <Route exact path="/res/:id"><Restraunt/></Route>
          <Route exact path="/res"><Restraunts/></Route>
          <Route exact path="/menu"><Menu/></Route>
          <Route exact path="/cart"><Cart/></Route>
          <Route exact path="/order"><Order/></Route>

          <Route exact path="/login"><UserLogin/></Route>
          <Route exact path="/register"><UserRegister/></Route>

          <Route exact path="/admin"><Admin/></Route>
          <Route exact path="/admin/login"><AdminLogin/></Route>
          <Route exact path="/admin/register"><AdminRegister/></Route>
          <Route exact path="/admin/orders"><AdminOrder/></Route>

        </Switch>
      </Router>
    </div>
  )
}

export default App;
