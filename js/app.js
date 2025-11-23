// ========================================
// WAIT FOR DOM TO BE FULLY LOADED
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 릴스 대본 자판기 2.0 (Smart Edition) 시작!');

    // ========================================
    // STATE MANAGEMENT
    // ========================================

    let currentCategory = 'common';
    let currentTone = 'basic';
    let currentTab = 'viral';
    let currentFormData = {};
    let currentScripts = {};

    // ========================================
    // DOM ELEMENTS
    // ========================================

    const categoryBtns = document.querySelectorAll('.category-btn');
    const toneBtns = document.querySelectorAll('.tone-btn');
    const scriptForm = document.getElementById('scriptForm');
    const loadingModal = document.getElementById('loadingModal');
    const loadingText = document.getElementById('loadingText');

    // Phone Mockup Elements
    const phoneCaption = document.getElementById('phoneCaption');
    const captionText = document.getElementById('captionText');
    const captionHashtags = document.getElementById('captionHashtags');
    const saveToHistoryBtn = document.getElementById('saveToHistoryBtn');

    const tabBtns = document.querySelectorAll('.tab-btn');
    const copyBtn = document.getElementById('copyBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');

    // Mobile buttons
    const copyBtnMobile = document.getElementById('copyBtnMobile');
    const shuffleBtnMobile = document.getElementById('shuffleBtnMobile');

    // History Modal
    const historyBtn = document.getElementById('historyBtn');
    const historyModal = document.getElementById('historyModal');
    const closeHistoryBtn = document.getElementById('closeHistoryBtn');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const historyList = document.getElementById('historyList');

    // ========================================
    // UI HELPERS
    // ========================================

    function setActiveCategory(selectedBtn) {
        categoryBtns.forEach(btn => {
            btn.classList.remove('border-brand-500', 'bg-brand-500/10');
            btn.classList.add('border-white/10', 'bg-dark-900');
            const activeBorder = btn.querySelector('.category-active-border');
            if(activeBorder) {
                activeBorder.classList.remove('opacity-100', 'scale-100');
                activeBorder.classList.add('opacity-0', 'scale-95');
            }
            const label = btn.querySelector('span:nth-child(2)');
            if(label) label.classList.remove('text-brand-500');
        });

        selectedBtn.classList.remove('border-white/10', 'bg-dark-900');
        selectedBtn.classList.add('border-brand-500', 'bg-brand-500/10');
        const activeBorder = selectedBtn.querySelector('.category-active-border');
        if(activeBorder) {
            activeBorder.classList.remove('opacity-0', 'scale-100');
            activeBorder.classList.add('opacity-100', 'scale-100');
        }
        const label = selectedBtn.querySelector('span:nth-child(2)');
        if(label) label.classList.add('text-brand-500');
    }

    function setActiveTone(selectedBtn) {
        toneBtns.forEach(btn => {
            btn.classList.remove('border-brand-500', 'bg-brand-500/20', 'text-white');
            btn.classList.add('border-white/10', 'bg-dark-900', 'text-gray-400');
        });
        selectedBtn.classList.remove('border-white/10', 'bg-dark-900', 'text-gray-400');
        selectedBtn.classList.add('border-brand-500', 'bg-brand-500/20', 'text-white');
    }

    function setActiveTab(selectedBtn) {
        tabBtns.forEach(btn => {
            btn.setAttribute('data-active', 'false');
            btn.classList.remove('bg-brand-500', 'text-white', 'shadow-lg');
            btn.classList.add('text-gray-400');
        });
        selectedBtn.setAttribute('data-active', 'true');
        selectedBtn.classList.remove('text-gray-400');
        selectedBtn.classList.add('bg-brand-500', 'text-white', 'shadow-lg');
    }

    // ========================================
    // INITIALIZATION
    // ========================================

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveCategory(btn);
            currentCategory = btn.dataset.category;
        });
    });

    if (categoryBtns.length > 0) {
        categoryBtns[0].click();
    }

    toneBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveTone(btn);
            currentTone = btn.dataset.tone;
        });
    });

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveTab(btn);
            currentTab = btn.dataset.tab;
            if (currentScripts[currentTab]) {
                displayScript(currentTab);
            }
        });
    });

    if (tabBtns.length > 0) {
        setActiveTab(tabBtns[0]);
    }


    // ========================================
    // FORM SUBMISSION & LOGIC
    // ========================================

    scriptForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        currentFormData = {
            product: document.getElementById('product').value.trim(),
            target: document.getElementById('target').value.trim(),
            pain: document.getElementById('pain').value.trim(),
            solution: document.getElementById('solution').value.trim()
        };

        if (!currentFormData.product || !currentFormData.target ||
            !currentFormData.pain || !currentFormData.solution) {
            alert('모든 필드를 입력해주세요! 🥺');
            return;
        }

        showLoadingAnimation();
        // Artificial delay for UX
        await new Promise(resolve => setTimeout(resolve, 1500));

        generateAllScripts();

        loadingModal.classList.add('hidden');
        loadingModal.classList.remove('flex');

        displayScript(currentTab);

        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    });


    // ========================================
    // CORE LOGIC (Smart Context Engine)
    // ========================================

    function showLoadingAnimation() {
        loadingModal.classList.remove('hidden');
        loadingModal.classList.add('flex');

        const messages = [
            '업종별 트렌드 분석 중...',
            '키워드 추출 및 매칭 중...',
            '문맥 최적화 실행 중...',
            '거의 다 됐어요! ✨'
        ];
        let idx = 0;
        loadingText.textContent = messages[0];

        const interval = setInterval(() => {
            idx++;
            if (idx < messages.length) {
                loadingText.textContent = messages[idx];
            } else {
                clearInterval(interval);
            }
        }, 400);
    }

    // Improved Josa Processing
    function hasJongseong(word) {
        if (!word || word.length === 0) return false;
        const lastChar = word.charAt(word.length - 1);
        const code = lastChar.charCodeAt(0);

        // Hangul
        if (code >= 0xAC00 && code <= 0xD7A3) {
            return (code - 0xAC00) % 28 !== 0;
        }
        // Number
        if (/[0-9]/.test(lastChar)) {
             // 0, 1, 3, 6, 7, 8 have jongseong in Korean pronunciation (yong, il, sam, yuk, chil, pal)
             // 2, 4, 5, 9 (i, sa, o, gu) do not
             return /[013678]/.test(lastChar);
        }
        // English (Approximate: consonants end with jongseong mostly, vowels don't)
        // This is tricky, simple heuristic:
        // Ends in l, m, n, r, ng, k, p, t, b, d, g, c, x, z usually have consonant sound
        if (/[a-zA-Z]/.test(lastChar)) {
             return /[lmnrkgptbdcxzLMNRKGPTBDCXZ]$/.test(lastChar);
        }

        return false;
    }

    function getJosa(word, josaType) {
        if (!word) return '';
        const hasFinalConsonant = hasJongseong(word);

        switch(josaType) {
            case '이/가': return hasFinalConsonant ? '이' : '가';
            case '을/를': return hasFinalConsonant ? '을' : '를';
            case '은/는': return hasFinalConsonant ? '은' : '는';
            case '과/와': return hasFinalConsonant ? '과' : '와';
            case '아/야': return hasFinalConsonant ? '아' : '야';
            case '이어/여': return hasFinalConsonant ? '이어' : '여';
            case '으로/로': {
                const lastChar = word.charAt(word.length - 1);
                const code = lastChar.charCodeAt(0);
                // Check if last char is 'ㄹ' (Hangul jongseong index 8)
                const isRieul = (code >= 0xAC00 && code <= 0xD7A3) && ((code - 0xAC00) % 28 === 8);

                // If no final consonant OR the final consonant is 'ㄹ', use '로'
                // Otherwise (other consonants), use '으로'
                return (!hasFinalConsonant || isRieul) ? '로' : '으로';
            }
            default: return '';
        }
    }

    // 1. Improved Metric Extraction
    // Returns object: { original: string, value: string, unit: string } or null
    function extractMetrics(text) {
        // Matches: number + optional space + unit
        // Units expanded: kg, cm, mm, kcal, etc.
        const regex = /(\d+(?:\.\d+)?)\s*(일|주|달|개월|년|시간|분|초|만원|원|%|배|개|kg|cm|mm|kcal|명|가지|step|Step|STEP|km|m)?/;
        const match = text.match(regex);
        if (match) {
            return {
                full: match[0],
                value: match[1],
                unit: match[2] || ''
            };
        }
        return null;
    }

    function getPowerAdj() {
        if (typeof POWER_KEYWORDS === 'undefined') return '엄청난';
        const keywords = POWER_KEYWORDS[currentCategory] || POWER_KEYWORDS['common'];
        return keywords[Math.floor(Math.random() * keywords.length)];
    }

    function smartReplace(text, formData, extractedMetric) {

        // 1. Replace Placeholders
        // Handle {metric} specifically
        if (text.includes('{metric}')) {
            if (extractedMetric) {
                 text = text.replace(/{metric}/g, extractedMetric.full);
            } else {
                 // Fallback if template has metric but no metric found (shouldn't happen with correct selection)
                 text = text.replace(/{metric}/g, '단기간');
            }
        }

        text = text.replace(/{power_adj}/g, getPowerAdj());

        // 2. Josa Processing with Variable Injection
        text = text.replace(/\{(product|target|pain|solution)\}\{([^}]+)\}/g, (match, variable, josa) => {
            const value = formData[variable];
            const selectedJosa = getJosa(value, josa);
            return value + selectedJosa;
        });

        // 3. Simple Variable Replacement (if no Josa specified)
        text = text.replace(/{product}/g, formData.product);
        text = text.replace(/{target}/g, formData.target);
        text = text.replace(/{pain}/g, formData.pain);
        text = text.replace(/{solution}/g, formData.solution);

        return text;
    }

    function getTemplate(frameworkType, hasMetric) {
        // 1. Base Common Templates (Use Spread to avoid mutation)
        const commonTemplates = TEMPLATES['common'][frameworkType];

        // Create local copies to avoid polluting the global object
        let genericPool = [...(commonTemplates.generic || [])];
        let metricPool = [...(commonTemplates.has_metric || [])];
        let bodiesPool = [...(commonTemplates.bodies || [])];
        let closingsPool = [...(commonTemplates.closings || [])];

        // 2. Category Specific Overrides/Additions
        if (CATEGORY_TEMPLATES[currentCategory] && CATEGORY_TEMPLATES[currentCategory][frameworkType]) {
            const catSpecific = CATEGORY_TEMPLATES[currentCategory][frameworkType];

            // Merge lists if they exist
            if (catSpecific.generic) genericPool = [...genericPool, ...catSpecific.generic];
            if (catSpecific.has_metric) metricPool = [...metricPool, ...catSpecific.has_metric];
            if (catSpecific.bodies) bodiesPool = [...bodiesPool, ...catSpecific.bodies];
            // Closings can be merged or overridden if needed
        }

        // 3. Select Hook based on metric availability
        const pool = hasMetric ? metricPool : genericPool;
        // Safety: if hasMetric is true but pool is empty, fall back to generic
        const validPool = (pool && pool.length > 0) ? pool : genericPool;

        const hook = validPool[Math.floor(Math.random() * validPool.length)];
        const body = bodiesPool[Math.floor(Math.random() * bodiesPool.length)];
        const closing = closingsPool[Math.floor(Math.random() * closingsPool.length)];

        return { hook, body, closing };
    }

    function generateAllScripts() {
        if (typeof TEMPLATES === 'undefined') return;

        // Analyze input for metrics once
        // We check solution or pain for numbers
        const metricInSolution = extractMetrics(currentFormData.solution);
        const metricInPain = extractMetrics(currentFormData.pain);
        const bestMetric = metricInSolution || metricInPain; // Prefer solution metric

        currentScripts['viral'] = generateScript('viral', bestMetric);
        currentScripts['logic'] = generateScript('pas', bestMetric);
        currentScripts['sales'] = generateScript('quest', bestMetric);
    }

    function generateScript(type, metricObj) {
        const template = getTemplate(type, !!metricObj);

        let script = template.hook + template.body + template.closing;
        script = smartReplace(script, currentFormData, metricObj);

        return applyTone(script, currentTone);
    }

    function applyTone(text, tone) {
        if (tone === 'basic') return text;

        const emojis = {
            humor: ['🤣', 'ㅋㅋㅋ', '🤭', '🔥', '🤪', '👀', '🤷‍♀️'],
            emotional: ['✨', '🥺', '💖', '🌿', '...'],
            impact: ['‼️', '🚨', '⚡️', '👊', '✅', '⚠️']
        };

        let modifiedText = text;
        const categoryEmojis = emojis[tone];

        if (categoryEmojis) {
             // Append to end
            modifiedText += " " + categoryEmojis[Math.floor(Math.random() * categoryEmojis.length)];
            // Randomly insert in paragraph breaks
            modifiedText = modifiedText.replace(/\n\n/g, () => {
                 return (Math.random() > 0.7) ? ` ${categoryEmojis[Math.floor(Math.random() * categoryEmojis.length)]}\n\n` : '\n\n';
            });
        }

        return modifiedText;
    }

    function displayScript(type) {
        captionText.innerHTML = currentScripts[type].replace(/\n/g, '<br>');

        if (typeof HASHTAGS !== 'undefined') {
             const tags = HASHTAGS[currentCategory] ? HASHTAGS[currentCategory].join(' ') : HASHTAGS['common'].join(' ');
             captionHashtags.textContent = tags;
        }

        const phoneScreen = document.getElementById('captionText');
        phoneScreen.classList.remove('fade-in');
        void phoneScreen.offsetWidth;
        phoneScreen.classList.add('fade-in');
    }


    // ========================================
    // BUTTON ACTIONS
    // ========================================

    async function handleCopy() {
        if (!currentScripts[currentTab]) return;

        const textToCopy = currentScripts[currentTab] + '\n\n' + captionHashtags.textContent;

        try {
            await navigator.clipboard.writeText(textToCopy);

            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.classList.add('bg-green-500', 'text-white');
            copyBtn.classList.remove('bg-white', 'text-brand-600');

            if(copyBtnMobile) {
                const origMobile = copyBtnMobile.innerHTML;
                copyBtnMobile.innerHTML = '<i class="fas fa-check"></i> 복사완료';
                setTimeout(() => copyBtnMobile.innerHTML = origMobile, 2000);
            }

            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
                copyBtn.classList.remove('bg-green-500', 'text-white');
                copyBtn.classList.add('bg-white', 'text-brand-600');
            }, 2000);

        } catch (err) {
            console.error('Copy failed', err);
        }
    }

    copyBtn.addEventListener('click', handleCopy);
    if(copyBtnMobile) copyBtnMobile.addEventListener('click', handleCopy);

    function handleShuffle() {
        if (!currentScripts[currentTab]) return;

        // Regenerate single script
        const metricInSolution = extractMetrics(currentFormData.solution);
        const metricInPain = extractMetrics(currentFormData.pain);
        const bestMetric = metricInSolution || metricInPain;

        let frameworkType = 'viral';
        if (currentTab === 'logic') frameworkType = 'pas';
        if (currentTab === 'sales') frameworkType = 'quest';

        currentScripts[currentTab] = generateScript(frameworkType, bestMetric);
        displayScript(currentTab);
    }

    shuffleBtn.addEventListener('click', handleShuffle);
    if(shuffleBtnMobile) shuffleBtnMobile.addEventListener('click', handleShuffle);


    // ========================================
    // HISTORY FEATURE
    // ========================================

    function getHistory() {
        const history = localStorage.getItem('reels_history');
        return history ? JSON.parse(history) : [];
    }

    function saveHistory(scriptData) {
        const history = getHistory();
        const newItem = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            ...scriptData
        };
        history.unshift(newItem);
        if (history.length > 50) history.pop();
        localStorage.setItem('reels_history', JSON.stringify(history));
        renderHistoryList();

        const icon = saveToHistoryBtn.querySelector('i');
        icon.classList.remove('far');
        icon.classList.add('fas', 'text-brand-500');
        setTimeout(() => {
            icon.classList.remove('fas', 'text-brand-500');
            icon.classList.add('far');
        }, 1000);
    }

    function renderHistoryList() {
        const history = getHistory();
        historyList.innerHTML = '';

        if (history.length === 0) {
            historyList.innerHTML = '<div class="text-center text-gray-500 py-8">보관된 대본이 없습니다.</div>';
            return;
        }

        history.forEach(item => {
            const el = document.createElement('div');
            el.className = 'bg-dark-900 p-4 rounded-xl border border-white/10 flex justify-between items-start gap-4';
            el.innerHTML = `
                <div class="flex-1">
                    <div class="flex gap-2 mb-2">
                         <span class="text-xs px-2 py-0.5 rounded bg-brand-500/20 text-brand-500">${item.category}</span>
                         <span class="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-400">${item.type}</span>
                         <span class="text-xs text-gray-500 ml-auto">${item.date}</span>
                    </div>
                    <p class="text-gray-300 text-sm line-clamp-2 cursor-pointer hover:text-white transition-colors" onclick="navigator.clipboard.writeText(this.getAttribute('data-full-text')); alert('복사되었습니다!')" data-full-text="${item.content.replace(/"/g, '&quot;')}">
                        ${item.content}
                    </p>
                </div>
                <button class="text-gray-500 hover:text-red-400 transition-colors" onclick="deleteHistoryItem(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            historyList.appendChild(el);
        });
    }

    window.deleteHistoryItem = function(id) {
        let history = getHistory();
        history = history.filter(item => item.id !== id);
        localStorage.setItem('reels_history', JSON.stringify(history));
        renderHistoryList();
    };

    clearHistoryBtn.addEventListener('click', () => {
        if(confirm('정말 모든 기록을 삭제하시겠습니까?')) {
            localStorage.removeItem('reels_history');
            renderHistoryList();
        }
    });

    historyBtn.addEventListener('click', () => {
        renderHistoryList();
        historyModal.classList.remove('hidden');
        historyModal.classList.add('flex');
    });

    closeHistoryBtn.addEventListener('click', () => {
        historyModal.classList.add('hidden');
        historyModal.classList.remove('flex');
    });

    historyModal.addEventListener('click', (e) => {
        if (e.target === historyModal) {
            historyModal.classList.add('hidden');
            historyModal.classList.remove('flex');
        }
    });

    saveToHistoryBtn.addEventListener('click', () => {
        if (!currentScripts[currentTab]) {
            alert('먼저 대본을 생성해주세요!');
            return;
        }

        saveHistory({
            category: currentCategory,
            type: currentTab,
            content: currentScripts[currentTab]
        });
    });

});
