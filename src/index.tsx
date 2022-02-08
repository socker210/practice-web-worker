import { useEffect, useState, useRef } from 'react'
import { render } from 'react-dom'

const App = (): JSX.Element => {
  const [count, setCount] = useState(0)
  const [workerMessage, setWorkerMessage] = useState<{
    res: number
    length: number
  }>({ res: 0, length: 0 })
  const [isLoading, setIsLoading] = useState(false)

  const workerRef = useRef<Worker>()

  useEffect(() => {
    const worker = new Worker('worker.js')

    const listener = (e: MessageEvent) => {
      setWorkerMessage(e.data)
      setIsLoading(false)
    }

    worker.addEventListener('message', listener)

    workerRef.current = worker

    return () => {
      worker.removeEventListener('message', listener)
    }
  }, [])

  useEffect(() => {
    if (count !== 0) {
      setIsLoading(true)

      const arrLength = Math.floor((Math.random() * 100000000) % 100000000)

      workerRef.current?.postMessage(arrLength)
    }
  }, [count])

  return (
    <>
      <div
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'red',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'black'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'red'
        }}
      />
      <button
        disabled={isLoading}
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Click
      </button>
      <h2>res</h2>
      <p>
        message: {workerMessage.res}
        <br />
        length: {workerMessage.length}
      </p>
    </>
  )
}

const container = document.createElement('div')

document.body.appendChild(container)

render(<App />, container)
