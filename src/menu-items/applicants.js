// assets
import { IconDashboard } from '@tabler/icons-react';
import { IconUserUp } from '@tabler/icons-react';

// constant
const icons = { IconUserUp };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const applicants = {
  id: 'applicants',
  title: 'Applicants',
  type: 'group',
  children: [
    {
      id: 'applicants-id',
      title: 'Applicants',
      type: 'item',
      url: '/applicants',
      icon: icons.IconUserUp,
      breadcrumbs: false
    }
  ]
};

export default applicants;
