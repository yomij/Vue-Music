import Vue from 'vue'
import Router from 'vue-router'

// import about from '../components/about'

import defaultRight from '../components/right/defaultRight'
import recommend from '../components/right/recommend'

import songlistInf from '../components/right/songlistInf'
import songlists from '../components/right/songlists'
import singers from '../components/right/singers'
import singerInf from '../components/right/singerInf'
import albumInf from '../components/right/albumInf'

import DJInf from '../components/right/DJInf'
import DJ from '../components/right/DJ'

import rankingList from '../components/right/rankingList'

import searchResult from '../components/middle/searchResult/searchResult'
import resultSong from '../components/middle/searchResult/resultSong'
import resultSonglist from '../components/middle/searchResult/resultSonglist'
import resultDJ from '../components/middle/searchResult/resultDJ'
import resultSinger from '../components/middle/searchResult/resultSinger'
import resultAlbum from '../components/middle/searchResult/resultAlbum'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [{
		path: '/',
		name: 'default',
		component: defaultRight,
		children: [{
			path: '',
			component: recommend
		}, {
			path: '/songlists',
			name: 'songlists',
			component: songlists
		}, {
			path: '/dj',
			name: 'dj',
			component: DJ
		}, {
			path: '/ranking',
			name: 'ranking',
			component: rankingList
		}, {
			path: '/singers',
			name: 'singers',
			component: singers
		}]
	}, {
		path: '/songlist',
		name: 'songlist',
		component: songlistInf
	}, {
		path: '/djInf',
		name: 'djInf',
		component: DJInf
	}, {
		path: '/singerInf',
		name: 'singerInf',
		component: singerInf
	}, {
		path: '/albumInf',
		name: 'albumInf',
		component: albumInf
	}, {
		path: '/search',
		name: 'search',
		component: searchResult,
		children: [{
			path: '/search/songs',
			name: "resultSong",
			component: resultSong
		}, {
			path: '/search/songlist',
			name: 'resultSonglist',
			component: resultSonglist
		}, {
			path: '/search/DJ',
			name: 'resultDJ',
			component: resultDJ
		}, {
			path: '/search/singer',
			name: 'resultSinger',
			component: resultSinger
		}, {
			path: '/search/album',
			name: 'resultAlbum',
			component: resultAlbum
		}]
	}, ]
})



router.beforeEach((to, from, next) => {
	const store = router.app.$options.store
	// if (!to.name) {
	// 	next(false)
	// 	return
	// }
	if (store.state.DJKinds.length > 0 && to.name !== 'djInf') {
		store.commit('removeDJkind')
		next(false)
		return
	}

	if (store.state.maximize) {
		store.commit('minimize')
		next(false)
	} else {
		next()
	}

})

export default router