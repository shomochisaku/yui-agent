import dotenv from 'dotenv';
dotenv.config();

console.log('🔍 Environment Variables Check:');
console.log('================================');

// OpenAI API (Primary)
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? `✅ Set (${process.env.OPENAI_API_KEY.substring(0, 8)}...)` : '❌ Not set');

// Brave Search API
console.log('BRAVE_API_KEY:', process.env.BRAVE_API_KEY ? `✅ Set (${process.env.BRAVE_API_KEY.substring(0, 8)}...)` : '❌ Not set');

// OpenRouter API (Backup)
console.log('OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY ? `✅ Set (${process.env.OPENROUTER_API_KEY.substring(0, 8)}...)` : '❌ Not set');
console.log('OPENROUTER_BASE_URL:', process.env.OPENROUTER_BASE_URL || '❌ Not set');

// System Environment
console.log('NODE_ENV:', process.env.NODE_ENV || 'undefined');
console.log('PORT:', process.env.PORT || 'undefined');

console.log('================================');

// Summary
const openaiSet = !!process.env.OPENAI_API_KEY;
const braveSet = !!process.env.BRAVE_API_KEY;

console.log('📊 Summary:');
console.log(`OpenAI API: ${openaiSet ? '✅ Ready' : '❌ Missing'}`);
console.log(`Brave Search API: ${braveSet ? '✅ Ready' : '❌ Missing'}`);
console.log(`Overall Status: ${openaiSet && braveSet ? '✅ All Systems Ready' : '⚠️ Some APIs Missing'}`);

// Exit with appropriate code
process.exit(openaiSet && braveSet ? 0 : 1);