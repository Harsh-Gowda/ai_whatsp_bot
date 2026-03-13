const gemini = require('./services/gemini');

async function test() {
    console.log('Testing Gemini Integration...');
    try {
        const response = await gemini.generateResponse('Hello, do you offer teeth whitening?');
        console.log('\nAI Response:', response);
        console.log('\nTest PASSED');
    } catch (error) {
        console.error('\nTest FAILED');
        if (error.response) {
            console.error('Error Status:', error.response.status);
            console.error('Error Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error Message:', error.message);
            console.error('Stack Trace:', error.stack);
        }
    }
}

test();
