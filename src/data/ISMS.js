// src/data/sections.js
export const sections = [
  {
    id: '1.1.1',
    title: '경영진의 참여',
    controls: [
      {
        id: '1.1.1.1',
        question: '정보보호 및 개인정보보호 관리체계의 수립 및 운영활동을 지원하고 관리감독을 수행하기 위한 정보보호 및 개인정보보호 위원회 등의 조직을 구성하고 있는가?',
        policyReadiness: 0,
        evidenceReadiness: 1,
        owner: '홍길동'
      },
      {
        id: '1.1.1.2',
        question: '경영진이 참여하는 회의체에서 정보보호 및 개인정보보호 관련 보고 및 의사결정이 이루어 질 수 있도록 보고체계를 수립·운영하고 있는가?',
        policyReadiness: 1,
        evidenceReadiness: 2,
        owner: '김철수'
      },
    ]
  },
  {
    id: '1.1.2',
    title: '최고책임자의 지정',
    controls: [
      {
        id: '1.1.2.1',
        question: '최고경영자는 정보보호 및 개인정보보호 처리에 관한 업무를 총괄하여 책임질 최고책임자를 공식적으로 지정하고 있는가?',
        policyReadiness: 1,
        evidenceReadiness: 1,
        owner: '김철수'
      },
      {
        id: '1.1.2.2',
        question: '정보보호 최고책임자 및 개인정보 보호책임자는 예산, 인력 등 자원을 할당할 수 있는 임원급으로 지정하고 있으며 관련 법령에 따른 자격요건을 충족하고 있는가?',
        policyReadiness: 1,
        evidenceReadiness: 1,
        owner: '김철수'
      }
    ]
  },
  {
    id: '1.1.3',
    title: '조직 구성',
    controls: [
      {
        id: '1.1.3.1',
        question: '조직의 정보보호 활동을 체계적으로 이행하기 위해 전문성을 갖춘 실무조직을 구성하여 운영하고 있는가?',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      }
    ]
  },
  {
    id: '1.1.4',
    title: '범위 설정',
    controls: [
      {
        id: '1.1.4.1',
        question: '조직의 핵심 서비스에 영향을 줄 수 있는 핵심자산을 포함하도록 관리체계 범위를 설정하고 있는가?',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      },
      {
        id: '1.1.4.2',
        question: '정의된 범위 내에서 예외사항이 있을 경우 명확한 사유 및 관련자 협의∙책임자 승인 등 관련 근거를 기록∙관리하고 있는가?',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      },
      {
        id: '1.1.4.3',
        question: '정보보호 관리체계 범위를 명확히 확인할 수 있도록 관련된 내용(주요 서비스 및 업무 현황, 정보시스템 목록, 문서목록 등)이 포함된 문서를 작성하여 관리하고 있는가?',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      },
    ]
  },
  {
    id: '1.1.5',
    title: '정책 수립',
    controls: [
      {
        id: '1.1.5.1',
        question: '조직이 수행하는 모든 정보보호 활동의 근거를 포함하는 최상위 수준의 정보보호 정책을 수립하고 있는가?',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      },
      {
        id: '1.1.5.2',
        question: '정보보호 정책의 시행을 위하여 필요한 세부적인 방법, 절차, 주기 등을 규정한 지침, 절차, 매뉴얼 등을 수립하고 있는가?',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      },
      {
        id: '1.1.5.3',
        question: '정보보호 정책∙시행문서의 제∙개정 시 최고경영자 또는 최고경영자로부터 권한을 위임받은 자의 승인을 받고 있는가?',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      },
      {
        id: '1.1.5.4',
        question: '정보보호 정책∙시행문서의 최신본을 관련 임직원에게 접근하기 쉬운 형태로 제공하고 있는가?',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      },
    ]
  },
  {
    id: '1.2.1',
    title: '위험 관리',
    controls: [
      {
        id: '1.2.1.1',
        question: '정보자산의 분류기준을 수립하고 정보보호 및 개인정보보호 관리체계 범위 내의 모든 자산을 식별하여 목록으로 관리하고 있는가?',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      },
      {
        id: '1.2.1.2',
        question: '식별된 정보자산에 대해 법적 요구사항 및 업무에 미치는 영향 등을 고려하여 중요도를 결정하고 보안등급을 부여하고 있는가? ',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      },
      {
        id: '1.2.1.3',
        question: '정기적으로 정보자산 현황을 조사하여 정보자산목록을 최신으로 유지하고 있는가?',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      },
    ]
  },
  {
    id: '1.2.2',
    title: '현황 및 흐름분석',
    controls: [
      {
        id: '1.2.2.1',
        question: '관리체계 전 영역에 대한 정보서비스 현황을 식별하고 업무 절차와 흐름을 파악하여 문서화하고 있는가?',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      },
      {
        id: '1.2.1.2',
        question: '서비스 및 업무, 정보자산 등의 변화에 따른 업무절차를 주기적으로 검토하여 흐름도 등 관련 문서의 최신성을 유지하고 있는가?',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      },
    ]
  },
  {
    id: '1.3.1',
    title: '운영현황 관리',
    controls: [
      {
        id: '1.3.1.1',
        question: '관리체계 운영을 위해 주기적 또는 상시적으로 수행해야 하는 정보보호 활동을 문서화하여 관리하고 있는가?',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      },
      {
        id: '1.3.1.2',
        question: '경영진은 주기적으로 관리체계 운영활동의 효과성을 확인하고 이를 관리하고 있는가?',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      },
    ]
  },
  {
    id: '1.4.1',
    title: '법적 요구사항 준수 검토',
    controls: [
      {
        id: '1.4.1.1',
        question: '조직이 준수하여야 하는 정보보호 및 개인정보보호 관련 법적 요구사항을 파악하여 최신성을 유지하고 있는가?',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      },
      {
        id: '1.4.1.2',
        question: '법적 요구사항의 준수여부를 연 1회 이상 정기적으로 검토하고 있는가?',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      },
    ]
  },
  {
    id: '1.4.2',
    title: '관리체계 점검',
    controls: [
      {
        id: '1.4.2.1',
        question: '법적 요구사항 및 수립된 정책에 따라 정보보호 및 개인정보보호 관리체계가 효과적으로 운영되는지를 점검하기 위한 관리체계 점검기준, 범위, 주기, 점검인력 자격요건 등을 포함한 관리체계 점검 계획을 수립하고 있는가?',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      },
      {
        id: '1.4.2.2',
        question: '관리체계 점검 계획에 따라 독립성, 객관성 및 전문성이 확보된 인력을 구성하여 연 1회 이상 점검을 수행하고 발견된 문제점을 경영진에게 보고하고 있는가?',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      },
    ]
  },
  {
    id: '1.4.3',
    title: '관리체계 개선',
    controls: [
      {
        id: '1.4.3.1',
        question: '법적 요구사항 준수검토 및 관리체계 점검을 통해 식별된 관리체계 상의 문제점에 대한 근본 원인을 분석하여 재발방지 및 개선 대책을 수립∙이행하고 있는가?',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      },
      {
        id: '1.4.3.2',
        question: '재발방지 및 개선 결과의 정확성 및 효과성 여부를 확인하기 위한 기준과 절차를 마련하고 있는가?',
        policyReadiness: 2,
        evidenceReadiness: 0,
        owner: '김철수'
      },
    ]
  },
];
