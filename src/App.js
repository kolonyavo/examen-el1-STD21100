import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrivateHome from "./pages/PrivateHome";
import SignUp from "./pages/signUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/connected" element={<PrivateHome/>}/>
      </Routes>
    </>
  );
}

export default App;