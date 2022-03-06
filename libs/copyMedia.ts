// ***********************************************************
// 生成されたスクリーンショットと動画ファイルをレポートディレクトリにコピーする
// ***********************************************************
import { cp } from 'fs/promises'
import { join } from 'path'

const screenshotsDir = './cypress/result/screenshots'
const videosDir = './cypress/result/videos'
const reportDir = './cypress/report'

const main = async () => {
  const screenshots = cp(screenshotsDir, join(reportDir, 'screenshots'), { recursive: true })
  const videos = cp(videosDir, join(reportDir, 'videos'), { recursive: true })
  await Promise.all([screenshots, videos]).catch((error) => {
    if (error.code === 'ENOENT') {
      return
    }
    throw error
  })
}

main()
