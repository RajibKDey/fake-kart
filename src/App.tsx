import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";


import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import "./App.css";
import AlertNotify from "./components/AlertNotify";
import StoreInterface from "./store/storeInterface";
import { HIDE_ALERT } from "./store/constants";


function App() {
  const isLoggedIn = useSelector((state: StoreInterface) => state.login.isLoggedIn);
  const alert = useSelector((state: StoreInterface) => state.alert);

  const dispatch = useDispatch();
  const handleClose = () => dispatch({ type: HIDE_ALERT });
  return (
    <div className='App'>
      <Router>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <AlertNotify open={alert.showAlert} status={alert.status} message={alert.message} close={handleClose} />
          <Header />
          <main>
            <Routes>
              <Route path='/' element={<Navigate to="/products" />} />
              <Route
                path="/login"
                element={isLoggedIn ? <Navigate to="/products" /> : <Login />}
              />
              {!isLoggedIn && <Route path="/signup" element={<SignUp />} />}
              <Route path="/products" element={<Homepage />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/categories" element={<Category />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/policy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </Router>
    </div>
  );
}

export default App;
