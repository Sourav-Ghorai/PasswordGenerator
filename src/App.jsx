import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  
  const [length , setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)

  const [password, setPassword] = useState("")

  //Reference hook using useRef
  const passwordRef = useRef(null)

  //Defining the function for password generating use useCallback hook for having some dependencies
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

  //defining the function for coping the generated password into clip board
  const copyToClipBoard = useCallback(()=>{
    passwordRef.current?.select()                   //Seleting the password on copying
    passwordRef.current?.setSelectionRange(0,50)    //setting range how much portion to be selected
    window.navigator.clipboard.writeText(password) //Coping the password on clip board
  }, [password])

  //Calling the passwordGenerator function using useEffect hook
  useEffect(() => {
    passwordGenerator()
  },[length, number, character, passwordGenerator])

  return (
    <>
      {/* Password Generator Main div */}
      <div className="w-full max-w-md mx-auto p-4 my-8 shadow-md rounded-lg bg-[#2E4F4F] text-[#CBE4DE]">

        {/* Heading  */}
        <h2 className="text-2xl my-4">Password Generator</h2>

        {/* Input box */}
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
            type="text" 
            value={password}
            className="outline-none w-full py-1 px-3 bg-white shadow-lg text-[#1c6965b4]"
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          {/* Copy Button */}
          <button 
            onClick={copyToClipBoard}
            className="bg-[#0e8488] hover:bg-[#3ba1a5] outline-none 
                        px-3 py-0.5 shrink-0 rounded-none text-white"
          >Copy</button>
        </div>

        {/* Functionalities of the password generator  */}
        <div className="flex flex-wrap text-sm gap-x-3 justify-center">
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

          {/* Adding Character into password  */}
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
