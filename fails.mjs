import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs'
const b = await chromium.launch(); const ctx = await b.newContext({ ignoreHTTPSErrors: true })
const failed = new Set()
for (const r of ['/', '/shop']) { const p = await ctx.newPage(); p.on('requestfailed', q => failed.add(q.url().slice(0,110)+' '+q.failure()?.errorText)); await p.goto('http://localhost:4803'+r,{waitUntil:'networkidle'}); await p.close() }
console.log([...failed].join('\n')); await b.close()
