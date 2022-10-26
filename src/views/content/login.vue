<template>
    <div class="container">
        <el-card style="width:30%">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (value == '111') {
                    this.token = '111'
                }
                else if (value == '222') {
                    this.token = '222'
                } else {
                    this.$message({
                        message: '密码错误',
                        type: 'error'
                    })
                    return false
                }
                callback();
            }
        };
        var validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else {
                if (this.ruleForm.name !== '') {
                    // this.$refs.ruleForm.validateField(value);
                    // alert
                }
                callback();
            }
        };
        return {
            token: '',
            ruleForm: {
                pass: '',
                name: 'admin'
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                name: [
                    { validator: validateName, trigger: 'blur' }
                ]
            },
            router1: [{
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: 'home.vue'
            },
            {
                path: "/mall",
                name: "mall",
                label: "商品管理",
                icon: "video-play",
                url: 'mall.vue'
            },
            {
                path: "/user",
                name: "user",
                label: "用户管理",
                icon: "user",
                url: 'user.vue'
            },
            {
                label: "其他",
                path:'/other',
                icon: "location",
                children: [
                    {
                        path: "/other/page1",
                        name: "page",
                        label: "页面1",
                        icon: "setting",
                        url: 'pageOne.vue'
                    },
                    {
                        path: "/other/page2",
                        name: "page2",
                        label: "页面2",
                        icon: "setting",
                        url: 'pageTwo.vue'
                    }
                ]
            }],
            router2: [{
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: 'home.vue'
            },
            {
                path: "/user",
                name: "user",
                label: "用户管理",
                icon: "user",
                url: 'user.vue'
            }]
        };
    },
    methods: {
        submitForm(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    let router;
                    Cookies.set('token', this.token)
                    // console.log(this.$router,'router');
                    if (this.token == 111) {
                        router = this.router1
                    }
                    else {
                        router = this.router2
                    }
                    this.$store.commit('setMenuList', router)
                    this.$store.commit('addMenu',this.$router)
                    this.$router.push('/home')
                } else {
                    console.log('error submit!!');
                    // return false;
                }
            });
        },
        resetForm(ruleForm) {
            this.$refs[ruleForm].resetFields();
        }
    }
}
</script>
<style lang="less" scoped>
.container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>