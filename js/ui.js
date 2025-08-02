// UI 관련 함수들

// DOM 요소들
const chatArea = document.getElementById('chatArea');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const loading = document.getElementById('loading');

// 메시지 생성 함수
function createMessage(content, isUser = false, isHtml = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    const avatar = document.createElement('div');
    avatar.className = isUser ? 'user-avatar' : 'bot-avatar';
    avatar.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    if (isHtml) {
        messageContent.innerHTML = content;
    } else {
        messageContent.textContent = content;
    }
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    return messageDiv;
}

// 메시지 추가 함수
function addMessage(content, isUser = false, isHtml = false) {
    const messageElement = createMessage(content, isUser, isHtml);
    chatArea.appendChild(messageElement);
    scrollToBottom();
    
    // 메시지 애니메이션
    setTimeout(() => {
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
    }, 10);
}

// 스크롤 하단으로 이동
function scrollToBottom() {
    chatArea.scrollTop = chatArea.scrollHeight;
}

// 로딩 표시 함수
function showLoading() {
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'message bot';
    loadingMessage.id = 'loading-message';
    
    const avatar = document.createElement('div');
    avatar.className = 'bot-avatar';
    avatar.innerHTML = '<i class="fas fa-robot"></i>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    
    messageContent.appendChild(typingIndicator);
    loadingMessage.appendChild(avatar);
    loadingMessage.appendChild(messageContent);
    
    chatArea.appendChild(loadingMessage);
    scrollToBottom();
}

// 로딩 숨김 함수
function hideLoading() {
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

// 입력 필드 초기화
function clearInput() {
    userInput.value = '';
    userInput.focus();
}

// 버튼 상태 변경
function toggleSendButton(enabled) {
    sendBtn.disabled = !enabled;
    if (enabled) {
        sendBtn.style.opacity = '1';
        sendBtn.style.cursor = 'pointer';
    } else {
        sendBtn.style.opacity = '0.5';
        sendBtn.style.cursor = 'not-allowed';
    }
}

// 빠른 질문 전송 함수
function sendQuickQuestion(question) {
    // 웰컴 메시지 제거
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            welcomeMessage.remove();
        }, 300);
    }
    
    // 사용자 메시지 추가
    addMessage(question, true);
    
    // 봇 응답 처리
    setTimeout(() => {
        const response = getBotResponse(question);
        showTypingEffect(response);
    }, 500);
}

// 타이핑 효과 함수
function showTypingEffect(text, callback) {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        addMessage(text, false, true);
        if (callback) callback();
    }, 1000 + Math.random() * 1000); // 1-2초 랜덤 딜레이
}

// 현재 시간 가져오기
function getCurrentTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'long'
    };
    return now.toLocaleDateString('ko-KR', options);
}

// 간단한 계산 함수
function calculateExpression(expression) {
    try {
        // 보안을 위해 허용된 문자만 필터링
        const allowedChars = /^[0-9+\-*/().\s]+$/;
        if (!allowedChars.test(expression)) {
            return "죄송해요, 숫자와 기본 연산자만 사용해주세요.";
        }
        
        // eval 대신 Function 생성자 사용 (더 안전)
        const result = Function('"use strict"; return (' + expression + ')')();
        
        if (isNaN(result) || !isFinite(result)) {
            return "계산 결과가 올바르지 않습니다.";
        }
        
        return `${expression} = ${result}`;
    } catch (error) {
        return "계산식이 올바르지 않습니다. 다시 확인해주세요.";
    }
}

// 날씨 정보 (시뮬레이션)
function getWeatherInfo() {
    const weathers = [
        "☀️ 맑음 (기온: 22°C)",
        "⛅ 흐림 (기온: 18°C)", 
        "🌧️ 비 (기온: 15°C)",
        "🌤️ 구름 조금 (기온: 25°C)",
        "❄️ 눈 (기온: -2°C)"
    ];
    return weathers[Math.floor(Math.random() * weathers.length)];
}

// 추천 함수들
function getMovieRecommendation() {
    const movies = [
        "🎬 **기생충** - 봉준호 감독의 아카데미상 수상작",
        "🎬 **어벤져스: 엔드게임** - 마블의 대서사시 완결편",
        "🎬 **인터스텔라** - 크리스토퍼 놀란의 SF 걸작",
        "🎬 **라라랜드** - 로맨틱한 뮤지컬 영화",
        "🎬 **조커** - 호아킨 피닉스의 명연기"
    ];
    return movies[Math.floor(Math.random() * movies.length)];
}

function getMusicRecommendation() {
    const music = [
        "🎵 **BTS - Dynamite** - 전 세계를 휩쓴 K-POP",
        "🎵 **아이유 - Celebrity** - 감성적인 발라드",
        "🎵 **NewJeans - Attention** - 트렌디한 걸그룹 음악",
        "🎵 **Ed Sheeran - Shape of You** - 팝 음악의 정석",
        "🎵 **윤미래 - You & Me** - 힙합과 R&B의 조화"
    ];
    return music[Math.floor(Math.random() * music.length)];
}

function getBookRecommendation() {
    const books = [
        "📚 **미움받을 용기** - 아들러 심리학으로 본 인간관계",
        "📚 **1984** - 조지 오웰의 디스토피아 소설",
        "📚 **82년생 김지영** - 현대 여성의 이야기",
        "📚 **사피엔스** - 인류의 역사를 다룬 베스트셀러",
        "📚 **코스모스** - 칼 세이건의 과학 교양서"
    ];
    return books[Math.floor(Math.random() * books.length)];
}

function getFoodRecommendation() {
    const foods = [
        "🍽️ **김치찌개** - 한국의 대표 요리",
        "🍽️ **파스타** - 이탈리아의 클래식",
        "🍽️ **초밥** - 신선한 일본 요리",
        "🍽️ **삼겹살** - 한국인이 사랑하는 고기",
        "🍽️ **피자** - 전 세계인이 좋아하는 음식"
    ];
    return foods[Math.floor(Math.random() * foods.length)];
}

// 에러 메시지 표시
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background: #ffebee;
        color: #c62828;
        padding: 1rem;
        border-radius: 8px;
        margin: 0.5rem 0;
        border-left: 4px solid #c62828;
    `;
    errorDiv.textContent = message;
    
    chatArea.appendChild(errorDiv);
    scrollToBottom();
    
    // 5초 후 자동 제거
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// 성공 메시지 표시
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        background: #e8f5e8;
        color: #2e7d32;
        padding: 1rem;
        border-radius: 8px;
        margin: 0.5rem 0;
        border-left: 4px solid #4caf50;
    `;
    successDiv.textContent = message;
    
    chatArea.appendChild(successDiv);
    scrollToBottom();
    
    // 3초 후 자동 제거
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// 입력 길이 체크
function checkInputLength() {
    const currentLength = userInput.value.length;
    const maxLength = 500;
    
    if (currentLength > maxLength * 0.9) {
        userInput.style.borderColor = '#ff9800';
    } else {
        userInput.style.borderColor = '';
    }
    
    if (currentLength >= maxLength) {
        showError(`메시지는 최대 ${maxLength}자까지 입력 가능합니다.`);
    }
}

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function() {
    // Enter 키 이벤트
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // 입력 길이 체크
    userInput.addEventListener('input', checkInputLength);
    
    // 포커스 설정
    userInput.focus();
    
    // 초기 환영 메시지에 애니메이션 효과
    setTimeout(() => {
        const welcomeMsg = document.querySelector('.welcome-message');
        if (welcomeMsg) {
            welcomeMsg.style.opacity = '1';
            welcomeMsg.style.transform = 'translateY(0)';
        }
    }, 300);
});

// 페이드아웃 애니메이션 CSS 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);