<template>
    <div class="container">
        <div class="content-l">
            <el-button icon="el-icon-menu" size="mini" @click="collapse()"></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb separator="/" class="breadcrumb" v-for="item in tabsList.matched.slice(1)" :key="item.path">
                <el-breadcrumb-item :to="{ path: item.path }">{{item.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content-r">
            <el-row class="block-col-2">
                <el-col :span="12">
                    <el-dropdown>
                        <!-- <span class="el-dropdown-link">
                            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                        </span> -->
                        <img src="@/assets/OIP-C.jpg" alt="" @click="out">
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-plus" @click="out">退出</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'
export default {
    data() {
        return {
            // tabsList:[]
        }
    },
    created() {
  /*
          针对路由push  重复点击报错解决方案
        */
        const originPush = VueRouter.prototype.push
        VueRouter.prototype.push = function push(location) {
            return originPush.call(this, location).catch(err => err)
        }
      
    },
    computed: {
        tabsList() {
            return this.$route
        }
    },
    methods: {
        collapse() {
            console.log(this.tabsList);
            this.$store.commit('updateIsCollapse', '')
        },
        out() {
            Cookies.remove('token')
            Cookies.remove('menuList')
            this.$router.push('/login')
        }
    }
}
</script>
<style lang="less" scoped>
.container {
    padding: 0 30px;
    height: 60px;
    background-color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .content-l {
        display: flex;
        align-items: center;

        .breadcrumb {
            margin-left: 25px;
        }

        /deep/ .el-breadcrumb__inner.is-link {
            // color: #fff;
        }
    }

    img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
    }

}
</style>
