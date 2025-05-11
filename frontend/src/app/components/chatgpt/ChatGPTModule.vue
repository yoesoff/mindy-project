<template>
  <div class="chatgpt-module">
    <h1>ChatGPT</h1>
    <div class="chat-box">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message', message.type]"
      >
        <p>{{ message.text }}</p>
        <div class="meta">
          <span class="timestamp">{{ message.timestamp }}</span>
          <span v-if="message.type === 'chatgpt'" class="status">
            <i v-if="message.status === 'sent'" class="icon-sent">✓</i>
            <i v-if="message.status === 'read'" class="icon-read">✓✓</i>
          </span>
        </div>
      </div>
    </div>
    <form @submit.prevent="sendPrompt" class="input-area">
      <input
        v-model="prompt"
        type="text"
        placeholder="Type your message..."
        required
      />
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "ChatGPTModule",
  setup() {
    const prompt = ref("");
    const messages = ref([]);

    const sendPrompt = async () => {
      if (prompt.value.trim() === "") return;

      // Add user message with timestamp
      messages.value.push({
        text: prompt.value,
        type: "user",
        timestamp: new Date().toLocaleString(),
      });

      try {
        // Add ChatGPT response with timestamp and status
        const res = await axios.get(`http://localhost:3000/api/chatgpt/response`, {
          params: { prompt: prompt.value },
        });

        messages.value.push({
          text: res.data,
          type: "chatgpt",
          timestamp: new Date().toLocaleString(),
          status: "read", // Mark as read when response is received
        });
      } catch (error) {
        console.error("Error sending prompt:", error);
        alert("Failed to get a response. Please try again.");
      } finally {
        prompt.value = ""; // Clear input
      }
    };

    return { prompt, messages, sendPrompt };
  },
};
</script>

<style scoped>
.chatgpt-module {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Arial', sans-serif;
  color: #333;
}

h1 {
  text-align: center;
  font-size: 2rem;
  color: #4caf50;
  margin-bottom: 1rem;
}

.chat-box {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 1rem;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.message {
  margin: 0.5rem 0;
  padding: 0.8rem;
  border-radius: 20px;
  max-width: 80%;
  word-wrap: break-word;
  position: relative;
}

.message.user {
  background: #4caf50;
  color: white;
  align-self: flex-end;
  text-align: right;
  margin-left: auto;
}

.message.chatgpt {
  background: #e0e0e0;
  color: #333;
  align-self: flex-start;
  text-align: left;
  margin-right: auto;
}

.meta {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timestamp {
  font-style: italic;
}

.status {
  display: flex;
  align-items: center;
}

.icon-sent {
  color: #4caf50;
}

.icon-read {
  color: #4caf50;
  font-weight: bold;
}

.input-area {
  display: flex;
  gap: 0.5rem;
}

input {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

button {
  padding: 0.8rem 1.5rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

button:hover {
  background: #45a049;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

button:active {
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .chatgpt-module {
    padding: 0.5rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  input {
    font-size: 0.9rem;
  }

  button {
    font-size: 0.9rem;
  }
}
</style>
