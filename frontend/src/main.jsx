import './index.css';
import App from './App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Profilepage from './pages/Dashboard/Profilepage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import SkillList from './skills/SkillList.jsx';
import MySkills from './skills/MySkills.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import UserStat from './pages/Dashboard/UserStat.jsx';
import CreateSkill from './skills/CreateSkill.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import NotFound from './components/NotFound.jsx';
import SkillDetail from './skills/SkillDetail.jsx';
import TaskDetail from './task/TaskDetail.jsx';
import CreateTask from './task/CreateTask.jsx';
import UpdateTask from './task/UpdateTask.jsx';
import UpdateSkill from './skills/UpdateSkill.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<ErrorBoundary />}>
      <Route index path='' element={<Homepage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />

      <Route path='' element={<ProtectedRoute />}>
        {/* Skill */}
        <Route path='/my-skills' element={<MySkills />} />
        <Route path='/skill-list' element={<SkillList />} />
        <Route path='/create-skill' element={<CreateSkill />} />
        <Route path='/update-skill/:skillId' element={<UpdateSkill />} />
        <Route path='/skill-detail/:skillId' element={<SkillDetail />} />

        {/* Task */}
        <Route path='/task-detail/:taskId' element={<TaskDetail />} />
        <Route path='/create-task/:skillId' element={<CreateTask />} />
        <Route path='/update-task/:skillId/:taskId' element={<UpdateTask />} />

        {/* Dashboard */}
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index path='' element={<UserStat />} />
          <Route path='profile' element={<Profilepage />} />
        </Route>
      </Route>

      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
