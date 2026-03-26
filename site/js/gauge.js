function createGauge(container) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 200 130");
    svg.setAttribute("class", "gauge-svg");

    svg.innerHTML = `
        <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#22c55e"/>
                <stop offset="35%" style="stop-color:#eab308"/>
                <stop offset="65%" style="stop-color:#f97316"/>
                <stop offset="100%" style="stop-color:#ef4444"/>
            </linearGradient>
        </defs>

        <!-- Background arc -->
        <path d="M 20 105 A 80 80 0 0 1 180 105"
              fill="none" stroke="#e5e7eb" stroke-width="14" stroke-linecap="round"/>

        <!-- Colored arc -->
        <path id="gauge-arc" d="M 20 105 A 80 80 0 0 1 180 105"
              fill="none" stroke="url(#gaugeGradient)" stroke-width="14" stroke-linecap="round"
              stroke-dasharray="251.33" stroke-dashoffset="251.33"/>

        <!-- Needle -->
        <line id="gauge-needle" x1="100" y1="105" x2="100" y2="35"
              stroke="#1f2937" stroke-width="2.5" stroke-linecap="round"
              transform="rotate(-90, 100, 105)"/>
        <circle cx="100" cy="105" r="5" fill="#1f2937"/>

        <!-- Percentage text -->
        <text id="gauge-percent" x="100" y="88" text-anchor="middle"
              font-size="28" font-weight="700" fill="#1f2937" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">0%</text>

        <!-- Label -->
        <text id="gauge-label" x="100" y="122" text-anchor="middle"
              font-size="11" font-weight="600" fill="#ef4444" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">AI GPT*</text>
    `;

    container.appendChild(svg);
}

function animateGauge(targetPercent, duration) {
    const arc = document.getElementById("gauge-arc");
    const needle = document.getElementById("gauge-needle");
    const percentText = document.getElementById("gauge-percent");

    const arcLength = 251.33;
    const startTime = performance.now();

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const rawProgress = Math.min(elapsed / duration, 1);
        const progress = easeOutCubic(rawProgress);

        const currentPercent = progress * targetPercent;

        // Update arc
        const dashOffset = arcLength * (1 - currentPercent / 100);
        arc.setAttribute("stroke-dashoffset", dashOffset);

        // Update needle rotation: -90 (left/0%) to +90 (right/100%)
        const angle = -90 + (currentPercent / 100) * 180;
        needle.setAttribute("transform", `rotate(${angle}, 100, 105)`);

        // Update text
        percentText.textContent = `${currentPercent.toFixed(0)}%`;

        if (rawProgress < 1) {
            requestAnimationFrame(animate);
        } else {
            percentText.textContent = `${targetPercent}%`;
        }
    }

    requestAnimationFrame(animate);
}
