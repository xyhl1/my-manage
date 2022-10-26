import instance from "@/utils/request";
//热门歌单分类
export const getPlaylistHot = (params) => instance({
   method: 'get',
   url: '/playlist/hot',
   params
})
export const getPlaylistHigh = (params) => instance({
   method: 'get',
   url: '/top/playlist/highquality',
   params
})
export const getArtistList = (params) => instance({
   method: 'get',
   url: '/artist/list',
   params
})