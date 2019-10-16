const Profile = () => import('views/Profile')
const Center = () => import('views/Profile/center')
const Login = () => import('components/Login')
const Register = () => import('components/Register')
const FindPassword = () => import('components/FindPassword')

export default {
  path: '/profile',
  component: Profile,
  children: [
    {
      path: "",
      redirect: "center"
    },
    {
      path: "center",
      component: Center
    },
    {
      path: "login",
      component: Login
    },
    {
      path: "register",
      component: Register
    },
    {
      path: "findPassword",
      component: FindPassword
    }
  ]
}