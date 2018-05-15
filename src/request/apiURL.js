export default [{
	name: 'djcatelist',
	url: '/dj/catelist',
	method: 'get'
}, {
	name: 'songInf',
	url: '/song/detail',
}, {
	name: 'searchAll',
	url: '/search', //?keywords
	mthod: 'get'
}, {
	name: 'banner',
	url: '/banner',
	method: 'get'
}, {
	name: 'search',
	url: '/search/suggest',
	method: 'get'
}, {
	name: 'songInf',
	url: '/song/detail',
	method: 'get'
}, {
	name: 'lyric',
	url: '/lyric',
	method: 'get'
}, {
	name: 'commonMusic',
	url: '/comment/music',
	method: 'get'
}, {
	name: 'hotDJ', // 热门电台
	url: '/dj/hot', //?limit=30
	method: 'get'
}, {
	name: 'recommendDj', //精选电台
	url: '/dj/recommend',
	method: 'get'
}, {
	name: 'recommendDjWithType',
	url: '/dj/recommend/type',
	method: 'get'
}, {
	name: 'djProgram',
	url: '/dj/program', //rid=526502619 limit=30
	method: 'get'
}, {
	name: 'djProgramDetial',
	url: '/dj/program/detail', //id
	method: 'get'
}, {
	name: 'djDetial',
	url: '/dj/detail', //rid=6766075
	method: 'get'
}, {
	name: 'topPlaylists',
	url: '/top/playlist',
	method: 'get'
}, {
	name: 'playlistDetail',
	url: '/playlist/detail',
	method: 'get'
}, {
	name: 'commentPlaylist',
	url: '/comment/playlist',
	method: 'get'
}, {
	name: 'commentMusic', //音乐评论
	url: '/comment/music',
	mehod: 'get' //offset,limit,id
}, {
	name: 'commentDj',
	url: '/comment/Dj',
	method: 'get' //id (programid)
}, {
	name: 'artistInf',
	url: '/artists' //id
}]
//  /dj/recommend/type?type=11 优秀新电台