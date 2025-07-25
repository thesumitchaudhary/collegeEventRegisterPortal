import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// for user 
import Dashboard from './page/Dashboard';
import RegisterForm from './page/RegisterForm';
import EventsList from './page/EventList';
import {EventSchedules} from './page/EventSchedules';
import ViewMyEvents from './page/ViewMyEvents';
import EventDetailPage from './page/EventDetailPage'
import About from './page/About';
import Blog from './page/Blog';
// import BlogDetailPage from './page/BLogDetailPage'
import Contact from './page/ContactUs';
import FAQ from './page/FAQs';
import Resource from './page/Resource';
import Features from './page/Features';
import PrivacyPolicy from './page/PrivacyPolicys';
import DownloadCertificate from './page/DownloadCertificate';
import Feedback from './page/Feedback';
import {Gallery} from './page/Gallery';
import Signup  from './page/Signup';

// for admin
import AdminDashboard from './pagesAdmin/AdminDashboard';
import BlogAdmin from './pagesAdmin/BlogAdmin';
import EventAdmin from './pagesAdmin/EventAdmin';
import ManageAboutPage from './pagesAdmin/ManageAboutPage';
import {ManageEventSchedule} from './pagesAdmin/ManageEventSchedule';
import ManageFAQs from './pagesAdmin/ManageFAQs';
import {ManageFeaturesSection} from './pagesAdmin/ManageFeaturesSection';
import ResourceAdmin from './pagesAdmin/ResourceAdmin';
import UploadCertificates from './pagesAdmin/UploadCertificates';
import {EditPrivacyPolicy} from './pagesAdmin/EditPrivacyPolicy';
import {ViewContactSubmissions} from './pagesAdmin/ViewContactSubmissions';
import {ViewFeedback} from './pagesAdmin/ViewFeedback';
import GalleryManage from './pagesAdmin/GalleryManage';
import {UserDashboardControl} from './pagesAdmin/UserDashboardControl';

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
        {/* <Route path="/blog/:slug" element={<BlogDetailPage />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/resource" element={<Resource />} />
        <Route path="/feature" element={<Features />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="/certificate" element={<DownloadCertificate />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/eventschedules" element={<EventSchedules />} />


        {/* for admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/adminblog" element={<BlogAdmin />} />
        <Route path="/admin/adminprivacypolicy" element={<EditPrivacyPolicy />} />
        <Route path="/admin/adminevent" element={<EventAdmin />} />
        <Route path="/admin/adminaboutus" element={<ManageAboutPage />} />
        <Route path="/admin/admineventschedule" element={<ManageEventSchedule />} />
        <Route path="/admin/faqs" element={<ManageFAQs />} />
        <Route path="/admin/adminfeatures" element={<ManageFeaturesSection />} />
        <Route path="/admin/adminresource" element={<ResourceAdmin />} />
        <Route path="/admin/adminfeedbackview" element={<ViewFeedback />} />
        <Route path="/admin/adminviewcontact" element={<ViewContactSubmissions />} />
        <Route path="/admin/adminuploadcertificates" element={<UploadCertificates />} />
        <Route path="/admin/admingallerymanage" element={<GalleryManage />} />
        <Route path="/admin/admincontroluserdashboard" element={<UserDashboardControl />} />
      </Routes> 
    </Router>
  );
}

export default App;
