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
  path?: string;
  icon?: string;
  hasChildren?: boolean;
  ripple?: boolean;
  expanded?: boolean;
  hidePadding?: boolean;
  hidden?: boolean;
};

export type DrawerNavGroup = {
  divider?: boolean;
  title?: string;
  items: DrawerNavItem[];
};

export type ActiveItemBackgroundShape = 'round' | 'square';

export const NAV_ITEMS: Array<DrawerNavItem> = [
  {title: 'common.menu.dashboard', path: '', icon: 'dashboard'},
  {
    title: 'common.menu.uam',
    path: 'uam',
    icon: 'account',
    items: [
      {
        title: 'common.menu.users',
        path: 'uam/users',
      },
    ],
  },
  {title: 'common.menu.employees', path: 'employees', icon: 'supervisor_account'},
  {title: 'common.menu.organizations', path: 'org', icon: 'business'},
  {title: 'common.menu.finance', path: 'finance', icon: 'account_balance'}, // account_balance_wallet
  {title: 'common.menu.communications', path: 'comms', icon: 'mail_outline'},
  {title: 'common.menu.lms', path: 'lms', icon: 'cancel'},
  {title: 'common.menu.attendance', path: 'ams', icon: 'check_circle_outline'},
  {title: 'common.menu.recruitments', path: 'recruitments', icon: 'phonelink'},
  {title: 'common.menu.onboarding', path: 'onboarding', icon: 'flight'},
  {title: 'common.menu.training', path: 'training', icon: 'layers'},
  {title: 'common.menu.pm', path: 'pm', icon: 'group_work'},
  {title: 'common.menu.pms', path: 'pms', icon: 'show_chart'},
  {title: 'common.menu.cms', path: 'cms', icon: 'assignment_ind'},
  {title: 'common.menu.profile', path: 'profile', icon: 'settings_applications'},
  {title: 'common.menu.settings', path: 'settings', icon: 'settings'},
];

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
