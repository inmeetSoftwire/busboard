import { BrowserRouter, NavLink, Link, Route, Routes } from 'react-router-dom';
import ArrivalsPage from './pages/ArrivalsPage';
import HistoryPage from './pages/HistoryPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <nav className="bg-white shadow-sm sticky top-0 z-20">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-cyan-700">BusBoard</span>
            </Link>

            <div className="flex items-center space-x-2">
              <NavLink
                to="/arrivals"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-cyan-700 text-white' : 'text-cyan-700 hover:bg-cyan-50'}`
                }
              >
                Arrivals
              </NavLink>

              <NavLink
                to="/history"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-cyan-700 text-white' : 'text-cyan-700 hover:bg-cyan-50'}`
                }
              >
                History
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/history" element={<HistoryPage/>} />
          <Route path="/arrivals" element={<ArrivalsPage/>} />
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
