const fs = require('fs')
const path = require('path')
const colors = require('colors')
const exec = require('child_process').exec

function removeLib() {
  fs.rmSync(path.join(__dirname, '../lib'), { recursive: true })
  console.log('✅ 删除 lib 文件夹成功'.green)
}

function compiler() {
  console.log('🐬 正在编译 ts 代码...'.blue)
  exec('tsc', {
    encoding: 'utf8',
    cwd: path.join(__dirname, '../')
  }, (err, stdout, stderr) => {
    if (err) {
      console.error('❌ 编译失败'.red, error)
      console.error('❌ 错误信息'.red, stdout, stderr)
    } else {
      console.log('🐈 正在复制 less 文件'.blue)
      findLess('../src')
      console.log('✅构建完成'.green)
    }
  })
}

function findLess(dir) {
  const files = fs.readdirSync(path.join(__dirname, dir))
  files.forEach(item => {
    const fullPath = path.join(__dirname, dir, item)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      findLess(path.join(dir, item))
    } else {
      const fileType = path.extname(fullPath)
      if (fileType == '.less') {
        copyLess('../lib', fullPath)
      }
    }
  })
}

function copyLess(outdir, lessPath) {
  const splitLessPath = lessPath.split('src')[1]
  const targetPath = path.join(__dirname, outdir, splitLessPath)
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(path.dirname(targetPath), { recursive: true })
  }
  fs.copyFileSync(lessPath, targetPath)
}

removeLib()
compiler()
i9hZ8REFQXx47v2LmhU3lSuyoCoR4o2IEGuigg