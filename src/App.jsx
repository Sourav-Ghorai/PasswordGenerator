import { useCallback, useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const [length , setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)

  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number){
      str += "0123456789"
    }
    if(character){
      str += "!@#$%^&()_{}[]\|?<>"
    }
    for(let i = 0; i<length; i++){
      let index = Math.floor((Math.random() * str.length))
      pass += str.charAt(index)
    }

    setPassword(pass)

  },[length, number, character, setPassword])

  useEffect(() => {
    passwordGenerator()
  },[length,number, character, passwordGenerator])

  return (
    <>
      {/* Password Generator Main div*/}
      <div className="w-full max-w-md mx-auto p-4 my-8 shadow-md rounded-lg bg-gray-600 text-orange-500">

        {/* Heading  */}
        <h2 className="text-2xl text-white my-4">Password Generator</h2>

        {/* Input box */}
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
            type="text" 
            value={password}
            className="outline-none w-full py-1 px-3 bg-slate-200"
            placeholder='Password'
            readOnly
          />
          {/* Copy Button */}
          <button className="bg-blue-500 outline-none px-3 py-0.5 shrink-0 rounded-none text-white">Copy</button>
        </div>

        {/* Functionalities of the password generator  */}
        <div className="flex flex-wrap text-sm gap-x-2 justify-center">
          {/* Setting length */}
          <div className="flex items-center gap-x-1">
            <input 
              type="range" 
              min={5}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>

          {/* Adding number into the password  */}
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox" 
              defaultChecked = {number}
              id='numberInput'
              onChange={()=>{
                setNumber((prev)=>!prev)
              }}
            />
            <label>Numbers</label>      
          </div>

          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox" 
              id="characterInput"
              defaultChecked={character}
              onChange={()=>{
                setCharacter((prev) => !prev)
              }}
            />
            <label>Characters</label>
          </div>

        </div>             
      </div>
    </>
  )
}

export default App
