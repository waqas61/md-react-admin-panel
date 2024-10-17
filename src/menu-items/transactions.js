// assets
import { IconDashboard } from '@tabler/icons-react';
import { IconTransfer } from '@tabler/icons-react';

// constant
const icons = { IconTransfer };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const transactions = {
  id: 'transactions',
  title: 'Transactions',
  type: 'group',
  children: [
    {
      id: 'transactions-id',
      title: 'Transactions',
      type: 'item',
      url: '/transactions',
      icon: icons.IconTransfer,
      breadcrumbs: true
    }
  ]
};

export default transactions;
