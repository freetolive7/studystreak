import { NavLink, useNavigate } from 'react-router-dom';
import { Flame, LayoutDashboard, CheckSquare, BarChart3, Code2, UserRound, LogOut } from 'lucide-react';
import { useHabits } from '../context/HabitsContext';

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/habits', label: 'My Habits', icon: CheckSquare },
  { to: '/report', label: 'Weekly Report', icon: BarChart3 },
  { to: '/projects', label: 'Projects & GitHub', icon: Code2 },
  { to: '/profile', label: 'Profile', icon: UserRound },
];

function Sidebar() {
  const navigate = useNavigate();
  const { habits } = useHabits();
  const longestStreak = habits.length ? Math.max(...habits.map((h) => h.streak || 0)) : 0;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <aside className="hidden lg:flex flex-col w-60 shrink-0 min-h-screen sticky top-0 bg-slate-950/60 border-r border-slate-800 px-5 py-7">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-900/40">
            <Flame size={18} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold leading-tight">StudyStreak</p>
            <p className="text-slate-500 text-xs">Code. Build. Repeat.</p>
          </div>
        </div>

        <nav className="mt-8 flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  isActive
                    ? 'bg-indigo-600/20 text-white border border-indigo-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <Icon size={17} /> {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 text-slate-400 hover:text-white text-sm px-3 py-2 rounded-xl hover:bg-slate-800/60 transition-colors"
        >
          <LogOut size={16} /> Logout
        </button>

        <div className="mt-4 rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-indigo-500/5 p-4">
          <p className="text-orange-400 text-xs font-semibold tracking-wide">CURRENT BEST</p>
          <p className="text-white text-2xl font-bold mt-1">
            {longestStreak} <span className="text-sm font-normal text-slate-400">day streak</span>
          </p>
          <p className="text-slate-500 text-xs mt-1">Small steps compound.</p>
        </div>
      </aside>

      <nav className="lg:hidden flex gap-2 overflow-x-auto px-4 py-3 bg-slate-950/80 border-b border-slate-800 sticky top-0 z-20">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 whitespace-nowrap px-3 py-2 rounded-lg text-sm ${
                isActive ? 'bg-indigo-600/20 text-white' : 'text-slate-400'
              }`
            }
          >
            <Icon size={15} /> {label}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 whitespace-nowrap px-3 py-2 rounded-lg text-sm text-slate-400"
        >
          <LogOut size={15} /> Logout
        </button>
      </nav>
    </>
  );
}

export default Sidebar;