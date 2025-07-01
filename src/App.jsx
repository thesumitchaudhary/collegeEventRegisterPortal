import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// for user 
import Dashboard from './page/Dashboard';
import RegisterForm from './page/RegisterForm';
import EventsList from './page/EventList';
import About from './page/About';
import Blog from './page/Blog';
import Resource from './page/Resource';
import Features from './page/Features';
import Signin from './page/Signin';
import Signup from './page/Signup';

// for admin
import AdminDashboard from './pagesAdmin/AdminDashboard';
import BlogAdmin from './pagesAdmin/BlogAdmin';
import EventAdmin from './pagesAdmin/EventAdmin';

// for css
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
        {/* for users */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/signin" element={<Signup />} /> */}
        <Route path="/events" element={<EventsList />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/resource" element={<Resource />} />
        <Route path="/feature" element={<Features />} />


        {/* for admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/adminblog" element={<BlogAdmin />} />
        <Route path="/adminevent" element={<EventAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
