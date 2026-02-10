import { createBrowserRouter } from 'react-router-dom';
import { checkAuthLoader, tokenLoader } from '../util/auth.js';

import RootLayout from './RootLayout.jsx';

import LoginPage, { action as loginAction } from './auth/Login.jsx';
import { action as logoutAction } from './auth/Logout.jsx';

import HomePage from './Home.jsx';
import AdminPage from './Admin.jsx';
import AboutPage from './About.jsx';
import ProjectPage from './project/Project.jsx';
import BlogPage from './blog/Blog.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'projects',
        element: <ProjectPage />
      },
      {
        path: 'blog',
        element: <BlogPage />
      },
      {
        path: 'secretaccess',
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: 'admin',
        element: <AdminPage />,
        loader: checkAuthLoader,
      }
    ]
  },
  {
    path: 'logout',
    action: logoutAction
  },
]);


export default router;