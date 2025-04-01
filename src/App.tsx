import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin";
import Signup from "./pages/signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;