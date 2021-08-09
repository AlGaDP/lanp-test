import React, { useState } from 'react';
import './App.css';
import emptyLogo from './img/CompanyLogo.png';

function App() {
  const [drag, setDrag] = useState(false);
  const [src, setSrc] = useState(null);

  function dragStartHandler(e) {
    e.preventDefault()
    setDrag(true)
  }

  function dragLeaveHandler(e) {
    e.preventDefault()
    setDrag(false)
  }

  function onDropHandler(e) {
    e.preventDefault()
    let files = [...e.dataTransfer.files]
    let reader = new FileReader();

    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      setSrc(e.target.result);
    }

    setDrag(false)
  }

  function handleFileInput(e) {
    e.preventDefault();
    let files = e.target.files;
    let reader = new FileReader();

    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      setSrc(e.target.result);
    }
  }


  return (
    <div className="App">
      <div className='logoTitle'>Company Logo</div>
      <div className='logoDescription'>Logo should be square, 100px size and in png, jpeg file format.</div>
      <hr />

      {drag
        ? <div className='drop-area'
          onDragStart={e => dragStartHandler(e)}
          onDragLeave={e => dragLeaveHandler(e)}
          onDragOver={e => dragStartHandler(e)}
          onDrop={e => onDropHandler(e)}
        >drop here
        </div>
        : <div className='prevDrop'
          onDragStart={e => dragStartHandler(e)}
          onDragLeave={e => dragLeaveHandler(e)}
          onDragOver={e => dragStartHandler(e)}
        >

          {(src == null) ? (
            <div className='logo'>
              <img className='logoImg' src={emptyLogo} alt=''></img> <br />
              <span className='signatureOne'>Drag & drop here</span> <br />
              <span className='signatureTwo'>- or -</span> <br />
              <label className='signatureЕhree'>
                Select file to upload
                <input type="file" onChange={handleFileInput} />
              </label>
            </div>
          ) : (
            <div className='logo'>
              <img className='logoImg' src={src} alt='userLogo'></img> <br />
              <span className='signatureOne'>Drag & drop here to replace</span> <br />
              <span className='signatureTwo'>- or -</span> <br />
              <label className='signatureЕhree'>
                Select file to replace
                <input type="file" onChange={handleFileInput} />
              </label>
            </div>)}

        </div>}
    </div>
  );
}


export default App;
