import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chain from "./pages/Chain";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/selectedChain" element={<Chain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
