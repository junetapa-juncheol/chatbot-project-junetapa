// 챗봇 메인 로직

// 전역 변수
let conversationHistory = [];
let isTyping = false;

// 메시지 전송 함수
function sendMessage() {
    const message = userInput.value.trim();
    
    // 빈 메시지 체크
    if (message === '') {
        showError('메시지를 입력해주세요.');
        return;
    }
    
    // 이미 타이핑 중인지 체크
    if (isTyping) {
        showError('답변을 기다려주세요.');
        return;
    }
    
    // 웰컴 메시지 제거 (처음 메시지일 때)
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            welcomeMessage.remove();
        }, 300);
    }
    
    // 사용자 메시지 추가
    addMessage(message, true);
    
    // 대화 히스토리에 추가
    conversationHistory.push({
        role: 'user',
        content: message,
        timestamp: new Date()
    });
    
    // 입력 필드 초기화
    clearInput();
    toggleSendButton(false);
    
    // 봇 응답 처리
    setTimeout(() => {
        handleBotResponse(message);
    }, 500);
}

// 봇 응답 처리 함수
function handleBotResponse(userMessage) {
    isTyping = true;
    
    const response = getBotResponse(userMessage);
    
    // 대화 히스토리에 추가
    conversationHistory.push({
        role: 'bot',
        content: response,
        timestamp: new Date()
    });
    
    // 타이핑 효과와 함께 응답 표시
    showTypingEffect(response, () => {
        isTyping = false;
        toggleSendButton(true);
        userInput.focus();
    });
}

// 봇 응답 생성 함수
function getBotResponse(input) {
    const lowerInput = input.toLowerCase();
    
    // 키워드 매칭
    const matchedCategory = matchKeywords(input);
    
    switch (matchedCategory) {
        case 'greetings':
            return getRandomResponse(chatbotData.greetings);
            
        case 'help':
            return getRandomResponse(chatbotData.help);
            
        case 'features':
            return getRandomResponse(chatbotData.features);
            
        case 'time':
            const timeResponse = getRandomResponse(chatbotData.time);
            return `${timeResponse}<br><br>📅 **${getCurrentTime()}**`;
            
        case 'weather':
            const weatherResponse = getRandomResponse(chatbotData.weather);
            return `${weatherResponse}<br><br>${getWeatherInfo()}`;
            
        case 'calculation':
            return handleCalculation(input);
            
        case 'thanks':
            return getRandomResponse(chatbotData.thanks);
            
        case 'goodbye':
            return getRandomResponse(chatbotData.goodbye);
            
        case 'movie':
            const movieResponse = getRandomResponse(chatbotData.recommendations.movie);
            return `${movieResponse}<br><br>${getMovieRecommendation()}`;
            
        case 'music':
            const musicResponse = getRandomResponse(chatbotData.recommendations.music);
            return `${musicResponse}<br><br>${getMusicRecommendation()}`;
            
        case 'book':
            const bookResponse = getRandomResponse(chatbotData.recommendations.book);
            return `${bookResponse}<br><br>${getBookRecommendation()}`;
            
        case 'food':
            const foodResponse = getRandomResponse(chatbotData.recommendations.food);
            return `${foodResponse}<br><br>${getFoodRecommendation()}`;
            
        case 'happy':
            return getRandomResponse(chatbotData.emotions.happy);
            
        case 'sad':
            return getRandomResponse(chatbotData.emotions.sad);
            
        case 'angry':
            return getRandomResponse(chatbotData.emotions.angry);
            
        case 'tired':
            return getRandomResponse(chatbotData.emotions.tired);
            
        case 'praise':
            return getRandomResponse(chatbotData.praise);
            
        default:
            return handleSpecialCases(input) || getRandomResponse(chatbotData.unknown);
    }
}

// 계산 처리 함수
function handleCalculation(input) {
    // 계산식 추출
    const mathRegex = /[\d+\-*/().\s]+/g;
    const mathExpression = input.match(mathRegex);
    
    if (mathExpression && mathExpression.length > 0) {
        const expression = mathExpression.join('').trim();
        if (expression.length > 0) {
            const result = calculateExpression(expression);
            const calcResponse = getRandomResponse(chatbotData.calculation);
            return `${calcResponse}<br><br>🧮 **${result}**`;
        }
    }
    
    return "계산하고 싶은 수식을 알려주세요! (예: 2 + 3 * 4)";
}

// 특수 케이스 처리 함수
function handleSpecialCases(input) {
    const lowerInput = input.toLowerCase();
    
    // 이름 묻기
    if (lowerInput.includes('이름') || lowerInput.includes('누구')) {
        return "안녕하세요! 저는 AI 챗봇이에요. 여러분의 디지털 친구라고 생각해주세요! 😊";
    }
    
    // 나이 묻기
    if (lowerInput.includes('나이') || lowerInput.includes('몇살')) {
        return "저는 디지털 세계에서 태어났어요! 나이라는 개념보다는 매일 새로운 것을 배우며 성장하고 있답니다! 🤖";
    }
    
    // 취미 묻기
    if (lowerInput.includes('취미') || lowerInput.includes('좋아하는')) {
        return "저는 사람들과 대화하는 것을 정말 좋아해요! 새로운 지식을 배우고 도움을 드리는 것이 제 취미랄까요? 📚✨";
    }
    
    // 사랑/연애 관련
    if (lowerInput.includes('사랑') || lowerInput.includes('연애')) {
        return "사랑은 정말 아름다운 감정이에요! 💕 연애에 대한 조언이 필요하시면 언제든 말씀해주세요. 함께 고민해볼게요!";
    }
    
    // 학습 관련
    if (lowerInput.includes('공부') || lowerInput.includes('학습')) {
        return "공부하시는군요! 📖 어떤 분야를 공부하고 계신가요? 학습 계획이나 방법에 대해 도움을 드릴 수 있어요!";
    }
    
    // 직업 관련
    if (lowerInput.includes('직업') || lowerInput.includes('일')) {
        return "직업에 대해 궁금하시군요! 💼 구체적으로 어떤 직업이나 진로에 대해 알고 싶으신가요?";
    }
    
    // 건강 관련
    if (lowerInput.includes('건강') || lowerInput.includes('운동')) {
        return "건강은 정말 중요해요! 💪 규칙적인 운동과 좋은 식습관이 기본이죠. 구체적인 건강 관련 질문이 있으시면 말씀해주세요!";
    }
    
    // 코딩/프로그래밍 관련
    if (lowerInput.includes('코딩') || lowerInput.includes('프로그래밍') || lowerInput.includes('개발')) {
        return "프로그래밍에 관심이 있으시군요! 💻 어떤 언어나 기술에 대해 궁금하신가요? Python, JavaScript, HTML/CSS 등 다양한 주제로 이야기할 수 있어요!";
    }
    
    // 게임 관련
    if (lowerInput.includes('게임')) {
        return "게임 이야기군요! 🎮 어떤 장르의 게임을 좋아하시나요? 최근에 재미있게 플레이한 게임이 있으시면 추천해주세요!";
    }
    
    // 여행 관련
    if (lowerInput.includes('여행')) {
        return "여행! 정말 좋은 취미네요! ✈️ 어디로 여행 가고 싶으신가요? 여행 계획이나 추천 장소에 대해 이야기해볼까요?";
    }
    
    return null;
}

// 대화 내역 초기화 함수
function clearChat() {
    if (confirm('대화 내역을 모두 삭제하시겠습니까?')) {
        chatArea.innerHTML = `
            <div class="welcome-message">
                <div class="bot-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>안녕하세요! 저는 AI 챗봇입니다. 무엇이든 편하게 물어보세요! 😊</p>
                    <div class="quick-questions">
                        <button class="quick-btn" onclick="sendQuickQuestion('안녕하세요!')">인사하기</button>
                        <button class="quick-btn" onclick="sendQuickQuestion('도움말')">도움말</button>
                        <button class="quick-btn" onclick="sendQuickQuestion('기능 소개')">기능 소개</button>
                    </div>
                </div>
            </div>
        `;
        conversationHistory = [];
        showSuccess('대화 내역이 초기화되었습니다.');
    }
}

// 대화 내역 다운로드 함수
function downloadChat() {
    if (conversationHistory.length === 0) {
        showError('저장할 대화 내역이 없습니다.');
        return;
    }
    
    let chatText = '=== AI 챗봇 대화 내역 ===\n\n';
    
    conversationHistory.forEach((msg, index) => {
        const timestamp = msg.timestamp.toLocaleString('ko-KR');
        const speaker = msg.role === 'user' ? '사용자' : 'AI 챗봇';
        chatText += `[${timestamp}] ${speaker}: ${msg.content}\n\n`;
    });
    
    const blob = new Blob([chatText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `챗봇_대화내역_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showSuccess('대화 내역이 다운로드되었습니다.');
}

// 대화 통계 함수
function getChatStats() {
    if (conversationHistory.length === 0) {
        return "아직 대화 내역이 없습니다.";
    }
    
    const userMessages = conversationHistory.filter(msg => msg.role === 'user').length;
    const botMessages = conversationHistory.filter(msg => msg.role === 'bot').length;
    const totalMessages = conversationHistory.length;
    const firstMessage = conversationHistory[0].timestamp;
    const duration = new Date() - firstMessage;
    const minutes = Math.floor(duration / 60000);
    
    return `📊 **대화 통계**
    
🔸 전체 메시지: ${totalMessages}개
🔸 사용자 메시지: ${userMessages}개  
🔸 봇 메시지: ${botMessages}개
🔸 대화 시간: ${minutes}분
🔸 대화 시작: ${firstMessage.toLocaleString('ko-KR')}`;
}

// 키보드 단축키 처리
document.addEventListener('keydown', function(e) {
    // Ctrl + Enter: 메시지 전송
    if (e.ctrlKey && e.key === 'Enter') {
        sendMessage();
    }
    
    // Ctrl + L: 채팅 초기화
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        clearChat();
    }
    
    // Ctrl + S: 대화 내역 저장
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        downloadChat();
    }
});

// 초기화 함수
function initializeChatbot() {
    console.log('🤖 챗봇이 초기화되었습니다!');
    
    // 환영 메시지 애니메이션
    setTimeout(() => {
        const welcomeMsg = document.querySelector('.welcome-message');
        if (welcomeMsg) {
            welcomeMsg.style.opacity = '1';
            welcomeMsg.style.transform = 'translateY(0)';
        }
    }, 500);
    
    // 입력 필드에 포커스
    userInput.focus();
    
    // 버튼 활성화
    toggleSendButton(true);
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', initializeChatbot);

// 페이지 언로드 시 확인
window.addEventListener('beforeunload', function(e) {
    if (conversationHistory.length > 0) {
        e.preventDefault();
        e.returnValue = '대화 내역이 사라집니다. 정말 나가시겠습니까?';
    }
});

// 에러 처리
window.addEventListener('error', function(e) {
    console.error('챗봇 에러:', e.error);
    showError('죄송합니다. 오류가 발생했습니다. 페이지를 새로고침해주세요.');
});

// 디버그 모드 (개발용)
if (window.location.search.includes('debug=true')) {
    window.chatbotDebug = {
        getHistory: () => conversationHistory,
        clearHistory: () => conversationHistory = [],
        getStats: getChatStats,
        simulateError: () => { throw new Error('Test error'); }
    };
    console.log('🔧 디버그 모드가 활성화되었습니다. window.chatbotDebug 객체를 사용하세요.');
}