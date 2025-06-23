import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './page/Dashboard';
import RegisterForm from './page/RegisterForm';
import EventsList from './page/EventList';
import About from './page/About';
import Blog from './page/Blog';
import Resource from './page/Resource';
import Features from './page/Features';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import './App.css'

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/events" element={<EventsList />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/resource" element={<Resource />} />
        <Route path="/feature" element={<Features />} />
      </Routes>
    </Router>
  );
}

export default App;
