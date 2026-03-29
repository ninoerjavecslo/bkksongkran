// AI Chat interface for Songkran guide
// Handles message display, Turnstile verification, and API communication

const TURNSTILE_SITEKEY = '0x4AAAAAACxlzbfzLTTpR49t';

const history: { role: 'user' | 'assistant'; content: string }[] = [];
let busy = false;
let chatTurnstileId: any = null;

// Cache static DOM elements
const msgsEl = document.getElementById('chat-messages')!;
const inputEl = document.getElementById('chat-input') as HTMLTextAreaElement;
const sendBtn = document.getElementById('send-btn') as HTMLButtonElement;
const suggsEl = document.getElementById('suggestions') as HTMLElement;

function makeAvatar(bg: string, iconName: string, iconClass: string, size: string) {
  const av = document.createElement('div');
  av.className = 'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0';
  av.style.background = bg;
  const icon = document.createElement('span');
  icon.className = `material-symbols-outlined ${iconClass}`;
  icon.style.cssText = `font-size:${size};font-variation-settings:"FILL" 1;`;
  icon.textContent = iconName;
  av.appendChild(icon);
  return av;
}

function addMessage(role: 'user' | 'bot', text: string) {
  const el = document.createElement('div');
  el.className = `flex gap-3 items-end ${role === 'user' ? 'justify-end' : ''}`;
  el.style.animation = 'slideUp 0.25s ease forwards';
  el.style.opacity = '0';

  if (role === 'bot') {
    const bubble = document.createElement('div');
    bubble.className = 'max-w-[80%] p-4 rounded-t-2xl rounded-br-2xl shadow-sm text-sm leading-relaxed';
    bubble.style.cssText = 'background:#fff;border:1px solid rgba(192,232,255,0.4);color:#003345;';
    text.split('\n').forEach((line, i) => {
      if (i > 0) bubble.appendChild(document.createElement('br'));
      line.split(/\*\*(.*?)\*\*/g).forEach((part, pi) => {
        if (pi % 2 === 1) {
          const strong = document.createElement('strong');
          strong.style.color = '#006479';
          strong.textContent = part;
          bubble.appendChild(strong);
        } else if (part) {
          bubble.appendChild(document.createTextNode(part));
        }
      });
    });
    el.appendChild(makeAvatar('linear-gradient(135deg,#006479,#40cef3)', 'water_drop', 'text-white', '14px'));
    el.appendChild(bubble);
  } else {
    const bubble = document.createElement('div');
    bubble.className = 'max-w-[80%] p-4 rounded-t-2xl rounded-bl-2xl text-sm font-medium leading-relaxed liquid-gradient';
    bubble.style.color = '#fff';
    bubble.textContent = text;
    el.appendChild(bubble);
    el.appendChild(makeAvatar('rgba(192,232,255,0.5)', 'person', 'text-primary', '16px'));
  }

  msgsEl.appendChild(el);
  setTimeout(() => {
    if (role === 'bot') {
      msgsEl.scrollTop = el.offsetTop - msgsEl.offsetTop;
    } else {
      msgsEl.scrollTop = msgsEl.scrollHeight;
    }
  }, 50);
}

function addTyping(id: string) {
  const el = document.createElement('div');
  el.className = 'flex gap-3 items-end';
  el.id = id;
  const bubble = document.createElement('div');
  bubble.className = 'p-4 rounded-t-2xl rounded-br-2xl';
  bubble.style.cssText = 'background:#fff;border:1px solid rgba(192,232,255,0.4);';
  const dots = document.createElement('div');
  dots.className = 'flex gap-1.5 items-center';
  [0, 0.2, 0.4].forEach(delay => {
    const d = document.createElement('div');
    d.className = 'w-2 h-2 rounded-full bg-primary';
    d.style.animation = `bounce 1.2s ease-in-out ${delay}s infinite`;
    dots.appendChild(d);
  });
  bubble.appendChild(dots);
  el.appendChild(makeAvatar('linear-gradient(135deg,#006479,#40cef3)', 'water_drop', 'text-white', '14px'));
  el.appendChild(bubble);
  msgsEl.appendChild(el);
  msgsEl.scrollTop = msgsEl.scrollHeight;
}

function quickAsk(text: string) {
  inputEl.value = text;
  sendMessage();
}

async function sendMessage() {
  if (busy) return;
  const text = inputEl.value.trim();
  if (!text) return;

  addMessage('user', text);
  history.push({ role: 'user', content: text });
  inputEl.value = '';
  inputEl.style.height = 'auto';
  suggsEl.style.opacity = '0.5';

  busy = true;
  sendBtn.setAttribute('disabled', 'true');

  const typingId = 'typing-' + Date.now();
  addTyping(typingId);

  try {
    // Render once, reuse after
    let turnstileToken = '';
    try {
      if (!(window as any).turnstile) await new Promise<void>(r => { const t = setInterval(() => { if ((window as any).turnstile) { clearInterval(t); r(); } }, 100); });
      if (chatTurnstileId === null) {
        chatTurnstileId = await new Promise(resolve => {
          const id = (window as any).turnstile.render('#turnstile-chat', {
            sitekey: TURNSTILE_SITEKEY,
            callback: () => {},
            'refresh-expired': 'auto',
          });
          // Wait for widget to complete
          const poll = setInterval(() => {
            const t = (window as any).turnstile.getResponse(id);
            if (t) { clearInterval(poll); resolve(id); }
          }, 200);
        });
      }
      // Wait for token if not ready yet
      let waited = 0;
      while (!(turnstileToken = (window as any).turnstile.getResponse(chatTurnstileId) || '') && waited < 30000) {
        await new Promise(r => setTimeout(r, 300));
        waited += 300;
      }
    } catch { turnstileToken = ''; }

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history.slice(-20), turnstileToken }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    const reply = data.reply || 'Something went wrong — try again!';
    history.push({ role: 'assistant', content: reply });
    document.getElementById(typingId)?.remove();
    addMessage('bot', reply);
    // Reset so next message gets a fresh token
    if (chatTurnstileId !== null) (window as any).turnstile.reset(chatTurnstileId);
  } catch (err: any) {
    document.getElementById(typingId)?.remove();
    addMessage('bot', err?.message?.includes('Bot check') ? 'Security check failed — please refresh and try again.' : 'Connection issue — check your internet and try again!');
  }

  busy = false;
  sendBtn.removeAttribute('disabled');
}

inputEl?.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 120) + 'px';
});
inputEl?.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});

(window as any).sendMessage = sendMessage;
(window as any).quickAsk = quickAsk;
