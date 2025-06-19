<h1>⚡ FluxKart Identity Resolver</h1>

<blockquote>
  <p><em>"When this baby hits 88 miles per hour... you're gonna see some serious contact merging!"</em> – Dr. Emmett Brown</p>
</blockquote>

<p>Welcome, time-traveling devs! This is the early-stage boot-up of the <strong>FluxKart Identity Resolver</strong> — our attempt to untangle the identity of a certain brilliant but secretive scientist (yes, <strong>Doc Brown</strong>), who keeps making purchases with different emails and phone numbers. 🕵️‍♂️</p>

<p><strong>FluxKart</strong> is integrating with <strong>Bitespeed</strong> to make sure we recognize our loyal (and occasionally interdimensional) customers — no matter how many disguises they use across the timeline.</p>

<hr />

<h2>🧪 Project Status</h2>
<ul>
  <li>✅ Project initialized</li>
  <li>✅ Core service logic to identify & merge contact data added</li>
  <li>✅ API endpoint /api/v1/identify (POST) live</li>
  <li>🚧 More features & test coverage coming soon</li>
</ul>

<hr />

<h2>✨ Features (so far)</h2>

<ul>
  <li>🔗 <strong>Contact Resolver Service</strong>: Resolves multiple phone/email entries and links them under a primary identity — even when Doc tries to outsmart us!</li>
  <li>🧠 Smart linking logic: Prevents duplicates and keeps the space-time contact database stable</li>
  <li>🧼 Clean, testable TypeScript code with robust error handling</li>
</ul>

<hr />

<h2>📦 Installation & Setup</h2>

<pre><code>git clone https://github.com/kuldeep-shr/bitespeed-backend-task.git
yarn install
yarn dev
</code></pre>

<p>Make sure you have <code>Node.js</code> and <code>Yarn</code> installed globally. The project uses <code>SQLite</code> by default (via TypeORM), so no DB setup required to get started.</p>

<hr />

<h2>🚀 API Endpoint</h2>

<h3>📮 POST /api/v1/identify</h3>

<p><strong>Description:</strong> Identifies and links a contact using email or phone number. Returns a unified structure of all related contacts.</p>

<h4>🔸 Request Body (JSON)</h4>

<pre><code>{
  "email": "doc.brown@fluxkart.com",
  "phoneNumber": "8888888888"
}
</code></pre>

<h4>🔸 Sample Response (JSON)</h4>

<pre><code>{
  "contact": {
    "primaryContactId": 1,
    "emails": ["doc.brown@fluxkart.com"],
    "phoneNumbers": ["8888888888", "7777777777"],
    "linkedContactIds": [2]
  }
}
</code></pre>

<p><strong>Note:</strong> You must provide at least <code>email</code> or <code>phoneNumber</code>. The system intelligently links them if a match is found, otherwise creates a new contact.</p>

<hr />

<h2>🛠 Tech Stack</h2>

<ul>
  <li>🧠 <strong>Node.js</strong> + <strong>Express</strong> – our server's flux capacitor</li>
  <li>🧙 <strong>TypeScript</strong> – Strongly-typed JavaScript for safer time jumps</li>
  <li>🧱 <strong>TypeORM</strong> – Elegant TypeScript ORM for entity magic</li>
  <li>🗂️ <strong>SQLite</strong> – Lightweight DB to store Doc’s contact puzzle pieces</li>
  <li>🧪 <strong>Jest</strong> – to make sure our code doesn’t break the space-time continuum</li>
  <li>⚙️ <strong>Yarn</strong> – because package management should be fast (like 88 mph fast)</li>
</ul>

<hr />

<h2>👨‍🔬 A Word from the Doc</h2>

<blockquote>
  <p><em>"Marty! If you're reading this README, you're in the right timeline. The contact resolution service is live — now let’s unify those records before we tear a hole in reality!"</em></p>
</blockquote>

<p>More APIs and features are coming soon. Until then, keep your circuits warm, your code clean, and your customers identified — even if they’re from the future.</p>

<p><strong>Great Scott!</strong> Let's do this.</p>
