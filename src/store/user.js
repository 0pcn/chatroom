const user = {
  state: {
    roomName: '',
    loginName: ''
  },
  mutations: {
    SET_LOGIN_NAME(state,name) {
      sessionStorage.setItem('loginName', name)
    },
    SET_ROOM_NAME(state,room) {
      sessionStorage.setItem('roomName', room)
    }
  },
  actions: {
    setLoginName({commit}, name) {
      commit('SET_LOGIN_NAME',name)
    },
    setRoomName({commit}, room) {
      commit('SET_ROOM_NAME',room)
    }
  },
  getters: {
    roomName: state => state.roomName,
    loginName: state => state.loginName
  }
};

export default user
