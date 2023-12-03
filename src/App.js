import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Menu from "./Components/Menu";
import Navbar from "./Components/Navbar";
import Home from "./Components/Pages/Home";
import Category from "./Components/Pages/Category";
import Product from "./Components/Pages/Product";
import { AppProvider } from "./Components/ProductContext";
import Login from "./Components/Pages/Login";
import DashBoard from "./Components/Pages/DashBoard";
import Cart from "./Components/Pages/Cart";
import Spinner from "./Components/Spinner";

function App() {

  return (
    <Router>
    <AppProvider>
      <div className="App">
      <Spinner/>
      <Login/>
        <Navbar />
        <div className="container main_container">
          <Menu />
              <Routes>
                <Route exact path="/:category/Product/:id" element={<Product/>}/>
                <Route exact path="/Electronic/*" element={<Category key={"electronic"}/>} />
                <Route exact path="/Appliance/*" element={<Category key={"appliance"}/>} />
                <Route exact path="/House/*" element={<Category key={"house"}/>} />
                <Route exact path="/Fashion/*" element={<Category key={"fashion"}/>} />
                <Route exact path="/Beauty/*" element={<Category key={"beauty"}/>} />
                <Route exact path="/Dashboard" element={<DashBoard/>} />
                <Route exact path="/Cart" element={<Cart/>} />
                <Route exact path="/" element={<Home/>} />
              </Routes>
        </div>
        <Footer />
      </div>
      </AppProvider>
    </Router>
  );
}

export default App;
