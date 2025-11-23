// ========================================
// TEMPLATE DATABASE (Smart Slot Machine)
// ========================================

const POWER_KEYWORDS = {
    common: ['초간단', '3초 컷', '무조건', '실패 없는', '진짜', '역대급', '필수', '비밀', '꿀팁', 'TOP3', '대박', '레전드'],
    beauty: ['촉촉한', '광나는', '쫀쫀한', '여신', '인생템', '피부과', '성형급', '동안', '매끈한', '투명한', '물광'],
    food: ['존맛', '웨이팅', '숨은', '현지인', '가성비', '푸짐한', '입에서 녹는', '마약', '단골', '인생', '겉바속촉'],
    education: ['1등급', '단기간', '합격', '비법', '노하우', '공식', '암기법', '서울대', '독학', '마스터', '족집게'],
    professional: ['수익', '자동화', '세금', '절세', '폭등', '급등', '무료', '상담', '법적', '리스크', '노후']
};

const TEMPLATES = {
    common: {
        viral: {
            has_metric: [
                "이거 알고 나서 삶의 질 {metric}배 올라감 🚀",
                "속는 셈 치고 딱 {metric}만 해봐 ⏳",
                "{metric} 투자해서 {power_adj} 효과 보는 법 💸",
                "단 {metric}만에 {pain} 탈출! ✨"
            ],
            generic: [
                "{pain}{으/는} 사람 손 🙋‍♀️",
                "나만 {pain} 심한 거 아니지? 😂",
                "이거 모르고 쓰는 사람 많던데 🤫",
                "{pain} 때문에 스트레스받는 중 🤯",
                "{target}이라면 다 아는 그 고민 🤔",
                "아무도 안 알려주는 {power_adj} 방법 🔥",
                "{pain}{이/가} 진짜 짜증날 때 😡",
                "절대 실패 없는 {product} 활용법 💯"
            ],
            bodies: [
                "\n\n{product} 써보니\n{solution} 효과 대박임 👍\n\n{pain} 이제 안녕 👋\n\n",
                "\n\n{product}{으/로} 바꿨더니\n{solution} 바로 느껴짐 ✨\n\n이제 {pain} 걱정 끝 🙅‍♀️\n\n",
                "\n\n{target}한테 물어봤더니\n다들 {product} 쓴대 🗣️\n\n나도 써봤는데\n{solution} 진짜네..\n\n",
                "\n\n{pain} 때문에 힘들었는데\n{product} 덕분에\n{solution} 경험함 🎁\n\n",
                "\n\n우연히 알게 된 {product}\n써보니까\n{solution} 확실함 ✅\n\n"
            ],
            closings: [
                "링크에 내가 쓴 거 공유함 👇",
                "댓글로 후기 공유해줘! 💬",
                "저장해두고 나중에 써봐 💾",
                "효과 있으면 댓글 남겨줘 🙌",
                "제품명 프로필에 있음 🔗"
            ]
        },
        pas: {
            has_metric: [
                "아직도 {metric} 넘게 {pain} 하시나요? 😢",
                "{metric} 안에 {pain} 해결하는 법 ⏱️"
            ],
            generic: [
                "아직도 {pain} 때문에 고생하시나요? 😢",
                "{pain}, 언제까지 참으실 건가요? 🛑",
                "{target} 여러분, {pain} 그냥 두면 큰일납니다 🚨",
                "매번 {pain} 반복되는 이유, 생각해보셨나요? 🤔",
                "혹시 지금도 {pain} 겪고 계신가요? 👋"
            ],
            bodies: [
                "\n\n저도 처음엔 대수롭지 않게 생각했어요.\n하지만 시간이 지날수록\n더 심해지더라고요. 😰\n\n진짜 스트레스 받아서\n별의별 방법 다 써봤는데...\n\n결국 답은 {product}였어요.\n\n{solution}\n진작 알았으면 좋았을 텐데! ✨\n\n",
                "\n\n남들은 다 해결했다는데\n나만 그대로인 것 같아 답답하셨죠? 😤\n\n그거 방치하면 나중에\n더 힘들어집니다.\n\n지금이라도 {product}{으/로} 시작하세요.\n\n{solution}\n확실히 달라집니다. 💪\n\n",
                "\n\n매일 아침 거울 볼 때마다\n한숨만 나오시나요? 💨\n\n그 마음 저도 알아요.\n저도 꽤 오래 고생했거든요.\n\n그런데 {product} 만나고\n인생이 바뀌었습니다.\n\n{solution}\n여러분도 할 수 있어요! 🙌\n\n"
            ],
            closings: [
                "더 늦기 전에 시작해보세요! 👉",
                "자세한 방법은 캡션 확인 👇",
                "궁금한 점은 DM 주세요 💌",
                "도움이 되셨다면 좋아요 ❤️",
                "필요한 친구 태그하기 @ 👥"
            ]
        },
        quest: {
            has_metric: [
                "단 {metric} 투자로 {pain} 해결? 😲",
                "{metric}만에 {target} 필수템 등극 🏆"
            ],
            generic: [
                "{target} 주목! {pain} 해결하고 싶은 분만 보세요 👀",
                "혹시 {pain} 겪고 있는 {target}이신가요? 👋",
                "{pain} 없이 {solution} 하고 싶은 분? 🙋‍♂️",
                "{target} 필독! {power_adj} 정보 가져왔음 📚"
            ],
            bodies: [
                "\n\n그동안 많이 힘드셨죠? 😢\n노력해도 안 바뀌는 그 느낌,\n누구보다 잘 압니다.\n\n하지만 방법만 살짝 바꾸면\n결과는 완전히 달라져요. 🔄\n\n바로 {product}{을/를} 활용하는 건데요.\n\n이게 왜 좋냐면,\n{solution} 때문이에요! ✨\n\n상상해보세요.\n{pain} 없이 편안해진 모습을! 😌\n\n",
                "\n\n매번 실패해서 지치셨나요?\n포기하기엔 아직 이릅니다. 💪\n\n{product} 하나만 기억하세요.\n\n복잡한 과정 없이\n{solution} 가능합니다.\n\n이미 많은 분들이 경험한\n{power_adj} 효과! 🔥\n\n지금 바로 경험해보세요.\n망설이면 늦습니다. ⏳\n\n"
            ],
            closings: [
                "지금 프로필 링크 클릭! 👆",
                "더 자세한 내용은 본문에 📝",
                "무료 상담 신청하기 📞",
                "한정 혜택 놓치지 마세요 🎁",
                "저장하고 따라해보기 💾"
            ]
        }
    },
    // Other categories can extend common structure later or inherit
    // For simplicity, we merge specific category content into the logic
};

// Make specific categories inherit/override
const CATEGORY_TEMPLATES = {
    beauty: {
        viral: {
            generic: [
                "{pain} 싹 사라짐... 이거 실화? 🫢",
                "피부과 원장님이 싫어하는 {power_adj} 관리법 🤫",
                "나만 알고 싶은 {product} 공개함 💖",
                "화장품 다이어트? 이거 하나면 끝 🧴",
                "{target} 필수템! 품절 전에 사야 함 🛒"
            ],
            has_metric: [
                 "단 {metric}만에 피부 뒤집어짐 (좋은 뜻) ✨"
            ]
        }
    },
    food: {
        viral: {
            generic: [
                "여기 진짜 미쳤음... 🫢 {pain} 절대 없음",
                "사장님 남는 거 있어요? {power_adj} 가성비 💸",
                "{target}들 사이에서 소문난 그곳 🤫",
                "한 입 먹자마자 기절 😵 {product} 맛집"
            ],
            has_metric: [
                "웨이팅 {metric} 기다려도 안 아까운 맛집 🕰️"
            ]
        }
    },
    education: {
        viral: {
            generic: [
                "이거 모르면 손해! {power_adj} 꿀팁 🍯",
                "학원 안 가도 됨 🙅‍♂️ {product} 독학 후기",
                "{target} 필수 시청! {pain} 해결법 📺",
                "서울대생도 쓴다는 {product} 공부법 🎓"
            ],
            has_metric: [
                "{metric}만에 성적 올리는 법 📈"
            ]
        }
    },
    professional: {
        viral: {
            generic: [
                "이거 모르면 세금 폭탄 맞음 💣",
                "변호사가 알려주는 {power_adj} 대처법 ⚖️",
                "{target} 주목! {pain} 피하는 꿀팁 🍯",
                "부자들은 이미 다 알고 있는 {product} 🤑"
            ],
            has_metric: [
                "내 돈 {metric} 지키는 법 💰"
            ]
        }
    }
};

const HASHTAGS = {
    common: ['#릴스', '#꿀팁', '#추천', '#공유', '#일상'],
    beauty: ['#뷰티', '#스킨케어', '#메이크업', '#코덕', '#피부관리', '#뷰티스타그램'],
    food: ['#맛집', '#먹스타그램', '#맛스타그램', '#카페투어', '#핫플', '#존맛'],
    education: ['#공부', '#공스타그램', '#수험생', '#자기계발', '#동기부여', '#팁'],
    professional: ['#비즈니스', '#재테크', '#성공', '#마케팅', '#경제', '#부자']
};
