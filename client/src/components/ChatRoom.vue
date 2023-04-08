<template>
<div class="chat-room" >
  <div class="messages">
    <div class="message" :style="message.username === myUsername ? 'justify-content: flex-end' : 'justify-content: flex-start'" v-for="message in messages" :key="message.index">
      <div class="message-block">
        <div class="username">{{message.username === myUsername ? 'You' : message.username}}</div>
        <div class="message-block__info">
          <div class="text">{{message.msg}}</div>
          <div class="time">{{ message.time }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="writing">
    <form @submit.prevent="Send">
      <textarea
          v-model.trim="msg"
          placeholder="Type a message..."
          @keyup.enter.exact="Send"
      />
      <v-btn type='submit' :disabled="!msg">Send</v-btn>
    </form>
  </div>
</div>
</template>

<script>
export default {
name: "ChatRoom",
  props: ['messages', 'myUsername'],
  data() {
    return {
      msg: '',
      isManageShow: false
    }
  },
  methods: {
    Send() {
      if (this.message) {
        return 0
      }
      this.$emit('sendMessage', this.msg)
      this.msg = ''
    },
  }
}
</script>

<style scoped lang="scss">

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: #f5f5f5;
  border-radius: 5px;
}

.messages {
  height: 70.5vh;
  overflow-y: auto;
  padding: 12px;
  width: 1200px;
  margin: 0 auto;
}
.message {
  display: flex;
  margin-bottom: 4px;

  .username {
    width: fit-content;
    font-size: 12px;
  }

  &-block {
    padding: 8px 12px;
    background: #cce5e5;
    color: #333333;
    border-radius: 5px;
    width: fit-content;
    max-width: 360px;
    cursor: pointer;
    transition: .2s;

    &:hover {
      background: #b2cece;
    }

    &__info {
      width: fit-content;
      display: flex;
      align-items: flex-end;

      .time {
        margin-bottom: 2px;
        font-size: 10px;
        margin-left: 8px;
        opacity: 50%;
        font-weight: 600;
      }

      .text {
        word-break: break-word;
      }
    }
  }
}
.writing {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 120px;
  display: flex;
  justify-content: center;
  background-color: #333333;

  form {
    display: flex;
    align-items: center;
    line-height: 18px !important;

    textarea {
      outline: none;
      width: 580px;
      height: 80px;
      color: aliceblue;
      margin-right: 24px;
      font-weight: 300;
      resize: none;
    }
  }
}
</style>
