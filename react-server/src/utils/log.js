const logSymbols = require('log-symbols')

exports.errorLog = (text) => {
  console.log(logSymbols.error, text)
}

exports.warningLog = (text) => {
  console.log(logSymbols.warning, text)
}

exports.infoLog = (text) => {
  console.log(logSymbols.info, text)
}

exports.successLog = (text) => {
  console.log(logSymbols.success, text)
}
