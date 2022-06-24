import './App.css';
import {useEffect,useState} from 'react';
const axios = require('axios').default;


function App() {
  const [options,setOptions] = useState([]);
  const [to,setTo] = useState('en');
  const [from,setFrom] = useState('en');
  const [input,setInput] = useState('');
  const [output,setOutput] = useState('');

  const translate = () =>{
    if(input==='')
    {
      setOutput('')
    }
     // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

     const params = new URLSearchParams();
     params.append('q',input);
     params.append('source',from);
     params.append('target',to);
     params.append('api_key','xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

     axios.post('https://libretranslate.de/translate',params,{
      headers:{
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
     }).then(res=>{
      // console.log(res.data)
      setOutput(res.data.translatedText)
     })


  };

  useEffect(()=>{
    axios.get('https://libretranslate.de/languages',{
      headers: { accept: 'application/json' },
    })
    .then((res)=>{
      // console.log(res.data);
      setOptions(res.data);
    })
  },[]);




  return (
    <div className="app">
      <h1>Language Translator</h1>
      <div className='opt'>
        From ({from}):
        <select onChange={(e)=>setFrom(e.target.value)}>
          {
            options.map((opt)=>(
              <option key = {opt.code} value = {opt.code}>
                {opt.name}
              </option>
            ))
          }
        </select>
        To ({to}):
        <select onChange={(e)=>setTo(e.target.value)}>
          {
            options.map((opt)=>(
              <option key = {opt.code} value = {opt.code}>
                {opt.name}
              </option>
            ))
          }
        </select>
      </div>
      <div className="inp">
      <div>
        <textarea  onInput={(e)=>setInput(e.target.value)}></textarea>
      
      </div>
      <div>
        <textarea  value = {output}></textarea>
        
      </div>
      </div>
      <div>
        <button className='btn' onClick={e=>translate()}>Translate</button>
      </div>
     
    </div>
  );
}

export default App;
