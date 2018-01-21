import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/HelloWorld'
import users from '@/pages/users'
import components from '@/pages/components'
import addComponent from '@/pages/addComponent'
import addUser from '@/pages/addUser'
import uploadtest from '@/pages/uploadtest'
import devices from '@/pages/devices'
import addDevice from '@/pages/addDevice'
import modifyDevice from '@/pages/modifyDevice'
import modifyComponent from '@/pages/modifyComponent'
import deployplan from '@/pages/deployplan'
import addDeployPlan from '@/pages/addDeployPlan'
import deployplanDetail from '@/pages/deployplanDetail'
import deploybind from '@/pages/deploybind'
import ztree from '@/pages/ztree'
import signin from '@/pages/signin'
import selectProject from '@/pages/selectProject'
import addProject from '@/pages/addProject'
import scan from '@/pages/scan'

/* eslint-disable */
import Axios from 'axios'

Axios.defaults.baseURL = 'http://127.0.0.1:8080/'  //路径提取出来，简化代码

//Axios.defaults.baseURL = 'http://' + this.getCookie('ip') + '/'
Vue.use(Router)
Vue.prototype.$axios = Axios;



export default new Router({

    routes: [

        {
            path: '/',
            name: 'signin',
            component: signin
        },
        {
            path: '/selectProject',
            name: 'selectProject',
            component: selectProject
        },
        {
            path: '/addProject',
            name: 'addProject',
            component: addProject
        },

        {
            path: '/main',
            name: 'main',
            component: main,
            children: [
                {
                    path: '/users',
                    name: 'users',
                    component: users
                },
                {
                    path: '/components',
                    name: 'components',
                    component: components
                },
                {
                    path: '/addUser',
                    name: 'addUser',
                    component: addUser
                },
                {
                    path: '/addComponent',
                    name: 'addComponent',
                    component: addComponent
                },

                {
                    path: '/uploadtest',
                    name: 'uploadtest',
                    component: uploadtest
                },
                {
                    path: '/devices',
                    name: 'devices',
                    component: devices
                },
                {
                    path: '/addDevice',
                    name: 'addDevice',
                    component: addDevice
                },
                {
                    path: '/modifyDevice',
                    name: 'modifyDevice',
                    component: modifyDevice
                },
                {
                    path: '/modifyComponent',
                    name: 'modifyComponent',
                    component: modifyComponent
                },
                {
                    path: '/deployplan',
                    name: 'deployplan',
                    component: deployplan
                },
                {
                    path: '/addDeployPlan',
                    name: 'addDeployPlan',
                    component: addDeployPlan
                },
                {
                    path: '/deployplanDetail',
                    name: 'deployplanDetail',
                    component: deployplanDetail
                },
                {
                    path: '/deploybind',
                    name: 'deploybind',
                    component: deploybind
                },
                {
                    path: '/ztree',
                    name: 'ztree',
                    component: ztree
                },
                {
                    path: '/scan',
                    name: 'scan',
                    component: scan
                },
            ]
        }

    ]
})
