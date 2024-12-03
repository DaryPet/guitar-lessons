// import { io } from 'socket.io-client';

// const socket = io('http://localhost:8080');

// socket.on('connect', () => {
//   console.log('Успешное подключение к серверу');
//   socket.emit('sendMessage', { receiverId: 1, content: 'Привет из клиента!' });
// });

// socket.on('newMessage', (message) => {
//   console.log('Новое сообщение от сервера:', message);
// });

// socket.on('connect_error', (err) => {
//   console.error('Ошибка подключения:', err);
// });
import { io } from 'socket.io-client';

// Предположим, что вы получили токен после логина, вставьте его сюда.
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2FtaWtlIiwic3ViIjoxLCJyb2xlIjoidXNlciIsImlhdCI6MTczMzI2MDIxMiwiZXhwIjoxNzMzMjYxMTEyfQ.-9UDhH0Wot_hVViPEjpSB8n1LPD3JLj1X3WrxbyCLBI';
// Подключение к WebSocket серверу с использованием токена
const socket = io('http://localhost:3001', {
  transports: ['websocket'], // Используем только websocket
  auth: {
    token: token, // Передаем токен как часть авторизации
  },
});

// Когда клиент успешно подключается
socket.on('connect', () => {
  console.log('Успешное подключение к серверу');
  // Отправляем тестовое сообщение
  socket.emit('sendMessage', { receiverId: 5, content: 'poij be!' });
});

// Когда приходит новое сообщение
socket.on('newMessage', (message) => {
  console.log('Новое сообщение от сервера:', message);
});

// Обработка ошибок подключения
socket.on('connect_error', (err) => {
  console.error('Ошибка подключения:', err);
});
