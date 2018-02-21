/* eslint-disable indent */
import lazyLoading from './lazyLoading'

export default {
    path: '/datasets',
    meta: {
        icon: 'fa-database',
        label: 'Datasets'
    },
    component: lazyLoading('datasets', true)
}
