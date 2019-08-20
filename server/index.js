var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('Friend Chat');
})
const usersocket = {},userarr = []

//監聽客戶端連接請求
io.on('connection',(socket) => {
  console.log('user connected')

  //監聽客戶端加入請求後把socket存到全局數组里面
  socket.on('join',(user) =>
  {
    if(!(user in usersocket)) {
      socket.user = user;
      usersocket[user] = socket;
      userarr.push(user)
      socket.emit('firstLogin',userarr);
      socket.broadcast.emit('userJoined',user);
      console.log(user)
    }

  });

  //私聊：監聽客戶端發送訊息服務端接收後，傳送給目標
  socket.on('sendPrivateMsg',(res) =>
  {
    console.log(res);
    userarr.forEach( i=>{
      if(res.to === i)
      {
        usersocket[res.to].emit('receivePrivateMsg',res);
      }
    })

  });

  //群聊：監聽客戶端發送訊息服務端接收後，傳送
  socket.on('sendMsg',(data) => {

    // 给该socket的客户端发消息不包括自己
    socket.broadcast.emit('receiveMsg',data)
    console.log('emit',data)
  })
})



http.listen(8082, function(){
  console.log('listening on *:8082');
});
