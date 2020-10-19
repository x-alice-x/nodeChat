<template>
<div class="chat-room">
  <div class="messages">
    <div class="message" :style="message.username === myUsername ? 'justify-content: flex-end' : 'justify-content: flex-start'" v-for="message in messages" :key="message.index">
      <div class="message-block">
        <div class="username">{{message.username}}</div>
        <div class="message-block__text">{{message.msg}}</div>
      </div>
    </div>
  </div>
  <div class="writing">
    <v-form @submit="Send">
      <v-textarea
          outlined
          rows="4"
          row-height="5"
          v-model="msg"
          :hide-details="true"
      />
      <v-btn @click="Send" :disabled="!msg">Send</v-btn>
    </v-form>
  </div>
</div>
</template>

<script>
export default {
name: "ChatRoom",
  props: ['messages', 'myUsername'],
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
.messages {
  max-height: 66%;
  overflow: auto;
}
.message {
  display: flex;
  .username {
    width: fit-content;
  }
  &-block {
    padding: 8px 12px;
    background: #cce5e5;
    color: #333333;
    border-radius: 5px;
    width: fit-content;
    &__text {
      width: fit-content;
    }
  }
}
.v-form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: fit-content;
  position: fixed;
  bottom: 10%;
  left: 39%;
  line-height: 18px !important;
  .v-btn {
    width: 112px;
    margin-top: 8px;
  }
  .v-textarea {
    width: 256px;
    max-height: 256px;
  }
  ::v-deep .v-textarea textarea {
    line-height: 18px !important;
  }
  ::v-deep .v-input__slot {
    padding-bottom: 6px !important;
  }
}

</style>
