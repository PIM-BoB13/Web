<template>
  <div class="popup-overlay" @click.self="close">
    <div class="popup">
      <button class="close-btn" @click="close">X</button>
      <h3>{{ item.category }}의 상세보기</h3>
      <p>{{ item.law }}</p>
      <p>반영 여부: {{ item.compliance }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  emits: ['close'],
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transition: opacity 0.3s ease;
}

.popup {
  width: 50%;
  height: 100%;
  background-color: white;
  padding: 20px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateX(100%);
  animation: slide-in 0.3s forwards;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
</style>
