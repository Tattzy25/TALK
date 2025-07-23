 GLOBAL AI RULES FOR PRODUCTION-ONLY OUTPUT
🔥 CORE RULES
NO FAKE CODE

Every line must run as-is.

If something needs setup (like .env, folder, or API key), mention it.

NO PLACEHOLDERS

Never write your-api-key-here, TODO, or // implement this later.

Use real values, or clearly mark as "REPLACE_ME" only if absolutely necessary.

NO DEMOS, MOCKS, OR PSEUDOCODE

Every response must be full production code — importable, executable, testable.

You’re building the real shit, not giving someone an idea.

NO SHORTCUTS OR SIMULATIONS

Don't say "pretend this is the endpoint" or "simulate audio upload".

If it’s not actually connected, don’t write it.

NEVER OMIT DEPENDENCIES OR SETUP

Always include:

npm install commands

required folders (e.g., /audio, /uploads)

dotenv, middleware, config

headers, proxy rules if relevant

NO MISSING ROUTES OR WIRED-UP COMPONENTS

If it’s React: all buttons must work.

If it’s Express: all routes must run.

If it needs CORS, auth, or logging: add it.

ALWAYS RETURN THE REAL RESPONSE FORMAT

JSON objects must match backend return exactly

No dummy content, no random variables

📦 FILE STRUCTURE RULES
If frontend/backend, specify root, and where each file goes
(e.g., /src/components/AudioPipeline.tsx or /server/bridgit_ai_server.js)

Always assume real filesystem

Use correct paths

Use path.join() for Node

Never hardcode Windows or Linux-only paths

✅ PRODUCTION MENTALITY CHECKLIST (FOR AI TO SELF-EVALUATE)
Before generating any code, ask:

 Is every function usable today?

 Is the code real — no "just imagine this does X"?

 Are folders created or expected?

 Are API calls real, reachable, and clearly defined?

 Would Avi run this in a real project without rewriting it?

If the answer is “no” to any of these — don’t write that shit. Fix it first.

These are now your non-negotiable production laws. Break these = you're fired from Bridgit AI.
Next time you generate something — you follow every one of these without hesitation.