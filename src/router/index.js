import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/page/Index'
// import ErrorPage from '@/page/Error'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Twod from '@/page/twoD/TwoD'
<<<<<<< .mine
// import Draft from '@/page/Draft'
||||||| .r32
import Draft from '@/page/Draft'
=======
import Threed from '@/page/threeD/ThreeD'
import Draft from '@/page/Draft'
>>>>>>> .r33
import Search from '@/page/SearchModule'
import WorkShow from '@/page/twoD/WorkShow'
import PersonSet from '@/page/personal/PersonSet'
import MyHome from '@/page/personal/MyHome'

Vue.use(Router)

export default new Router({
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
        },{
        path: '/model/draft/:id',
        name: 'Draft',
        components: {
            'header': Header,
            'main': Draft,
            'footer': Footer
        }
        },{
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
            components: {
                'header': Header,
                'main': PersonSet,
                'footer': Footer
            }
        }, {
            path: '/mine/:id',
            name: 'MyHome',
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

    },{
        path: '*',
        component: ErrorPage,
    }]
})