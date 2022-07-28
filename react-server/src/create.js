const fs = require('fs')
const ora = require('ora')
const download = require('download-git-repo')
const { successLog, errorLog } = require('./utils/log.js')

const cwd = process.cwd()
const projectName = process.argv[2] || 'react-app'
const destination = `${cwd}/${projectName}`

const checkFolder = () => {
  if (fs.existsSync(destination)) {
    errorLog(destination + ' has already exists, please create project with new name')
    process.exit(1)
  }
}

const create = () => {
  checkFolder()
  const spinner = ora()
  spinner.text = '正在下载模板...'
  spinner.start()
  download(
    'direct:ssh://git@git.sankuai.com/~changminjie/react-template.git',
    destination,
    { clone: true },
    function (err) {
      if (err) {
        spinner.fail('模板下载失败')
        errorLog(err)
      } else {
        spinner.succeed('模板下载成功')
        successLog('项目初始化完成')
      }
    }
  )
}

create()
