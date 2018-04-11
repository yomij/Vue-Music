import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
Vue.use(vuex)

/* eslint-disable */
export default new vuex.Store({
	state: {
		isLogin: false,
		listeningList: [],
		rotateDeg: 0,
		isPlaying: false,
		playingSong: {
			"name": "我爱的人",
			"id": 350651,
			"pst": 0,
			"t": 0,
			"ar": [{
				"id": 3685,
				"name": "林宥嘉",
				"tns": [],
				"alias": []
			}],
			"alia": [],
			"pop": 100,
			"st": 0,
			"rt": "600902000009289406",
			"fee": 8,
			"v": 186,
			"crbt": null,
			"cf": "",
			"al": {
				"id": 34552,
				"name": "星光同学会",
				"picUrl": "http://p1.music.126.net/2LAkRtcpKlfsZYniAfxHZA==/109951163167481875.jpg",
				"tns": [],
				"pic_str": "109951163167481875",
				"pic": 109951163167481870
			},
			"dt": 269666,
			"h": {
				"br": 320000,
				"fid": 0,
				"size": 10789660,
				"vd": 0
			},
			"m": {
				"br": 192000,
				"fid": 0,
				"size": 6473813,
				"vd": 0
			},
			"l": {
				"br": 128000,
				"fid": 0,
				"size": 4315890,
				"vd": 0
			},
			"a": null,
			"cd": "1",
			"no": 3,
			"rtUrl": null,
			"ftype": 0,
			"rtUrls": [],
			"djId": 0,
			"copyright": 2,
			"s_id": 0,
			"rtype": 0,
			"rurl": null,
			"mst": 9,
			"cp": 677020,
			"mv": 0,
			"publishTime": 1181232000000
		},
		audio: new Audio(),
		maximize: false,
		playingIndex: 0
	},
	mutations: {
		play(state) {
			state.isPlaying = true
		},
		pause(state) {
			state.isPlaying = false
		},
		rotate(state) {
			state.rotateDeg++
		},
		changePlayingSong(state, song) {
			state.playingSong = song
		},
		maximize(state) {
			state.maximize = true
		},
		minimize(state) {
			state.maximize = false
		},
		addSong(state, song, index) {
			state.listeningList.splice(index + 2, 0, song)
			state.playingSong = song
			state.playingIndex++
		},
		changePlayingIndex(state, index) {
			state.playingIndex = index
		}
	},
	actions: {
		searchSongAndPlay({
			commit,
			state
		}, id) {
			var hasThis = false
			for (let i = state.listeningList.length - 1; i > -1; i--) {
				if (state.listeningList[i].id === id) {
					hasThis = true
					commit('changePlayingSong', state.listeningList[i])
					break
				}
			}
			if (!hasThis)
				axios.get(`http://musicapi.leanapp.cn/song/detail?ids=${id}`).then(res => {
					commit('addSong', res.data.songs[0], state.playingIndex)
					// commit('changePlayingSong', res.data.songs[0])
				}).catch(() => {
					console.log('搜索播放歌曲失败');
				})
		}
	}
})