<template>
  <div class="friend">
    <b-card-header no-body>好友 ({{count}})</b-card-header>
    <b-list-group flush v-for="friend in friendlist" :key="friend.id">
      <b-list-group-item class="listName" @click="tochat(friend)">
        <b-img :src="friend.src" rounded="circle" class="img"></b-img>
        {{friend.name}}
        <b-badge class="listNum" variant="primary" pill>{{friend.readnum}}</b-badge>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import friendlist from "../store/add";


export default {
  name: 'Friend',
  data() {
    return {
      countlist: 0
    }
  },
  created() {
    this.getList()
  },
  computed: {
    ...mapState(['friendlist']),
    ...mapGetters(['friendlist']),
    count() {
      for (var i = 0; i < this.friendlist.length; i++) {
        this.countlist = this.friendlist.length
      }
      return this.countlist
    },
  },
  mounted() {
    this.join()
  },
  methods: {
    ...mapActions(['getFriendList', 'setFriendList', 'setRoomName', 'newUser']),
    tochat(friend) {
      let roomName = friend.name
      //this.setRoomName(roomName)
      this.$router.push({path: '/Chat', query: {roomName: roomName}})   //router傳參
    },
    getList() {
      this.getFriendList()
      console.log('get', this.friendlist)
    },
    join() {
      //監聽成員加入
      this.sockets.subscribe('userJoined', (user) => {
        console.log('new' + user)
        this.newUser(user)
        this.$message({
          message: user + '加入',
          type: 'success'
        })
      })
      //第一次登陸接收其他成員信息
      this.sockets.subscribe('firstLogin', (userarr) => {
        if (userarr.length >= 1) {
          for (var i = 0; i < userarr.length; i++) {
            this.newUser(userarr[i])
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.friend {
  width: 100%;

  .listName {
    display: flex;
    align-items: center;
    position: relative;

    .img {
      width: 50px;
      margin: 0px 10px 0px 0px;
      padding: 0;
      float: left;
    }

    .listNum {
      position: absolute;
      right: 20px;
    }
  }
}

</style>
