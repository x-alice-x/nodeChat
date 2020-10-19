<template>
  <v-app>
    <div class="header">
      <h2>Chatroom</h2>
      <p>Username: {{username}}</p>
      <p>Online: {{users.length}}</p>
    </div>
    <chat-room :messages="messages" :myUsername="username" @sendMessage="sendMessage"></chat-room>
  </v-app>
</template>

<script>
import ChatRoom from "@/components/ChatRoom";
import io from 'socket.io-client'
export default {
  name: 'App',
  components: { ChatRoom },
  data() {
    return {
      username: '',
      socket: io('http://localhost:3000'),
      messages: [],
      users: []
    }
  },
  mounted() {
    this.username = prompt('What is your username?')
    if (!this.username) {
      this.username = 'Anonymous'
    }
    this.joinServer()
  },
  methods: {
    joinServer() {
      this.socket.on('loggedIn', data => {
        this.messages = data.messages
        this.users = data.users
        this.socket.emit('newuser', this.username)
      })
      this.listen()
    },
    listen() {
      this.socket.on('userOnline', user => {
        this.users.push(user)
      })
      this.socket.on('userOnline', user => {
        this.users.push(user)
      })
      this.socket.on('userLeft', user => {
        this.users.splice(this.users.indexOf(user), 1)
      })
      this.socket.on('msg', msg => {
        this.messages.push(msg)
      })
    },
    sendMessage(message) {
      this.socket.emit('msg', message)
    }
  }
};
</script>

<style lang="scss" scoped>
  .header {
    margin: 0 auto;
  }
</style>
