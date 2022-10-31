<template>
    <div class="container">
        <div class="layoutTop">
            <el-button type="primary" class="addButton" @click="dialogVisible = true"><i class="el-icon-plus"></i>新增
            </el-button>
            <el-dialog title="新增" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
                <el-form ref="form" status-icon :model="form" label-width="80px" :rules="rules">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="别名" prop="alias">
                        <el-input v-model="form.alias"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="form.sex">
                            <el-option label="男" value="1"></el-option>
                            <el-option label="女" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="ID" prop="ID">
                        <el-input v-model="form.ID"></el-input>
                    </el-form-item>
                    <el-form-item label="粉丝数" prop="fansCount">
                        <el-input v-model="form.fansCount"></el-input>
                    </el-form-item>
                    <el-form-item label="专辑数量" prop="musicSize">
                        <el-input v-model="form.musicSize"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="reset()">取 消</el-button>
                    <el-button type="primary" @click="submit('form')">确 定</el-button>
                </span>
            </el-dialog>
            <div>
                <el-select v-model="input" clearable placeholder="请选择" filterable>
                    <el-option label="退出" :value="input" @keyup.enter="search">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </div>

        </div>

        <el-card>
            <el-table :data="tableData.slice((currentPage - 1) * 8, currentPage * 8)" style="width: 100%">
                <el-table-column label="姓名" prop="name">
                </el-table-column>
                <el-table-column label="别名" prop="alias" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="性别" prop="sex">
                </el-table-column>
                <el-table-column label="ID" prop="ID">
                </el-table-column>
                <el-table-column label="粉丝数" prop="fansCount">
                </el-table-column>
                <el-table-column label="专辑数量" prop="musicSize">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, tableData)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="8"
                    layout="prev, pager, next, jumper" :total="tableData.length">
                </el-pagination>
            </div>
        </el-card>

    </div>
</template>
<script>
import { getArtistList } from '@/api/index'
export default {
    data() {
        return {
            flag: 0,
            index: 0,
            input: '',
            currentPage: 1,
            dialogVisible: false,
            form: {
                name: '',
                alias: '',
                sex: '男',
                ID: '',
                fansCount: '',
                musicSize: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                sex: [
                    { required: true, message: '请输入性别', trigger: 'blur' },
                ],
                ID: [
                    { required: true, message: '请输入ID', trigger: 'blur' },
                    { pattern: /^[0-9][0-9]*$/, message: '输入数字', trigger: 'blur' }
                ],
            },
            tableData: []
        }

    },
    created() {
    },
    computed: {
    },
    mounted() {
        this.getList()
    },
    methods: {
        async getList() {
            const { data } = await getArtistList({
                cat: 1001
            })
            console.log(data, 'data');
            this.tableData = data.artists.map((item) => {
                return {
                    name: item.name,
                    alias: item.alias,
                    sex: item.topicPerson == 0 ? '男' : '女',
                    ID: item.id,
                    fansCount: item.fansCount,
                    musicSize: item.musicSize
                }
            })
            console.log(this.tableData, 444);
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                   this.reset()
                })
                .catch(_ => { });
        },
        submit(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    if (this.flag == 1) {
                        this.tableData[this.index] = JSON.parse(JSON.stringify(this.form))
                    }
                    else {
                        this.tableData.unshift(JSON.parse(JSON.stringify(this.form)))
                    }
                    this.reset()
                    console.log(this.form, 'form的值');
                } 
                else {
                    console.log('error submit!!');
                    return false;
                }
            })
            console.log(this.form);
        },
        reset() {
            this.dialogVisible = false
            this.$refs['form'].resetFields()
            this.flag = 0
            this.index = 0
        },
        handleCurrentChange(val) {
            this.currentPage = val
        },
        handleEdit(index, row) {
            this.dialogVisible = true
            row.alias = row.alias.toString()
            this.$nextTick(()=>{
                this.form = JSON.parse(JSON.stringify(row))
            })
            // this.form = row
            console.log(index, row);
            this.index = index
            this.flag = 1
        },
        handleDelete(index, rows) {
            rows.splice(index, 1)
        },
        search() {
            console.log();
        }
    }
}
</script>
<style lang="less" scoped>
.layoutTop {
    display: flex;
    justify-content: space-between;
}

.addButton {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 2px;
}

.el-form {
    display: flex;
    flex-wrap: wrap;

    .el-form-item {
        flex: 45%;
    }
}

.el-card {
    margin-top: 20px;
    height: 580px;
    position: relative
}

.block {
    position: absolute;
    bottom: 20px;
    right: 20px;
}
</style>
