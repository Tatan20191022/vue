
<template>
    <div>
        <h2 class='box'  v-bind:class="{active1:isActive , active2:isShow}"></h2>
        <h2  @click='tab()'>点击切换样式</h2>
        <template v-if="loginType==='username'">
            <label>username</label>
            <input placeholder="enter your username"/>
        </template>
        <template v-else>
            <label>password</label>
            <input placeholder="enter you password"/>
        </template>
        <button @click="btn()">点击切换</button>
        <div>
            <ul>
                <li v-for="(item) in items" :key="item.id">
                   {{mony}}------ {{item.message}}-----{{item.id}}
                </li>
            </ul>
        </div>
        <div>
            <ul>
                <li v-for="value in object" :key="value.id">
                   {{mony}}------ {{value.number}}-----{{value.id}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isActive:false,
            isShow:true,
            loginType:"username",
            mony:'meny',
            items:[
                {message:300000 ,id:1},
                {message:400000,id:2},
                {message:500000,id:3},
                {message:600000,id:4}
            ],
            object:{
                number:1-1,
                number:2-2,
                number:3-3,
                number:4-4,
            }
        }
    },
    methods:{
        tab:function(){
            this.isActive=!this.isActive
            this.isShow=!this.isShow
        },
        btn:function(){
            this.loginType=!this.loginType
        }
    }
}
</script>
<style>
    .active1{
        width:100px;
        height: 100px;
        border:2px solid red;
        background-color: #225588;
    }
    .active2{
        width:100px;
        height: 100px;
        border:2px solid green;
        background-color: pink;
        border-radius: 50%;
    }
</style>
