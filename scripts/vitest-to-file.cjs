const { spawn } = require('node:child_process')
const fs = require('node:fs')

const out = []
const err = []

const child = spawn(
  './node_modules/.bin/vitest',
  ['run', '--reporter=json', '--silent'],
  { stdio: ['ignore', 'pipe', 'pipe'] }
)

child.stdout.on('data', (d) => out.push(d))
child.stderr.on('data', (d) => err.push(d))

child.on('close', (code) => {
  let json = Buffer.concat(out).toString('utf8').trim()
  const stderr = Buffer.concat(err).toString('utf8').trim()

  if (!json) {
    json = JSON.stringify({
      success: false,
      error: stderr || `vitest exited with code ${code} and produced no JSON`
    })
  }

  try {
    fs.writeFileSync('/var/tmp/hexlet.json', json)
    process.exit(0)
  } catch (e) {
    console.error('Failed to write /var/tmp/hexlet.json:', e)
    process.exit(0)
  }
})
 
