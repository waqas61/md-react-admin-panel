// assets
import { IconDashboard } from '@tabler/icons-react';
import { IconConfetti } from '@tabler/icons-react';
// constant
const icons = { IconConfetti };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const specialOffers = {
  id: 'special-offers',
  title: 'Special Offers',
  type: 'group',
  children: [
    {
      id: 'special-offers-id',
      title: 'Special Offers',
      type: 'item',
      url: '/special-offers',
      icon: icons.IconConfetti,
      breadcrumbs: true
    }
  ]
};

export default specialOffers;
