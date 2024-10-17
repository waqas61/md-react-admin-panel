import { createBrowserRouter } from 'react-router-dom';

// routes
import OwnerRoutes from './OwnerRoutes';
import ProfRoutes from './ProfRoutes';
import LoginRoutes from './AuthenticationRoutes';
import { store } from "../store/store";
// ==============================|| ROUTING RENDER ||============================== //

const state = store.getState();


const router = createBrowserRouter([
    // state?.user?.role_type == 'owner' ? OwnerRoutes : state.user.role_type == 'professional' ? ProfRoutes : [],
    OwnerRoutes,
    LoginRoutes
]);
export default router;


