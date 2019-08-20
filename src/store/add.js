import { Message } from 'element-ui'

const friendList = {
  state: {
    friendlist: [
      {
        id: 1,
        name: 'Andy',
        readnum: 14,
        src: 'https://picsum.photos/250/250/?image=54'
      },
      {
        id: 2,
        name: 'Potato',
        readnum: 2,
        src: 'https://picsum.photos/250/250/?image=58'
      },
      {
        id: 3,
        name: 'Buzz',
        readnum: 3,
        src: 'https://picsum.photos/250/250/?image=59'
      },
      {
        id: 4,
        name: 'Woody',
        readnum: 7,
        src: 'https://picsum.photos/250/250/?image=52'
      },
      {
        id: 5,
        name: 'Dog',
        readnum: 1,
        src: 'https://picsum.photos/250/250/?image=57'
      },
    ],
    newfrienddata: [
      {
        id: 6,
        name: 'Bo',
        src: 'https://picsum.photos/250/250/?image=50'
      },
      {
        id: 7,
        name: 'Egg',
        src: 'https://picsum.photos/250/250/?image=61'
      },
      {
        id: 8,
        name: 'Molly',
        src: 'https://picsum.photos/250/250/?image=60'
      },
      {
        id: 9,
        name: 'Alien',
        src: 'https://picsum.photos/250/250/?image=62'
      },
      {
        id: 10,
        name: 'Beep',
        src: 'https://picsum.photos/250/250/?image=67'
      },
    ],
    new: {}
  },
  mutations: {
    ADD_FRIEND_TO_NEW(state, friend, key) {
      state.friendlist.push(friend)
      state.newfrienddata.splice(key, 1)
      Message.success('加入成功！')
      console.log('add',friend)
    },
    SET_NEW_FRIEND_DATA (state) {
      sessionStorage.setItem('newfrienddata',JSON.stringify(state.newfrienddata))
      state.newfrienddata = state.newfrienddata || JSON.parse(sessionStorage.getItem('newfrienddata'))
      console.log('session', state.newfrienddata)
    },
    GET_NEW_FRIEND_DATA(state) {
      return state.newfrienddata || JSON.parse(sessionStorage.getItem('newfrienddata'))
    },
    NEW_USER(state,name) {
      state.new = ({ name: name , src:'https://picsum.photos/250/250/?image=15'})
      state.friendlist.push(state.new)
    },
    SET_FRIEND_LIST (state) {
      sessionStorage.setItem('friendlist', JSON.stringify(state.friendlist))
      state.friendlist = state.friendlist || JSON.parse(sessionStorage.getItem('friendlist'))
      console.log('session', state.friendlist)
    },
    GET_FRIEND_LIST(state) {
      return state.friendlist || JSON.parse(sessionStorage.getItem('friendlist'))
    }
  },
  actions: {
    addFriendToNew({commit}, friend) {
      commit('ADD_FRIEND_TO_NEW', friend)
    },
    setNewFriendData ({commit}) {
      commit('SET_NEW_FRIEND_DATA')
    },
    getNewFriendData({commit}) {
      commit('GET_NEW_FRIEND_DATA')
    },
    newUser ({commit},name) {
      commit('NEW_USER',name)
    },
    setFriendList ({commit}) {
      commit('SET_FRIEND_LIST')
    },
    getFriendList({commit}) {
      commit('GET_FRIEND_LIST')
    }
  },
  getters: {
    friendlist: state => state.friendlist,
    newfrienddata: state => state.newfrienddata
  }
}

export default friendList
