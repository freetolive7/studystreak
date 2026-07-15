import { Flame, CircleCheckBig, ListChecks, Timer, Check } from 'lucide-react';
import { useHabits } from '../context/HabitsContext';

const categoryColors = {
  Coding: '#8179ff',
  'Competitive Programming': '#f5a524',
  GitHub: '#33d2c8',
  Projects: '#11b981',
};

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function Overview() {
  const { habits, loading, completeHabit } = useHabits();
  const today = new Date().toISOString().split('T')[0];

  const total = habits.length;
  const completedToday = habits.filter((h) => h.lastCompletedDate === today).length;
  const completionPct = total ? Math.round((completedToday / total) * 100) : 0;
  const longestStreak = total ? Math.max(...habits.map((h) => h.streak || 0)) : 0;
  const focusMinutes = completedToday * 45;

  const categoryBreakdown = Object.keys(categoryColors).map((cat) => {
    const count = habits.filter((h) => (h.category || 'Coding') === cat).length;
    return { cat, count, pct: total ? Math.round((count / total) * 100) : 0 };
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-slate-500 text-xs font-semibold tracking-widest uppercase">
            Personal Command Centre
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-1">{greeting()}, builder.</h1>
          <p className="text-slate-400 text-sm mt-2">
            Keep your coding streak alive — one focused session at a time.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 text-slate-300 text-sm border border-slate-700 rounded-full px-4 py-2 bg-slate-800/50 w-fit">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard icon={<Flame size={18} />} color="#f7ad36" value={longestStreak} label="Longest active streak" />
        <MetricCard icon={<CircleCheckBig size={18} />} color="#4de1b2" value={`${completionPct}%`} label="Completed today" />
        <MetricCard icon={<ListChecks size={18} />} color="#a9a4ff" value={total} label="Active habits" />
        <MetricCard icon={<Timer size={18} />} color="#65e6de" value={`${focusMinutes}m`} label="Estimated focus" />
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4 mb-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-white font-bold text-lg">Today's plan</h2>
              <p className="text-slate-400 text-sm mt-1">Finish the loop before the day ends.</p>
            </div>
            <div
              className="w-20 h-20 rounded-full grid place-items-center relative shrink-0"
              style={{ background: `conic-gradient(#6366f1 ${completionPct}%, #334155 0)` }}
            >
              <div className="absolute inset-2 rounded-full bg-slate-800 grid place-items-center">
                <span className="text-white text-sm font-bold">{completionPct}%</span>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            {loading ? (
              <p className="text-slate-500 text-sm text-center py-8">Loading...</p>
            ) : habits.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-8">
                No habits yet. Add one from My Habits to build today's plan.
              </p>
            ) : (
              habits.slice(0, 6).map((habit) => {
                const done = habit.lastCompletedDate === today;
                return (
                  <div
                    key={habit._id}
                    className="flex items-center justify-between bg-slate-900/40 border border-slate-700 rounded-xl px-4 py-3"
                  >
                    <div>
                      <p className="text-white text-sm font-medium">{habit.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{habit.category || 'Coding'}</p>
                    </div>
                    <button
                      onClick={() => completeHabit(habit._id)}
                      disabled={done}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 ${
                        done ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      <Check size={14} /> {done ? 'Completed' : 'Mark done'}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg">Focus mix</h2>
          <p className="text-slate-400 text-sm mt-1">Where your active habits live.</p>
          <div className="mt-5 space-y-4">
            {categoryBreakdown.map(({ cat, count, pct }) => (
              <div key={cat}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-300">{cat}</span>
                  <span className="text-slate-500">
                    {count} habit{count === 1 ? '' : 's'}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-700/60 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: categoryColors[cat] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, color, value, label }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5">
      <div className="w-9 h-9 rounded-lg grid place-items-center mb-4" style={{ color, background: `${color}22` }}>
        {icon}
      </div>
      <p className="text-white text-2xl font-bold font-mono">{value}</p>
      <p className="text-slate-400 text-xs mt-1">{label}</p>
    </div>
  );
}

export default Overview;