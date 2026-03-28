// Screenshot capture
function captureResults() {
    const resultsPanel = document.getElementById('results-panel');
    const captureBtn = document.getElementById('capture-btn');
    const toast = document.getElementById('capture-toast');

    // Hide the button so it doesn't appear in the screenshot
    captureBtn.style.visibility = 'hidden';

    html2canvas(resultsPanel, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
    }).then(canvas => {
        captureBtn.style.visibility = '';

        // Try clipboard first, with Safari-compatible Promise pattern
        if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
            const blobPromise = new Promise(resolve => {
                canvas.toBlob(resolve, 'image/png');
            });

            navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blobPromise })
            ]).then(() => {
                showToast(toast, 'Copied to clipboard!');
            }).catch(() => {
                downloadCanvas(canvas);
                showToast(toast, 'Screenshot saved!');
            });
        } else {
            downloadCanvas(canvas);
            showToast(toast, 'Screenshot saved!');
        }
    }).catch(() => {
        captureBtn.style.visibility = '';
        showToast(toast, 'Capture failed');
    });
}

function downloadCanvas(canvas) {
    canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'callallai-result.png';
        a.click();
        URL.revokeObjectURL(url);
    }, 'image/png');
}

function showToast(toast, message) {
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 2000);
}

// Referral click tracking
document.addEventListener('click', function(e) {
    const link = e.target.closest('#pangram-cta');
    if (link) {
        try {
            navigator.sendBeacon('/api/referral-click');
        } catch (_) {
            // Silently fail on local dev (no server to receive beacon)
        }
    }
});

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
