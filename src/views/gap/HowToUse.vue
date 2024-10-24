<template>
  <transition name="modal">
    <div v-if="isVisible" class="how-to-use-overlay" @click="closePopup">
      <div class="how-to-use-container" @click.stop>
        <div class="close-button" @click="closePopup">×</div>

        <div class="content-wrapper">
          <div class="header">
            <div class="title">AI 추천 자료 사용법</div>
          </div>

          <div class="instruction-container">
            <div class="typing-text" :class="{ 'typing-animation': isTyping }">
              {{ displayedText }}
            </div>
          </div>

          <div class="navigation">
            <div class="progress-bar">
              <div class="progress" :style="{ width: progress + '%' }"></div>
            </div>
            <div class="nav-buttons">
              <button @click="previousSection" :disabled="currentSection === 0">이전</button>
              <button @click="nextSection" :disabled="currentSection === instructions.length - 1">다음</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'HowToUse',
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      instructions: [
        "하하하 어떻게 쓰는지 소개해주마.",
        "일단 니가 올린 정책/지침 싹다 긁어서 니가 선택한 ISMS 항목에 매칭이 되는 정책/지침과 그 내용을 보내줄것이다.",
        "그러면 토글 눌러서 확인해보거라 '+' 맘에 들면 선택하고 맘에 안들면 지우셈ㅋㅋ",
        "이렇게 추가한 정책/지침은 현황 탭에 들어가서 확인할 수 있을것이다.",
        "이거보고도 못하면 그냥 쓰지마라. ㅃㅃ"
      ],
      currentSection: 0,
      displayedText: "",
      isTyping: false,
      typingSpeed: 30
    };
  },
  computed: {
    progress() {
      return ((this.currentSection + 1) / this.instructions.length) * 100;
    }
  },
  methods: {
    closePopup() {
      this.$emit('close');
    },
    async typeText(text) {
      this.isTyping = true;
      this.displayedText = "";
      for (let i = 0; i < text.length; i++) {
        this.displayedText += text[i];
        await new Promise(resolve => setTimeout(resolve, this.typingSpeed));
      }
      this.isTyping = false;
    },
    nextSection() {
      if (this.currentSection < this.instructions.length - 1) {
        this.currentSection++;
        this.typeText(this.instructions[this.currentSection]);
      }
    },
    previousSection() {
      if (this.currentSection > 0) {
        this.currentSection--;
        this.typeText(this.instructions[this.currentSection]);
      }
    }
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        this.currentSection = 0;
        this.typeText(this.instructions[0]);
      }
    }
  }
};
</script>

<style scoped>
.how-to-use-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(1px);
}

.how-to-use-container {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  width: 90%;
  max-width: 800px;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  transition: color 0.3s ease;
}

.close-button:hover {
  color: #333;
}

.header {
  display: flex;
  text-align: center;
  margin-bottom: 2rem;
  width: 41%;
}

.title {
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #2c3e50, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.3rem;
}

.instruction-container {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 2rem;
  margin: 1rem 0;
  min-height: 200px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.typing-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #2c3e50;
}

.typing-animation {
  border-right: 3px solid #3498db;
  animation: blink 0.7s infinite;
}

.navigation {
  margin-top: 2rem;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #3498db, #2980b9);
  transition: width 0.3s ease;
}

.nav-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.nav-buttons button {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.nav-buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-buttons button:not(:disabled):hover {
  transform: translateY(-2px);
}

@keyframes blink {
  0%, 100% { border-color: transparent; }
  50% { border-color: #3498db; }
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>
