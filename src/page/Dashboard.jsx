import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="w-full border-b shadow-sm bg-white fixed top-0 left-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-semibold flex items-center gap-2">
             College Event Registration
          </h1>
        <div className="flex gap-x-4">
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
            Home
          </Link>
          <Link to="/register" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
            Register
          </Link>
          <Link to="/events" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
            My Events
         </Link>
        </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h2 className="text-4xl font-bold mb-2">Register for Upcoming College Events</h2>
        <p className="text-gray-600 max-w-md">
          Discover and register for college events easily with just one click.
        </p>
        <div className="flex gap-4 mt-6">
          <Button size="lg" onClick={() => navigate("/register")}>Register Now</Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/events")}>
            View My Events
          </Button>
        </div>
      </main>
    </div>
  );
}
