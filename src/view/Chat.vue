<template>
  <div>
    <div class="chatRoom">
      <div class="cheader">
        <div class="cheader-font">{{name}}</div>
        <i class=" iconpe el-icon-user-solid">2</i>
        <div class="chnav">
          <b-nav tabs>
            <b-nav-item><i class="icon el-icon-search"></i></b-nav-item>
            <b-nav-item><i class="icon el-icon-tickets"></i></b-nav-item>
            <b-nav-item><i class="icon el-icon-more"></i></b-nav-item>
          </b-nav>
        </div>
      </div>

      <div class="chatContent">
        <div v-for="item in message">
          <div v-if="item.self" class="chatItem self">
            <div class="msgDate">{{item.time}}</div>
            <div class="msgName">{{item.name}}</div>
            <div class="msg">{{item.message}}</div>
          </div>

          <div v-else class="chatItem other">
            <div class="msgDate">{{item.time}}</div>
            <div class="msgName">{{item.name}}</div>
            <div class="msg">{{item.message}}</div>
          </div>
        </div>
      </div>

      <div class="chinput">
        <b-form-textarea
          v-model.lazy="text"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
          @keyup.enter="sendMessage"
        ></b-form-textarea>
      </div>
    </div>


  </div>
</template>
<script>
import moment from 'moment'


export default {
  name: 'Chat',
  data() {
    return {
      isCollapse: true,
      text: '',
      message: [],
      name: this.$route.query.roomName,  //接router參數
      loginName: ''
    }
  },
  //連接socket服務端
  sockets: {
    connect() {
      console.log('socket connected')
    }
  },
  created() {
    this.loginName = sessionStorage.getItem('loginName')
  },
  mounted() {
    this.scrollToBottom();
    //群聊：接收群聊訊息
    this.sockets.subscribe('receiveMsg', data => {
      this.message.push(data)
    }),
    //私聊：接收私聊訊息
    this.sockets.subscribe('receivePrivateMsg', data => {
      this.message.push(data)
    })
  },
//每次頁面渲染完後滾動條在最底部
  updated() {
    this.scrollToBottom();
  },
  methods: {
    getTime(time) {
      return moment(time).format('YYYY-MM-DD HH:mm')
      /*      const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            return `${(hours >= 12) ? "下午" : "上午"} ${hours}:${(minutes < 10) ? '0' + minutes : minutes}`;*/
    },
    sendMessage(e) {
      if (this.text === '') {
        e.preventDefault();
        return false
      }
      /*//群聊：傳送訊息給服務端
      this.$socket.emit('sendMsg', {
        message: this.text,
        time: this.getTime(),
        name:this.loginName
      })*/
      //私聊：發送訊息給服務端
      this.$socket.emit('sendPrivateMsg',{
        message: this.text,
        time: this.getTime(),
        name: this.loginName,
        to: this.name
      })
      this.message.push({
        message: this.text,
        time: this.getTime(),
        name: this.loginName,
        self: true
      })

      this.text = ''
    },
    scrollToBottom() {
      this.$nextTick(() => {
        var container = this.$el.querySelector(" div.chatContent "); //需要滾動條在最底部的容器
        container.scrollTop = container.scrollHeight;
      })
    },

  }
}
</script>

<style lang="scss" scoped>
.chatRoom {
  .cheader {
    border: solid 1px lightgrey;
    height: 50px;
    background-color: aliceblue;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    padding-left: 20px;
    position: relative;
    .cheader-font {
      font-size: 18px;
      padding-top: 10px;
    }

    .icon {
      font-size: 18px;
    }

    .iconpe {
      padding-left: 10px;
      font-size: 18px;
      padding-top: 15px;
    }

    .chnav {
      position: absolute;
      right: 20px;
      bottom: 0;
      //margin-top: - 40 px;
    }
  }
  .chatContent {
    border: solid 1px lightgrey;
    height: 400px;
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    //position: relative;

    .chatItem {
      width: 100%;
      position: relative;
      margin-top: 40px;
      /*.msgDate {
        color: gray;
        font-size: 90%;
      text-align: center;
      }*/
      .msgName {
        display: flex;
        align-items: center;
        font-size: 1rem;
        margin-right: 20px;
        margin-left: 5px;

      }

      .msg {
        display: flex;
        align-items: center;
        border: solid 1px lightgrey;
        margin-top: 10px;
        background-color: gainsboro;
        width: 200px;
        padding: 10px 10px;
        border-radius: 10px;
      }

    }

    .self {

      .msgDate {
        color: gray;
        font-size: 90%;
        position: absolute;
        right: 20px;
        top: 80px;
        margin: 5px;
      }

      .msgName {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        //margin: 30px 20px 0px 5px;
        //margin-top: 20px;
      }

      .msg {
        float: right;
        background-color: papayawhip;
        border: papayawhip;
        word-wrap: break-word;
        word-break: break-all;
        margin-right: 10px;
      }

    }

    .other {

      .msgDate {
        color: gray;
        font-size: 90%;
        position: absolute;
        left: 20px;
        top: 80px;
        margin: 5px;
      }

      .msgName {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 20px;
      }

      .msg {
        float: left;
        margin-left: 10px;
        word-wrap: break-word;
        word-break: break-all;
      }

    }
  }

  .box-card {
    margin: 20px;
    max-width: 300px;
    width: 100%;
    word-wrap: break-word;
  }

  .chinput {
    width: 100%;
  }
}

</style>
