<template>
  <div>
    <!-- 메뉴바에서의 이름 표시 (정책 지침 test) -->
    <div class="menu-name">
      <h4>정책 지침 test</h4>
    </div>

    <CRow class="align-items-stretch">
      <!-- 왼쪽: 라디오 버튼으로 카테고리 선택 -->
      <CCol :xs="3">
        <CCard class="mb-4">
          <CCardBody>
            <h5 class="info-title text-center mb-4">문서 종류 선택</h5>
            <!-- 라디오 버튼 형식의 리스트 -->
            <div class="mb-4">
              <CFormCheck
                v-for="option in options"
                :key="option.value"
                type="radio"
                v-model="selectedOption"
                :value="option.value"
                :label="option.text"
                name="policy-options"
              />
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <!-- 오른쪽: 문서 내용 입력 상자 -->
      <CCol :xs="9">
        <CCard class="mb-4">
          <CCardBody>
            <h3 class="info-title text-center mb-4">문서 내용 입력</h3>
            <CRow class="mb-3">
              <!-- Input 1: 제1조(목적) -->
              <CCol :xs="12" class="mb-4">
                <p class="defect-content"><strong>제1조(목적):</strong></p>
                <textarea v-model="form['제1조(목적)']" class="form-control textarea" placeholder="문서 내용을 입력해주세요."></textarea>
              </CCol>

              <!-- Input 2: 제2조(적용범위) -->
              <CCol :xs="12" class="mb-4">
                <p class="defect-content"><strong>제2조(적용범위):</strong></p>
                <textarea v-model="form['제2조(적용범위)']" class="form-control textarea" placeholder="문서 내용을 입력해주세요."></textarea>
              </CCol>

              <!-- Input 3: 제3조(용어정의) -->
              <CCol :xs="12" class="mb-4">
                <p class="defect-content"><strong>제3조(용어정의):</strong></p>
                <textarea v-model="form['제3조(용어정의)']" class="form-control textarea" placeholder="문서 내용을 입력해주세요."></textarea>
              </CCol>

              <!-- Input 4: 제4조(보호구역 지정) -->
              <CCol :xs="12" class="mb-4">
                <p class="defect-content"><strong>제4조(보호구역 지정):</strong></p>
                <textarea v-model="form['제4조(보호구역 지정)']" class="form-control textarea" placeholder="문서 내용을 입력해주세요."></textarea>
              </CCol>

              <!-- Input 5: 제6조(보호설비 운영) -->
              <CCol :xs="12" class="mb-4">
                <p class="defect-content"><strong>제6조(보호설비 운영):</strong></p>
                <textarea v-model="form['제6조(보호설비 운영)']" class="form-control textarea" placeholder="문서 내용을 입력해주세요."></textarea>
              </CCol>

              <!-- Input 6: 기타 -->
              <CCol :xs="12" class="mb-4">
                <p class="defect-content"><strong>기타:</strong></p>
                <textarea v-model="form['기타']" class="form-control textarea" placeholder="기타"></textarea>
              </CCol>
            </CRow>

            <!-- Submit Button -->
            <div class="text-center">
              <button @click="submitForm" class="btn submit-button">제출</button>
            </div>
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
      form: {
        '제1조': '',
        '제2조': '',
        '제3조': '',
        '제4조': '',
        '제6조': '',
        '기타': ''
      },
      selectedOption: "", // 사용자가 선택한 정책 항목
      options: [
        { value: '정보처리 정책', text: '정보처리 정책' },
        { value: '정보처리 지침', text: '정보처리 지침' },
        { value: '정보보호 정책', text: '정보보호 정책' },
      ],
    };
  },

  methods: {
    async submitForm() {
      if (!this.selectedOption) {
        alert('정책 항목을 선택해주세요.');
        return;
      }

      const payload = {
        category: this.selectedOption,
        content: { ...this.form },
      };

      try {
        const response = await axios.post('http://15.164.28.184:3000/', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          alert('성공적으로 제출되었습니다!');
        } else {
          alert('제출에 실패했습니다.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('서버에 오류가 발생했습니다.');
      }
    },
  },
};
</script>

<style scoped>
.menu-name {
  margin-top: 20px;
  margin-left: 20px;
  font-size: 1.5rem;
  font-weight: bold;
}

.info-title {
  color: #4e85bd;
  font-weight: bold;
}

.defect-content {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.mb-4 {
  margin-bottom: 24px;
}

/* textarea 스타일 */
.textarea {
  width: 100%;
  height: 100px; /* 세로 길이를 늘림 */
  resize: vertical; /* 사용자가 세로 길이를 조정할 수 있도록 허용 */
  white-space: pre-wrap; /* 긴 텍스트 줄 바꿈 설정 */
  word-wrap: break-word; /* 단어가 너무 길면 자동으로 다음 줄로 넘김 */
  padding: 10px; /* 내부 여백 */
  font-size: 1rem;
}

/* 버튼 스타일 */
.submit-button {
  width: 200px; /* 가로 길이를 늘림 */
  color: white; /* 글씨 색을 흰색으로 */
  background-color: #007bff; /* 버튼 배경색 */
  border: none;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3; /* 호버 시 버튼 색상 변경 */
}
</style>
