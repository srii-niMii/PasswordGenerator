import { useState ,useCallback,useRef} from 'react'

function App() {
  const [password, setpassword] = useState("")
  const [length, setlength] = useState("8")
  const [number, setnumber] = useState(false)
  const [symbol, setsymbol] = useState(false)
  const [strength, setstrength] = useState(" Password ")

  const passwordRef=useRef(null)

  const passwordGenerator = useCallback(()=>{
     let pass = ""
     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     if(number) str+="0123456789"
     if(symbol) str+="!@#$%^&*()_+{}"
     
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setpassword(pass)
    evaluateStrength(pass)


  },[length,number,symbol,setpassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])
   
  const evaluateStrength=(pass)=>{
    let score=0
    if(pass.length>=12) score++;
    if(/[A-Z]/.test(pass)) score++;
    if(/[a-z]/.test(pass)) score++;
    if(/[0-9]/.test(pass)) score++;
    if(/[!@#$%^&*()_+{}]/.test(pass)) score++;

    if(score<=2) setstrength("Weak");
    else if(score===3||score===4) setstrength("Medium");
    else setstrength("Strong");
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400 p-4 text-xl font-bold  ">
      <div className="w-full max-w-md bg-black p-6 rounded-lg shadow-md border">
        <div className="text-white text-center text-3xl mb-14 mt-2">Password Generator</div>
        <div className='flex shadow rounded-lg overflow-hidden mb-5' >
          <input type="text" value={password} className='outline-none w-full p-2 font-semibold' placeholder='Generated password' readOnly ref={passwordRef} />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white p-3 cursor:pointer hover:bg-blue-900'>Copy</button>
        </div>

        <div>
          <label className='mt-1 font-semibold text-white '>Strength : 
            <span className={
              strength === "Weak" ? "text-red-500" :
                strength === "Medium" ? "text-yellow-500" :
                  strength === "Strong" ? "text-green-500" : "text-gray-600"
            }> {strength} 
            </span> </label>
        </div>

        <label className="block mb-2 mt-10 font-medium text-white ">Length : {length}</label>
        <input type="range" min={6} max={32} value={length}
          onChange={(e) => setlength(e.target.value)}
          className='w-full mb-4 cursor-pointer' />

        <div className='flex gap-x-16 font-medium mb-5'>
          <div className='flex items-center gap-2 mb-2 '>
            <input type="checkbox" defaultChecked={number} id='numberInput'
              onChange={() => {
                setnumber((prev) => !prev);
              }} className='scale-150 accent-blue-400 cursor-pointer'/>
            <label className='text-white ' > Include Number</label>
          </div>

          <div className='flex items-center gap-2 mb-2'>
            <input type="checkbox" defaultChecked={symbol} id='numberInput'
              onChange={() => {
                setsymbol((prev) => !prev);
              }} className='scale-150  accent-blue-400 cursor-pointer'/>
            <label className='text-white '> Include Symbol</label>
          </div>
        </div>

        <button onClick={passwordGenerator} className='w-full bg-blue-700 text-white p-2 rounded cursor-pointer text-2xl font-medium mb-14 mt-5 hover:bg-blue-900'>Generate Password</button>

      </div>
    </div>

  )
}

export default App
