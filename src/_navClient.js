export default {
    items: [
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer',
      },
      {
        name: 'Modules',
        url: '/modules',
        icon: 'icon-cursor',
        children: [
          {
            name: 'Funnels',
            url: '/modules/funnels',
            icon: 'icon-cursor',
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
        icon: 'icon-calculator',
        badge: {
          variant: 'info',
          text: 'NEW',
        },
      },    
    ],
  };
  