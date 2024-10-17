<template>
  <div class="upload-page" @click="closeDropdown">
    <CRow class="align-items-stretch">
      <!-- 왼쪽 화면 (파일 종류와 카테고리 선택) -->
      <CCol :xs="6">
        <CCard class="mb-4 left-box">
          <CCardBody>
            <div class="section">
              <!-- 파일 종류 선택 (이중 토글 버튼) -->
              <h5 class="info-title mb-4">1. 해당 파일의 종류를 구분해주세요. <span class="required">*필수</span></h5>
              <div class="toggle-wrapper mb-5">
                <button
                  :class="['toggle-button', selectedFileType === '정책 및 지침' ? 'active' : '']"
                  @click="selectedFileType = '정책 및 지침'"
                >
                  정책 및 지침
                </button>
                <button
                  :class="['toggle-button', selectedFileType === '그 외 문서 자료' ? 'active' : '']"
                  @click="selectedFileType = '그 외 문서 자료'"
                >
                  그 외 문서 자료
                </button>
              </div>

              <!-- 문서 카테고리 선택 -->
              <h5 class="info-title mb-4 category-question">2. 해당 파일과 관련있는 문서 카테고리를 선택해주세요. <span class="required">*필수</span></h5>
              <div class="custom-select-wrapper mb-4">
                <div class="custom-select" @click.stop="toggleDropdown">
                  <span class="selected-option">{{ selectedCategory || '문서 카테고리 선택' }}</span>
                  <ul v-show="dropdownOpen" class="custom-options">
                    <li
                      v-for="option in categoryOptions"
                      :key="option.value"
                      :class="{ 'active': selectedCategory === option.value }"
                      @click.stop="selectCategory(option.value)"
                    >
                      {{ option.label }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <!-- 오른쪽 화면 (파일 선택 영역) -->
      <CCol :xs="6">
        <div class="file-upload-area" @click="triggerFileUpload">


            <span v-if="file">{{ file.name }}</span>
            <span v-else>파일을 선택해주세요</span>

          <input type="file" id="file-upload" ref="fileInput" @change="handleFileUpload" style="display: none;" />
        </div>

        <div class="upload-button mt-4">
          <CButton @click="uploadFile" class="blue-button long-button">업로드하기</CButton>
        </div>
      </CCol>
    </CRow>

    <div class="spacing-between-sections"></div>

    <!-- 하단: 문서 리스트 -->
    <CRow class="align-items-stretch">
      <CCol :xs="12">
        <CCard>
          <CCardHeader>
            <strong>기업 정책/지침 자료 리스트</strong>
            <CButton class="me-1 float-end" color="secondary" size="sm" @click.prevent="print">
              <CIcon icon="cil-print" /> Print
            </CButton>
            <CButton class="me-1 float-end" color="success" size="sm" style="color:white;">
              <CIcon icon="cil-save" /> Save
            </CButton>
          </CCardHeader>

          <CCardBody>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>문서명</CTableHeaderCell>
                  <CTableHeaderCell>종류</CTableHeaderCell>
                  <CTableHeaderCell>카테고리</CTableHeaderCell>
                  <CTableHeaderCell>업로드 일시</CTableHeaderCell>
                  <CTableHeaderCell>크기</CTableHeaderCell>
                  <CTableHeaderCell>파일 종류</CTableHeaderCell>
                  <CTableHeaderCell>버전 관리</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="file in uploadedFiles" :key="file.name">
                  <CTableDataCell>{{ file.name }}</CTableDataCell>
                  <CTableDataCell>{{ file.type }}</CTableDataCell>
                  <CTableDataCell>{{ file.category }}</CTableDataCell>
                  <CTableDataCell>{{ file.uploadedAt }}</CTableDataCell>
                  <CTableDataCell>{{ file.size }} KB</CTableDataCell>
                  <CTableDataCell>{{ file.extension }}</CTableDataCell>
                  <CTableDataCell>
                    <CButton @click="uploadFile" class="blue-button1 long-button1">V_1</CButton>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFileType: '', // 파일 종류 선택
      selectedCategory: '', // 문서 카테고리 선택
      dropdownOpen: false, // 드롭다운 상태
      categoryOptions: [
        { value: '정보보호 및 개인정보보호 정책', label: '정보보호 및 개인정보보호 정책' },
        { value: '정보보호 관리체계', label: '정보보호 관리체계' },
        { value: '기타', label: '기타' },
      ],
      file: null, // 업로드할 파일
      uploadedFiles: [], // 업로드된 파일 목록
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    closeDropdown() {
      this.dropdownOpen = false;
    },
    selectCategory(value) {
      this.selectedCategory = value;
      this.dropdownOpen = false; // 선택 후 드롭다운 닫기
    },
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      this.file = event.target.files[0]; // 선택한 파일을 표시
    },
    handleDrop(event) {
      this.file = event.dataTransfer.files[0]; // 드래그한 파일을 표시
    },
    async uploadFile() {
      if (!this.selectedFileType || !this.selectedCategory || !this.file) {
        alert('모든 필수 항목을 채워주세요.');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('fileType', this.selectedFileType);
      formData.append('category', this.selectedCategory);
      formData.append('file_name', this.file.name); // Add the file name to the form data

      try {
        const response = await axios.post('http://43.202.210.72:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log(response.data); // 응답 데이터 확인

        const { message, url } = response.data;

        const uploadedFile = {
          name: this.file.name,
          type: this.selectedFileType,
          category: this.selectedCategory,
          uploadedAt: new Date().toLocaleString(),
          size: (this.file.size / 1024).toFixed(1), // KB 단위로 파일 크기
          extension: this.file.name.split('.').pop(),
        };

        this.uploadedFiles.push(uploadedFile); // 파일 목록에 추가
        this.file = null; // 파일 초기화
        alert(`파일이 성공적으로 업로드되었습니다.\n메시지: ${message}\nURL: ${url}`);
      } catch (error) {
        console.error('파일 업로드 중 오류가 발생했습니다:', error);
        alert('파일 업로드 중 오류가 발생했습니다.');
      }
    },
    print() {
      window.print(); // Print 기능
    },
  },
};
</script>

<style scoped>
.upload-page {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.left-box {
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 흰색 박스와 그림자 효과 추가 */
  padding: 20px; /* 내부 여백 추가 */
  height: 100%; /* 세로 길이 더 길게 */
}

.toggle-wrapper {
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 50px;
  background-color: #f1f1f1;
  padding: 3px;
}

.toggle-button {
  flex: 1;
  padding: 8px 20px; /* 세로 길이 줄임 */
  background-color: transparent;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.toggle-button.active {
  background-color: #1c25a9;
  color: white;
}

.toggle-button:not(.active):hover {
  background-color: #e2e6ea;
}

/* 질문 간 간격을 넓힘 */
.category-question {
  margin-top: 40px;
}

.custom-select-wrapper {
  position: relative;
}

.custom-select {
  position: relative;
  cursor: pointer;
  background-color: #f1f1f1;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}

.selected-option {
  font-weight: bold;
}

.custom-options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 0 0 10px 10px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-options li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-options li:hover {
  background-color: #e2e6ea;
}

.custom-options li.active {
  background-color: #1c25a9;
  color: white;
}

.file-upload-area {
  display: flex;
  height: 300px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer; /* 클릭 가능 표시 */
}

.file-upload-label {
  font-size: 18px;
}

.drop-area {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #c8d0d9;
  color: #aebfce;
}

.spacing-between-sections {
  margin: 10px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.long-button {
  width: 100%;
  height: 40px;
  background-color: #1c25a9; /* 파란색 */
  color: white; /* 글씨 색 검은색 */
}

.long-button1 {
  width: 90%;
  height: 30px;
  background-color: #1c25a9; /* 파란색 */
  color: white; /* 글씨 색 검은색 */
  align-items: center;
  font-size: 13px;
}

.required {
  color: red;
  font-weight: normal;
  font-size: small;
}

.info-title {
  margin-bottom: 20px;
}
</style>
