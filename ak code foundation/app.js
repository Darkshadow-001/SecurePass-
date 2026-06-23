const state = {
    userName: '',
    accentColor: 'green',
    progressRate: 0,
    activeModule: 'mod-malware',
    permissionGranted: false,
    currentQuizIdx: 0,
    pendingAction: null,
    quizBank: [
        { q: "What does SQL Injection primarily exploit?", options: ["Unsanitized Database Inputs", "Firewall Ports"], correct: 0, exp: "SQL Injection injects database script variations to exploit unsanitized user inputs fields directly." },
        { q: "Which deployment protocol secures files comprehensively?", options: ["FTP Plain Transmission", "SFTP SSH Encrypted Layer"], correct: 1, exp: "SFTP wraps file actions with SSH protocols ensuring automated connection handshakes remain secure." },
        { q: "What defines a malicious Zero-Day event?", options: ["An unpatched, newly found loophole", "An expired certificate signature"], correct: 0, exp: "Zero-days reference software bugs completely hidden from manufacturers until malicious penetration launches." },
        { q: "How do ransomware variants target individual profiles?", options: ["By encrypting directories for leverage", "By optimizing operating speeds"], correct: 0, exp: "Ransomware isolates records by locking keys away via mathematical operations, requesting transactional tokens to release access." }
    ]
};

function init() {
    renderNavs();
    loadQuizQuestion();
}

function handleLogin() {
    const input = document.getElementById('user-input');
    if (!input || input.value.trim() === '') return;
    state.userName = input.value.trim();
    document.getElementById('auth-overlay').classList.add('opacity-0', 'pointer-events-none');
    document.getElementById('display-name').textContent = state.userName.toUpperCase();
    teacherMessage(`Access established. Welcome Operator ${state.userName}. Let us begin.`);
}

function switchModule(id) {
    state.activeModule = id;
    document.querySelectorAll('.module-view').forEach(mod => mod.classList.add('hidden'));
    const activeView = document.getElementById(id);
    if (activeView) activeView.classList.remove('hidden');
    renderNavs();
}

function renderNavs() {
    const sideNav = document.getElementById('side-nav-links');
    const modules = [
        { id: 'mod-malware', label: '1. Malware Guardian', icon: 'security' },
        { id: 'mod-scan', label: '2. Deep Device Scan', icon: 'radar' },
        { id: 'mod-learning', label: '3. Deep Learning Center', icon: 'school' },
        { id: 'mod-forum', label: '4. Q&A Assessment', icon: 'quiz' }
    ];
    
    sideNav.innerHTML = modules.map(item => `
        <div onclick="switchModule('${item.id}')" class="nav-item ${state.activeModule === item.id ? 'bg-secondary-container/20 text-secondary-container font-bold border-l-4 border-color var(--accent-glow)' : 'text-on-surface-variant hover:bg-surface-container-high'} flex items-center gap-4 px-6 py-3 cursor-pointer rounded-lg transition-all">
            <span class="material-symbols-outlined">${item.icon}</span>
            <span class="font-label-sm">${item.label}</span>
        </div>
    `).join('');
    
    // Add the programmatic utility color update
    document.querySelectorAll('.nav-item').forEach(el => {
        if (el.classList.contains('border-l-4')) {
            el.style.borderColor = "var(--accent-glow)";
        }
    });
}

function triggerScanWithPermission(type) {
    if (!state.permissionGranted) {
        state.pendingAction = type;
        document.getElementById('permission-overlay').classList.remove('hidden');
    } else {
        type === 'url' ? scanUrl() : runDeepScan();
    }
}

function grantPermission() {
    state.permissionGranted = true;
    closePermission();
    if(state.pendingAction === 'url') scanUrl();
    if(state.pendingAction === 'deep') runDeepScan();
}

function closePermission() {
    document.getElementById('permission-overlay').classList.add('hidden');
}

function scanUrl() {
    const target = document.getElementById('url-scanner').value;
    const resBox = document.getElementById('scan-result');
    const verdict = document.getElementById('scan-verdict');
    const info = document.getElementById('scan-details');
    const icon = document.getElementById('scan-icon');
    
    if (!target) return alert('Provide a link first.');
    resBox.classList.remove('hidden');
    verdict.textContent = "COMPILING SECURITY CHECKS...";
    
    setTimeout(() => {
        if (target.includes('malicious') || target.includes('phishing')) {
            verdict.textContent = "THREAT INFRASTRUCTURE DETECTED";
            info.textContent = "Warning! Malicious phishing loop detected. Prevent credential logging immediately.";
            resBox.className = "glass bg-error-container/40 p-6 rounded-lg border-l-4 border-error flex items-center gap-4";
            icon.textContent = "gpp_bad";
        } else {
            verdict.textContent = "CLEAN PROTOCOL CONFIRMED";
            info.textContent = "No malware hooks detected. The script array aligns completely with safe standards.";
            resBox.className = "glass bg-surface-container-high/50 p-6 rounded-lg border-l-4 border-primary-container flex items-center gap-4 accent-border";
            icon.textContent = "verified_user";
            updateProgress(5);
        }
    }, 1200);
}

function runDeepScan() {
    const logs = document.getElementById('scan-logs');
    const progressCircle = document.getElementById('scan-progress-circle');
    const textVal = document.getElementById('scan-val');
    const startBtn = document.getElementById('start-scan-btn');
    
    startBtn.disabled = true;
    let counter = 0;
    logs.innerHTML = "<div class='text-secondary-container'>Mounting Virtual Hard Drive layers...</div>";
    
    const pathArrays = ["/kernel/drivers/net", "/sys/amd64/boot", "/users/local/auth/tokens.json", "/var/www/index.html"];
    
    const loop = setInterval(() => {
        counter += 4;
        if (counter <= 100) {
            textVal.textContent = counter + "%";
            const offset = 552.92 - (552.92 * counter) / 100;
            progressCircle.style.strokeDashoffset = offset;
            
            const randomPath = pathArrays[Math.floor(Math.random() * pathArrays.length)];
            logs.innerHTML += `<div>Scanning sandbox chunk: ${randomPath} -> <span class='text-primary-fixed-dim font-bold'>VERIFIED</span></div>`;
            logs.scrollTop = logs.scrollHeight;
        } else {
            clearInterval(loop);
            logs.innerHTML += "<div class='text-primary-container font-bold mt-2'>[SUCCESS] Deep Scan finished. Account integrity safe. Zero memory leak infections found.</div>";
            startBtn.disabled = false;
            updateProgress(15);
        }
    }, 100);
}

function showTopic(type) {
    const container = document.getElementById('learning-content');
    const tabs = document.getElementById('learning-tabs').children;
    for (let t of tabs) t.classList.add('opacity-60');
    
    if (type === 'deploy') {
        tabs[0].classList.remove('opacity-60');
        container.innerHTML = `
            <div class="space-y-4">
                <h3 class="text-xl font-bold accent-text">CI/CD Production Deployment Pipeline</h3>
                <p class="text-sm text-on-surface-variant">Learn how web applications route from local branches to live cloud hosting instances completely error-free.</p>
                <pre class="bg-black/40 p-4 rounded text-xs font-code-md text-primary-container accent-text"># Initialize Deploy\nnpm run production-build</pre>
                <button class="px-4 py-2 bg-primary-container text-on-primary font-bold text-xs rounded accent-bg text-black" onclick="updateProgress(10)">MARK COMPLETED (+10%)</button>
            </div>`;
    } else if (type === 'mysteries') {
        tabs[1].classList.remove('opacity-60');
        container.innerHTML = `
            <div class="space-y-4">
                <h3 class="text-xl font-bold text-secondary-container accent-text">Deep Coding Mystery: The Haunted Stack Trace</h3>
                <p class="text-sm text-on-surface-variant">Find the security flaw hidden inside this deployment loop profile:</p>
                <pre class="bg-black/40 p-4 rounded text-xs font-code-md text-error">function connect(user) {\n  // MYSTERY FLUSH: passwords are leaked to root logs!\n  console.log("DEBUG_USER_DATA:" + user.password);\n}</pre>
                <button class="px-4 py-2 bg-secondary-container text-on-secondary font-bold text-xs rounded accent-bg text-black" onclick="updateProgress(15); alert('Flaw patched successfully! Logs sanitized. +15% progress saved.');">REMEDIATE FLAW AND SOLVE</button>
            </div>`;
    } else {
        tabs[2].classList.remove('opacity-60');
        container.innerHTML = `
            <div class="space-y-4">
                <h3 class="text-xl font-bold text-tertiary-fixed-dim accent-text">Beginner Foundation Roadmaps</h3>
                <p class="text-sm text-on-surface-variant">Start your computational paths here. Master foundational variables, arrays, loop structures, and clear algorithm arrays easily.</p>
                <button class="px-4 py-2 bg-primary-container text-on-primary font-bold text-xs rounded accent-bg text-black" onclick="updateProgress(5)">COMPLETE PRE-REQS (+5%)</button>
            </div>`;
    }
}

function loadQuizQuestion() {
    const q = state.quizBank[state.currentQuizIdx];
    document.getElementById('current-q-num').textContent = state.currentQuizIdx + 1;
    document.getElementById('quiz-question-text').textContent = q.q;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = "text-left p-4 rounded-lg bg-surface-container-low border border-white/5 hover:border-primary-fixed transition-all text-sm font-bold";
        btn.textContent = opt;
        btn.onclick = () => handleQuizAnswer(idx, btn);
        optionsContainer.appendChild(btn);
    });

    document.getElementById('quiz-explanation').classList.add('hidden');
    document.getElementById('quiz-next-btn').classList.add('hidden');
}

function handleQuizAnswer(idx, btn) {
    const q = state.quizBank[state.currentQuizIdx];
    const buttons = document.getElementById('quiz-options').children;
    for(let b of buttons) b.disabled = true;

    const expEl = document.getElementById('quiz-explanation');
    expEl.classList.remove('hidden');
    expEl.textContent = q.exp;

    if (idx === q.correct) {
        btn.className = "text-left p-4 rounded-lg border text-sm font-bold bg-primary-container/20 border-primary-container text-primary-container accent-border";
        updateProgress(10);
    } else {
        btn.className = "text-left p-4 rounded-lg border text-sm font-bold bg-error/20 border-error text-error shake";
    }
    document.getElementById('quiz-next-btn').classList.remove('hidden');
}

function loadNextQuestion() {
    state.currentQuizIdx = (state.currentQuizIdx + 1) % state.quizBank.length;
    loadQuizQuestion();
}

function submitForum() {
    const input = document.getElementById('forum-input');
    if (!input.value.trim()) return;
    const list = document.getElementById('forum-list');
    
    const userMsg = document.createElement('div');
    userMsg.className = "flex flex-col gap-1 text-right items-end";
    userMsg.innerHTML = `<div class="text-[10px] text-primary-container font-code-md">${state.userName || 'ANONYMOUS'}</div>
                         <div class="bg-primary-container/10 border border-primary-container/20 p-3 rounded-lg rounded-tr-none text-sm">${input.value}</div>`;
    list.appendChild(userMsg);
    
    const promptText = input.value;
    input.value = '';
    list.scrollTop = list.scrollHeight;

    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = "flex flex-col gap-1";
        botMsg.innerHTML = `<div class="text-[10px] text-secondary-container font-code-md">[AI FOUNDATION BOT]</div>
                             <div class="bg-surface-container-low p-3 rounded-lg rounded-tl-none border border-white/5 text-sm">Query noted. Analyzing "${promptText}". Recommendation uploaded to educational stack.</div>`;
        list.appendChild(botMsg);
        list.scrollTop = list.scrollHeight;
        updateProgress(5);
    }, 1000);
}

function teacherChat() {
    const input = document.getElementById('teacher-input');
    if (!input.value.trim()) return;
    
    const chat = document.getElementById('teacher-chat-history');
    const entry = document.createElement('div');
    entry.className = "flex flex-col gap-1 items-end ml-auto max-w-[85%]";
    entry.innerHTML = `<div class="text-[10px] text-on-surface-variant font-bold">YOU</div>
                       <div class="bg-surface-container-high p-4 rounded-2xl rounded-tr-none border border-white/5 text-sm">${input.value}</div>`;
    chat.appendChild(entry);
    
    const query = input.value;
    input.value = '';
    chat.scrollTop = chat.scrollHeight;

    setTimeout(() => {
        teacherMessage(`Analyzing conceptual question: "${query}". Ensure your variables maintain secure boundaries during production arrays.`);
    }, 1000);
}

function teacherMessage(msg) {
    const chat = document.getElementById('teacher-chat-history');
    if (!chat) return;
    const entry = document.createElement('div');
    entry.className = "flex flex-col gap-2 items-start max-w-[85%] animate-in fade-in slide-in-from-bottom-2";
    entry.innerHTML = `
        <div class="text-[10px] text-tertiary-fixed-dim font-bold accent-text">AK AI EXPERT</div>
        <div class="bg-surface-container-low p-4 rounded-2xl rounded-tl-none border border-white/10 text-sm leading-relaxed">
            ${msg}
        </div>`;
    chat.appendChild(entry);
    chat.scrollTop = chat.scrollHeight;
}

function teacherResponse(type) {
    if(type === 'explain_buffer') {
        teacherMessage("Buffer overflows occur when code strings overwrite structured pointers. Always balance input lengths dynamically before processing logs.");
    } else if(type === 'scold_laziness') {
        teacherMessage("Malware payloads rely on unvalidated parameters. Implement cryptographic routines across your source scripts immediately.");
    } else {
        teacherMessage("To execute deployments smoothly, pack dependencies tightly within immutable container environments.");
    }
}

function updateProgress(amt) {
    state.progressRate = Math.min(state.progressRate + amt, 100);
    document.getElementById('progress-percent').textContent = state.progressRate + "%";
    document.getElementById('progress-bar').style.width = state.progressRate + "%";
}

function setTheme(color) {
    state.accentColor = color;"rgb(255, 10, 10)";
    let targetHex = "#00ff41";
    if (color === 'cyan') targetHex = "#00dce6";
    if (color === 'purple') targetHex = "#edb1ff";
    
    document.documentElement.style.setProperty('--accent-glow', targetHex);
    localStorage.setItem('ak-theme', color);
    renderNavs(); // re-sync active item borders
}

function setCustomBg(color) {
    document.documentElement.style.setProperty('--custom-bg', color);
}

window.onload = init;