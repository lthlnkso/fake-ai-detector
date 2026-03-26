const COMMON_MODELS = [
    // OpenAI
    { name: "ChatGPT-5 mini", vendor: "OpenAI" },
    { name: "GPT-4o mini", vendor: "OpenAI" },
    { name: "o3-mini", vendor: "OpenAI" },
    // Anthropic
    { name: "Claude 4.5 Sonnet", vendor: "Anthropic" },
    { name: "Claude Opus 4", vendor: "Anthropic" },
    { name: "Claude 3.5 Haiku", vendor: "Anthropic" },
    // Google
    { name: "Gemini 2.5 Flash", vendor: "Google" },
    { name: "Gemini 2.5 Pro", vendor: "Google" },
    { name: "Gemini 3 Flash", vendor: "Google" },
    // xAI
    { name: "Grok 4.1", vendor: "xAI" },
    { name: "Grok 4", vendor: "xAI" },
];

const RARE_MODELS = [
    { name: "GPT-OSS 120B", vendor: "OpenAI" },
    { name: "GPT-OSS 20B", vendor: "OpenAI" },
    { name: "Gemini 2.5 Flash Lite", vendor: "Google" },
    { name: "Grok Code", vendor: "xAI" },
    { name: "DeepSeek V3.2", vendor: "DeepSeek" },
    { name: "DeepSeek R1", vendor: "DeepSeek" },
    { name: "Llama 3.1 405B", vendor: "Meta" },
    { name: "Llama 4", vendor: "Meta" },
    { name: "Mistral Nemo", vendor: "Mistral AI" },
    { name: "Kimi K2.5", vendor: "Moonshot AI" },
    { name: "MiniMax M2.5", vendor: "MiniMax" },
    { name: "Qwen 3 235B", vendor: "Alibaba" },
];

function getRandomModel() {
    const pool = Math.random() < 0.9 ? COMMON_MODELS : RARE_MODELS;
    return pool[Math.floor(Math.random() * pool.length)];
}

function getAIScore() {
    return (95 + Math.random() * 4.9).toFixed(1);
}
