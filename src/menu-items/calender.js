// assets
import { IconCalendarEvent } from '@tabler/icons-react';

// constant
const icons = { IconCalendarEvent };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const calender = {
  id: 'calender',
  title: 'Calender',
  type: 'group',
  children: [
    {
      id: 'calender-id',
      title: 'Calender',
      type: 'item',
      url: '/',
      icon: icons.IconCalendarEvent,
      breadcrumbs: false
    }
  ]
};

export default calender;
