// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

/*
  - Convention: Custom Hooks start with "use"
  - What makes a custom hook a CH is that they use other hooks within the function, such as useState and useEffect

*/
function useLocalStorage(key, defaultValue = '') {
  const [state, setState] = React.useState(() => {
    console.log('useState render')
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return JSON.parse(valueInLocalStorage) // All values are stringified, so we can grab the value in localStorage
      // and parse the value to get the proper data-type.
    }
    return defaultValue
  })

  React.useEffect(() => {
    console.log('calling useEffect render')
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [state, key])
  return [state, setState]
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
