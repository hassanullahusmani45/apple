import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import NotFoundPage from './pages/NotFoundPage';

import Home from './pages/home/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
        {
            path:'/',
            element: <Home/>
        }
        ]
    },
    
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
