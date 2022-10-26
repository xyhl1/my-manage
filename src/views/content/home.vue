<template>
    <div class="container">
        <el-row>
            <el-col :span="8">
                <el-card class="box-card">
                    <div class="user">
                        <img src="@/assets/OIP-C.jpg" alt="">
                        <div class="message">
                            <h4>Admin</h4>
                            <h6>超级管理员</h6>
                        </div>
                    </div>
                    <div class="login-info">
                        <p>上次登陆时间：<span>2022-08-21</span></p>
                        <p>上次登陆登录：<span>杭州</span></p>
                    </div>
                </el-card>
                <el-card style="margin-top:10px">
                    <el-table :data="hotPlaylistData" style="width: 100%">
                        <el-table-column prop="name" label="名字">
                        </el-table-column>
                        <!-- <el-table-column prop="id" label="ID">
                        </el-table-column> -->
                        <el-table-column prop="usedCount" label="粉丝数量">
                        </el-table-column>
                        <el-table-column prop="createTime" label="发布时间">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="16" class="content-r">
                <div class="order-management">
                    <el-card v-for="item of orderMenu" :key="item.title">
                        <div class="icon" :style="`background-color: ${item.color}`">
                            <i :class="`${item.icon}`"></i>
                        </div>
                        <div class="order-content">
                            <p class="price">￥<span>{{item.price}}</span></p>
                            <p class="name">{{item.title}}</p>
                        </div>
                    </el-card>
                </div>
                <div class="line-chart">
                    <el-card style="">
                        <div ref="line" style="height: 300px;">
                        </div>
                    </el-card>
                </div>
                <div class="graph-bottom">
                    <el-card style="width:49%">
                        <div ref="shape" style="height:300px"></div>
                    </el-card>
                    <el-card style="width:49%">
                        <div ref="shapePie" style="height:300px"></div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { getPlaylistHot, getPlaylistHigh } from '@/api/index'
import * as echarts from 'echarts';
export default {
    data() {
        return {
            orderMenu: [
                {
                    icon: "el-icon-circle-check",
                    price: '123',
                    title: '今日支付订单',
                    color: '#59b6c5'
                },
                {
                    icon: "el-icon-star-off",
                    price: '2434',
                    title: '今日收藏订单',
                    color: '#f5bf86'
                },
                {
                    icon: "el-icon-goods",
                    price: '5434',
                    title: '今日未支付订单',
                    color: '#69abed'
                },
                {
                    icon: "el-icon-circle-check",
                    price: '34',
                    title: '本月支付订单',
                    color: '#59b6c5'
                },
                {
                    icon: "el-icon-star-off",
                    price: '4343',
                    title: '本月收藏订单',
                    color: '#f5bf86'
                },
                {
                    icon: "el-icon-goods",
                    price: '5476',
                    title: '本月未支付订单',
                    color: '#69abed'
                },
            ],
            hotPlaylistData: [],
            highPlaylistData: []
        }
    },
    mounted() {
        this.getList()
        this.getHighPlaylist()
    },
    methods: {
        //获取数据
        async getList() {
            const { data } = await getPlaylistHot()
            console.log(data);
            this.hotPlaylistData = data.tags.map((item) => {
                var date = new Date(item.createTime);  // 参数需要毫秒数，所以这里将秒数乘于 1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
                let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
                let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                // let document.write(Y + M + D + h + m + s);
                return {
                    ...item,
                    createTime: Y + M + D + h + m + s
                }
            }).slice(1, 7)
        },
        async getHighPlaylist() {
            const { data } = await getPlaylistHigh({
                limit: 6
            })
            this.highPlaylistData = data.playlists
            console.log(this.highPlaylistData, 111);
            var myChart1 = echarts.init(this.$refs.line)
            var option1;
            option1 = {
                title: {
                    text: '精品歌单'
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data:
                        this.highPlaylistData.map((item) => {
                            return [
                                item.name
                            ]
                        })
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        type: 'line',
                        data: this.highPlaylistData.map((item) => {
                            return item.commentCount

                        })
                    },
                ]
            };
            option1 && myChart1.setOption(option1);
            var myChart2 = echarts.init(this.$refs.shape)
            var option2 = {
                xAxis: {
                    type: 'category',
                    data: this.highPlaylistData.map((item) => {
                        return item.commentCount
                    })
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: this.highPlaylistData.map((item) => {
                            return item.commentCount
                        }),
                        type: 'bar'
                    },
                    {
                        data: this.highPlaylistData.map((item) => {
                            return item.shareCount
                        }),
                        type: 'bar'
                    }
                ]
            };

            option2 && myChart2.setOption(option2);
            var myChart3 = echarts.init(this.$refs.shapePie)
            var option3 = {
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: 
                            this.highPlaylistData.map((item)=>{
                                return {
                                    value:item.commentCount,
                                    name:item.name
                                }
                            })
                        ,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
            option3 && myChart3.setOption(option3);
        }

    }
}
</script>
<style lang="less" scoped>
.container {
    display: block;

    .el-card {
        margin-bottom: 10px;
    }

    .box-card {
        .user {
            display: flex;
            align-items: center;
            padding-bottom: 30px;
            margin-bottom: 30px;
            border-bottom: 1px solid rgb(184, 179, 179);

            img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
            }

            .message {
                margin-left: 30px;
            }
        }

        .login-info {
            font-size: 14px;
            font-weight: 300;
        }

    }

    .content-r {
        padding: 0 10px;
    }

    .order-management {
        display: flex;
        flex-wrap: wrap;

        justify-content: space-between;

        .el-card {
            width: 32%;
            height: 70px;
            margin-bottom: 10px;

            /deep/.el-card__body {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 0;

                .icon {
                    width: 70px;
                    height: 70px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    i {
                        color: #fff;
                        font-size: 25px;
                    }
                }

                .order-content {
                    display: flex;
                    height: 70px;
                    flex-direction: column;
                    justify-content: center;

                    .name {
                        font-size: 15px;
                    }

                    .price {
                        font-size: 20px;
                    }
                }
            }
        }
    }

    .graph-bottom {
        display: flex;
        justify-content: space-between;
        height: 300px;

    }
}
</style>
