import { useState } from 'react';
// import { Github, Rocket, Check } from 'lucide-react';
import { GitBranch, Rocket, Check } from 'lucide-react';
import { useHabits } from '../context/HabitsContext';

const defaultMilestones = [
  { id: 1, label: 'Build core habit tracking engine', done: true },
  { id: 2, label: 'Deploy live on Vercel + Render', done: false },
  { id: 3, label: 'Share the project and gather feedback', done: false },
];

function ProjectsGithub() {
  const { habits } = useHabits();
  const [milestones, setMilestones] = useState(defaultMilestones);

  const toggleMilestone = (id) => {
    setMilestones((prev) => prev.map((m) => (m.id === id ? { ...m, done: !m.done } : m)));
  };

  const getContributionDays = () => {
    const days = [];
    for (let i = 83; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = habits.reduce((total, h) => total + (h.completedDates?.includes(dateStr) ? 1 : 0), 0);
      days.push({ date: dateStr, count });
    }
    return days;
  };

  const days = getContributionDays();
  const levelFor = (count) => {
    if (count === 1) return 'bg-emerald-900';
    if (count === 2) return 'bg-emerald-600';
    return 'bg-emerald-400';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Projects & GitHub</h1>
        <p className="text-slate-400 text-sm mt-2">Turn daily practice into visible proof of work.</p>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
              CURRENT BUILD
            </span>
            <h2 className="text-white font-bold text-xl mt-3">StudyStreak</h2>
            <p className="text-slate-400 text-sm mt-2 max-w-lg">
              A full-stack habit tracker built to turn daily consistency into a project you can actually show.
            </p>
          </div>
          <Rocket className="text-indigo-400 shrink-0" size={22} />
        </div>
        <div className="mt-5 space-y-2">
          {milestones.map((m) => (
            <button
              key={m.id}
              onClick={() => toggleMilestone(m.id)}
              className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl border text-sm transition-colors ${
                m.done ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300' : 'border-slate-700 text-slate-400'
              }`}
            >
              <span
                className={`w-4.5 h-4.5 rounded flex items-center justify-center border ${
                  m.done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600'
                }`}
              >
                {m.done && <Check size={11} className="text-slate-900" />}
              </span>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-lg">Contribution rhythm</h2>
            <p className="text-slate-400 text-sm mt-1">Built from your real habit completions.</p>
          </div>
          <GitBranch className="text-slate-400" size={20} />
        </div>
        <div className="grid grid-cols-12 gap-1.5 mt-5">
          {days.map((day) => (
            <div
              key={day.date}
              title={`${day.date} — ${day.count} habit${day.count === 1 ? '' : 's'} completed`}
              className={`aspect-square rounded-sm ${day.count === 0 ? 'bg-slate-700' : levelFor(day.count)}`}
            />
          ))}
        </div>
        <p className="text-slate-500 text-xs mt-4">
          Each square reflects habits completed that day, pulled live from your database.
        </p>
      </div>
    </div>
  );
}

export default ProjectsGithub;