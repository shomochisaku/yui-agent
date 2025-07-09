import dotenv from 'dotenv';
import { yui } from './src/mastra/agents/yui.js';
import readline from 'readline';

dotenv.config();

// CLIインターフェースの設定
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// カラーコードの定義
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

// 会話履歴を保存する配列
let conversationHistory = [];

// ユイの応答を表示する関数
function printYuiResponse(text) {
  console.log(`${colors.cyan}${colors.bright}ユイ:${colors.reset} ${text}`);
}

// ユーザーの入力を表示する関数
function printUserInput(text) {
  console.log(`${colors.green}${colors.bright}あなた:${colors.reset} ${text}`);
}

// システムメッセージを表示する関数
function printSystemMessage(text) {
  console.log(`${colors.yellow}${colors.dim}[システム] ${text}${colors.reset}`);
}

// エラーメッセージを表示する関数
function printError(text) {
  console.log(`${colors.red}${colors.bright}[エラー] ${text}${colors.reset}`);
}

// メイン会話ループ
async function chatLoop() {
  printSystemMessage('ユイエージェントが起動しました');
  printSystemMessage('終了するには "exit", "quit", "終了" のいずれかを入力してください');
  console.log('');
  
  // 初回挨拶
  try {
    printSystemMessage('初回挨拶を準備中...');
    const greeting = await yui.generate('初回の挨拶をしてください。');
    printYuiResponse(greeting.text);
    conversationHistory.push({ role: 'assistant', content: greeting.text });
  } catch (error) {
    printError(`初期化エラー: ${error.message}`);
  }
  
  const askQuestion = () => {
    if (rl.closed) {
      return;
    }
    
    rl.question(`${colors.green}${colors.bright}> ${colors.reset}`, async (input) => {
      if (rl.closed) {
        return;
      }
      
      const userInput = input.trim();
      
      // 終了コマンドの処理
      if (userInput === 'exit' || userInput === 'quit' || userInput === '終了') {
        printSystemMessage('ユイエージェントを終了しています...');
        try {
          const farewell = await yui.generate('お別れの挨拶をしてください。');
          printYuiResponse(farewell.text);
        } catch (error) {
          printError(`終了時エラー: ${error.message}`);
        }
        rl.close();
        return;
      }
      
      // 空の入力の処理
      if (!userInput) {
        printSystemMessage('何かメッセージを入力してください');
        askQuestion();
        return;
      }
      
      // ユーザー入力の表示
      printUserInput(userInput);
      
      // ユイからの応答を生成
      try {
        printSystemMessage('ユイが考えています...');
        
        // 会話履歴をコンテキストに含める
        const contextPrompt = conversationHistory.length > 0 
          ? `過去の会話:\n${conversationHistory.map(msg => `${msg.role === 'user' ? 'ユーザー' : 'ユイ'}: ${msg.content}`).join('\n')}\n\n現在の質問: ${userInput}`
          : userInput;
        
        const response = await yui.generate(contextPrompt);
        
        // 会話履歴に追加
        conversationHistory.push({ role: 'user', content: userInput });
        conversationHistory.push({ role: 'assistant', content: response.text });
        
        // 履歴が長くなりすぎた場合は古いものを削除
        if (conversationHistory.length > 10) {
          conversationHistory = conversationHistory.slice(-10);
        }
        
        printYuiResponse(response.text);
        
      } catch (error) {
        printError(`応答生成エラー: ${error.message}`);
        printSystemMessage('もう一度お試しください');
      }
      
      console.log('');
      if (!rl.closed) {
        askQuestion();
      }
    });
  };
  
  console.log('');
  setTimeout(() => {
    askQuestion();
  }, 100);
}

// プログラム開始
console.log(`${colors.magenta}${colors.bright}
╔═══════════════════════════════════════════════════╗
║                                                   ║
║         ✨ ユイエージェント CLI チャット ✨           ║
║                                                   ║
║    SAOのユイのようなパーソナルAIアシスタント        ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
${colors.reset}`);

// プロセス終了時のクリーンアップ
process.on('SIGINT', () => {
  printSystemMessage('\n終了します...');
  rl.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  rl.close();
  process.exit(0);
});

chatLoop().catch(error => {
  printError(`プログラムエラー: ${error.message}`);
  rl.close();
  process.exit(1);
});