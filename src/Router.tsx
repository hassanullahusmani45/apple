import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import NotFoundPage from './pages/NotFoundPage';
import Articles from './pages/article/Articles'

import Home from './pages/home/Home';
import ShowArticle from './pages/article/ShowArticle';
import TeamMemmber from './pages/teamMember/TeamMember';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/articles',
                element: <Articles />
            },
            {
                path: '/article/:title',
                element: <ShowArticle />
            },
            {
                path: '/author-profile/:id',
                element: <TeamMemmber />
            },
            {
                path: '/not-found',
                element: <NotFoundPage />
            },
           
        ]
    },

]);

const Router = () => <RouterProvider router={router} />;

export default Router;
