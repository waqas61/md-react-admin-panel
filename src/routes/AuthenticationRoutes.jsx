import { lazy } from 'react';
import {
  redirect
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { store } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";
// project imports
import Loadable from '../ui-component/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

import { useRouteError, isRouteErrorResponse } from 'react-router-dom';


// login option 3 routing
// const AuthLogin3 = Loadable(lazy(() => import('../views/pages/authentication3/Login3')));
// const AuthRegister3 = Loadable(lazy(() => import('../views/pages/authentication3/Register3')));

const LoginPage = Loadable(lazy(() => import('../views/auth/LoginPage')));
const SignUpPage = Loadable(lazy(() => import('../views/auth/SignUpPage')));
const ForgotPassPage = Loadable(lazy(() => import('../views/auth/ForgotPassPage')));
const RegAgreement = Loadable(lazy(() => import('../views/auth/RegAgreement')));
const Congratulations = Loadable(lazy(() => import('../views/auth/Congratulations')));
const PracticeOwnerReg = Loadable(lazy(() => import('../views/auth/PracticeOwnerReg')));
const ProfessionalReg = Loadable(lazy(() => import('../views/auth/ProfessionalReg')));
const AccountType = Loadable(lazy(() => import('../views/auth/AccountType')));
const PaymentMethod = Loadable(lazy(() => import('../views/auth/practice-owner-reg/PaymentMethod')));



// ==============================|| AUTHENTICATION ROUTING ||============================== //

const state = store.getState();

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}



const NoneProtectedRoutes2 = () => {
  const state = store.getState();
  const navigate = useNavigate();
  const location = useLocation();
  console.log('NoneProtectedRoutes2', state.user);



  // useEffect(() => {
  //   console.log('NoneProtectedRoutes', location.path, state.user);
  // }, [location]);

  if (state && state.user.is_loggedin && state.user.authToken != null) {
    console.log('IF', state.user);
    // if (state.user.steps_completed < 3) {
    //   if (state.user.role_type == 'owner') {
    //     return <Navigate to="/registration/owner" replace />;
    //   } else {
    //     return <Navigate to="/registration/professional" replace />;
    //   }
    // } else {
    // }
    return <Outlet />;
  } else {
    console.log('ELSE', state.user);
    // if (state.user.steps_completed == null) {
    //   console.log('steps_completed', state.user);
    //   return <Outlet />;
    // }
    return <Outlet />;
  }
  // return state && !state.user.is_loggedin ? <Outlet /> : <Navigate to="/" replace />;
};


const RedirectLoggedIn = () => {
  const state = store.getState();
  if (state && state.user.is_loggedin && state.user.authToken != null) {
    console.log('IF RedirectLoggedIn', state.user);
    return <Navigate to="/" replace />;
  } else {
    console.log('ELSE RedirectLoggedIn', state.user);
    return <LoginPage />;
  }
};

const IsRegistered = () => {
  const state = store.getState();
  const navigate = useNavigate();
  const location = useLocation();
  // useEffect(() => {
  // }, [navigate]);
  console.log('Is Reg ==> ', state.user);

  // return <Outlet />;
  if (state && !state.user.role_type) {
    console.log('is Reg Login');
    return <Navigate to="/login" replace />;
  } else {
    console.log('Is Reg Outlet ==> ', state.user);

    if (state.user.steps_completed < 3) {
      console.log('steps_completed', state.user);
      return <Outlet />;
    } else {
      return <Navigate to="/" replace />
    }
    // return <Outlet />;


    // return state && state.user.is_loggedin ? <Navigate to="/" replace /> : <Outlet />;



  }
};


const AuthenticationRoutes = {
  // id: 'root-auth',
  path: '/',
  element: <MinimalLayout />,
  errorElement: < ErrorBoundary />,
  children: [
    {
      element: <NoneProtectedRoutes2 />,
      children: [
        {
          path: '/login',
          element: <RedirectLoggedIn />
        },
        {
          path: '/signup',
          element: <SignUpPage />
        },
        {
          path: '/registration',
          element: <IsRegistered />,
          children: [
            {
              path: '/registration/agreement',
              element: <RegAgreement />
            },
            {
              path: '/registration/completed',
              element: <Congratulations />
            },
            {
              path: '/registration/owner',
              element: <PracticeOwnerReg />
            },
            {
              path: '/registration/professional',
              element: <ProfessionalReg />
            },
            {
              path: '/registration/selectRole',
              element: <AccountType />
            },
          ]
        },
        {
          path: '/recover-password',
          element: <ForgotPassPage />
        },


        {
          path: '/payment-method',
          element: <PaymentMethod />
        },
        // {
        //   path: '/404',
        //   element: <Error404 />
        // },
        // {
        //   path: '/*',
        //   element: <Navigate replace to="/404" />
        //   // element: <Error404 />
        // },
      ]
    }
  ]
};

export default AuthenticationRoutes;
