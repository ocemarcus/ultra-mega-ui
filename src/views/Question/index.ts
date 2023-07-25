
export default [
    {
        path: '/question',
        name: 'question',
        component: () => import('./Question.vue')
    },
    {
        path: '/question/form/:id',
        name: 'question-form',
        component: () => import('./Form.vue')
    }
]