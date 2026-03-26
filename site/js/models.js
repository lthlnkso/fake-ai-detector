const AI_MODELS = [
    { name: "GPT-4o", vendor: "OpenAI" },
    { name: "GPT-4o mini", vendor: "OpenAI" },
    { name: "o1", vendor: "OpenAI" },
    { name: "o1-mini", vendor: "OpenAI" },
    { name: "o3-mini", vendor: "OpenAI" },
    { name: "GPT-4.5", vendor: "OpenAI" },
    { name: "Claude 3.5 Sonnet", vendor: "Anthropic" },
    { name: "Claude 3.5 Haiku", vendor: "Anthropic" },
    { name: "Claude 3 Opus", vendor: "Anthropic" },
    { name: "Gemini 1.5 Pro", vendor: "Google" },
    { name: "Gemini 1.5 Flash", vendor: "Google" },
    { name: "Gemini 2.0 Flash", vendor: "Google" },
    { name: "Gemini 2.5 Pro", vendor: "Google" },
    { name: "Llama 3.1 405B", vendor: "Meta" },
    { name: "Llama 3.3 70B", vendor: "Meta" },
    { name: "Mistral Large", vendor: "Mistral AI" },
    { name: "DeepSeek V3", vendor: "DeepSeek" },
    { name: "DeepSeek R1", vendor: "DeepSeek" },
    { name: "Qwen 2.5 72B", vendor: "Alibaba" },
    { name: "Command R+", vendor: "Cohere" },
];

function getRandomModel() {
    return AI_MODELS[Math.floor(Math.random() * AI_MODELS.length)];
}

function getAIScore() {
    return (95 + Math.random() * 4.9).toFixed(1);
}
