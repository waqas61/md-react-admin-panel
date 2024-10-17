// assets
import { IconDashboard } from '@tabler/icons-react';
import { IconHistory } from '@tabler/icons-react';
// constant
const icons = { IconHistory };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const proJobHistory = {
  id: 'job-history',
  title: 'Job History',
  type: 'group',
  children: [
    {
      id: 'job-history',
      title: 'Job History',
      type: 'item',
      url: '/professional/job-history',
      icon: icons.IconHistory,
      breadcrumbs: true
    }
  ]
};

export default proJobHistory;
