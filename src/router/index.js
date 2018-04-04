import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/HelloWorld'
import users from '@/pages/users'
import components from '@/pages/components'
import addComponent from '@/pages/addComponent'
import addComponent1 from '@/pages/addComponent1'
import addUser from '@/pages/addUser'
import uploadtest from '@/pages/uploadtest'
import devices from '@/pages/devices'
import addDevice from '@/pages/addDevice'
import modifyDevice from '@/pages/modifyDevice'
import modifyComponent from '@/pages/modifyComponent'
import modifyComponent1 from '@/pages/modifyComponent1'
import modifyUser from '@/pages/modifyUser'
import modifyPasswordAdmin from '@/pages/modifyPasswordAdmin'
import modifyPasswordSelf from '@/pages/modifyPasswordSelf'
import modifyDeploy from '@/pages/modifyDeploy'
import deployplan from '@/pages/deployplan'
import addDeployPlan from '@/pages/addDeployPlan'
import deployplanDetail from '@/pages/deployplanDetail'
import deploybind from '@/pages/deploybind'
import ztree from '@/pages/ztree'
import signin from '@/pages/signin'
import selectProject from '@/pages/selectProject'
import addProject from '@/pages/addProject'
import scan from '@/pages/scan'
import deploy from '@/pages/deploy'
import newdeploy from '@/pages/newdeploy'
import softpackage from '@/pages/softpackage'
import addSoftpackage from '@/pages/addSoftpackage'
import baseline from '@/pages/baseline'
import log from '@/pages/log'
import modifySoftpackage from '@/pages/modifySoftpackage'

/* eslint-disable */
import Axios from 'axios'

//Axios.defaults.baseURL = 'http://192.168.0.103:8080/';  //路径提取出来，简化代码

//Axios.defaults.baseURL = 'http://';

Vue.use(Router);
Vue.prototype.$axios = Axios;

/*Vue.prototype.getRandColor = function() {
  var ip = this.getCookie('ip') + ":8080/";
  return ip;
};*/

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
                    path: '/modifyUser',
                    name: 'modifyUser',
                    component: modifyUser
                },
                {
                  path: '/modifyPasswordAdmin',
                  name: 'modifyPasswordAdmin',
                  component: modifyPasswordAdmin
                },
                {
                  path: '/modifyPasswordSelf',
                  name: 'modifyPasswordSelf',
                  component: modifyPasswordSelf
                },
                {
                    path: '/addComponent',
                    name: 'addComponent',
                    component: addComponent
                },
                {
                  path: '/addComponent1',
                  name: 'addComponent1',
                  component: addComponent1
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
                    path: '/modifyDevice/:id',
                    name: 'modifyDevice',
                    component: modifyDevice
                },
                {
                    path: '/modifyComponent',
                    name: 'modifyComponent',
                    component: modifyComponent
                },
                {
                  path: '/modifyComponent1/:id',
                  name: 'modifyComponent1',
                  component: modifyComponent1
                },
                {
                    path: '/modifyDeploy',
                    name: 'modifyDeploy',
                    component: modifyDeploy
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
                    path: '/deploybind/:id',
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
                {
                    path: '/deploy',
                    name: 'deploy',
                    component: deploy
                },
                {
                  path: '/newdeploy',
                  name: 'newdeploy',
                  component: newdeploy
                },
                {
                  path: '/softpackage',
                  name: 'softpackage',
                  component: softpackage
                },
                {
                  path: '/addSoftpackage',
                  name: 'addSoftpackage',
                  component: addSoftpackage
                },
                {
                  path: '/baseline',
                  name: 'baseline',
                  component: baseline
                },
                {
                  path: '/log',
                  name: 'log',
                  component: log
                },
                {
                  path: '/modifySoftpackage/:id',
                  name: 'modifySoftpackage',
                  component: modifySoftpackage
                }
            ]
        }

    ]
})
