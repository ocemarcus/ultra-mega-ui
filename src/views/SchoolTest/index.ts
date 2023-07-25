
export default [
    {
        path: '/school-test',
        name: 'school-test',
        component: () => import('./SchoolTest.vue')
    },
    {
        path: '/school-test/form/:id',
        name: 'school-test-form',
        component: () => import('./Form.vue')
    }
]