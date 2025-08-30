import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import NotFoundPage from './pages/NotFoundPage';
import Articles from './pages/article/Articles'

import Home from './pages/home/Home';
import ShowArticle from './pages/article/ShowArticle';
import TeamMemmber from './pages/teamMember/TeamMember';
import About from './pages/about/About';
import ContactUs from './pages/contact/ContactUs';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import { ProtectedRout } from './routes/AuthRoutes';

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
                path: '/about',
                element: <ProtectedRout >
                             <About />
                        </ProtectedRout >
            },
{
    path: '/contact-us',
        element: <ContactUs />
},
{
    path: '/not-found',
        element: <NotFoundPage />
},

        ]
    },
{
    path: '/login',
        element: <Login />
},
{
    path: '/register',
        element: <Register />
},
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
