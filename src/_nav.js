
export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'cui-dashboard',
    },
    {
      name: 'Clients',
      url: '/clients',
      icon: 'cui-briefcase',
    },
    {
      name: 'Modules',
      url: '/modules',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Funnels',
          url: '/modules/funnels',
          icon: 'cui-tags',
        },
      ],
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'icon-bell ',
    },
    {
      name: 'Users',
      url: '/users',
      icon: 'icon-user-follow',
      badge: {
        variant: 'info',
        text: '',
      },
    },  
  ],
};
