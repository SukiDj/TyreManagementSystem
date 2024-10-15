import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../features/HomePage/HomePage.tsx"

export const routes: RouteObject[] = [
    {
        path:"/",
        element: <App/>,
        children:[
            /*{
                element: <RequireAuth />, children: [
                    {path: 'profiles/:username', element:<ProfilePage />}
                ]
            },
            {
                element: <RequireAdmin />, children: [
                    {path: 'adminDashboard', element: <AdminDashBoard /> },
                    {path: 'errors', element:<TestErrors/>},
                    {path: 'guideRequests', element: <GuideDashBoard />}
                ]
            },
            {
                element: <RequireVodic />, children: [//oovo sve moze i admin tako sam namestio u RequireVodic ako ocemo da ga iskljucujemo
                    {path: 'manage/:id', element:<TourForm key='manage'/>},
                    {path: 'createTour', element:<TourForm key='create'/>},
                    {path: 'createPlant', element:<PlantForm key='create' />},
                    {path: 'managePlant/:id', element:<PlantForm key='manage' />},
                    {path: 'createArea', element:<AreaForm />},
                    {path: 'createRout', element:<RoutForm />},
                ]
            }
        */
            {path:'', element:<HomePage />}
        ]
    }
    
]

export const router = createBrowserRouter(routes);  