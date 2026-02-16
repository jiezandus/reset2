// Language type definition
export type Language = 'en' | 'zh';

// All translation strings
export const translations = {
  en: {
    // Index page - Header
    breakTheIce: "Thinking of You",
    createApologyGame: "Send a heartfelt apology",
    
    // Index page - Form labels
    yourName: "Your Name",
    enterYourName: "Enter your name...",
    theirName: "Their Name",
    whoApologizing: "Who are you apologizing to?",
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
    
    // PongGame - Bubbles
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
    createApologyGame: "送上一份真心的道歉",
    
    // Index page - Form labels
    yourName: "你的名字",
    enterYourName: "输入你的名字...",
    theirName: "对方的名字",
    whoApologizing: "你要向谁道歉？",
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
    
    // PongGame - Bubbles
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

// Get apology messages array for the game bubbles
export const getApologyMessages = (lang: Language): string[] => {
  const tr = translations[lang];
  return [
    tr.bubbleOops,
    tr.bubbleNiceOne,
    tr.bubbleUrGood,
    tr.bubbleMyBad,
    tr.bubbleHelpMe,
    tr.bubbleSorry,
    tr.bubbleYikes,
    tr.bubbleTooFast,
    tr.bubbleOuch,
  ];
};

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

// Get reply options for the game end screen
export const getReplyOptions = (lang: Language) => {
  const tr = translations[lang];
  return [
    { id: 'ok', text: tr.replyOk, shortText: lang === 'en' ? "ALL GOOD" : "没事啦" },
    { id: 'talk', text: tr.replyTalk, shortText: lang === 'en' ? "LET'S TALK" : "聊聊吧" },
    { id: 'time', text: tr.replyTime, shortText: lang === 'en' ? "NEED TIME" : "需要时间" },
  ];
};
