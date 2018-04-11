import Vue from 'vue'
import Router from 'vue-router'


import defaultRight from '../components/right/defaultRight'

import recommend from '../components/right/recommend'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
		path: '/',
		// name: 'defaultRight',
		component: defaultRight,
		children: [{
			path: '',
			component: recommend
		}]
	}]
})