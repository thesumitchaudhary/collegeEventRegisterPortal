import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// for user 
import Dashboard from './page/Dashboard';
import RegisterForm from './page/RegisterForm';
import EventsList from './page/EventList';
import ViewMyEvents from './page/ViewMyEvents';
import EventDetailPage from './page/EventDetailPage'
import About from './page/About';
import Blog from './page/Blog';
import Contact from './page/ContactUs';
import FAQ from './page/FAQs';
import Resource from './page/Resource';
import Features from './page/Features';
import PrivacyPolicy from './page/PrivacyPolicys';
import DownloadCertificate from './page/DownloadCertificate';
import Feedback from './page/Feedback';
import Signup  from './page/Signup';

// for admin
import AdminDashboard from './pagesAdmin/AdminDashboard';
import BlogAdmin from './pagesAdmin/BlogAdmin';
import EventAdmin from './pagesAdmin/EventAdmin';
import ManageFAQs from './pagesAdmin/ManageFAQs';

// for css
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import './App.css'
import ContactUs from './page/ContactUs';

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
        <Route path="/events" element={<EventsList />} />
        <Route path="/viewmyevents" element={<ViewMyEvents />} />
        <Route path="/event/:slug" element={<EventDetailPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resource" element={<Resource />} />
        <Route path="/feature" element={<Features />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="/certificate" element={<DownloadCertificate />} />
        <Route path="/feedback" element={<Feedback />} />


        {/* for admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/adminblog" element={<BlogAdmin />} />
        <Route path="/admin/adminevent" element={<EventAdmin />} />
        <Route path="/admin/faqs" element={<ManageFAQs />} />
      </Routes>
    </Router>
  );
}

export default App;
