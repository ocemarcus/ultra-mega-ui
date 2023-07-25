
export default [
    {
        path: '/student/:schoolTestId',
        name: 'student',
        component: () => import('./Student.vue')
    },
]