import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import quiz from '../views/SchoolTest'
import question from '../views/Question'
import student from '../views/Student'
import studentResponse from '../views/StudentResult'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
  ].concat(quiz, question, student, studentResponse)
})

export default router
