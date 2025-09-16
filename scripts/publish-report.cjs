const fileSystem = require('fs')
const pathModule = require('path')

const sourceReportPath = pathModule.resolve('tmp/hexlet.json')
if (!fileSystem.existsSync(sourceReportPath)) {
  process.exit(0)
}

const reportJsonContent = fileSystem.readFileSync(sourceReportPath, 'utf8')

const destinationReportPaths = [
  '/var/tmp/hexlet.json',
  '/var/tmp/report.json',
  '/var/tmp/results.json',
  '/var/tmp/vitest.json',
  '/var/tmp/jest.json',
]

for (const destinationPath of destinationReportPaths) {
  const destinationDirectory = pathModule.dirname(destinationPath)

  try {
    fileSystem.mkdirSync(destinationDirectory, { recursive: true })
  } catch (mkdirError) {
    if (process.env.DEBUG_PUBLISH_REPORT) {
      console.warn('[publish-report] mkdir failed:', destinationDirectory, mkdirError?.message)
    }
  }

  try {
    fileSystem.writeFileSync(destinationPath, reportJsonContent)
  } catch (writeError) {
    if (process.env.DEBUG_PUBLISH_REPORT) {
      console.warn('[publish-report] write failed:', destinationPath, writeError?.message)
    }
  }
}

