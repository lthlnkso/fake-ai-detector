// Update character count on input
const textInput = document.getElementById("text-input");
const charCountInput = document.getElementById("char-count-input");

textInput.addEventListener("input", () => {
    const len = textInput.value.length;
    charCountInput.textContent = `${len.toLocaleString()} character${len !== 1 ? "s" : ""}`;
});

// Initialize gauge
const gaugeContainer = document.getElementById("gauge");
createGauge(gaugeContainer);

// Collapsible input area
const inputArea = document.querySelector(".input-area");
const expandBtn = document.getElementById("expand-btn");

function collapseInput() {
    inputArea.classList.add("collapsed");
    expandBtn.classList.remove("hidden");
}

function expandInput() {
    inputArea.classList.remove("collapsed");
    expandBtn.classList.add("hidden");
    textInput.focus();
}

expandBtn.addEventListener("click", expandInput);

function analyzeText() {
    const text = textInput.value.trim();
    if (!text) return;

    const btn = document.getElementById("analyze-btn");
    const resultsPanel = document.getElementById("results-panel");

    // Show loading state
    btn.disabled = true;
    btn.textContent = "Analyzing...";
    btn.classList.add("loading");

    // Show results panel immediately for gauge animation
    resultsPanel.classList.remove("hidden");
    resultsPanel.classList.add("revealing");

    // Get random score and model
    const score = parseFloat(getAIScore());
    const model = getRandomModel();

    // Start gauge animation
    animateGauge(score, 1800);

    // Fake processing delay
    const delay = 1500 + Math.random() * 1000;

    setTimeout(() => {
        // Collapse the input area and scroll after collapse finishes
        collapseInput();
        setTimeout(() => {
            resultsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 420);

        // Update model prediction
        document.getElementById("model-name").textContent = `${model.name} (${model.vendor})`;

        // Run text analysis
        const spans = analyzeTextContent(text);
        const highlightContainer = document.getElementById("highlighted-text");
        renderHighlightedText(highlightContainer, text, spans);

        // Update stats
        const charCount = text.length;
        const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
        document.getElementById("char-count").textContent = `${charCount.toLocaleString()} Characters`;
        document.getElementById("word-count").textContent = `${wordCount.toLocaleString()} Words`;

        // Reset button
        btn.disabled = false;
        btn.textContent = "Detect AI Text";
        btn.classList.remove("loading");

        // Finish reveal
        resultsPanel.classList.remove("revealing");
        resultsPanel.classList.add("revealed");
    }, delay);
}
