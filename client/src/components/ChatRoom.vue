<template>
<div class="chat-room" >
  <div class="messages">
    <div class="message" :style="message.username === myUsername ? 'justify-content: flex-end' : 'justify-content: flex-start'" v-for="message in messages" :key="message.index">
      <div class="message-block" @click="showManage" v-click-outside="hideManageMsg">
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
  <div class="manage-message">
    <div class="manage-message__item" style="color: #447ed4">
      Edit
    </div>
    <div class="manage-message__item">
      Delete for me
    </div>
    <div class="manage-message__item">
      Delete for everyone
    </div>
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
    showManage(e) {
      let msg = document.getElementsByClassName('manage-message')[0]
      if (!this.isManageShow) {
        msg.style.display = 'block'
        msg.style.left = e.pageX + 'px'
        msg.style.top = e.pageY + 'px'
        this.isManageShow = true
      } else {
        msg.style.display = 'none'
        this.isManageShow = false
      }
    },
    hideManageMsg() {
      document.getElementsByClassName('manage-message')[0].style.display = 'none'
      this.isManageShow = false
    }
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
.manage-message {
  display: none;
  position: absolute;
  z-index: 100;
  background-color:#f8f8e7;
  border-radius: 5px;
  font-size: 12px;
  &__item {
    border-bottom: 1px solid #e6e5d7;
    padding: 6px;
    cursor: pointer;
    transition: .2s;
    color: #f74646;
  }
  &__item:last-child {
    border: none;
    border-radius: 0 0 5px 5px;
  }
  &__item:first-child {
    border-radius: 5px 5px 0 0;
  }
  &__item:hover {
    background-color: #f0f0d6;
  }
}

</style>
