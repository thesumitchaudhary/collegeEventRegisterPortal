// import Sidebar from '../components/Sidebar';
import Header from '../component/Header';
// import Stats from '../components/Stats';
// import EventsTable from '..  /components/EventsTable';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 space-y-6">
          <Stats />
          <EventsTable />
        </main>
      </div>
    </div>
  );
}
