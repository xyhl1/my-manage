import Cookies from "js-cookie"
export default {
    state: {
        menuList: [
            //     {
            //     path: "/",
            //     name: "home",
            //     label: "首页",
            //     icon: "s-home",
            //     url: 'home.vue'
            // },
            // {
            //     path: "/mall",
            //     name: "mall",
            //     label: "商品管理",
            //     icon: "video-play",
            //     url: 'mall.vue'
            // },
            // {
            //     path: "/user",
            //     name: "user",
            //     label: "用户管理",
            //     icon: "user",
            //     url: 'user.vue'
            // },
            // {
            //     label: "其他",
            //     icon: "location",
            //     children: [
            //         {
            //             path: "/other/page1",
            //             name: "page",
            //             label: "页面1",
            //             icon: "setting",
            //             url: 'pageOne.vue'
            //         },
            //         {
            //             path: "/other/page2",
            //             name: "page2",
            //             label: "页面2",
            //             icon: "setting",
            //             url: 'pageTwo.vue'
            //         }
            //     ]
            // }
        ]
    },
    mutations: {
        setMenuList(state, val) {
            // console.log(val, 'val');
            state.menuList = val
            Cookies.set('menuList', JSON.stringify(val))
        },
        addMenu(state, router) {
            if (!Cookies.get('menuList')) return
            const menuList = JSON.parse(Cookies.get('menuList'))
            state.menuList = menuList
            const menuArray = []
            menuList.forEach(item => {
                if (item.children) {
                    item.children.map(item => {
                        item.component = () => import(`@/views/content/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`@/views/content/${item.url}`)
                    menuArray.push(item)
                }
            })
            console.log('caidan');
            console.log(menuArray, '菜单数组');
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    }
}