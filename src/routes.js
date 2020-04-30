import React from 'react';
const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const Clients = React.lazy(() => import('./views/Clients/Clients'));
const Notifications = React.lazy(() => import('./views/Notifications/Notifications'));
const ReportGeneration = React.lazy(() => import('./views/ReportGeneration/ReportGeneration'));
const Funnels = React.lazy(() => import('./views/modules/Funnels/Funnels'));
const Survey = React.lazy(() => import('./views/modules/Survey'));
const Ecommerce = React.lazy(() => import('./views/modules/Ecommerce'));
const Users = React.lazy(() => import('./views/Users/Users'));
const Profile = React.lazy(() => import('./views/Profile/Profile'));
const routes = [

  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/notifications', name: 'Notifications', component: Notifications },
  { path: '/clients', name: 'Clients', component: Clients },
  { path: '/reportGeneration', name: 'Report Generation', component: ReportGeneration },
  { path: '/modules', exact: true, name: 'Modules', component: Funnels },
  { path: '/modules/funnels', name: 'Funnels', component: Funnels },
  { path: '/modules/survey', name: 'Survey', component: Survey },
  { path: '/modules/ecommerce', name: 'Ecommerce', component: Ecommerce }, 
  { path: '/users', name: 'Users', component: Users },
  { path: '/profile', name: 'Profile', component: Profile },
];
export default routes;
















