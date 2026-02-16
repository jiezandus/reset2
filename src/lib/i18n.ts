// Language type definition
export type Language = 'en' | 'zh';
export type MessageCategory = 'apology' | 'missyou' | 'love' | 'thankyou';

// All translation strings
export const translations = {
  en: {
    // Index page - Header
    breakTheIce: "Thinking of You",
    createApologyGame: "Send a heartfelt message",
    
    // Category labels
    categoryApology: "Sorry",
    categoryMissyou: "Miss U",
    categoryLove: "Love",
    categoryThankyou: "Thanks",

    // Category-specific form labels & placeholders
    labelApology: "I'd like to say...",
    labelMissyou: "I want you to know...",
    labelLove: "I love you because...",
    labelThankyou: "Thank you for...",
    placeholderApology: "Type your personal message...",
    placeholderMissyou: "Type your personal message...",
    placeholderLove: "Type your personal message...",
    placeholderThankyou: "Type your personal message...",

    // Category-specific reveal text
    revealApology: "I am sorry for {reason}",
    revealMissyou: "I miss you. {reason}",
    revealLove: "I love you. {reason}",
    revealThankyou: "Thank you for {reason}",

    // Category-specific reply options
    replyApologyOk: "I'm actually ok. Don't worry.",
    replyApologyTalk: "Apology accepted. Let's talk.",
    replyApologyTime: "Give me more time. I'll reach out.",
    replyMissyouToo: "I miss you too!",
    replyMissyouMeet: "Let's meet up soon!",
    replyMissyouSpace: "I need some space right now.",
    replyLoveToo: "I love you too! ❤️",
    replyLoveSmile: "You just made me smile so big.",
    replyLoveShy: "Stoppp you're making me blush!",
    replyThankyouWelcome: "You're welcome! Always.",
    replyThankyouTeam: "We're in this together!",
    replyThankyouMeanIt: "That really means a lot to me.",

    // Index page - Form labels
    yourName: "Your Name",
    enterYourName: "Enter your name...",
    theirName: "Their Name",
    whoApologizing: "Who is this for?",
    sorryFor: "I am sorry for....",
    sorryPlaceholder: "being late/eating your food/ghosting you...etc",
    generateInvite: "Generate Invite ►",
    
    // Index page - Ready screen
    ready: "Ready!",
    sendTo: "Send to {name} via your messaging app",
    shareMessageIntro: "Hey {name}! 👀✨",
    shareMessageBody: "Someone has something to say to you...",
    copy: "Copy",
    ok: "OK!",
    back: "← Back",
    
    // Index page - Success screen
    youDidIt: "You Did It!",
    firstStepComplete: "First step: complete ✓",
    rootingForYou: "Taking the first step is always the hardest. We're rooting for you and {name}!",
    waitForResponse: "Now let's wait for their response...",
    goodLuck: "Good luck! 🍀",
    createAnother: "Create Another",
    
    // Share message (clipboard)
    shareText: "Hey {name}! 👀✨ Someone has something to say to you... Open this to find out! {link}",
    
    // Play page - Invalid link
    invalidLink: "Invalid Link",
    invalidLinkMessage: "This game link seems to be broken.",
    createNewGame: "Create New Game",
    
    // PongGame - Pre-game screen
    hey: "HEY {name}!",
    surpriseChallenge: "{name} has prepared a surprise challenge for you.",
    acceptToBeat: "Accept to beat them!",
    pressToStart: "▶ PRESS A TO START",
    
    // Apology bubbles
    bubbleApology1: "I'M SORRY OK",
    bubbleApology2: "I DESERVED THAT",
    bubbleApology3: "FORGIVE ME PLS",
    bubbleApology4: "MY BAD FR",
    bubbleApology5: "I MESSED UP",
    bubbleApology6: "SO SORRY!!",
    bubbleApology7: "I FEEL AWFUL",
    bubbleApology8: "DON'T HATE ME",
    bubbleApology9: "I OWE U BIG",

    // Miss You bubbles
    bubbleMissyou1: "MISS U SM",
    bubbleMissyou2: "COME BACK",
    bubbleMissyou3: "ITS LONELY",
    bubbleMissyou4: "THINK OF U DAILY",
    bubbleMissyou5: "WISH U WERE HERE",
    bubbleMissyou6: "NEED U",
    bubbleMissyou7: "MISS UR FACE",
    bubbleMissyou8: "COUNTING DAYS",
    bubbleMissyou9: "WHERE R U",

    // Love bubbles
    bubbleLove1: "LUV U",
    bubbleLove2: "UR MY WORLD",
    bubbleLove3: "HEART GOES BOOM",
    bubbleLove4: "CANT STOP SMILING",
    bubbleLove5: "UR SO CUTE",
    bubbleLove6: "STAY FOREVER",
    bubbleLove7: "U COMPLETE ME",
    bubbleLove8: "OBSESSED W U",
    bubbleLove9: "BUTTERFLIES",

    // Thank You bubbles
    bubbleThankyou1: "THANK U SM",
    bubbleThankyou2: "UR THE BEST",
    bubbleThankyou3: "I APPRECIATE U",
    bubbleThankyou4: "MEANS A LOT",
    bubbleThankyou5: "UR AMAZING",
    bubbleThankyou6: "SO GRATEFUL",
    bubbleThankyou7: "CANT THANK ENOUGH",
    bubbleThankyou8: "UR A LEGEND",
    bubbleThankyou9: "BLESSED",

    // Legacy bubble keys (kept for backward compat)
    bubbleOops: "I'M SORRY OK",
    bubbleNiceOne: "I DESERVED THAT",
    bubbleUrGood: "FORGIVE ME PLS",
    bubbleMyBad: "MY BAD FR",
    bubbleHelpMe: "I MESSED UP",
    bubbleSorry: "SO SORRY!!",
    bubbleYikes: "I FEEL AWFUL",
    bubbleTooFast: "DON'T HATE ME",
    bubbleOuch: "I OWE U BIG",
    
    // GameEndScreen - Sender won
    oops: "Oops!",
    senderWonMessage: "{name} won somehow...",
    tryAgain: "Try Again ►",
    
    // GameEndScreen - Apology phase
    youWon: "You Won!",
    hereIsWhatTheySaid: "Here's what {name} wanted to say:",
    iAmSorryFor: "I am sorry for {reason}",
    wouldYouLikeToReply: "Would you like to send a reply?",
    pressBToContinue: "Press Ⓑ to continue",
    
    // GameEndScreen - Reply phase
    yourReply: "Your Reply",
    howToRespond: "How do you want to respond?",
    replyOk: "I'm actually ok. Don't worry.",
    replyTalk: "Apology accepted. Let's talk.",
    replyTime: "Give me more time. I'll reach out.",
    copyAndSend: "Copy & Send",
    
    // GameEndScreen - Success phase
    messageSent: "Message Sent!",
    responseCopied: "Your response has been copied. Now paste it in your chat with {name}!",
    youSaid: "You said:",
    relationshipsPrecious: "Relationships are precious gifts.",
    cherishThem: "Cherish them always. Best wishes! ✨",
    
    // Lucky Wheel
    spinTheWheel: "SPIN THE WHEEL",
    wheelSubtitle: "Let's see how {name} makes it up!",
    spinning: "Spinning...",
    youGot: "You got:",
    couponFrom: "{name} owes you:",
    redeemCoupon: "Redeem this coupon!",
    wheelPrize1: "Make you a nice dinner",
    wheelPrize2: "Go to a game arcade",
    wheelPrize3: "Buy the keyboard you wanted",
    wheelPrize4: "Movie night, your pick",
    wheelPrize5: "Boba tea for a week",
    wheelPrize6: "A heartfelt letter",
    couponAppend: "P.S. Don't forget you owe me: {prize}",

    // Prize customization page
    customizePrizes: "CUSTOMIZE PRIZES",
    customizePrizesSubtitle: "Set what's on the wheel!",
    prizeLabel: "Prize {num}",
    nextStep: "Next ►",

    // Share message for reply
    replyShareMessage: "{reply}\n\n{coupon}",
  },
  zh: {
    // Index page - Header
    breakTheIce: "在想你",
    createApologyGame: "送上一份真心的消息",
    
    // Category labels
    categoryApology: "抱歉",
    categoryMissyou: "想你",
    categoryLove: "爱你",
    categoryThankyou: "感谢",

    // Category-specific form labels & placeholders
    labelApology: "我想为此道歉...",
    labelMissyou: "我想让你知道...",
    labelLove: "我爱你因为...",
    labelThankyou: "谢谢你...",
    placeholderApology: "迟到/吃了你的零食/突然消失...等等",
    placeholderMissyou: "我每天都在想你...",
    placeholderLove: "你让我笑/你是我的依靠...",
    placeholderThankyou: "一直陪在我身边/你的善良...",

    // Category-specific reveal text
    revealApology: "我想为{reason}道歉",
    revealMissyou: "我想你。{reason}",
    revealLove: "我爱你。{reason}",
    revealThankyou: "谢谢你{reason}",

    // Category-specific reply options
    replyApologyOk: "我其实没事。别担心。",
    replyApologyTalk: "接受道歉。我们聊聊吧。",
    replyApologyTime: "给我一些时间。我会联系你的。",
    replyMissyouToo: "我也想你！",
    replyMissyouMeet: "我们快见面吧！",
    replyMissyouSpace: "我现在需要一些空间。",
    replyLoveToo: "我也爱你！❤️",
    replyLoveSmile: "你让我笑得好开心。",
    replyLoveShy: "别说了，我脸都红了！",
    replyThankyouWelcome: "不客气！随时都可以。",
    replyThankyouTeam: "我们是一起的！",
    replyThankyouMeanIt: "这对我真的很重要。",

    // Index page - Form labels
    yourName: "你的名字",
    enterYourName: "输入你的名字...",
    theirName: "对方的名字",
    whoApologizing: "这是给谁的？",
    sorryFor: "我想为此道歉....",
    sorryPlaceholder: "迟到/吃了你的零食/突然消失...等等",
    generateInvite: "生成邀请 ►",
    
    // Index page - Ready screen
    ready: "准备好了！",
    sendTo: "通过聊天软件发送给 {name}",
    shareMessageIntro: "{name}！👀✨",
    shareMessageBody: "有人有话想对你说...",
    copy: "复制",
    ok: "好的！",
    back: "← 返回",
    
    // Index page - Success screen
    youDidIt: "你做到了！",
    firstStepComplete: "第一步：完成 ✓",
    rootingForYou: "迈出第一步总是最难的。我们为你和{name}加油！",
    waitForResponse: "现在让我们等待他们的回复...",
    goodLuck: "祝你好运！🍀",
    createAnother: "再创建一个",
    
    // Share message (clipboard)
    shareText: "{name}！👀✨ 有人有话想对你说... 点开看看吧！{link}",
    
    // Play page - Invalid link
    invalidLink: "链接无效",
    invalidLinkMessage: "这个游戏链接似乎已损坏。",
    createNewGame: "创建新游戏",
    
    // PongGame - Pre-game screen
    hey: "嘿 {name}！",
    surpriseChallenge: "{name} 为你准备了一个惊喜挑战。",
    acceptToBeat: "接受挑战，打败他们！",
    pressToStart: "▶ 按 A 开始",
    
    // Apology bubbles
    bubbleApology1: "对不起好吧",
    bubbleApology2: "我活该",
    bubbleApology3: "求你原谅我",
    bubbleApology4: "真的是我的错",
    bubbleApology5: "我搞砸了",
    bubbleApology6: "太对不起了!!",
    bubbleApology7: "我好内疚",
    bubbleApology8: "别讨厌我",
    bubbleApology9: "我欠你的",

    // Miss You bubbles
    bubbleMissyou1: "好想你",
    bubbleMissyou2: "快回来",
    bubbleMissyou3: "好孤单",
    bubbleMissyou4: "天天想你",
    bubbleMissyou5: "你在就好了",
    bubbleMissyou6: "需要你",
    bubbleMissyou7: "想见你",
    bubbleMissyou8: "在数日子",
    bubbleMissyou9: "你在哪",

    // Love bubbles
    bubbleLove1: "爱你",
    bubbleLove2: "你是我的世界",
    bubbleLove3: "心跳加速",
    bubbleLove4: "笑个不停",
    bubbleLove5: "你好可爱",
    bubbleLove6: "永远在一起",
    bubbleLove7: "有你才完整",
    bubbleLove8: "着迷了",
    bubbleLove9: "小鹿乱撞",

    // Thank You bubbles
    bubbleThankyou1: "太感谢了",
    bubbleThankyou2: "你最棒",
    bubbleThankyou3: "感激你",
    bubbleThankyou4: "意义重大",
    bubbleThankyou5: "你太厉害了",
    bubbleThankyou6: "好感恩",
    bubbleThankyou7: "感谢不尽",
    bubbleThankyou8: "你是传奇",
    bubbleThankyou9: "太幸运了",

    // Legacy bubble keys
    bubbleOops: "对不起好吧",
    bubbleNiceOne: "我活该",
    bubbleUrGood: "求你原谅我",
    bubbleMyBad: "真的是我的错",
    bubbleHelpMe: "我搞砸了",
    bubbleSorry: "太对不起了!!",
    bubbleYikes: "我好内疚",
    bubbleTooFast: "别讨厌我",
    bubbleOuch: "我欠你的",
    
    // GameEndScreen - Sender won
    oops: "哎呀！",
    senderWonMessage: "{name}居然赢了...",
    tryAgain: "再试一次 ►",
    
    // GameEndScreen - Apology phase
    youWon: "你赢了！",
    hereIsWhatTheySaid: "这是{name}想对你说的话：",
    iAmSorryFor: "我想为{reason}道歉",
    wouldYouLikeToReply: "你想回复吗？",
    pressBToContinue: "按 Ⓑ 继续",
    
    // GameEndScreen - Reply phase
    yourReply: "你的回复",
    howToRespond: "你想如何回应？",
    replyOk: "我其实没事。别担心。",
    replyTalk: "接受道歉。我们聊聊吧。",
    replyTime: "给我一些时间。我会联系你的。",
    copyAndSend: "复制并发送",
    
    // GameEndScreen - Success phase
    messageSent: "消息已发送！",
    responseCopied: "你的回复已复制。现在去和{name}的聊天中粘贴吧！",
    youSaid: "你说：",
    relationshipsPrecious: "感情是珍贵的礼物。",
    cherishThem: "请永远珍惜。祝福你们！✨",
    
    // Lucky Wheel
    spinTheWheel: "转转幸运轮",
    wheelSubtitle: "看看{name}怎么补偿你！",
    spinning: "转动中...",
    youGot: "你获得了：",
    couponFrom: "{name}欠你：",
    redeemCoupon: "兑换这张优惠券！",
    wheelPrize1: "给你做一顿大餐",
    wheelPrize2: "一起去游戏厅",
    wheelPrize3: "买你想要的键盘",
    wheelPrize4: "电影之夜，你来选",
    wheelPrize5: "请你喝一周奶茶",
    wheelPrize6: "一封真心的信",
    couponAppend: "附：别忘了你欠我：{prize}",

    // Prize customization page
    customizePrizes: "自定义奖品",
    customizePrizesSubtitle: "设置转盘上的内容！",
    prizeLabel: "奖品 {num}",
    nextStep: "下一步 ►",

    // Share message for reply
    replyShareMessage: "{reply}\n\n{coupon}",
  },
} as const;

// Helper function to get translated text with dynamic value substitution
export const t = (
  key: keyof typeof translations.en,
  lang: Language,
  replacements?: Record<string, string>
): string => {
  let text: string = translations[lang][key] || translations.en[key] || key;
  
  if (replacements) {
    Object.entries(replacements).forEach(([placeholder, value]) => {
      text = text.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), value);
    });
  }
  
  return text;
};

// Get bubble messages for a category
export const getBubbleMessages = (lang: Language, category: MessageCategory): string[] => {
  const tr = translations[lang];
  const prefix = `bubble${category.charAt(0).toUpperCase() + category.slice(1)}` as string;
  return Array.from({ length: 9 }, (_, i) => {
    const key = `${prefix}${i + 1}` as keyof typeof tr;
    return tr[key] as string;
  });
};

// Legacy compat
export const getApologyMessages = (lang: Language): string[] => getBubbleMessages(lang, 'apology');

// Get wheel prizes (defaults or custom)
export const getWheelPrizes = (lang: Language, custom?: string[]): string[] => {
  if (custom && custom.length === 6) return custom;
  const tr = translations[lang];
  return [
    tr.wheelPrize1,
    tr.wheelPrize2,
    tr.wheelPrize3,
    tr.wheelPrize4,
    tr.wheelPrize5,
    tr.wheelPrize6,
  ];
};

// Get default wheel prizes for a language
export const getDefaultPrizes = (lang: Language): string[] => {
  return getWheelPrizes(lang);
};

// Get reply options for the game end screen per category
export const getReplyOptions = (lang: Language, category: MessageCategory = 'apology') => {
  const tr = translations[lang];
  switch (category) {
    case 'missyou':
      return [
        { id: 'too', text: tr.replyMissyouToo, shortText: lang === 'en' ? "MISS U TOO" : "也想你" },
        { id: 'meet', text: tr.replyMissyouMeet, shortText: lang === 'en' ? "LET'S MEET" : "见面吧" },
        { id: 'space', text: tr.replyMissyouSpace, shortText: lang === 'en' ? "NEED SPACE" : "需要空间" },
      ];
    case 'love':
      return [
        { id: 'too', text: tr.replyLoveToo, shortText: lang === 'en' ? "LOVE U TOO" : "也爱你" },
        { id: 'smile', text: tr.replyLoveSmile, shortText: lang === 'en' ? "SMILING" : "好开心" },
        { id: 'shy', text: tr.replyLoveShy, shortText: lang === 'en' ? "BLUSHING" : "脸红了" },
      ];
    case 'thankyou':
      return [
        { id: 'welcome', text: tr.replyThankyouWelcome, shortText: lang === 'en' ? "WELCOME" : "不客气" },
        { id: 'team', text: tr.replyThankyouTeam, shortText: lang === 'en' ? "TOGETHER" : "一起的" },
        { id: 'meanit', text: tr.replyThankyouMeanIt, shortText: lang === 'en' ? "MEANS A LOT" : "很重要" },
      ];
    default: // apology
      return [
        { id: 'ok', text: tr.replyApologyOk, shortText: lang === 'en' ? "ALL GOOD" : "没事啦" },
        { id: 'talk', text: tr.replyApologyTalk, shortText: lang === 'en' ? "LET'S TALK" : "聊聊吧" },
        { id: 'time', text: tr.replyApologyTime, shortText: lang === 'en' ? "NEED TIME" : "需要时间" },
      ];
  }
};

// Get the reveal text key for a category
export const getRevealKey = (category: MessageCategory): keyof typeof translations.en => {
  switch (category) {
    case 'missyou': return 'revealMissyou';
    case 'love': return 'revealLove';
    case 'thankyou': return 'revealThankyou';
    default: return 'revealApology';
  }
};

// Get the form label key for a category
export const getCategoryLabelKey = (category: MessageCategory): keyof typeof translations.en => {
  switch (category) {
    case 'missyou': return 'labelMissyou';
    case 'love': return 'labelLove';
    case 'thankyou': return 'labelThankyou';
    default: return 'labelApology';
  }
};

// Get the form placeholder key for a category
export const getCategoryPlaceholderKey = (category: MessageCategory): keyof typeof translations.en => {
  switch (category) {
    case 'missyou': return 'placeholderMissyou';
    case 'love': return 'placeholderLove';
    case 'thankyou': return 'placeholderThankyou';
    default: return 'placeholderApology';
  }
};
