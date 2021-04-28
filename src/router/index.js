import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载方式
const Home = () => import('views/home/Home')
const Cart = () => import('views/cart/Cart')
const Category = () => import('views/category/Category')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

// 1.安装插件
Vue.use(VueRouter)

// 2.定义路由，配置路由映射：组件和路径映射关系
const routes = [
  {
    path: '',
    // 重定向，目的是为了使网页一打开就显示首页内容
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    // path: '/detail/:iid',  // 动态路由方式
    path: '/detail',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

// 3.导出对象
export default router