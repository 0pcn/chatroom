<template>
  <div class="all">
    <el-container style="height: auto; border: 1px solid #eee">
      <el-aside class="el-aside" width="60px">
        <el-menu class="el-menu" :collapse="isCollapse" router>
          <el-menu-item index="/Friend">
            <i class="el-icon-user-solid"></i>
            <span slot="title">好友</span>
          </el-menu-item>
          <el-menu-item index="/Chat">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">聊天</span>
          </el-menu-item>
          <el-menu-item index="/Add">
            <i class="el-icon-circle-plus"></i>
            <span slot="title">加入好友</span>
          </el-menu-item>
          <el-menu-item index="/Post">
            <i class="el-icon-time"></i>
            <span slot="title">貼文串</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container class="maincontainer">
        <el-header style="text-align: right; font-size: 12px; height: 40px" class="serch">
          <el-input v-show="showSearch"
                    placeholder="搜尋聊天訊息或內容">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-input v-show="showPen"
                    placeholder="有什麼新鮮事嗎？">
            <font-awesome-icon slot="prefix" icon="pen" class="pen"/>
          </el-input>
        </el-header>
        <el-main class="el-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      isCollapse: true,
      showSearch: true,
      showPen: false
    }
  },
  created() {
    if (this.$route.path === '/Post') {
      this.showSearch = false
      this.showPen = true
    } else {
      this.showSearch = true
      this.showPen = false
    }
  },
  watch: {
    '$route.path'(to) {
      if (to === '/Post') {
        this.showSearch = false
        this.showPen = true
      } else {
        this.showSearch = true
        this.showPen = false
      }
    }
  },
  methods: {
    getchat() {
      this.message.push({message: this.text});
      this.text = ''
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
html, body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: auto;
  background-color: red;
  scroll-behavior: smooth;

  .all {
    min-width: 320px;
    width: 100%;
    .el-aside {
      height: 100vh;
      .el-menu {
        min-height: 100%;
        padding: 0;
        background-color: #122036;
        width: 100%;
      }
    }
    .maincontainer {
      height: auto;
      .serch {
        padding: 0;
        .pen {
          margin-top: 13px;
          margin-left: 5px;
        }
      }
      .el-main {
        height: auto;
      }
    }
  }
}

</style>
