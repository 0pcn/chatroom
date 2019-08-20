import { Message } from 'element-ui'

const friendList = {
  state: {
    friendList: [
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
    newFriendData: [
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
      state.friendList.push(friend)
      state.newFriendData.splice(key, 1)
      Message.success('加入成功！')
      console.log('add',friend)
    },
    SET_NEW_FRIEND_DATA (state) {
      sessionStorage.setItem('newFriendData',JSON.stringify(state.newFriendData))
      state.newFriendData = state.newFriendData || JSON.parse(sessionStorage.getItem('newFriendData'))
      console.log('session', state.newFriendData)
    },
    GET_NEW_FRIEND_DATA(state) {
      return state.newFriendData || JSON.parse(sessionStorage.getItem('newFriendData'))
    },
    NEW_USER(state,name) {
      state.new = ({ name: name , src:'https://picsum.photos/250/250/?image=15'})
      state.friendList.push(state.new)
    },
    SET_FRIEND_LIST (state) {
      sessionStorage.setItem('friendList', JSON.stringify(state.friendList))
      state.friendList = state.friendList || JSON.parse(sessionStorage.getItem('friendList'))
      console.log('session', state.friendList)
    },
    GET_FRIEND_LIST(state) {
      return state.friendList || JSON.parse(sessionStorage.getItem('friendList'))
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
    friendList: state => state.friendList,
    newFriendData: state => state.newFriendData
  }
}

export default friendList
