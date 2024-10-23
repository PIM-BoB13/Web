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
          <div class="step-arrow">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                    :fill="currentStep >= 3 ? '#22c55e' : '#e2e8f0'"/>
            </svg>
          </div>
          <div class="progress-step" :class="{ 'completed': currentStep >= 3, 'active': currentStep === 3 }">
            <div class="step-circle">
              <span class="step-number"></span>
              <svg class="check-icon" viewBox="0 0 24 24" v-if="currentStep > 3">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
              </svg>
            </div>
            <div class="step-info">
              <span class="step-text">STEP 3</span>
              <span class="step-desc">결함 사례 확인</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Close Button -->
      <button class="close-button" @click="$emit('cancel')">
        <span>&times;</span>
      </button>

      <!-- Step 1: File Upload - 레이아웃 수정 -->
      <div v-if="currentStep === 1" class="step-content">
        <div class="content-wrapper">
          <h2 class="step-title">'{{ evidenceName }}'를 업로드해주세요</h2>
          <div class="upload-section">
            <!-- 왼쪽: 확인사항 리스트 -->
            <div class="checklist-container">
              <h3 class="checklist-title">
                '{{ evidenceName }}' 업로드 전 <span class="highlight">필수 점검 리스트</span></h3>
              <div class="checklist">
                <div v-for="(item, index) in analysis"
                     :key="index"
                     class="checklist-item">
                  <div class="checklist-number">{{ index + 1 }}</div>
                  <div class="checklist-content">
                    <h4 class="checklist-item-title">{{ item.title }}</h4>
                    <p class="checklist-item-desc">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 오른쪽: 파일 업로드 영역 -->
            <div class="upload-container">
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
              <div class="defect-list-container">
                <div class="defect-cases">
                  <div v-for="(defect, index) in filteredDefects"
                       :key="index"
                       class="defect-case">
                    <div class="defect-header">
                      <span class="defect-id">#{{ defect.id }}</span>

                    </div>
                    <h3 class="defect-title">{{ defect.title }}</h3>
                    <p class="defect-description">{{ defect.description }}</p>
                    <div class="defect-footer">
                <span class="defect-date">
                  <i class="far fa-calendar-alt"></i>
                  {{ defect.date }}
                </span>
                      <span class="defect-status" :class="defect.status">
                  {{ defect.status }}
                </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="action-buttons">
          <div class="button-container">
            <button class="button back" @click="currentStep = 1">이전</button>
            <button class="button confirm" @click="moveToStep3">3단계로 이동</button>
          </div>
        </div>
      </div>

      <!-- Step 3: Defect Cases -->
      <div v-else-if="currentStep === 3" class="step-content">
        <h2 class="step-title1">결함 사례 목록</h2>
        <div class="case-content">
          <div class="guidance-wrapper">
            <div class="warning-icon">
              <svg viewBox="0 0 24 24" class="warning-svg">
                <path d="M12 2L1 21h22L12 2zm0 3.83L19.17 19H4.83L12 5.83zM11 16h2v2h-2zm0-6h2v4h-2z"
                      fill="currentColor"/>
              </svg>
            </div>
              <span class="guidance-highlight">주의!</span>
            <span class="guidance-emphasis">이전에 이 증적에 대해서 아래와 같은 결함사례들이 있었습니다.</span>
            <span class="guidance-emphasis1">반드시 참고하여 최종 확인해주세요.</span>
          </div>

          <div class="case-list">
            <div v-for="(caseItem, index) in cases"
                 :key="index"
                 class="case-item">
              <div class="case-body">
                <div class="case-header">
                  <div class="case-index">사례 {{ index + 1 }}</div>
                  <div class="warning-badge">
                    <svg class="warning-icon-small" viewBox="0 0 24 24">
                      <path d="M12 2L1 21h22L12 2zm0 3.83L19.17 19H4.83L12 5.83zM11 16h2v2h-2zm0-6h2v4h-2z"
                            fill="currentColor"/>
                    </svg>
                    결함
                  </div>
                </div>
                <p class="case-description">{{ caseItem.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <div class="button-container">
            <button class="button back" @click="currentStep = 2">이전</button>
            <button class="button confirm" @click="$emit('confirm')">완료</button>
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
      analyzing: false,
      searchQuery: '',
      analysis: [
        {
          title: "자격 요건 충족",
          description: "직무기술서를 통해 정보보호 최고 책임자가 법령에 따른 자격요건(정보통신망법 제45조의3, 일반자격 요건/특별자격 요건)을 충족하고 있는가?"
        },
        {
          title: "일반 자격 요건(중기업 기업 신고 의무대상자)",
          description: "정보보호 또는 정보기술분야 석사이상, 정보보호 또는 정보기술분야 학사 3년 이상 경력, 정보보호 또는 정보기술분야 전문학사 5년 이상 경력"
        },
        {
          title: "특별자격 요건(대규모 기업 겸직제한 의무대상자)",
          description: "정보보호 업무 경력 4년 이상 또는 정보보호 또는 정보기술분야 5년 이상 경력 중 2년은 정보보호 분야 업무경력."
        },
        {
          title: "임원급 지정 확인 여부",
          description: "정보보호 최고책임자 신고 내역을 통해 임원급으로 지정되었는지 확인할 수 있는가?"
        },
        {
          title: "내용 정확성",
          description: "문서의 모든 정보가 정확하고 최신 상태인지 검토해주세요."
        }
      ],
      defectCases: [
        {
          id: '001',
          title: '자격 요건 충족',
          description: '자격이 없네요오오오. 결함입니다아아',
          date: '2024-03-15',
          status: '조치필요'
        },
        {
          id: '002',
          title: '일반 자격 요건(중기업 기업 신고 의무대상자)',
          description: '잘 신고 했네요. 고생하셧서요',
          date: '2024-03-14',
          status: '완료'
        },
        {
          id: '003',
          title: '특별자격 요건(대규모 기업 겸직제한 의무대상자)',
          description: '특별자격에 해당하네요. 멋집니다',
          date: '2024-03-13',
          status: '완료'
        },
        {
          id: '004',
          title: '임원급 지정 확인 여부',
          description: '임원이 바쁘네요오. 수고가 많으십니다',
          date: '2024-03-12',
          status: '완료'
        },
        {
          id: '005',
          title: '내용 정확성',
          description: '내용이 없써요. 결함인듯 합니다',
          date: '2024-03-11',
          status: '조치필요'
        }
      ],
      cases: [
        {
          description: "정보보호 최고책임자의 자격요건이 정보통신망법 제45조의3에 따른 자격요건을 충족하지 못했습니다. 정보보호 또는 정보기술 분야 경력이 부족합니다."
        },
        {
          description: "임원급 지정 여부를 확인할 수 있는 증빙자료가 부재합니다. 조직도 또는 인사발령 내역 등의 추가 자료가 필요합니다."
        },
        {
          description: "제출된 이력서 상의 경력사항이 불명확합니다. 구체적인 업무 내용과 기간을 명시한 경력증명서가 필요합니다."
        },
        {
          description: "정보보호 최고책임자의 겸직 제한 요건을 확인할 수 있는 자료가 미흡합니다. 타 직무 수행 여부에 대한 확인이 필요합니다."
        }
      ]

    };
  },

  computed: {
    filteredDefects() {
      return this.defectCases.filter(defect => {
        const searchLower = this.searchQuery.toLowerCase();
        return defect.title.toLowerCase().includes(searchLower) ||
          defect.description.toLowerCase().includes(searchLower);
      });
    }
  },

  methods: {

    moveToStep3() {
      this.currentStep = 3;
    },
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
/* Step 3 관련 새로운 스타일 */
.defect-list-container {
  background-color: #f8fafc;
  border-radius: 8px;
  height: calc(100% - 160px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.defect-filter {
  padding: 16px;
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
}

.search-box {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
}

.search-input {
  width: 100%;
  padding: 8px 12px 8px 36px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
}

.defect-cases {
  padding: 16px;
  overflow-y: auto;
  flex: 1;
}

.defect-case {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.defect-case:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.defect-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.defect-id {
  color: #64748b;
  font-size: 14px;
}



.defect-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.defect-description {
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 12px;
}

.defect-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.defect-date {
  color: #64748b;
}

.defect-date i {
  margin-right: 4px;
}

.defect-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.defect-status.완료 {
  background-color: #dcfce7;
  color: #16a34a;
}

.highlight{
  color: #fa5f5f;
}

.defect-status.조치필요 {
  background-color: #fee2e2;
  color: #dc2626;
}

.button.back {
  background-color: #f1f5f9;
  color: #64748b;
}

.button.back:hover {
  background-color: #e2e8f0;
}


.button-container {
  display: flex;
  justify-content: center;
  gap: 20px; /* 버튼 사이의 간격을 20px로 설정 */
  max-width: 400px; /* 버튼 컨테이너의 최대 너비 설정 */
  margin: 0 auto; /* 가운데 정렬 */
  margin-bottom: 0px;
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
  margin-right: 20px; /* 왼쪽으로 10px 이동 */
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
  width: 1100px; /* 고정된 너비 */
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
  padding: 15px 20px;
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
  font-size: 20px;
  color: #1e293b;
  margin-bottom: 24px;
  font-weight: 600;
  text-align: center;
}

.step-title1 {
  font-size: 20px;
  color: #1e293b;
  margin: 0 0 -2px 0;
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
  margin-bottom: 16px;
  flex-grow: 1; /* If inside a flex container */
  height: 84%;
  width: 400px;
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
  width: 400px;
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
  padding: 10px 0;
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
  height: 100%; /* 상단 여백과 버튼 영역을 고려한 높이 */
  display: flex;
  flex-direction: column;

  margin-bottom: 0; /* Remove bottom margin */
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
  padding: 4px;
  flex: 1;
  height: 100%;
  overflow-y: auto;
}

.analysis-section {
  margin-bottom: 0px;
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

/* 새로운 스타일 추가 */
.upload-section {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}

.checklist-container {
  flex: 2; /* Increase the flex value to make it wider */
  background-color: #f3f9ff;
  border-radius: 8px;
  padding: 20px;
  max-width: 100%; /* Allow it to take up the full width */
}

.checklist-title {
  font-size: 18px;
  color: #1e293b;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
}

.checklist {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.checklist-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.checklist-number {
  background-color: #3b82f6;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
}

.checklist-content {
  flex: 1;
}

.checklist-item-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.checklist-item-desc {
  font-size: 14px;
  color: #47586e;
  line-height: 1.4;
}

.upload-container {
  flex: 1;
}

/* Step 3 관련 새로운 스타일 */
.case-content {
  background-color: #ffffff;
  border-radius: 12px;
  height: calc(100% - 120px);
  overflow-y: auto;
  padding: 24px;
}

.guidance-text {
  color: #1e293b;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 24px;
  text-align: center;
  padding: 16px;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.case-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.case-item {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.case-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.case-body {
  padding: 20px;
}

.case-description {
  color: #475569;
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
}

.guidance-wrapper {
  background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%);
  border-radius: 18px;
  padding: 10px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 2px solid #ffd54f;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.warning-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  color: #f57c00;
  margin-left: 18px;
}

.warning-svg {
  width: 100%;
  height: 100%;
}

.guidance-text {
  color: #1e293b;
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
  flex-grow: 1;
}

.guidance-highlight {
  color: #d32f2f;
  font-weight: 700;
  font-size: 18px;
  margin-right: 0px;
}

.guidance-emphasis {
  display: block;
  color: #000000;
  font-weight: 600;
  margin-top: 0px;
}
.guidance-emphasis1 {
  display: block;
  color: #d32f2f;
  font-weight: 600;
}


.case-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px;
}

.case-item {
  background-color: #fff;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.case-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.case-body {
  padding: 20px;
}

.case-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.case-index {
  font-size: 16px;
  font-weight: 600;
  color: #0a0a0a;
  display: flex;
  align-items: center;
}

.warning-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #fff3e0;
  color: #f57c00;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.warning-icon-small {
  width: 16px;
  height: 16px;
}

.case-description {
  color: #475569;
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
  padding: 8px 12px;
  background-color: #f8fafc;
  border-radius: 8px;
  border-left: 4px solid #f89d40;
}

.case-content {
  background-color: #ffffff;
  border-radius: 12px;
  height: calc(100% - 120px);
  overflow-y: auto;
  padding: 24px;
}

/* 기존 스타일 유지 */
.step-content {
  padding: 15px 20px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.action-buttons {
  padding: 10px 0;
  background-color: white;
  border-top: 1px solid #e2e8f0;
  margin-top: auto;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  max-width: 400px;
  margin: 0 auto;
  margin-bottom: 0px;
}

.button {
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.button.back {
  background-color: #f1f5f9;
  color: #64748b;
}

.button.confirm {
  background-color: #3b82f6;
  color: white;
}
</style>
