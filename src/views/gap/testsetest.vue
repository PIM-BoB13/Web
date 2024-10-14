<CCard class="mapped-elements">
<CCardHeader>
            <span class="header-title">정책/지침 자료 추천
              <span class="ai-badge-feedback">AI</span>
            </span>
</CCardHeader>
<CCardBody>
  <div class="ai-suggestion">
    <span>PIM AI는 {{ item.id }} 항목에 맞는 {{ aiSuggestions.policy }}개의 정책/지침 문서를 추천드립니다.</span>
  </div>
  <ul class="recommendation-list">
    <li v-for="(policy, index) in policies" :key="index" class="recommendation-item">
      <span class="policy-name">{{ policy.name }}</span>
      <div class="action-buttons">
        <button class="action-button add-button" @click="showAddConfirmation(index)">
          <span class="button-icon">+</span>
        </button>
        <button class="action-button remove-button" @click="showRemoveConfirmation(index)">
          X
        </button>
      </div>
    </li>
  </ul>
  <button class="show-more">Show more</button>
</CCardBody>
</CCard>
