<template>
  <div class="popup-overlay">
    <div class="popup-container">
      <!-- Progress Bar -->
      <div class="progress-bar">
        <div class="step-wrapper">
          <div class="progress-step" :class="{ 'completed': currentStep >= 1, 'active': currentStep === 1 }">
            <div class="step-circle">
              <span class="step-number">1</span>
              <svg class="check-icon" viewBox="0 0 24 24" v-if="currentStep > 1">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
              </svg>
            </div>
            <div class="step-info">
              <span class="step-text">STEP 1</span>
              <span class="step-desc">증적 자료 업로드</span>
            </div>
          </div>

          <div class="step-arrow">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                    :fill="currentStep >= 2 ? '#22c55e' : '#e2e8f0'"/>
            </svg>
          </div>

          <div class="progress-step" :class="{ 'completed': currentStep >= 2, 'active': currentStep === 2 }">
            <div class="step-circle">
              <span class="step-number"></span>
              <svg class="check-icon" viewBox="0 0 24 24" v-if="currentStep > 2">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
              </svg>
            </div>
            <div class="step-info">
              <span class="step-text">STEP 2</span>
              <span class="step-desc">분석 결과</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Close Button -->
      <button class="close-button" @click="$emit('cancel')">
        <span>&times;</span>
      </button>

      <!-- Step 1: File Upload -->
      <div v-if="currentStep === 1" class="step-content">
        <div class="content-wrapper">
        <h2 class="step-title">'{{ evidenceName }}'를 업로드해주세요</h2>

        <div class="upload-zone"
             @click="triggerFileInput"
             @drop.prevent="handleFileDrop"
             @dragover.prevent
             @dragenter.prevent
             :class="{ 'drag-over': isDragging }">
          <input type="file"
                 ref="fileInput"
                 @change="handleFileUpload"
                 class="file-input"
                 accept=".pdf,.doc,.docx,.xls,.xlsx">
          <div class="upload-icon">
            <i class="fas fa-cloud-upload-alt"></i>
          </div>
          <p class="upload-text">
            파일을 끌어다 놓거나 클릭하여 업로드
          </p>
          <p class="upload-hint">
            지원 형식: PDF, DOC, DOCX, XLS, XLSX
          </p>
        </div>

        <div class="file-list" :class="{ 'has-file': selectedFile }">
          <div v-if="selectedFile" class="selected-file">
            <i class="fas fa-file-alt"></i>
            <span>{{ selectedFile.name }}</span>
            <button @click="removeFile" class="remove-file">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        </div>


        <div class="action-buttons">
          <div class="button-container">
          <button class="button next"
                  @click="nextStep"
                  :disabled="!selectedFile">
            분석하기
          </button>
        </div>
      </div>
      </div>

      <!-- Step 2: Analysis Result -->
      <div v-else-if="currentStep === 2" class="step-content">
        <h2 class="step-title1">분석 결과</h2>

        <div class="analysis-container">
          <div class="analysis-header">
            <div class="file-info">
              <i class="fas fa-file-alt"></i>
              <span>{{ selectedFile?.name }}</span>
              <div class="analysis-status success">
                <i class="fas fa-check-circle"></i>
                분석 완료
              </div>
            </div>
          </div>

          <div class="analysis-content">
            <div class="analysis-section">
              <h3>파일 정보</h3>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">파일 크기</span>
                  <span class="value">{{ formatFileSize(selectedFile?.size) }}</span>
                </div>
                <div class="info-item">
                  <span class="label">파일 형식</span>
                  <span class="value">{{ getFileExtension(selectedFile?.name) }}</span>
                </div>
              </div>
            </div>

            <div class="analysis-section">
              <h3>분석 결과</h3>
              <div class="result-content">
                {{ analysisResult }}
              </div>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <div class="button-container">
            <button class="button cancel" @click="$emit('cancel')">취소</button>
            <button class="button confirm" @click="$emit('confirm')">현황에 추가</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'AddEvidencePopup',
  props: {
    evidenceName: {
      type: String,
      required: true
    },
    itemId: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      currentStep: 1,
      selectedFile: null,
      isDragging: false,
      analysisResult: '',
      analyzing: false
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
      }
    },
    handleFileDrop(event) {
      this.isDragging = false;
      const file = event.dataTransfer.files[0];
      if (file) {
        this.selectedFile = file;
      }
    },
    removeFile() {
      this.selectedFile = null;
      this.$refs.fileInput.value = '';
    },


    async nextStep() {
      if (this.selectedFile) {
        this.analyzing = true;
        const formData = new FormData();
      formData.append('file', this.selectedFile);
        formData.append('file_name', this.evidenceName);
      // formData.append('file_name', this.selectedFile.name); 변환되어 저장되도록 막아놓음
      formData.append('type', 'evidence');
      formData.append('id', this.itemId);

      try {
        const response = await axios.post('http://43.202.210.72:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        const { message, url } = response.data;
        this.analysisResult = `Message: ${message}\nURL: ${url}`;
      } catch (error) {
        console.error('Error uploading file:', error);
        this.analysisResult = '파일 업로드 중 오류가 발생했습니다.';
      } finally {
        this.analyzing = false;
        this.currentStep = 2;
      }
    }
  },
    formatFileSize(bytes) {
      if (!bytes) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    getFileExtension(filename) {
      if (!filename) return '';
      return filename.split('.').pop().toUpperCase();
    }
  }
};
</script>

<style scoped>

.button-container {
  display: flex;
  justify-content: center;
  gap: 20px; /* 버튼 사이의 간격을 20px로 설정 */
  max-width: 400px; /* 버튼 컨테이너의 최대 너비 설정 */
  margin: 0 auto; /* 가운데 정렬 */
}

.step-text {
  font-size: 14px;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 4px;
  letter-spacing: 0.05em;
}

.step-desc {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.step-arrow {
  margin: 0 24px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  margin-left: 10px; /* 왼쪽으로 10px 이동 */
}

/* Active State */
.progress-step.active .step-circle {
  background-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  transform: scale(1.1);
}

.progress-step.active .step-number {
  color: #fff;
}

.progress-step.active .step-text,
.progress-step.active .step-desc {
  color: #3b82f6;
}

/* Completed State */
.progress-step.completed .step-circle {
  background-color: #22c55e;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1);
}

.progress-step.completed .step-number {
  opacity: 0;
}

.progress-step.completed .check-icon {
  opacity: 1;
  transform: scale(1);
}

.progress-step.completed .step-text,
.progress-step.completed .step-desc {
  color: #22c55e;
}

/* Animation */
.progress-step {
  animation: stepFadeIn 0.3s ease-out;
}

@keyframes stepFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover Effects */
.progress-step:hover .step-circle {
  transform: scale(1.1);
}

.progress-step.completed:hover .step-circle {
  background-color: #16a34a;
}
.step-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.check-icon {
  position: absolute;
  width: 20px;
  height: 20px;
  color: #fff;
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s ease;
}
.step-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  margin: 0 auto;
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 110%;
  height: 108%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-container {
  background-color: white;
  width: 700px; /* 고정된 너비 */
  height: 700px; /* 고정된 높이 */
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.close-button:hover {
  background-color: #f5f5f5;
}

.progress-bar {
  padding: 30px 40px;
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: center;
  margin-left: -17px; /* 왼쪽으로 10px 이동 */
}


.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}
.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.step-number {
  color: #64748b;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
}

.progress-step.completed .step-number {
  background-color: #22c55e;
  color: white;
}

.progress-step.active .step-number {
  background-color: #3b82f6;
  color: white;
}

.step-label {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.progress-line {
  flex-grow: 1;
  height: 2px;
  background-color: #e2e8f0;
  margin: 0 20px;
  margin-bottom: 30px;
  transition: background-color 0.3s;
}

.progress-line.completed {
  background-color: #22c55e;
}

.step-content {
  padding: 20px 40px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  min-height: 0; /* 이것이 flex 아이템의 스크롤을 가능하게 합니다 */
}
.content-wrapper {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
}

.step-title {
  font-size: 24px;
  color: #1e293b;
  margin-bottom: 24px;
  font-weight: 600;
  text-align: center;
}

.step-title1 {
  font-size: 20px;
  color: #1e293b;
  margin: 0 0 20px 0;
  font-weight: 600;
  text-align: center;
}
.upload-zone {
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 24px;
  min-height: 250px; /* 최소 높이 설정 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.upload-zone:hover,
.upload-zone.drag-over {
  border-color: #3b82f6;
  background-color: #f8fafc;
}

.upload-icon {
  font-size: 48px;
  color: #64748b;
  margin-bottom: 16px;
}

.upload-text {
  font-size: 16px;
  color: #1e293b;
  margin-bottom: 8px;
}

.upload-hint {
  font-size: 14px;
  color: #64748b;
}

.file-input {
  display: none;
}

.file-list {
  min-height: 0px; /* 최소 높이 설정 */
  transition: all 0.3s ease;
}

.selected-file {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: #f8fafc;
  border-radius: 6px;
}

.selected-file i {
  color: #64748b;
  margin-right: 12px;
}

.remove-file {
  margin-left: auto;
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 4px;
}

/* 버튼 영역 조정 */
.action-buttons {
  padding: 20px 0;
  background-color: white;
  border-top: 1px solid #e2e8f0;
  margin-top: auto; /* 이것이 버튼을 항상 아래에 위치시킵니다 */
}



.button {
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  min-width: 120px;
}
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.button.cancel {
  background-color: #f1f5f9;
  color: #64748b;
}

.button.cancel:hover {
  background-color: #e2e8f0;
}

.button.next,
.button.confirm {
  background-color: #3b82f6;
  color: white;
}

.button.next:hover,
.button.confirm:hover {
  background-color: #2563eb;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.analysis-container {
  background-color: #f8fafc;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
  height: calc(100% - 160px); /* 상단 여백과 버튼 영역을 고려한 높이 */
  display: flex;
  flex-direction: column;
}

/* 헤더 부분 조정 */
.analysis-header {
  padding: 16px 24px;
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 1;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #1e293b;
}

.analysis-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.analysis-status.success {
  color: #22c55e;
}

.analysis-content {
  padding: 20px;
  flex: 1;
  overflow-y: auto;
}

.analysis-section {
  margin-bottom: 20px;
}

.analysis-section h3 {
  font-size: 16px;
  color: #1e293b;
  margin-bottom: 13px;
  font-weight: 600;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}
.info-item {
  background-color: white;
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;

}

.info-item .label {
  font-size: 12px;
  color: #64748b;
  display: block;
  margin-bottom: 0px;
}

.info-item .value {
  font-size: 14px;
  color: #1e293b;
  font-weight: 500;
}

.result-content {
  font-weight: 700;
  background-color: white;
  padding: 16px;
  border-radius: 6px;
  border: 3px solid #e2e8f0;
  color: #1e293b;
  line-height: 1.6;
  min-height: 100px; /* Set a minimum height */
  overflow-y: auto; /* Enable scrolling if content overflows */
  font-size: 15px;
  margin-top: 10px;
}
/* 스크롤바 스타일링 */
.result-content::-webkit-scrollbar {
  width: 8px;
}

.result-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.result-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.result-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
