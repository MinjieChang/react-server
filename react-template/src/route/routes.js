export default [
  {
    path: '/home',
    component: require('../pages/Home').default,
  },
  {
    path: '*',
    component: require('../pages/notFound').default,
  },
]
