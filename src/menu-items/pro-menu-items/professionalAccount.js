// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';
import { IconUserScan } from '@tabler/icons-react';
import { IconCreditCardPay } from '@tabler/icons-react';
import { IconLocation } from '@tabler/icons-react';
import { IconUserSquare } from '@tabler/icons-react';
import { IconFileCertificate } from '@tabler/icons-react';
import { IconMilitaryRank } from '@tabler/icons-react';
import { IconVaccine } from '@tabler/icons-react';
import { IconBrandRedhat } from '@tabler/icons-react';
// constant
const icons = {
  IconBrandChrome,
  IconHelp,
  IconUserScan,
  IconCreditCardPay,
  IconLocation,
  IconUserSquare,
  IconFileCertificate,
  IconMilitaryRank,
  IconVaccine,
  IconBrandRedhat
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const professionalAccount = {

  id: 'professional-account',
  title: 'Account',
  caption: 'account',
  type: 'group',
  children: [
    {
      id: 'profile',
      title: 'Profile',
      type: 'collapse',
      icon: icons.IconUserScan,
      children: [
        {
          id: 'bio',
          title: 'Bio',
          type: 'item',
          url: '/professional/profile/bio',
          icon: icons.IconCreditCardPay,
        },


        {
          id: 'specialties',
          title: 'Specialties',
          type: 'item',
          url: '/professional/profile/specialties',
          icon: icons.IconMilitaryRank,
        },
        {
          id: 'certificates',
          title: 'Certificates',
          type: 'item',
          url: '/professional/profile/certificates',
          icon: icons.IconFileCertificate,
        },
        {
          id: 'vaccines',
          title: 'Vaccines',
          type: 'item',
          url: '/professional/profile/vaccines',
          icon: icons.IconVaccine,
        },
        {
          id: 'skills-and-experience',
          title: 'Skills and Experience',
          type: 'item',
          url: '/professional/profile/skills-and-experience',
          icon: icons.IconBrandRedhat,
        },
      ]
    }
  ]
};
export default professionalAccount;
