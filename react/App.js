import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginContextProvider from "./contexts/LoginContextProvider";
import Signup from './pages/Signup';
import MyInfo from "./pages/MyInfo";
import RecBoard from "./pages/RecBoard";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <LoginContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loginPage" element={<Login />} />
            <Route path="/signUp" element={<Signup />} />
            <Route path="/myInfo" element={<MyInfo />} />
            <Route path="/recommendationBoard" element={<RecBoard />} />
          </Routes>
        </LoginContextProvider>
      </Router>
    </div>
  );
}

export default App;
