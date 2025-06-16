import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './page/Dashboard';
import RegisterForm from './component/RegisterForm';
import EventsList from './component/EventList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/events" element={<EventsList />} />
      </Routes>
    </Router>
  );
}

export default App;
