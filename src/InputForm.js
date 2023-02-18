import React, { useState } from 'react';
import './InputForm.css';

const transcript_video = async (video_link, setOutputValue) => {
  var formdata = new FormData();
  formdata.append("link", video_link);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch("https://23bf-31-12-82-146.eu.ngrok.io/link", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      setOutputValue(result);
    })
    .catch(error => console.log('error', error));
}

const find_keyword = async (keyword, setOutputValue) => {
  var formdata = new FormData();
  formdata.append("keyword", keyword);
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
  fetch("https://23bf-31-12-82-146.eu.ngrok.io/timestamps", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      setOutputValue(result);
    })
    .catch(error => console.log('error', error));
}

function InputForm() {
  const [input1Value, setInput1Value] = useState('');
  const [input2Value, setInput2Value] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const handleInput1Submit = (event) => {
    event.preventDefault();
    transcript_video(input1Value, setOutputValue);
    // handle input1 form submit here
  };

  const handleInput2Submit = (event) => {
    event.preventDefault();
    find_keyword(input2Value, setOutputValue);
  };

  return (
    <div className="input-form">
      <form onSubmit={handleInput1Submit}>
        <input
          type="text"
          value={input1Value}
          onChange={(event) => setInput1Value(event.target.value)}
          placeholder="Enter text for input1 here"
        />
        <button type="submit">Submit1</button>
      </form>
      <form onSubmit={handleInput2Submit}>
        <input
          type="text"
          value={input2Value}
          onChange={(event) => setInput2Value(event.target.value)}
          placeholder="Enter text for input2 here"
        />
        <button type="submit">Submit2</button>
      </form>
      <div className="output-box">{outputValue}</div>
    </div>
  );
}

export default InputForm;
