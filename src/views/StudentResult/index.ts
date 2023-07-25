
export default [
    {
        path: '/student-result',
        name: 'student-result',
        component: () => import('./StudentResult.vue')
    },
    {
        path: '/student-result/view/:id',
        name: 'student-result-view',
        component: () => import('./StudentVeiw.vue')
    },
]