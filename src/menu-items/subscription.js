// assets
import { IconDashboard } from '@tabler/icons-react';
import { IconBrandInertia } from '@tabler/icons-react';
// constant
const icons = { IconBrandInertia };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const subscription = {
  id: 'subscription',
  title: 'Subscription',
  type: 'group',
  children: [
    {
      id: 'subscription-id',
      title: 'Subscription',
      type: 'item',
      url: '/subscription',
      icon: icons.IconBrandInertia,
      breadcrumbs: true
    }
  ]
};

export default subscription;
