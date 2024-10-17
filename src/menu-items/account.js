// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';
import { IconUserScan } from '@tabler/icons-react';
import { IconCreditCardPay } from '@tabler/icons-react';
import { IconLocation } from '@tabler/icons-react';
import { IconUserSquare } from '@tabler/icons-react';
// constant
const icons = { IconBrandChrome, IconHelp, IconUserScan, IconCreditCardPay, IconLocation, IconUserSquare };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const account = {

  id: 'owner',
  title: 'Account',
  caption: 'account',
  type: 'group',
  children: [
    {
      id: 'account-id',
      title: 'Profile',
      type: 'collapse',
      icon: icons.IconUserScan,
      children: [
        {
          id: 'billing',
          title: 'Billing',
          type: 'item',
          url: '/owner/billing',
          icon: icons.IconCreditCardPay,
        },
        {
          id: 'location',
          title: 'Location',
          type: 'item',
          url: '/owner/locations',
          icon: icons.IconLocation,
        },
        {
          id: 'office-profile',
          title: 'Office Profile',
          type: 'item',
          url: '/owner/profile',
          icon: icons.IconUserSquare,
        }
      ]
    }
  ]
};
export default account;
