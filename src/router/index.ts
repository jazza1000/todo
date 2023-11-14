import { createRouter, createWebHistory } from 'vue-router'
import HomeView2 from '../views/HomeView2.vue'
import EditTaskView from '../views/EditTaskView.vue'
import CreateTaskView from '../views/CreateTaskView.vue'
import { useAuthStore } from '@/store/auth'
import { stringToDate } from '@/mappers/date'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView2,     
      props: { 
        page: 1,
        pageSize: 10 
      }    
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: HomeView2,
      props: route => ({ 
        page: parseInt(route.query.page),
        pageSize: parseInt(route.query.pageSize),
        search: route.query.search,
        dateFrom: stringToDate(route.query.dateFrom),
        dateTo: stringToDate(route.query.dateTo)
      })
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/tasks/create',
      name: 'createTask',
      component: CreateTaskView,
    },
    {
      path: '/tasks/:taskId',
      name: 'editTask',
      component: EditTaskView,
      props: route => ({ taskId: parseInt(route.params.taskId) })
    },
  ]
})

router.beforeEach((to, from) => {

  const { isAuthenticated }  = useAuthStore();

  if (
    !isAuthenticated &&
    to.name !== 'login'
  ) {
    return { name: 'login' }
  }
})

export default router
