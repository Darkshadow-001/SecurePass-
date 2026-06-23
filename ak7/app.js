// Tailwind Custom Architecture Engine Configuration
tailwind.config = {
    darkMode: "class", 
    theme: {
        extend: {
            colors: {
                "on-surface-variant": "#b9cacb", "on-primary-container": "#006a71", "surface-bright": "#0013bc", 
                "on-tertiary-fixed-variant": "#5e4100", "primary-fixed": "#74f5ff", "inverse-on-surface": "#000fa3", 
                "surface-container-highest": "#0011af", "error-container": "#93000a", "on-primary-fixed-variant": "#004f54", 
                "on-tertiary-fixed": "#271900", "surface-container": "#000873", "surface-tint": "#00dbe7", 
                "secondary-fixed": "#72ff70", "surface-variant": "#0011af", "on-error": "#690005", 
                "surface-container-low": "#000668", "surface-container-high": "#000c91", "on-surface": "#e0e0ff", 
                "surface-container-lowest": "#000242", "secondary-container": "#13ff43", "on-secondary-fixed": "#002203", 
                secondary: "#ecffe3", outline: "#849495", "inverse-primary": "#00696f", "primary-fixed-dim": "#00dbe7", 
                background: "#000450", "surface-dim": "#000450", "tertiary-container": "#ffd58e", "on-tertiary": "#422d00", 
                tertiary: "#fff6ed", "tertiary-fixed": "#ffdea9", "primary-container": "#00f2ff", "on-primary": "#00363a", 
                "on-tertiary-container": "#7e5900", "secondary-fixed-dim": "#00e639", surface: "#000450", 
                "on-primary-fixed": "#002022", error: "#ffb4ab", primary: "#e1fdff", "on-error-container": "#ffdad6", 
                "tertiary-fixed-dim": "#ffba26", "on-secondary-container": "#007117", "on-secondary-fixed-variant": "#00530e", 
                "on-background": "#e0e0ff", "on-secondary": "#003907", "outline-variant": "#3a494b", "inverse-surface": "#e0e0ff"
            }, 
            borderRadius: {DEFAULT: "0.125rem", lg: "0.25rem", xl: "0.5rem", full: "0.75rem"}, 
            spacing: {lg: "40px", gutter: "20px", sm: "16px", xl: "64px", md: "24px", xs: "8px", base: "4px", "container-max": "1440px"}, 
            fontFamily: {"body-md": ["Inter"], "headline-sm": ["Inter"], "code-md": ["JetBrains Mono"], "headline-md": ["Inter"], "display-lg": ["Inter"], "label-caps": ["JetBrains Mono"], "body-sm": ["Inter"]}
        }
    }
};

// Interface Event Handlers
document.addEventListener("DOMContentLoaded", () => {
    const analyzeBtn = document.getElementById("analyzeBtn");
    const targetInput = document.getElementById("targetInput");
    const dumpLogsBtn = document.getElementById("dumpLogsBtn");

    // Scanner execution simulation trigger
    if (analyzeBtn) {
        analyzeBtn.addEventListener("click", () => {
            const query = targetInput.value.trim();
            if (query) {
                console.log(`[SYS] Initializing localized heuristic testing parameters on: ${query}`);
                // Dynamic analysis features can be hooked here
            }
        });
    }

    // Capture control actions for PCAP compilation dumps
    if (dumpLogsBtn) {
        dumpLogsBtn.addEventListener("click", () => {
            alert("Generating target data layer matrix... PCAP logs parsed successfully.");
        });
    }
});