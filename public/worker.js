const laggyFunc = (arrLength) => {
  const arr = new Array(arrLength)

  for (let i = 0; i < arr.length; i++) {
    arr[i] = i
  }

  const sum = arr.reduce((acc, cur) => {
    acc += cur

    return acc
  }, 0)

  return sum
}

self.addEventListener('message', (e) => {
  const arrLength = e.data

  const res = laggyFunc(arrLength)

  self.postMessage({ res, length: arrLength })
})
