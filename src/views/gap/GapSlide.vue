<template>
  <div class="popup-overlay" @click.self="close">
    <div class="popup-content">
      <button class="close-btn" @click="close">×</button>
      <div class="popup-body">
        <h3>{{ item.id }} - {{ item.description }}</h3>
        <!-- Add more content as needed -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  z-index: 1000;
}

.popup-content {
  width: 50%;
  height: 90%;
  bottom: 14px;
  background-color: white;
  border-radius: 10px 0 0 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  position: relative;
  animation: slideIn 0.3s ease-in-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.popup-body {
  padding: 60px 20px 10px;
  overflow-y: auto;
  flex-grow: 1;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
  z-index: 1001;
}

.close-btn:hover {
  color: #d50808;
}
</style>
