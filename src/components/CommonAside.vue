<template>
    <div>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse" router>
            <h3>{{isCollapse?"干果":"干果保卫战系统"}}</h3>
            <el-menu-item v-for="item in noChildren" :key="item.name" :index="item.path">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{item.label}}</span>
            </el-menu-item>
            <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
                <template slot="title">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{item.label}}</span>
                </template>
                <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
                    <el-menu-item :index="subItem.path">{{subItem.name}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>

    </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    min-height: 400px;
}
</style>
  
<script>
import Cookies from 'js-cookie'
export default {
    data() {
        return {
            
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    computed: {
        menuData() {
            // console.log(Cookies.get('menuList'),'111');
            return JSON.parse(Cookies.get('menuList')) || this.$store.state.menu.menuList
        },
        noChildren() {
            return this.menuData.filter(item => !item.children)
        },
        hasChildren() {
            return this.menuData.filter(item => item.children)
        },
        isCollapse() {
            return this.$store.state.tab.isCollapse
        }
    },
}
</script>
<style lang="less" scoped>
.el-menu {
    height: 100vh;
    border-right: 0;

    h3 {
        color: #fff;
        text-align: center;
        line-height: 48px;
        font-size: 18px;
        font-weight: 400;
        padding: 0 20px;
    }
}
</style>