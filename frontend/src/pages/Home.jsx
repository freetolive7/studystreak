import { Link } from 'react-router-dom';
import { Flame, BarChart3, ShieldCheck } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col">
      <nav className="flex justify-between items-center px-6 py-5 max-w-5xl mx-auto w-full">
        <span className="text-white font-bold text-lg flex items-center gap-1">
          <Flame className="text-orange-400" size={22} /> StudyStreak
        </span>
        <div className="flex gap-3">
          <Link
            to="/login"
            className="text-slate-300 hover:text-white text-sm px-4 py-2"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 -mt-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-white max-w-2xl leading-tight">
          Build habits that actually stick.
        </h1>
        <p className="text-slate-400 mt-4 max-w-md">
          Track your daily study goals, build streaks, and see your progress —
          one day at a time.
        </p>
        <Link
          to="/signup"
          className="mt-8 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Start your streak
        </Link>
      </div>

      <div className="max-w-4xl mx-auto w-full grid sm:grid-cols-3 gap-5 px-4 pb-16">
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5">
          <Flame className="text-orange-400 mb-3" size={22} />
          <h3 className="text-white font-medium mb-1">Streak Tracking</h3>
          <p className="text-slate-400 text-sm">
            Stay consistent with automatic daily streak counting.
          </p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5">
          <BarChart3 className="text-indigo-400 mb-3" size={22} />
          <h3 className="text-white font-medium mb-1">Visual Progress</h3>
          <p className="text-slate-400 text-sm">
            Weekly charts and a full history heatmap for every habit.
          </p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5">
          <ShieldCheck className="text-emerald-400 mb-3" size={22} />
          <h3 className="text-white font-medium mb-1">Private & Secure</h3>
          <p className="text-slate-400 text-sm">
            Your data is protected with secure authentication.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;