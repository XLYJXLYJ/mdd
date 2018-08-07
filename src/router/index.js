import Vue from 'vue'
import store from '@/vuex/store'
import Router from 'vue-router'
import Index from '@/page/Index'
import ErrorPage from '@/page/Error'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
// import Twod from '@/page/twoD/TwoD'
// import Threed from '@/page/threeD/ThreeD'
// import Draft from '@/page/Draft'
// import Search from '@/page/SearchModule'
// import WorkShow from '@/page/twoD/WorkShow'
// import PersonSet from '@/page/personal/PersonSet'
// import MyHome from '@/page/personal/MyHome'
const Twod = () =>
    import ('@/page/twoD/TwoD');
const Threed = () =>
    import ('@/page/threeD/ThreeD');
const Draft = () =>
    import ('@/page/Draft');
const Search = () =>
    import ('@/page/SearchModule');
const WorkShow = () =>
    import ('@/page/twoD/WorkShow');
const PersonSet = () =>
    import ('@/page/personal/PersonSet');
const MyHome = () =>
    import ('@/page/personal/MyHome');
Vue.use(Router)

const router = new Router({
    // mode:'history',
    routes: [{
        path: '/',
        name: 'Index',
        redirect: '/2D',
        component: Index,
        children: [{
            path: '/2D',
            components: {
                'header': Header,
                'main': Twod,
                'footer': Footer
            }
        }, {
            path: '/3D',
            components: {
                'header': Header,
                'main': Threed,
                'footer': Footer
            }
        }, {
            path: '/3D',
            components: {
                'header': Header,
                'main': Threed,
                'footer': Footer
            }
        }, {
            path: '/search/:value',
            components: {
                'header': Header,
                'main': Search,
                'footer': Footer
            }
        }, {
            path: '/model/draft/:id',
            name: 'Draft',
            components: {
                'header': Header,
                'main': Draft,
                'footer': Footer
            }
        }, {
            path: '/model/detail/:id',
            name: 'WorkShow',
            components: {
                'header': Header,
                'main': WorkShow,
                'footer': Footer
            }
        }, {
            path: '/setting',
            name: 'PersonSet',
            meta: {
                requireAuth: true,
            },
            components: {
                'header': Header,
                'main': PersonSet,
                'footer': Footer
            }
        }, {
            path: '/mine/:id',
            name: 'MyHome',
            meta: {
                requireAuth: true,
            },
            components: {
                'header': Header,
                'main': MyHome,
                'footer': Footer
            }
        }, {
            path: '/author/:id',
            name: 'MyHome',
            components: {
                'header': Header,
                'main': MyHome,
                'footer': Footer
            }
        }]

    }, {
        path: '*',
        component: ErrorPage,
    }]
})

if (localStorage.modelUserid) {
    store.commit('setuserid', localStorage.modelUserid)
}

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (store.state.userid === "") {
            next({
                path: "/2D"
            })
        } else {
            next();
        }
    } else {
        next()
    }

})

export default router;