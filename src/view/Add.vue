<template>
  <div>
    <b-card-header no-body>推薦 ({{count}})</b-card-header>
    <b-list-group flush v-for="friend in newFriendData" :key="friend.id">
      <b-list-group-item class="listName">
        <b-img :src="friend.src" rounded="circle" class="img"></b-img>
        {{friend.name}}
        <el-button type="primary" plain @click="add(friend)" class="addBtn"><i
          class="icon el-icon-circle-plus-outline"></i>加入好友
        </el-button>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Friend',
  data() {
    return {
      countlist: 0
    }
  },
  computed: {
    ...mapGetters(['newFriendData']),
    count() {
      /*for (var i = 0; i < this.newfrienddata.length; i++) {
        this.countlist = this.newfrienddata.length
      }*/
      return this.newFriendData.length
    }
  },
  created() {
    this.getList()
  },
  methods: {
    ...mapActions(['addFriendToNew','setFriendList','setNewFriendData','getNewFriendData']),
    add(friend) {
      this.addFriendToNew(friend)
      this.setFriendList()
      this.setNewFriendData()
      this.getList()
    },
    getList() {
      this.getNewFriendData()
    }
  }
}
</script>
<style lang="scss" scoped>


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
  .addBtn {
    position: absolute;
    right: 20px;
    padding: 10px;
    .icon {
      font-size: 18px;
      padding-right: 5px;
      margin: 0;
    }
  }

}

</style>
