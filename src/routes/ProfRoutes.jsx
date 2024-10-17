import { lazy } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// store
import { store } from "../store/store";

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard')));
const OwnerProfile = Loadable(lazy(() => import('../views/account/OwnerProfile')));
const Billing = Loadable(lazy(() => import('../views/account/Billing')));
const OwnerLocations = Loadable(lazy(() => import('../views/account/OwnerLocations')));
const Applicants = Loadable(lazy(() => import('../views/applicants/index')));
const Transactions = Loadable(lazy(() => import('../views/transactions/index')));
const OwnerJobHistory = Loadable(lazy(() => import('../views/job-history/index')));
const AmbassadorProgram = Loadable(lazy(() => import('../views/special-offer/AmbassadorProgram')));
const CurrentlyBooked = Loadable(lazy(() => import('../views/booked-postings/currently-booked/index')));
const PreviouslyBooked = Loadable(lazy(() => import('../views/booked-postings/previously-booked/index')));
const PermanentJobs = Loadable(lazy(() => import('../views/postings/permanent-jobs/index')));
const PostingApplicantPermanent = Loadable(lazy(() => import('../views/postings/permanent-jobs/PostingApplicantPermanent')));
const PostingApplicantProposal = Loadable(lazy(() => import('../views/postings/permanent-jobs/PostingApplicantProposal')));
const ViewPostings = Loadable(lazy(() => import('../views/postings/temporary-jobs/ViewPostings')));
const CreatePostingsTemporary = Loadable(lazy(() =>
  import('../views/postings/CreatePostingTemporary')
));
const OwnerJobCalendar = Loadable(lazy(() =>
  import('../views/postings/permanent-jobs/interview-calendar/index')
));
const TemporaryPostingApplicantProposal = Loadable(lazy(() =>
  import('../views/postings/temporary-jobs/TemporaryPostingApplicantProposal')
));
const PostingApplicantInterviews = Loadable(lazy(() =>
  import('../views/postings/permanent-jobs/interview-details/PostingApplicantInterviews'))
);
const ScheduleJobInterview = Loadable(lazy(() =>
  import('../views/postings/permanent-jobs/schedule-job-interview/index'))
);
const InterviewCalendar = Loadable(lazy(() =>
  import('../views/postings/permanent-jobs/interview-calendar/index'))
);
const TemporaryJobs = Loadable(lazy(() => import('../views/postings/temporary-jobs/index')));
const PostingApplicants = Loadable(lazy(() => import('../views/postings/temporary-jobs/PostingApplicants')));
const CreatePostingPerm = Loadable(lazy(() => import('../views/postings/CreatePostingPerm')));


const ProtectedRoutes = () => {
  const state = store.getState();
  console.log('routing ', state.user);
  if (state && state.user.is_loggedin && state.user.authToken != null) {
    console.log('In');
    return <Outlet />;
  } else {
    console.log('Out', state.user);
    if (state.user.authToken == null) {
      console.log('Out ifsss');
      return <Navigate to="/login" replace />;
    } else {
      console.log('Out else');
      return <Outlet />;
    }
  }
  // return state && state.user.is_loggedin ? <Outlet /> : <Navigate to="/login" replace />;
};

function Error404() {
  return <h2>404 Not found</h2>;
}

// ==============================|| MAIN ROUTING ||============================== //


const ProfRoutes = {
  id: 'root',
  // path: '/',
  element: <MainLayout />,
  // loader: async () => {
  //   console.log('Loader ');
  // },
  children: [
    {
      // path: '/posting',
      element: <ProtectedRoutes />,
      children: [

        {
          path: '/',
          element: <DashboardDefault />
        },
        {
          path: '/dashboard',
          element: <DashboardDefault />
        },

        // {
        //   path: '/404',
        //   element: <Error404 />
        // },
        {
          path: '/*',
          element: <Navigate replace to="/404" />
          // element: <Error404 />
        },
      ]
    }
  ]
};

export default ProfRoutes;
