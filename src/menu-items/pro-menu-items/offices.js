// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';
import { IconBuildingEstate } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp, IconBuildingEstate };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const offices = {
  id: 'offices',
  type: 'group',
  children: [
    {
      id: 'offices-id',
      title: 'Offices',
      type: 'item',
      url: '/professional/offices',
      icon: icons.IconBuildingEstate,
      breadcrumbs: true
    }
  ]
};

export default offices;
