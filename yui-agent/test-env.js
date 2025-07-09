import dotenv from 'dotenv';
dotenv.config();

console.log('Environment variables:');
console.log('OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY ? 'Set' : 'Not set');
console.log('OPENROUTER_BASE_URL:', process.env.OPENROUTER_BASE_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);