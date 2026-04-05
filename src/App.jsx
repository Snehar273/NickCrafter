import { useState, useRef, useEffect } from "react";
import "./App.css";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function countVowels(name) {
  return (name.toLowerCase().match(/[aeiou]/g) || []).length;
}
function getLastLetterEnergy(name) {
  const l = name[name.length - 1].toLowerCase();
  if ("ai".includes(l))  return "drama";
  if ("nm".includes(l))  return "night";
  if ("eo".includes(l))  return "chill";
  return "judge";
}
function getVowelVibe(count) {
  if (count <= 1) return "stone";
  if (count === 2) return "chaos";
  return "extra";
}
function getLengthKey(len) {
  if (len <= 3) return "short";
  if (len <= 5) return "mid";
  if (len <= 7) return "long";
  return "xtra";
}
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Pools: 3 separate sets per mood ─────────────────────────────────────────
//   LINE 1 → based on vowel count  (stone / chaos / extra)
//   LINE 2 → based on name length  (short / mid / long / xtra)
//   LINE 3 → based on last letter  (drama / night / chill / judge)

const POOLS = {
  funny: {
    vowel: {
      stone: [
        "Speaks once a year, but makes it count 🗿",
        "Silent mode: permanently ON 🔇",
        "Replies with 'k' and sleeps peacefully 😴",
        "Google search history cannot be shown in public 🤫",
      ],
      chaos: [
        "Has 47 browser tabs open right now 😵",
        "Sends voice notes instead of typing like a normal person 🎙️",
        "Already planning tomorrow while ruining today 🌀",
        "Overthinks the overthinking 🤯",
      ],
      extra: [
        "Enters every room like a Bollywood intro scene 🎬",
        "Makes ordering food a 20-minute event 🍕",
        "Treats every Monday like it's a movie trailer 🎭",
        "Drama level: background music starts automatically 🎵",
      ],
    },
    length: {
      short: [
        "Short name, dangerous ego 😤",
        "Tiny name, maximum chaos energy 🎪",
        "3 letters, 300 problems 💥",
      ],
      mid: [
        "Average everything except excuses 😏",
        "Suspiciously normal name, deeply unhinged person 🙂",
        "The most 'I'll do it later' name possible ⏳",
      ],
      long: [
        "Parents were feeling extra that day 😭",
        "Teacher mispronounces it every single time 📚",
        "Name takes 3 seconds to say, drama takes 0 ⚡",
      ],
      xtra: [
        "Attendance call is a whole performance 😰",
        "Introduced themselves, class got over 🔔",
        "Name is a full paragraph 📖",
      ],
    },
    last: {
      drama: [
        "Dramatic exit specialist — door always slams 🚪",
        "Cries at ads, denies it immediately 😭",
        "Every story has 3 plot twists minimum 🌪️",
      ],
      night: [
        "Best ideas at 3AM, useless by 9AM ☀️",
        "Texts 'you up?' at 2AM regularly 📲",
        "Midnight snack philosopher 🌙🍟",
      ],
      chill: [
        "Unbothered level: supreme 😌",
        "Could sleep through a fire alarm 💤",
        "Vibe so calm it's actually suspicious 🧘",
      ],
      judge: [
        "Judges everyone silently, smiles politely 😐",
        "Knows everything, says nothing 🤐",
        "Eye contact that ends careers 👁️",
      ],
    },
    titles: [
      "WiFi Password Forgetter 😂", "Last Bench Legend 🏆",
      "Screenshot Collector 📸",    "Reply Later, Forget Forever 💀",
      "Midnight Snack Specialist 🍟","Group Chat Lurker 👀",
      "Charger Borrower 🔌",         "Alarm Snooze Champion ⏰",
      "Accidental Liker Expert 😬",  "11:59 PM Submitter ⏳",
      "Serial Playlist Skipper ⏭️",  "Autocorrect Victim 📱",
    ],
  },

  savage: {
    vowel: {
      stone: [
        "Communicates in stares and sighs only 😑",
        "Stone cold, zero chill, full judging mode 🪨",
        "Talks less, destroys more 💀",
        "Silence is their weapon of mass destruction 🔇",
      ],
      chaos: [
        "Certified agent of organised chaos 🌀",
        "Plans things just to cancel them 😈",
        "Has a villain origin story for every situation 🦹",
        "Overthinks AND overreacts — double threat 💥",
      ],
      extra: [
        "Main character energy, zero self-awareness 🎬",
        "NPC who thinks they're running the simulation 🎮",
        "Delusion level: CEO of a company that doesn't exist 💼",
        "Born for the spotlight that nobody gave them 🔦",
      ],
    },
    length: {
      short: [
        "Short name, long list of enemies 😤",
        "Tiny name, massive superiority complex 👑",
        "3 letters, but acts like a whole empire 🏰",
      ],
      mid: [
        "Average name, below-average patience 😒",
        "Perfectly normal until they open their mouth 🙃",
        "Resume full of skills, attitude not listed for safety ⚠️",
      ],
      long: [
        "Parents gave a long name to warn people early 😭",
        "Name that long should come with a warning label 🚨",
        "Even their name has commitment issues 💔",
      ],
      xtra: [
        "Name so long, teachers just said 'you' 😂",
        "8+ letters = 8+ personalities inside 🌀",
        "Full name is a threat in itself 😈",
      ],
    },
    last: {
      drama: [
        "Dramatic pause before every sentence 🎭",
        "Creates tension in empty rooms 😤",
        "Leaves conversations like a season finale 📺",
      ],
      night: [
        "Dangerous after midnight, worse before noon 🌙",
        "Sends unhinged texts at 3AM, deletes by 7AM 😵",
        "Night owl with morning villain energy ☀️😈",
      ],
      chill: [
        "Unbothered icon — your problems are not their problem 😌",
        "Immune to guilt trips since birth 💉",
        "Chiller than AC set to 16°C ❄️",
      ],
      judge: [
        "Rated you 3/10 before you finished saying hello 😐",
        "Silent judging is their cardio 🏃",
        "The look they give deserves its own horror film 👁️",
      ],
    },
    titles: [
      "Main Character Who Forgot Lines 🎬",
      "Professional Excuse Generator 🏭",
      "Villain Origin Story Pending 😈",
      "CEO of Vibes, Boss of Nothing 💼",
      "Walking Plot Twist 🔀",
      "Chaos in Human Form 🌪️",
      "Part-Time Genius, Full-Time Disaster 💥",
      "NPC Convinced They're Main Character 🎮",
      "Rated Themselves 10/10 Unprompted 👑",
    ],
  },

  cute: {
    vowel: {
      stone: [
        "Soft outside, chaos inside 🌸💥",
        "Quiet but their playlist will make you cry 🎵",
        "Says little, feels everything 🥺",
        "Calm face, emotional storm inside ☁️",
      ],
      chaos: [
        "Overthinks every text for 20 minutes 💌",
        "Sends 'haha' when they're actually crying 😂😢",
        "Makes a whole plan then changes their mind 🌀",
        "Cares too much about everything and everyone 💕",
      ],
      extra: [
        "Sunshine with mood swings built in ☀️🌧️",
        "Gives big hugs and bigger anxiety 🤗😰",
        "Soft era loading... please wait 🌸",
        "Wholesomeness overloaded, handle with care 💖",
      ],
    },
    length: {
      short: [
        "Small name, huge heart energy 💕",
        "Tiny name, maximum cuteness output 🌈",
        "Short and sweet, literally 🍬",
      ],
      mid: [
        "Perfectly balanced, like a warm hug ☕",
        "Medium name, maximum comfort level 🧸",
        "The friend everyone wants to cry to 💌",
      ],
      long: [
        "Long name, even longer list of feelings 🥺",
        "Parents knew they'd be a lot of love 💝",
        "Name as warm as their energy 🌻",
      ],
      xtra: [
        "Name so long because one word wasn't enough 💕",
        "Takes time to say their name, worth every second 🌸",
        "Extra letters = extra love capacity 💖",
      ],
    },
    last: {
      drama: [
        "Cries at every movie, no exceptions 🎬😭",
        "Feels things at 100% intensity always 💫",
        "Dramatic but make it adorable 🎀",
      ],
      night: [
        "Sends good night texts to everyone they love 🌙💌",
        "Best conversations happen after midnight 🌟",
        "Nighttime thoughts = poetry nobody asked for 📝",
      ],
      chill: [
        "Radiates cozy autumn energy year-round 🍂",
        "Human form of a warm blanket ☕",
        "Somehow makes everyone feel better just by existing 🌈",
      ],
      judge: [
        "Judges gently, forgives immediately 🥺",
        "Disapproves softly with puppy eyes 👁️🐶",
        "Says 'it's fine' but it's clearly not fine 😊💔",
      ],
    },
    titles: [
      "Sunshine With Mood Swings ☀️🌧️",
      "Professional Hugger 🤗",
      "Cookie Dough Heart 🍪",
      "Soft Era Survivor 🌸",
      "Tiny Tornado of Kindness 🌈",
      "Marshmallow With Trust Issues 🍡",
      "Cozy Season Personified 🧸",
      "Rainbow After Every Rain 🌦️",
      "Crying at Ads Since Forever 😭",
    ],
  },
};

// ─── Generator with no-repeat logic ──────────────────────────────────────────

function generateNickname(name, mood, lastKey) {
  const trimmed    = name.trim();
  if (!trimmed) return null;

  const pool       = POOLS[mood];
  const vowelVibe  = getVowelVibe(countVowels(trimmed));
  const lengthKey  = getLengthKey(trimmed.length);
  const lastEnergy = getLastLetterEnergy(trimmed);

  // Try up to 8 times to avoid showing the same combo as last time
  for (let attempt = 0; attempt < 8; attempt++) {
    const line1 = pickRandom(pool.vowel[vowelVibe]);
    const line2 = pickRandom(pool.length[lengthKey]);
    const line3 = pickRandom(pool.last[lastEnergy]);
    const title = pickRandom(pool.titles);

    const key = `${line1}||${line2}||${line3}||${title}`;
    if (key !== lastKey) {
      return { name: trimmed, line1, line2, line3, title, mood, key };
    }
  }

  // Fallback: return anyway after 8 attempts (extremely rare)
  const line1 = pickRandom(pool.vowel[vowelVibe]);
  const line2 = pickRandom(pool.length[lengthKey]);
  const line3 = pickRandom(pool.last[lastEnergy]);
  const title = pickRandom(pool.titles);
  return { name: trimmed, line1, line2, line3, title, mood, key: `${line1}||${line2}||${line3}||${title}` };
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MOODS = [
  { value: "funny",  emoji: "😂", label: "Funny"  },
  { value: "savage", emoji: "😈", label: "Savage" },
  { value: "cute",   emoji: "🥺", label: "Cute"   },
];

const SURPRISE_NAMES = ["Arun","Sneha","Karthik","Priya","Rahul","Divya","Vikram","Meera","Arjun","Kavya"];

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [name,    setName]    = useState("");
  const [mood,    setMood]    = useState("funny");
  const [result,  setResult]  = useState(null);
  const [copied,  setCopied]  = useState(false);
  const [shake,   setShake]   = useState(false);
  const [animate, setAnimate] = useState(false);
  const lastKeyRef = useRef(null);   // tracks last shown combo key
  const inputRef   = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const fire = (n, m) => {
    const nick = generateNickname(n, m, lastKeyRef.current);
    if (!nick) return;
    lastKeyRef.current = nick.key;
    setAnimate(false);
    setTimeout(() => { setResult(nick); setAnimate(true); setCopied(false); }, 80);
  };

  const handleGenerate = () => {
    if (!name.trim()) { setShake(true); setTimeout(() => setShake(false), 500); return; }
    fire(name, mood);
  };

  const handleSurprise = () => {
    const n = pickRandom(SURPRISE_NAMES);
    const m = pickRandom(["funny","savage","cute"]);
    setName(n); setMood(m); fire(n, m);
  };

  const handleCopy = () => {
    if (!result) return;
    const t = `${result.name} = "${result.title}"\n• ${result.line1}\n• ${result.line2}\n• ${result.line3}`;
    navigator.clipboard.writeText(t).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const handleWhatsApp = () => {
    if (!result) return;
    const t = encodeURIComponent(`😂 My nickname:\n*${result.name}* = "${result.title}"\n• ${result.line1}\n• ${result.line2}\n• ${result.line3}\n\nGet yours 👉 https://nickcrafter.vercel.app`);
    window.open(`https://wa.me/?text=${t}`, "_blank");
  };

  return (
    <div className={`app mood-bg-${mood}`}>
      <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />

      <div className="layout">

        {/* ── LEFT ── */}
        <div className="left">
          <div className="brand">
            <span className="brand-icon">😎</span>
            <h1 className="brand-title">NickCrafter</h1>
            <p className="brand-sub">Drop your name. Get roasted.<br/><span>Lovingly 💕</span></p>
          </div>

          <div className="field">
            <span className="field-label">PICK VIBE</span>
            <div className="mood-row">
              {MOODS.map(m => (
                <button key={m.value}
                  className={`mood-btn ${mood===m.value?"active":""} m-${m.value}`}
                  onClick={() => setMood(m.value)}>
                  <span>{m.emoji}</span><span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <span className="field-label">YOUR NAME</span>
            <div className={`ibox ${shake?"shake":""}`}>
              <input ref={inputRef} className="iput" placeholder="type here..."
                value={name} maxLength={25}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key==="Enter" && handleGenerate()} />
              <span className="iicon">✍️</span>
            </div>
          </div>

          <div className="brow">
            <button className={`gbtn m-${mood}`} onClick={handleGenerate}>Generate 🚀</button>
            <button className="sbtn" onClick={handleSurprise} title="Surprise!">🎲</button>
          </div>

          <p className="footer">made with 😂 • for fun only</p>
        </div>

        {/* ── RIGHT ── */}
        <div className="right">
          {!result ? (
            <div className="empty">
              <div className="empty-blob">🤔</div>
              <p>Enter your name &amp;<br/>hit <b>Generate!</b></p>
              <div className="empty-tags">
                <span>😂 Funny</span><span>😈 Savage</span><span>🥺 Cute</span>
              </div>
            </div>
          ) : (
            <div className={`rcard ${animate?"card-in":""} rc-${result.mood}`}>
              <div className={`rbadge rb-${result.mood}`}>{result.title}</div>
              <div className="rname">{result.name}</div>
              <div className="rdivider">— analysis complete 🔬 —</div>
              <div className="rlines">
                <div className="rline"><span className="rdot">▶</span>{result.line1}</div>
                <div className="rline"><span className="rdot">▶</span>{result.line2}</div>
                <div className="rline"><span className="rdot">▶</span>{result.line3}</div>
              </div>
              <div className="arow">
                <button className="abtn copy" onClick={handleCopy}>{copied?"Copied ✅":"Copy 📋"}</button>
                <button className="abtn wa"   onClick={handleWhatsApp}>WhatsApp 💬</button>
                <button className="abtn again" onClick={handleGenerate}>Again 🔄</button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}