import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
Vue.use(vuex)

/* eslint-disable */
export default new vuex.Store({
	state: {
		userId: 0,
		listeningList: [],
		isPlaying: false,
		recommends: {},
		// songlistCache: {
		// 	keys: [],
		// },
		playingSong: {
			"id": 0,
		},
		audio: new Audio(),
		maximize: false,
		playingIndex: 0,
		navIndex: 0, //当前激活的index
		DJKinds: [],
		scrollTop: 0
	},
	mutations: {
		login(state, id) {
			state.userId = id
		},
		play(state) {
			state.isPlaying = true
		},
		pause(state) {
			state.isPlaying = false
		},
		changePlayingSong(state, song) {

			if (song.hasOwnProperty('mainSong')) {
				state.playingSong = song.mainSong
				console.log(JSON.stringify(state.playingSong));
			}
			state.playingSong = song
		},
		maximize(state) {
			state.maximize = true
		},
		minimize(state) {
			state.maximize = false
		},
		addSong(state, song) {
			var ind = state.playingIndex
			state.listeningList.splice(state.playingIndex++, 0, song)
			state.playingSong = song
			state.playingIndex--
				console.log('state.playingIndex' + state.playingIndex);
		},
		changeListeningList(state, list) {
			state.listeningList = list
		},
		changePlayingIndex(state, index) {
			state.playingIndex = index
			state.playingSong = state.listeningList[index]
		},
		// addsonglistCache(state, ob) {
		// 	if (state.songlistCache.keys.length < 10) {
		// 		console.log('开始缓存');
		// 		state.songlistCache[ob.id] = ob.inf
		// 		state.songlistCache.keys.push(ob.id)
		// 		// console.log(JSON.stringify(ob.inf));
		// 	} else {
		// 		delete state.songlistCache[state.songlistCache.keys.shift()]
		// 		this.songlistCache[ob.id] = ob.inf
		// 		this.songlistCache.keys.push(ob.id)
		// 	}
		// },
		addRecommend(state, obj) {
			state.recommends[obj.name] = obj.recommend
		},
		navAcive(state, index) {
			state.navIndex = index
		},
		scroll(state, scrollTop) {
			state.scrollTop = scrollTop
		},
		addDJkind(state, kind) {
			state.DJKinds.push(kind)
		},
		removeDJkind(state) {
			return state.DJKinds.pop()
		},
		initDJKind(state) {
			state.DJKinds = []
		}
	},
	actions: {
		searchSongAndPlay({
			commit,
			state
		}, song) {
			let hasThis = false

			for (let i = state.listeningList.length - 1; i > -1; i--) {
				if (state.listeningList[i].hasOwnProperty('mainSong')) {
					continue
				}
				if (state.listeningList[i].id === song.id) {
					hasThis = true
					commit('changePlayingSong', state.listeningList[i])
					break
				}
			}


			if (!hasThis) {
				commit('addSong', song, state.playingIndex)
			}
		},
	}
})