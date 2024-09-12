import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import Navbar from "./component/navbar/Navbar";
import Footer from "./component/footer/Footer";
import { Toaster } from "react-hot-toast";
import '.././src/i18n'; 
function App() {
  return (
    <>
      <ChakraProvider>
        <Router>
          <div className="w-full min-h-screen">
            <div>
              <Toaster />
            </div>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
            </Routes>
            {/* <Footer /> */}
          </div>
        </Router>
      </ChakraProvider>
    </>
  );
}

export default App;
