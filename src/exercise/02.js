// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

/*
  useLocalStorage
    - Acts like React.useState, except it can also save to local storage.
    - Calls React.useState to hydarte the value (since a cb is passed to useState, it only runs on the first render)
    - When the value updates, React.useEffect is called and updates the value in state using the setItem function. useEffect
    also updates localStorage. 
      - React.useEffect only exectues on the initial load and when values are updated in its dependency array
    - All values saved to localStorage are serialized.
*/
function useLocalStorage(
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    console.log('useState invoked')
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      console.log('DESERIALIZED')

      return deserialize(valueInLocalStorage) // All values are stringified, so we can grab the value in localStorage
      // and parse the value to get the proper data-type.
    }
    // this allows a function to be passed as the defaultValue. This is advantageous in the event a value
    // is comp. expensive.
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  // console.log(state, setState)

  const prevKeyRef = React.useRef(key) // provides an object that can be mutated without triggering a re-render.
  React.useEffect(() => {
    console.log('useEffect invoked')
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    window.localStorage.setItem(key, serialize(state))
  }, [state, key, serialize])
  return [state, setState]
}
function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorage('name', initialName)
  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  const [count, setCount] = React.useState(0)
  return (
    <>
      <button onClick={() => setCount(previousCount => previousCount + 1)}>
        {count}
      </button>
      <Greeting />
    </>
  )
}

export default App
