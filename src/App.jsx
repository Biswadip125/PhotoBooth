import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import TemplateSelection from "./components/TemplateSelection";
import PhotoCapture from "./components/PhotoCapture";
import FilterPage from "./components/FilterPage";

function App() {
  return (
    <Router>
      <div className="w-full h-screen">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/template-selection" element={<TemplateSelection />} />
          <Route path="/capture" element={<PhotoCapture />} />
          <Route path="/filters" element={<FilterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
