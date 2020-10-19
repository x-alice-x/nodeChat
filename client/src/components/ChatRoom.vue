<template>
<div class="chat-room">
  <div class="messages">
    <div class="message" v-for="message in messages" :key="message.index">
      <div class="username">{{message.username}}</div>
      <div class="message-text">{{message.msg}}</div>
    </div>
  </div>
  <div class="writing">
    <v-form @submit="Send">
      <v-textarea
          auto-grow
          outlined
          rows="1"
          row-height="15"
          v-model="msg"
      />
      <v-btn @click="Send" :disabled="!msg">Send</v-btn>
    </v-form>
  </div>
</div>
</template>

<script>
export default {
name: "ChatRoom",
  props: ['messages'],
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    Send() {
      if (this.message) {
        return 0
      }
      this.$emit('sendMessage', this.msg)
      this.msg = ''
    }
  }
}
</script>

<style scoped lang="scss">
.message {
  padding: 8px 12px;
  background: #cce5e5;
  color: #333333;
  border-radius: 5px;
  width: fit-content;
  .username {
    width: fit-content;
  }
  &-text {
    width: fit-content;
  }
}

</style>
