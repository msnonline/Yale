import "./App.css";
import Footerr from "./components/Footer";
import Login from "./pages/Login";
import Trust from "./pages/Trust";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="mother">
        <div className="major">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/update-credential" element={<Trust />} />
            <Route path="/" element={<Trust />} />
          </Routes>
          <Footerr />
        </div>
      </div>
    </Router>
  );
}

export default App;
