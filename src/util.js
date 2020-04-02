module.exports = {
  formatCode: (code) => {
    const prefix = code.startsWith('6') ? '1' : '0'
    return prefix + code
  }
}
