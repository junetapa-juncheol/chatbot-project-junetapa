# 🤖 AI 챗봇 프로젝트

한국어 지원 AI 챗봇 웹 애플리케이션입니다. 사용자와 자연스러운 대화를 나누며 다양한 기능을 제공합니다.

## ✨ 주요 기능

### 💬 스마트 대화
- 자연스러운 한국어 대화
- 문맥을 이해한 응답
- 감정 상태 인식 및 적절한 반응
- 다양한 주제의 대화 지원

### 🎯 실용적 기능
- **시간/날짜 정보**: 현재 시간과 날짜 제공
- **간단한 계산**: 기본 수학 연산 수행
- **날씨 정보**: 현재 날씨 상태 (시뮬레이션)
- **추천 시스템**: 영화, 음악, 책, 음식 추천

### 🎨 UI/UX 특징
- 반응형 디자인 (모바일/태블릿/데스크톱 지원)
- 다크 모드 자동 지원
- 타이핑 애니메이션 효과
- 직관적이고 현대적인 인터페이스

## 🚀 시작하기

### 필요 사항
- 웹 브라우저 (Chrome, Firefox, Safari, Edge)
- 웹 서버 (개발용: Live Server 등)

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone https://github.com/yourusername/chatbot-project.git
   cd chatbot-project
   ```

2. **파일 구조 확인**
   ```
   chatbot-project/
   ├── index.html          # 메인 HTML 파일
   ├── css/
   │   ├── style.css       # 메인 스타일
   │   └── responsive.css  # 반응형 스타일
   ├── js/
   │   ├── chatbot.js      # 챗봇 메인 로직
   │   ├── ui.js          # UI 관련 함수
   │   └── data.js        # 질문-답변 데이터
   ├── assets/
   │   └── images/        # 이미지 파일들 (선택사항)
   └── README.md          # 프로젝트 설명
   ```

3. **웹 서버로 실행**
   - VS Code + Live Server 확장 프로그램 사용
   - 또는 Python: `python -m http.server 8000`
   - 또는 Node.js: `npx serve .`

4. **브라우저에서 접속**
   ```
   http://localhost:8000 (또는 해당 포트)
   ```

## 🎮 사용법

### 기본 대화
- 텍스트 입력창에 메시지 입력
- Enter 키 또는 전송 버튼으로 메시지 전송
- 빠른 질문 버튼으로 미리 정의된 질문 선택

### 지원하는 명령어

#### 일반 대화
- `안녕하세요` - 인사
- `도움말` - 사용 가능한 기능 안내
- `기능 소개` - 상세한 기능 설명

#### 정보 조회
- `시간` / `지금 몇시` - 현재 시간
- `날씨` - 현재 날씨 정보
- `계산` / `2+3*4` - 수학 계산

#### 추천 서비스
- `영화 추천` - 영화 추천
- `음악 추천` - 음악 추천  
- `책 추천` - 도서 추천
- `음식 추천` - 요리 추천

#### 감정 표현
- `기뻐요` / `좋아요` - 긍정적 감정
- `슬퍼요` / `우울해요` - 부정적 감정
- `화나요` / `짜증나요` - 분노 감정
- `피곤해요` / `지쳐요` - 피로 감정

### 키보드 단축키
- `Enter` - 메시지 전송
- `Ctrl + Enter` - 강제 메시지 전송
- `Ctrl + L` - 채팅 내역 초기화
- `Ctrl + S` - 대화 내역 다운로드

## 🛠️ 커스터마이징

### 1. 응답 데이터 수정
`js/data.js` 파일에서 챗봇의 응답을 수정할 수 있습니다:

```javascript
const chatbotData = {
    greetings: [
        "새로운 인사말 추가",
        // 기존 인사말들...
    ],
    // 다른 카테고리들...
};
```

### 2. 키워드 패턴 추가
새로운 키워드 패턴을 추가하여 인식 범위를 확장할 수 있습니다:

```javascript
const keywordPatterns = {
    newCategory: ["새키워드1", "새키워드2"],
    // 기존 패턴들...
};
```

### 3. 스타일 변경
`css/style.css`에서 디자인을 수정할 수 있습니다:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
}
```

### 4. 새로운 기능 추가
`js/chatbot.js`의 `getBotResponse()` 함수에 새로운 case를 추가:

```javascript
case 'newFeature':
    return handleNewFeature(input);
```

## 📱 반응형 지원

- **모바일**: 320px ~ 480px
- **태블릿**: 481px ~ 768px  
- **데스크톱**: 769px 이상
- **가로 모드**: 자동 최적화
- **다크 모드**: 시스템 설정 감지

## 🔧 개발자 도구

디버그 모드를 활성화하려면 URL에 `?debug=true`를 추가하세요:
```
http://localhost:8000?debug=true
```

사용 가능한 디버그 명령어:
```javascript
// 브라우저 콘솔에서 사용
window.chatbotDebug.getHistory();    // 대화 내역 조회
window.chatbotDebug.clearHistory();  // 대화 내역 삭제
window.chatbotDebug.getStats();      // 대화 통계
```

## 🚀 배포

### GitHub Pages
1. GitHub 저장소 설정에서 Pages 활성화
2. 소스를 `main` 브랜치 root로 설정
3. `https://yourusername.github.io/chatbot-project`로 접속

### Netlify
1. Netlify에 저장소 연결
2. 빌드 설정 없이 바로 배포
3. 자동 HTTPS 적용

### Vercel
1. Vercel에 프로젝트 import
2. 자동 배포 및 최적화

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 할 일 목록

- [ ] 음성 인식 기능 추가
- [ ] 다국어 지원 (영어, 일본어)
- [ ] 대화 내역 브라우저 저장
- [ ] 테마 선택 기능
- [ ] 챗봇 성격 커스터마이징
- [ ] API 연동 (실제 날씨, 뉴스 등)
- [ ] 파일 업로드 지원
- [ ] 이미지 응답 기능

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의 및 지원

- 이슈 리포트: [GitHub Issues](https://github.com/yourusername/chatbot-project/issues)
- 기능 요청: [GitHub Discussions](https://github.com/yourusername/chatbot-project/discussions)
- 이메일: your.email@example.com

## 🙏 감사 인사

- [Font Awesome](https://fontawesome.com/) - 아이콘 제공
- [Google Fonts](https://fonts.google.com/) - 웹 폰트 제공
- 모든 기여자들에게 감사드립니다!

---

**⭐ 이 프로젝트가 유용했다면 스타를 눌러주세요!**