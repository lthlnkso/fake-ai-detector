const HIGHLIGHT_RULES = [
    {
        pattern: "#Adjective+ #Noun+",
        label: "Predictive phrasing pattern",
        color: "highlight-red"
    },
    {
        pattern: "#Adverb #Verb",
        label: "AI-characteristic modifier usage",
        color: "highlight-orange"
    },
    {
        pattern: "#Conjunction .+",
        label: "Typical LLM transition pattern",
        color: "highlight-purple"
    },
    {
        pattern: "#Verb #Preposition",
        label: "Statistically modeled verb pattern",
        color: "highlight-blue"
    },
    {
        pattern: "^#Pronoun",
        label: "AI-generated sentence opener",
        color: "highlight-yellow"
    },
];

const CATCHALL_LABEL = "Distributional anomaly detected";
const CATCHALL_COLOR = "highlight-pink";

function analyzeTextContent(text) {
    if (typeof nlp === "undefined") {
        return fallbackAnalysis(text);
    }

    const doc = nlp(text);
    const spans = [];
    const claimed = new Set();

    // Process each rule
    for (const rule of HIGHLIGHT_RULES) {
        const matches = doc.match(rule.pattern);
        matches.forEach((m) => {
            const offset = m.offset();
            if (!offset || !offset.length) return;

            const info = offset[0];
            const start = info.index;
            const length = info.length;

            // Check for overlap with already-claimed characters
            let overlaps = false;
            for (let i = start; i < start + length; i++) {
                if (claimed.has(i)) { overlaps = true; break; }
            }
            if (overlaps) return;

            // Claim these characters
            for (let i = start; i < start + length; i++) {
                claimed.add(i);
            }

            spans.push({
                start: start,
                end: start + length,
                label: rule.label,
                color: rule.color
            });
        });
    }

    // Fill unclaimed regions with catch-all
    spans.sort((a, b) => a.start - b.start);
    const finalSpans = [];
    let pos = 0;

    for (const span of spans) {
        if (span.start > pos) {
            const gapText = text.substring(pos, span.start).trim();
            if (gapText.length > 2) {
                finalSpans.push({
                    start: pos,
                    end: span.start,
                    label: CATCHALL_LABEL,
                    color: CATCHALL_COLOR
                });
            } else {
                finalSpans.push({
                    start: pos,
                    end: span.start,
                    label: null,
                    color: null
                });
            }
        }
        finalSpans.push(span);
        pos = span.end;
    }

    // Handle trailing text
    if (pos < text.length) {
        const remaining = text.substring(pos).trim();
        if (remaining.length > 2) {
            finalSpans.push({
                start: pos,
                end: text.length,
                label: CATCHALL_LABEL,
                color: CATCHALL_COLOR
            });
        } else if (pos < text.length) {
            finalSpans.push({
                start: pos,
                end: text.length,
                label: null,
                color: null
            });
        }
    }

    return finalSpans;
}

function fallbackAnalysis(text) {
    // If compromise.js fails to load, do simple sentence-level highlighting
    const sentences = text.split(/(?<=[.!?])\s+/);
    const colors = ["highlight-red", "highlight-orange", "highlight-purple", "highlight-blue", "highlight-yellow", "highlight-pink"];
    const labels = [
        "Predictive phrasing pattern",
        "AI-characteristic modifier usage",
        "Typical LLM transition pattern",
        "Statistically modeled verb pattern",
        "AI-generated sentence opener",
        "Distributional anomaly detected"
    ];

    const spans = [];
    let pos = 0;
    sentences.forEach((sentence, i) => {
        const start = text.indexOf(sentence, pos);
        if (start === -1) return;
        spans.push({
            start: start,
            end: start + sentence.length,
            label: labels[i % labels.length],
            color: colors[i % colors.length]
        });
        pos = start + sentence.length;
    });

    return spans;
}

function renderHighlightedText(container, text, spans) {
    container.innerHTML = "";

    if (spans.length === 0) {
        container.textContent = text;
        return;
    }

    for (const span of spans) {
        const content = text.substring(span.start, span.end);
        if (!span.label) {
            container.appendChild(document.createTextNode(content));
            continue;
        }

        const el = document.createElement("span");
        el.className = `highlight ${span.color}`;
        el.textContent = content;
        el.setAttribute("data-label", span.label);
        container.appendChild(el);
    }
}
