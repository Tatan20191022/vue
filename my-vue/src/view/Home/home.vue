<template>
<div>
  <el-container>
  <el-header width='100%'>
    <div style="background-color:gray;color:white;text-align:center;height:50px;line-height:50px;font-size:36px">大保健管理系统</div>
  </el-header>
  <el-container>
    <el-aside width="200px">
     <el-col >
        <div style="height:20px"></div>
        <el-menu
        style="height:40vw"
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>中国佳丽</span>
            </template>
            <el-menu-item-group>
              <el-submenu index="1-4">
              <template slot="title">省份</template>
              <el-menu-item index="1-4-1">四川</el-menu-item>
              <el-menu-item index="1-4-1">湖南</el-menu-item>
              <el-menu-item index="1-4-1">广西</el-menu-item>
              <el-menu-item index="1-4-1">重庆</el-menu-item>
              <el-menu-item index="1-4-1">广东</el-menu-item>
              <el-menu-item index="1-4-1">贵州</el-menu-item>
            </el-submenu>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>越南佳丽</span>
            </template>
            <el-menu-item-group>
              <el-submenu index="1-4">
              <template slot="title">越南</template>
            </el-submenu>
            </el-menu-item-group>
          </el-submenu>
           <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>韩国佳丽</span>
            </template>
            <el-menu-item-group>
              <el-submenu index="1-4">
              <template slot="title">身份</template>
              <el-menu-item index="1-4-1">首尔</el-menu-item>
              <el-menu-item index="1-4-1">汉城</el-menu-item>
            </el-submenu>
            </el-menu-item-group>
          </el-submenu>
        <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>俄罗斯佳丽</span>
            </template>
            <el-menu-item-group>
              <el-submenu index="1-4">
              <template slot="title">省份</template>
              <el-menu-item index="1-4-1">莫斯科</el-menu-item>
            </el-submenu>
            </el-menu-item-group>
          </el-submenu>
           <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>乌克兰佳丽</span>
            </template>
            <el-menu-item-group>
              <el-submenu index="1-4">
              <template slot="title">乌克兰</template>
            </el-submenu>
            </el-menu-item-group>
          </el-submenu>
        <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>日本佳丽</span>
            </template>
            <el-menu-item-group>
              <el-submenu index="1-4">
              <template slot="title">省份</template>
              <el-menu-item index="1-4-1">东京</el-menu-item>
              <el-menu-item index="1-4-1">大阪</el-menu-item>
            </el-submenu>
            </el-menu-item-group>
          </el-submenu>
           <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>非洲佳丽</span>
            </template>
            <el-menu-item-group>
              <el-submenu index="1-4">
              <template slot="title">国家</template>
              <el-menu-item index="1-4-1">刚果</el-menu-item>
              <el-menu-item index="1-4-1">蒙内</el-menu-item>
              <el-menu-item index="1-4-1">埃塞俄比亚</el-menu-item>
            </el-submenu>
            </el-menu-item-group>
          </el-submenu>
        <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>玻利维亚</span>
            </template>
            <el-menu-item-group>
              <el-submenu index="1-4">
              <template slot="title">玻利维亚</template>
            </el-submenu>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
       
      </el-col>
    </el-aside>
    <el-main>
       <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 图片懒加载</span> <HomeThree/></el-tab-pane>
          <el-tab-pane label="日历"><HomeChild/></el-tab-pane>
          <el-tab-pane label="走马灯"><HomeTwo/></el-tab-pane>
          <el-tab-pane label="定时任务补偿"><HomeThree/></el-tab-pane>
        </el-tabs>
    </el-main>
  </el-container>
  <el-footer style="background-color:gray;text-align:center; line-height:60px;color:white">china----国字申20191201-----china</el-footer>
</el-container>
</div>
</template>
<script src="../../../static/homeStyle.css"></script>
<script>
import HomeChild from './homeChild'
import HomeTwo from './hometwo'
import HomeThree from './homethree'
export default {
  name: 'HelloWorld',
  components:{HomeChild,HomeTwo,HomeThree},
  data () {
    return {
      msg: '学习Vue,脚手架搭建项目',
      activeIndex: '1',
      activeIndex2: '1',
      isCollapse: true,
       value: new Date()
    }
  },
   methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>