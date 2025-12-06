import type { Plugin } from 'vite'

export function reportIndexFiles(): Plugin {
  return {
    name: 'report-index-files',

    buildEnd() {
      // Track found index.ts files
      const indexFiles: Array<string> = []

      // Get all module ids from the build
      const modules = this.getModuleIds()

      for (const id of modules) {
        // Check if the file is named index.ts
        const moduleInfo = this.getModuleInfo(id)
        if (id.endsWith('index.ts') && !moduleInfo?.isEntry) {
          indexFiles.push(id)
        }
      }

      // Report findings
      if (indexFiles.length > 0) {
        console.error('\n📦 Found index files in build:')
        indexFiles.forEach((file) => {
          console.error(`   - ${file}`)
        })
        process.exit(1)
      }
    },
  }
}
