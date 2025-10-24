import {useState, useCallback , useEffect, useRef} from "react";
function App(){
  const [length, setLength] = useState("8");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [splCharAllowed, setSplCharAllowed] = useState(false);
  const[password,setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(splCharAllowed) str+="!@#$%^&*-_+=[}{}~`"

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char); 
      console.log(char,pass);
    }

    setPassword(pass)
  }, [length, numberAllowed, splCharAllowed, setPassword])    //setPassword -> used here for optimization

const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select();
  // passwordRef.current?.setSelectionRange(0,8)   //to select the part the string
  window.navigator.clipboard.writeText(password)
}, [password])


useEffect(()=>{
  passwordGenerator()
},[length, numberAllowed, splCharAllowed, passwordGenerator])  

  return(
  <div className="w-screen h-screen bg-black p-25">
     <div className="w-full  max-w-lg mx-auto shodaw-md rounded-lg px-4 py-2 my-auto bg-gray-700">
     
           <h1  className="text-white text-2xl text-center my-4 font-bold">Password Generator</h1>

           <div className="flex  shadow-md rounded-lg overflow-hidden mb-4">
            
             <input
               type="text"
              placeholder="password"
              value={password}
              className="outline-none text-orange-500 w-full py-1 px-3 bg-white"
              readOnly
             ref={passwordRef}
             />

             <button
             onClick = {copyPasswordToClipboard}
              className="text-white bg-indigo-500 outline-none px-3 py-0.5 shrink-0 hover:bg-indigo-700"
             >copy</button>
             </div>

            <div className="flex text-sm gap-x-2">  
             
              <div className="flex items-center gap-x-1">
                 <input
                className="text-white cursor-pointer"
                 type="range"
                 min={8}
                 max={100}
                value={length}
                onChange={(e)=>{setLength(e.target.value)}}
               
   
               />
               <label className="text-orange-400">Length: {length}</label>
              </div>
              <div className="flex items-center gap-x-1">
                <input
                 type="checkbox"
                 id="numberInput"
                 defaultChecked={numberAllowed}
                 onChange={()=>{
                  setNumberAllowed ((prev) => !prev);
                 }}
                
                 
                />
                <label htmlFor="numberInput"  className="text-orange-400">Number</label>
              </div>

              <div className="flex items-center gap-x-1 my-2">
                <input
                 type="checkbox"
                 id="splCharInput"
                 defaultChecked={splCharAllowed}
                 onChange={()=>{
                  setSplCharAllowed ((prev) => !prev);
                 }}
                
                 
                />
                <label htmlFor="splCharInput"  className="text-orange-400">specialCharacter</label>
              </div>
              
            </div> 


           </div>
     </div>
    
  )
}

export default App;