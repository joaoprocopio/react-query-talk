function randomNumber(max) {
  return Math.floor(Math.random() * max)
}

async function delay(ms) {
  await new Promise((resolve) => {
    setTimeout(() => resolve(), ms)
  })
}

module.exports = {
  randomNumber,
  delay,
}
