//匹配歌词
//[^\]]+[^\\n\[\d+:"\d+.\d+\]]

//匹配时间、
//\d+:\d+.\d+


var lyric = "[00:21.680]落ち込んでた時も 気がつけば笑ってる\n[00:30.290]二人なら 世界は息を吹き返した\n[00:42.160]いつもの帰り道 足音刻むリズム\n[00:50.770]雨あがり 街を抜けてゆく風の優しい匂い\n[01:00.310]\n[01:01.560]同じ時間を分け合いながら 二人で過ごせた奇跡を\n[01:11.520]これから先も繋げたいんだ ちゃんと目を見て伝えたい\n[01:22.590]\n[01:24.200]繋いでいたい手は 君ものだったよ\n[01:32.820]握り方で何もかもを 伝えられるその手だった\n[01:43.490]他の誰でもない 君じゃなきゃ駄目だよ\n[01:52.080]いつまでも傍に居たいと思えた\n[02:00.800]\n[02:04.380]振り返ってみても いないのは分かってる\n[02:12.480]なのにまた名前呼ばれた気がして見渡してみる\n[02:21.660]\n[02:22.900]角を曲がれば 歩幅合わせたあの頃に戻れるような\n[02:33.530]桜のアーチ 今はその葉をオレンジに染めてるけど\n[02:45.010]\n[02:47.480]咲かせたい笑顔は 君のものだったよ\n[02:56.180]街彩る木々のように 綺麗な赤いその頬だった\n[03:06.540]思い出が舞い散る 込み上げる思いを\n[03:15.150]どこまでも遠い空へと飛ばした\n[03:24.260]\n[03:45.070]聞いていたい声は君のものだったよ\n[03:53.710]耳を伝い体中を包むようなその声だった\n[04:04.310]出会いから全てが かけがえのない日々\n[04:12.930]いつまでもこの胸にあるよ ありがとう\n";

var a = lyric.match(/[^\]\\n]*[^\[\d+:"\d+.\d+\]]/g);
var b = a.map(function(e) {

	console.log(e);
})

console.log(a);