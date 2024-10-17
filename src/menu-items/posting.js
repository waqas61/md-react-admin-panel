// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';
import { IconClipboard } from '@tabler/icons-react';
import { IconPill } from '@tabler/icons-react';
// import { IconPillFilled } from '@tabler/icons-react';
import { IconPillOff } from '@tabler/icons-react';
// constant
const icons = { IconBrandChrome, IconHelp, IconClipboard, IconPillOff, IconPill };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //



const posting = {



  id: 'posting',
  title: 'Posting',
  caption: 'posting',
  type: 'group',
  children: [
    {
      id: 'posting',
      title: 'Posting',
      type: 'collapse',
      icon: icons.IconClipboard,
      children: [
        {
          id: 'permanent-job',
          title: 'Permanent Job',
          type: 'item',
          url: '/posting/permanent-job',
          icon: icons.IconPillOff,
        },
        {
          id: 'temp-jobs',
          title: 'Temporary Job',
          type: 'item',
          url: '/posting/temporary',
          icon: icons.IconPill,
        }
      ]
    }
  ]
};









export default posting;
