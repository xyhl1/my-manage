<template>
    <div class="container">
        <el-container>
            <el-aside style="width:auto">
                <common-aside/>
            </el-aside>
            <el-container>
                <el-header>
                    <common-header/>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>

import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
export default {
    data() {
        return {
        }
    },
    components: {
        CommonAside,
        CommonHeader
    }
}
</script>
<style lang="less" scoped>
// /deep/ .el-aside {
//     width: 220px !important;
// }
.el-header {
    padding:0;
}

</style>