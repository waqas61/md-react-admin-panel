// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';
import { IconBookmarks } from '@tabler/icons-react';
import { IconBookmarkPlus } from '@tabler/icons-react';
import { IconBookmarkMinus } from '@tabler/icons-react';
// constant
const icons = { IconBrandChrome, IconHelp, IconBookmarks, IconBookmarkPlus, IconBookmarkMinus };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //












const booked = {
  id: 'booked-postings',
  title: 'Booked Postings',
  caption: 'booked-postings',
  type: 'group',
  children: [
    {
      id: 'booked-postings-id',
      title: 'Booked Postings',
      type: 'collapse',
      icon: icons.IconBookmarks,
      children: [
        {
          id: 'currently-booked',
          title: 'Currently Booked',
          type: 'item',
          url: '/booked-postings/currently',
          icon: icons.IconBookmarkPlus,
        },
        {
          id: 'previously-booked',
          title: 'Previously Booked',
          type: 'item',
          url: '/booked-postings/previously',
          icon: icons.IconBookmarkMinus,
        }
      ]
    }
  ],

};

export default booked;
