import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ArrivalsPage from './pages/ArrivalsPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/history">History</Link> |{" "}
        <Link to="/arrivals">Arrivals</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/history" element={<HistoryPage/>} />
        <Route path="/arrivals" element={<ArrivalsPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
