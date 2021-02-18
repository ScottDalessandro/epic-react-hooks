// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  const [name, setName] = React.useState(
    /*
      Reading from localStorage is a synchronous call and can be expensive.
      Since this is expensive, you can pass a function to useState which is only
      called the first time the Greeting Component is rendered, all renders after
      the initial will by pass running useState since the argument is a function.

      If you were passing a single value into useState (such as a string/number) it
      is acceptalbe to pass a single value into useState since this is not an expensive
      operation.
    */
    () => window.localStorage.getItem('name') || initialName,
  )

  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  })

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
  return <Greeting />
}

export default App
