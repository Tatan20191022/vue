<template>
<div id="app-2">
    <span :title="message" v-if="see">
        鼠标悬停几秒显示信息
    </span>
</div>
</template>
<script>
export default {
        data(){
            return {
                 message:"页面加载 "+ new Data().tolocaleString(),
                 see:true
            }
        }
}
</script>