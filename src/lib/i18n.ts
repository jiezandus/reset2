// Language type definition
export type Language = 'en' | 'zh';

// All translation strings
export const translations = {
  en: {
    // Index page - Header
    breakTheIce: "Break the Ice",
    createApologyGame: "Create an apology game",
    
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
    bubbleOops: "OOPS!",
    bubbleNiceOne: "NICE ONE",
    bubbleUrGood: "UR GOOD",
    bubbleMyBad: "MY BAD",
    bubbleHelpMe: "HELP ME",
    bubbleSorry: "SORRY!",
    bubbleYikes: "YIKES",
    bubbleTooFast: "TOO FAST",
    bubbleOuch: "OUCH!",
    
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
    
    // Share message for reply
    replyShareMessage: "Hey {sender}! 💌\n\n{recipient} played your challenge and here's their response:\n\n\"{reply}\"\n\n— via RESET",
  },
  zh: {
    // Index page - Header
    breakTheIce: "破冰行动",
    createApologyGame: "创建一个道歉游戏",
    
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
    bubbleOops: "哎呀！",
    bubbleNiceOne: "厉害！",
    bubbleUrGood: "你真棒",
    bubbleMyBad: "我的错",
    bubbleHelpMe: "救命",
    bubbleSorry: "抱歉！",
    bubbleYikes: "糟糕",
    bubbleTooFast: "太快了",
    bubbleOuch: "好痛！",
    
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
    
    // Share message for reply
    replyShareMessage: "嘿 {sender}！💌\n\n{recipient} 玩了你的挑战，这是他们的回复：\n\n\"{reply}\"\n\n— 来自 RESET",
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

// Get reply options for the game end screen
export const getReplyOptions = (lang: Language) => {
  const tr = translations[lang];
  return [
    { id: 'ok', text: tr.replyOk, shortText: lang === 'en' ? "ALL GOOD" : "没事啦" },
    { id: 'talk', text: tr.replyTalk, shortText: lang === 'en' ? "LET'S TALK" : "聊聊吧" },
    { id: 'time', text: tr.replyTime, shortText: lang === 'en' ? "NEED TIME" : "需要时间" },
  ];
};
