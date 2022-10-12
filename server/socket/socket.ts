import { Server } from 'socket.io';
import http from 'http';

type MessageT = {
  id: string;
  message: string;
  roomId: string;
};

const socket = (server: http.Server) => {
  const io = new Server(server, {
    cors: { origin: 'http://localhost:3000', credentials: true },
  });

  io.on('connection', (socket) => {
    socket.on('join', ({ roomId: room, userId: userId }) => {
      socket.join(room);
      io.to(room).emit('onConnect', `${userId}님이 입장했습니다.`);

      socket.on('onSend', (messageItem: MessageT) => {
        console.log('messageItem', messageItem);
        io.to(room).emit('onReceive', messageItem);
      });

      socket.on('disconnect', () => {
        socket.leave(room);
        io.to(room).emit('onDisconnect', `${userId}님이 퇴장하셨습니다.`);
      });
    });
  });
};
export default socket;
