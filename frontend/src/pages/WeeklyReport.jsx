import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useHabits } from '../context/HabitsContext';

function WeeklyReport() {
  const { habits } = useHabits();

  const getWeeklyData = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const label = d.toLocaleDateString('en-US', { weekday: 'short' });
      const count = habits.reduce((total, h) => total + (h.completedDates?.includes(dateStr) ? 1 : 0), 0);
      days.push({ day: label, completed: count });
    }
    return days;
  };

  const weekData = getWeeklyData();
  const totalPossible = habits.length * 7;
  const totalCompleted = weekData.reduce((sum, d) => sum + d.completed, 0);
  const score = totalPossible ? Math.round((totalCompleted / totalPossible) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Weekly Report</h1>
        <p className="text-slate-400 text-sm mt-2">See your momentum, spot weak days, and plan the next sprint.</p>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg">Weekly output</h2>
          <p className="text-slate-400 text-sm mt-1">Completion rhythm across seven focused days.</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weekData}>
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis allowDecimals={false} stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="completed" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center">
          <h2 className="text-white font-bold text-lg">Consistency score</h2>
          <div
            className="w-40 h-40 rounded-full grid place-items-center mx-auto mt-6 relative"
            style={{ background: `conic-gradient(#34d399 ${score}%, #334155 0)` }}
          >
            <div className="absolute inset-3 rounded-full bg-slate-800 grid place-items-center">
              <span className="text-white text-3xl font-bold font-mono">{score}</span>
              <span className="text-slate-500 text-xs">out of 100</span>
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-5">Calculated from this week's active habits.</p>
        </div>
      </div>
    </div>
  );
}

export default WeeklyReport;