export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: string | null;
  children?: ChildItem[];
  // item?: any;
  url?: string;
  color?: string;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: string | null;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: string;
}

import { uniqueId } from 'lodash';

const SidebarContent: MenuItem[] = [
  {
    heading: 'Home',
    children: [
      {
        name: 'Search',
        icon: 'uil:process',
        id: uniqueId(),
        url: '/search',
      },
      {
        name: 'Manage key',
        icon: 'uil:process',
        id: uniqueId(),
        url: '/manage-key',
      },
    ],
  },
];

export default SidebarContent;
