<template>
  <div class="allCard">
    <b-card
      title="Card Title"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      class="mb-2 card"
    >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </b-card-text>
      <div slot="footer">
        <small class="text-muted">Last updated 3 mins ago</small>
        <el-button class="postBtn" @click="add"><font-awesome-icon icon="thumbs-up" size="lg"/></el-button>
        <span class="count">{{count}}</span>
      </div>

    </b-card>
    <b-card
      title="Card Title"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      class="mb-2 card"
    >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </b-card-text>
      <div slot="footer">
        <small class="text-muted">Last updated 5 mins ago</small>
        <el-button class="postBtn" @click="add"><font-awesome-icon icon="thumbs-up" size="lg"/></el-button>
        <span class="count">{{count}}</span>
      </div>
    </b-card>
  </div>
</template>
<script>
export default {
  name: 'Post',
  data() {
    return {
      count: 5,
    }
  },
  methods: {
    add() {
      this.count++
    }
  }
}
</script>
<style lang="scss" scoped>
.allCard {
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;

  .card {
    width: 70%;
    max-width: 700px;
  }
}

.postBtn {
  float: right;
  padding: 5px 0px 5px 0px;
  margin: 0px 10px 0px 0px;
  border: 0px;
  background-color: beige;
}
.count {
  position: absolute;
  right: 10px;
  top:auto;
  font-size: 20px;
}
</style>
