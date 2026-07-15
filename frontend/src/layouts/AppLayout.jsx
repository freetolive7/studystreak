import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { HabitsProvider } from '../context/HabitsContext';

function AppLayout() {
  return (
    <HabitsProvider>
      <div className="min-h-screen flex bg-gradient-to-br from-slate-900 to-slate-950">
        <Sidebar />
        <main className="flex-1 min-w-0 px-4 sm:px-8 py-8">
          <Outlet />
        </main>
      </div>
    </HabitsProvider>
  );
}

export default AppLayout;