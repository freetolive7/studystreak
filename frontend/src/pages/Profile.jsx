import { useState, useEffect } from 'react';
import { useHabits } from '../context/HabitsContext';
import API from '../api/axios';

function Profile() {
  const { habits } = useHabits();
  const [user, setUser] = useState(null);
  const [reminder, setReminder] = useState(true);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/auth/me');
        setUser(res.data);
      } catch (err) {
        // non-critical, page still works without it
      }
    };
    fetchUser();
  }, []);

  const totalHabits = habits.length;
  const longestStreak = totalHabits ? Math.max(...habits.map((h) => h.streak || 0)) : 0;
  const totalCompletions = habits.reduce((sum, h) => sum + (h.completedDates?.length || 0), 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <p className="text-slate-500 text-xs font-semibold tracking-widest uppercase">Your System</p>
        <h1 className="text-3xl font-bold text-white mt-1">Profile & Preferences</h1>
        <p className="text-slate-400 text-sm mt-2">Keep your goals visible and your environment intentional.</p>
      </div>

      <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 grid place-items-center text-2xl font-bold text-indigo-300">
            {user?.name?.[0]?.toUpperCase() || '?'}
          </div>
          <h2 className="text-white font-bold text-xl mt-4">{user?.name || 'Loading...'}</h2>
          <p className="text-slate-400 text-sm mt-1">{user?.email}</p>

          <div className="grid grid-cols-3 gap-2 mt-6">
            <StatBox value={totalHabits} label="Active habits" />
            <StatBox value={longestStreak} label="Best streak" />
            <StatBox value={totalCompletions} label="Total done" />
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg">Streak preferences</h2>
          <p className="text-slate-400 text-sm mt-1">Simple controls for a calmer daily workflow.</p>

          <div className="space-y-3 mt-5">
            <SettingRow
              title="Daily reminder"
              copy="Keep a visual reminder enabled for your routine."
              on={reminder}
              onToggle={() => setReminder(!reminder)}
            />
            <SettingRow
              title="Completion sound"
              copy="Use a subtle cue when you finish a habit."
              on={sound}
              onToggle={() => setSound(!sound)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ value, label }) {
  return (
    <div className="border border-slate-700 rounded-xl p-3 text-center">
      <p className="text-white font-mono font-bold text-lg">{value}</p>
      <p className="text-slate-500 text-xs mt-1">{label}</p>
    </div>
  );
}

function SettingRow({ title, copy, on, onToggle }) {
  return (
    <div className="flex items-center justify-between gap-4 border border-slate-700 rounded-xl p-4">
      <div>
        <h3 className="text-white text-sm font-semibold">{title}</h3>
        <p className="text-slate-400 text-xs mt-1">{copy}</p>
      </div>
      <button
        onClick={onToggle}
        className={`w-12 h-7 rounded-full p-1 transition-colors ${on ? 'bg-indigo-600' : 'bg-slate-600'}`}
      >
        <span className={`block w-5 h-5 rounded-full bg-white transition-transform ${on ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  );
}

export default Profile;