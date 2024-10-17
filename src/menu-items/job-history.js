// assets
import { IconDashboard } from '@tabler/icons-react';
import { IconHistory } from '@tabler/icons-react';
// constant
const icons = { IconHistory };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const jobHistory = {
  id: 'job-history',
  title: 'Job History',
  type: 'group',
  children: [
    {
      id: 'job-history',
      title: 'Job History',
      type: 'item',
      url: '/job-history',
      icon: icons.IconHistory,
      breadcrumbs: true
    }
  ]
};

export default jobHistory;
