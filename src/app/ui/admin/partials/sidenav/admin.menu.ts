export interface MenuItem {
  title: string;
  icon?: string;
  link?: string;
  pathMatch?: string;
  group?: boolean;
  home?: boolean;
  children?: MenuItem[];
}

export interface NavItem {
  children?: NavItem[];
  title: string;
  path: string;
  icon?: string;
}

export type DrawerNavItem = {
  statusColor?: string;
  title: string;
  subtitle?: string;
  chevron?: boolean;
  divider?: boolean;
  items?: Array<Omit<DrawerNavItem, 'icon'>>;
  onSelect?: any;
  icon?: string;
  hasChildren?: boolean;
  ripple?: boolean;
  expanded?: boolean;
  hidePadding?: boolean;
  hidden?: boolean;
};

export type ActiveItemBackgroundShape = 'round' | 'square';

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'shopping-cart-outline',
    link: '/admin',
    home: true,
  },
  // {
  //   title: 'IoT Dashboard',
  //   icon: 'home-outline',
  //   link: '/pages/iot-dashboard',
  // },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'HRM',
    icon: 'layout-outline',
    children: [
      {
        title: 'Employees',
        pathMatch: 'prefix',
        link: '/admin/hrm/employees',
      },
      {
        title: 'Users',
        link: '/admin/hrm/users',
      },
    ],
  },
  {
    title: 'Finance',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Banks',
        link: '/admin/finance/banks',
      },
      {
        title: 'Accounts',
        link: '/admin/finance/accounts',
      },
      {
        title: 'Currencies',
        link: '/admin/finance/currencies',
      },
    ],
  },
  {
    title: 'CRM',
    icon: 'keypad-outline',
    children: [
      {
        title: 'Products',
        link: '/admin/crm/products',
      },
      {
        title: 'Customers',
        link: '/admin/crm/customers',
      },
      {
        title: 'Orders',
        link: '/admin/crm/orders',
      },
      {
        title: 'Stores',
        link: '/admin/crm/stores',
      },
    ],
  },
  {
    title: 'Project Management',
    icon: 'keypad-outline',
    children: [
      {
        title: 'Projects',
        link: '/admin/pm/projects',
      },
    ],
  },
  {
    title: 'Company',
    icon: 'browser-outline',
    children: [
      {
        title: 'Company Info',
        link: '/admin/company',
      },
      {
        title: 'Departments',
        link: '/admin/company/departments',
      },
      {
        title: 'Groups',
        link: '/admin/company/groups',
      },
      {
        title: 'Sections',
        link: '/admin/company/sections',
      },
      {
        title: 'Settings',
        link: '/admin/company/',
      },
    ],
  },
  {
    title: 'Communication',
    icon: 'message-circle-outline',
    children: [
      {
        title: 'SMS',
        link: '/admin/comms/sms',
        children: [
          {
            title: 'Send SMS',
            link: '/admin/comms/sms/send-sms',
          },
        ],
      },
      {
        title: 'E-Mails',
        link: '/admin/comms/emails',
        children: [
          {
            title: 'Compose Email',
            link: '/admin/comms/emails/compose-email',
          },
        ],
      },
      {
        title: 'Settings',
        link: '/admin/comms',
      },
    ],
  },
  {
    title: 'Reports',
    icon: 'pie-chart-outline',
    children: [
      {
        title: 'Company Reports',
        link: '/admin/reports',
      },
    ],
  },
  // {
  //   title: 'Miscellaneous',
  //   icon: 'shuffle-2-outline',
  //   children: [
  //     {
  //       title: '404',
  //       link: '/pages/miscellaneous/404',
  //     },
  //   ],
  // },
];
