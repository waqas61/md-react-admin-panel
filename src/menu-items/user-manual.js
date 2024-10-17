// assets
import { IconDashboard } from '@tabler/icons-react';
import { IconFileInfo } from '@tabler/icons-react';
// constant
const icons = { IconFileInfo };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const userManual = {
  id: 'user-manual',
  title: 'User Manual',
  type: 'group',
  children: [
    {
      id: 'user-manual-id',
      title: 'User Manual',
      type: 'item',
      url: '/user-manual',
      icon: icons.IconFileInfo,
      breadcrumbs: true
    }
  ]
};

export default userManual;
