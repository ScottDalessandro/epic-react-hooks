// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  console.log('rendered')
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
    console.log('calling useEffect render')
    // no need to update localStorage if the name doesn't change.
    window.localStorage.setItem('name', name)
  }, [name, 'name']) // dependency array only re-renders useEffect when the listed
  // dependencies are updated.
  // React does a shallow comparasion, so object A and B will always re-render.

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
