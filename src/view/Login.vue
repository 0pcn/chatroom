<template>
  <div>
    <div  class="setname">
      <h5 class="setname_header">請輸入姓名：</h5>
      <el-form  :model="vail" :rules="rules"  :ref="vail" :hide-required-asterisk="true">
        <el-form-item  prop="username">
          <el-input class="setname_input" v-model="vail.username" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login(vail)" class="setname_button" type="primary">確認</el-button>
        </el-form-item>
      </el-form>
      <div class="setname_bottom"></div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    let checkName = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('請輸入姓名'))
      } else if(value === sessionStorage.getItem('loginName')){
        callback(new Error('此姓名已存在'))
      } else {
        callback()
      }
    };
    return {
      vail: {
        username: ''
      },
      rules: {
        username: [
          { validator: checkName, trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    ...mapActions(['setLoginName','newUser']),
    login(vail) {
      this.$refs[vail].validate((valid) =>{
        //通過驗證執行
        if (valid) {
          this.setLoginName(this.vail.username)
          this.$router.push({path: '/Friend', })
          //請求加入
          this.$socket.emit('join',this.vail.username)
        }
        //驗證失敗執行
        else {
          return false;
        }
      })

    }
  }
}
</script>
<style lang="scss" scoped>

.setname {
  border: solid 1px lightgrey;
  width: 60%;
  min-width: 320px;
  max-width: 500px;
  margin: 0px auto;
  position: relative;
  .setname_header {
    color: #fff;
    background-color: #2B364B;
    padding: 10px;
    text-align: center;
    border: solid 1px lightgrey;
  }
  .setname_input {
    margin: 30px 0px 0px 0px
  }
  .setname_button {
    margin: 0px 0px 10px 45%;
  }
  .setname_bottom {
    background-color: #2B364B;
    height: 20px;
  }
}
</style>
