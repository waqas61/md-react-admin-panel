import { lazy } from 'react';
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useRouteError } from "react-router-dom";

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// store
import { store } from "../store/store";


// dashboard routing
const NotFound = Loadable(lazy(() => import('../views/NotFound')));
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard')));
const OwnerProfile = Loadable(lazy(() => import('../views/account/OwnerProfile')));
const Billing = Loadable(lazy(() => import('../views/account/Billing')));
const OwnerLocations = Loadable(lazy(() => import('../views/account/OwnerLocations')));
const Applicants = Loadable(lazy(() => import('../views/applicants/index')));
const Transactions = Loadable(lazy(() => import('../views/transactions/index')));
const OwnerJobHistory = Loadable(lazy(() => import('../views/job-history/index')));
const AmbassadorProgram = Loadable(lazy(() => import('../views/special-offer/AmbassadorProgram')));
const Subscription = Loadable(lazy(() => import('../views/subscription/index')));
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



//Professional Views

const ProfessionalTemporaryJobs = Loadable(lazy(() => import('../views/professional/postings/TemporaryJobs/index')));
const TemporaryJobProposal = Loadable(lazy(() => import('../views/professional/postings/TemporaryJobs/TemporaryJobProposal')));
const ProfessionalPermanentJobs = Loadable(lazy(() => import('../views/professional/postings/PermanentJobs/index')));
const PermanentJobInterviewsProfessional = Loadable(lazy(() => import('../views/professional/postings/PermanentJobs/Interviews/index')));
const PermanentJobProposal = Loadable(lazy(() => import('../views/professional/postings/PermanentJobs/PermanentJobProposal')));
const MainCalendar = Loadable(lazy(() => import('../views/professional/postings/MainCalendar/index')));
const JobDetails = Loadable(lazy(() => import('../views/professional/postings/JobDetails')));
const Offices = Loadable(lazy(() => import('../views/professional/offices')));
const JobHistory = Loadable(lazy(() => import('../views/professional/job-history')));
const AccountProfile = Loadable(lazy(() => import('../views/professional/profile/AccountProfile')));
const Specialties = Loadable(lazy(() => import('../views/professional/profile/Specialties/index')));
const EditQuestionnaireProfile = Loadable(lazy(() => import('../views/professional/profile/Specialties/EditQuestionnaire')));
const CertificatesMain = Loadable(lazy(() => import('../views/professional/profile/Certificates/CertificatesMain')));
const VaccinesMain = Loadable(lazy(() => import('../views/professional/profile/Vaccines/index')));
const SkillsAndExperience = Loadable(lazy(() => import('../views/professional/profile/SkillsAndExperience')));


const ProtectedRoutes = () => {
  const state = store.getState();
  if (state && state.user.is_loggedin && state.user.authToken != null && state.user.steps_completed == 3) {
    if (state.user.role_type == 'owner') {
      return <Outlet />;
    } else {
      return <Navigate to="/professional" replace />;
    }
    // return <Outlet />;
  } else {
    if (state && !state.user.is_loggedin && state.user.authToken == null) {
    } else if (state.user.steps_completed < 3) {
      return <Navigate to="/registration/selectRole" replace />;
    } else if (state.user.role_type == 'owner') {
      return <Outlet />;
    }
  }
  // return state && state.user.is_loggedin ? <Outlet /> : <Navigate to="/login" replace />;
};

const ProProtectedRoutes = () => {
  const state = store.getState();
  if (state && state.user.is_loggedin && state.user.authToken != null && state.user.steps_completed == 3) {
    return <Outlet />;
  } else {
    if (state && !state.user.is_loggedin && state.user.authToken == null) {
    } else if (state.user.steps_completed < 3) {
      return <Navigate to="/registration/selectRole" replace />;
    } else {
      return <Outlet />;
    }
  }
  // return state && state.user.is_loggedin ? <Outlet /> : <Navigate to="/login" replace />;
};

const ProDashboard = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname}
    </>
  );
};

const ProfessionalDashboard = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname}
    </>
  );
};


// ==============================|| MAIN ROUTING ||============================== //


const AppRoutes = {
  // id: 'root',
  path: '/',
  element: <MainLayout />,
  errorElement: <NotFound />,
  loader: async () => {
    const state = store.getState();
    if (state && !state.user.is_loggedin && state.user.authToken == null) {
      return redirect('/login');
    }
    return true;
  },
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

        //TemporaryJobs Jobs Route
        
        {
          path: '/posting/temporary',
          element: <TemporaryJobs />
        },
        {
          path: '/posting/create/temporary',
          element: <CreatePostingsTemporary />
        },
        {
          path: '/posting/edit/temporary/:id',
          element: <CreatePostingsTemporary />
        },
        {
          path: '/posting/edit/temporary/:id',
          element: <CreatePostingsTemporary />
        },
        {
          path: '/posting/view/temporary/:id',
          element: <CreatePostingsTemporary />
        },
        {
          path: '/posting/clone/temporary/:id',
          element: <CreatePostingsTemporary />
        },
        {
          path: "/posting/temporary/:id",
          element: <ViewPostings />
        },
        {
          path: "/posting/temporary/:id/applicants/:scheduleId",
          element: <PostingApplicants />
        },
        {
          path: "/posting/temporary/proposal/applicant/:applicantId/post/:postid/schedule/:scheduleId",
          element: < TemporaryPostingApplicantProposal />
        },
        {
          path: "/posting/temporary/:postingId/calendar",
          element: < OwnerJobCalendar />
        },
        {
          path: "/posting/calendar",
          element: < OwnerJobCalendar />
        },

        //Permanent Jobs Route
        {
          path: '/posting/permanent-job',
          element: <PermanentJobs />
        },
        {
          path: '/posting/create/permanent',
          element: <CreatePostingPerm />
        },
        {
          path: '/posting/edit/permanent/:id',
          element: <CreatePostingPerm />
        },
        {
          path: '/posting/clone/permanent/:id',
          element: <CreatePostingPerm />
        },
        {
          path: "/posting/permanent/applicants/:id",
          element: <PostingApplicantPermanent />
        },
        {
          path: "/posting/permanent/proposal/applicant/:applicantId/post/:postid",
          element: <PostingApplicantProposal />
        },
        {
          path: "/posting/permanent/interview/details/:postingId/applicants/:applicantId/schedule",
          element: <PostingApplicantInterviews />
        },
        {
          path: "/posting/permanent/:postingId/applicants/:applicantId/schedule",
          element: <ScheduleJobInterview />
        },
        {
          path: "/posting/permanent/interview-calendar/:id",
          element: <InterviewCalendar />
        },
        {
          path: '/owner',
          children: [
            {
              path: '/owner/billing',
              element: <Billing />
            },
            {
              path: '/owner/locations',
              element: <OwnerLocations />
            },
            {
              path: '/owner/profile',
              element: <OwnerProfile />
            }
          ]
        },
        {
          path: 'booked-postings',
          children: [
            {
              path: 'currently',
              element: <CurrentlyBooked />
            },
            {
              path: 'previously',
              element: <PreviouslyBooked />
            }
          ]
        },
        {
          path: '/applicants',
          element: <Applicants />
        },
        {
          path: '/transactions',
          element: <Transactions />
        },
        {
          path: '/job-history',
          element: <OwnerJobHistory />
        },
        {
          path: '/special-offers',
          element: <AmbassadorProgram />
        },
        {
          path: 'sample-page',
          element: <DashboardDefault />
        },
        {
          path: 'subscription',
          element: <Subscription />
        },
        {
          path: 'user-manual',
          element: <DashboardDefault />
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
    },
    {
      path: '/professional',
      element: <ProProtectedRoutes />,
      children: [
        {
          path: '/professional',
          element: <ProDashboard />
        },
        {
          path: '/professional/dashboard',
          element: <ProfessionalDashboard />
        },

        /////Permanent jobs
        

        {
          path: '/professional/jobs/permanent/:id',
          element: <JobDetails />
        },
        {
          path: '/professional/jobs/permanent/proposal/post/:id',
          element: <PermanentJobProposal />
        },
        {
          path: "/professional/jobs/permanent/:id/interviews",
          element: <PermanentJobInterviewsProfessional />
        },
        {
          path: '/professional/permanent-job',
          element: <ProfessionalPermanentJobs />
        },

        ////////////temp jobs////

        {
          path: '/professional/temporary',
          element: <ProfessionalTemporaryJobs />
        },
        {
          path: '/professional/jobs/temporary/:id',
          element: <JobDetails />
        },
        {
          path: "/professional/jobs/temporary/proposal/post/:id",
          element: <TemporaryJobProposal />
        },

        /////////Profile//////////////////

        {
          path: "/professional/profile/bio",
          element: <AccountProfile />
        },
        {
          path: '/professional/profile/specialties',
          element: <Specialties />
        },
        {
          path: '/professional/profile/specialties/edit',
          element: <EditQuestionnaireProfile />
        },
        {
          path: '/professional/profile/certificates',
          element: <CertificatesMain />
        },
        {
          path: '/professional/profile/vaccines',
          element: <VaccinesMain />
        },
        {
          path: '/professional/profile/skills-and-experience',
          element: <SkillsAndExperience />
        },

        /////////PAges//////////////////
        
        {
          path: '/professional/jobs/calendar',
          element: <MainCalendar />
        },
        {
          path: '/professional/offices',
          element: <Offices />
        },
        {
          path: '/professional/job-history',
          element: <JobHistory />
        },
        {
          path: '/professional/special-offers',
          element: <AmbassadorProgram />
        },
        {
          path: '/professional/user-manual',
          element: <ProfessionalDashboard />
        },
      ]
    }
  ]
};

export default AppRoutes;
