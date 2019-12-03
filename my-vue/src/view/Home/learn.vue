<template>
    <div>
        <h2 @click="reverse()">
            reverse 方法反转字符串：{{message}}
        </h2>
        <h2> 
           通过计算属性反转字符串： {{reverseCompetd}}
          <!-- <p @click="now()"> 时间：{{now}}</p> -->
        </h2>
       <div>
           <p>input输入框：<input v-model="question"/></p>
           <p>{{answer}}</p>
       </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            message:'hellow word menu at table',
            question:"",
            answer:'I can help you'
        }
    },
    created:function(){
    },
    computed:{
        reverseCompetd:function(){
            return this.message.split("").reverse().join("")
        },
    },
    methods:{
        reverse:function(){
            this.message=this.message.split("").reverse().join("")
        }
    },
    watch:{
        question:function(newVal,oldVal){
            this.answer='姑阿古拉刮刮乐啦'
            
        }
    }
}
</script>