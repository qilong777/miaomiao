const Admin = () => import('views/Admin')
const Users = () => import('views/Admin/users')
const Movie = () => import('views/Admin/movie')
const Cinema = () => import('views/Admin/cinema')
export default {
  path: '/admin',
  component: Admin,
  children: [
    {
      path: '',
      redirect: 'users'
    },
    {
      path: 'users',
      component: Users
    }
    ,
    {
      path: 'movie',
      component: Movie
    },
    {
      path: 'cinema',
      component: Cinema
    }
  ]
}