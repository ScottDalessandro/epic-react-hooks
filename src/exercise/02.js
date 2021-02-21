// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

/*
  - Convention: Custom Hooks start with "use"
  - What makes a custom hook a CH is that they use other hooks within the function, such as useState and useEffect

*/
function useLocalStorage(
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage) // All values are stringified, so we can grab the value in localStorage
      // and parse the value to get the proper data-type.
    }
    // this allows a function to be passed as the defaultValue. This is advantageous in the event a value
    // is comp. expensive.
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = React.useRef(key) // provides an object that can be mutated without triggering a re-render.
  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    window.localStorage.setItem(key, serialize(state))
  }, [state, key])
  return [state, setState, serialize]
}
function Greeting({initialName = ''}) {
  console.log('Greeting render')
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
