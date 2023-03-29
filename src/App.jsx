import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import * as ROUTES from './constants/routes';
import useAuthStore from './store/userStore';

import InstagramLoading from './components/ui/InstagramLoading';
import Header from './components/header';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/signUp'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));
const Create = lazy(() => import('./pages/create'));
const Settings = lazy(() => import('./pages/settings'));
const NotFound = lazy(() => import('./pages/notFound'));

function App() {
  const user = useAuthStore((state) => state.user);
  return (
    <Suspense fallback={<InstagramLoading />}>
      <div className="bg-gray-background">
        {user && <Header user={user} />}
        <Routes>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard user={user} />} />
          <Route path={ROUTES.CREATE} element={<Create user={user} />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path={ROUTES.NOTFOUND} element={<NotFound user={user} />} />
          <Route path="*" element={<Navigate replace to={ROUTES.NOTFOUND} />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
