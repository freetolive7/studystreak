import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AppLayout from './layouts/AppLayout';
import Overview from './pages/Overview';
import Habits from './pages/Habits';
import WeeklyReport from './pages/WeeklyReport';
import ProjectsGithub from './pages/ProjectsGithub';
import Profile from './pages/Profile';
import HabitDetail from './pages/HabitDetail';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Overview />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/habits/:id" element={<HabitDetail />} />
            <Route path="/report" element={<WeeklyReport />} />
            <Route path="/projects" element={<ProjectsGithub />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;