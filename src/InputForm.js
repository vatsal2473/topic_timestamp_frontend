import React, { useState } from 'react';
import './InputForm.css';
// import LoadingAnimation from './LoadingAnimation';
// import Background from './Background';

import Loader from './reusedElements/Loader';

const transcript_video = async (video_link, setOutputValue, setLoading) => {
  var formdata = new FormData();
  formdata.append("link", video_link);
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  setLoading(true);
  fetch("https://2860-45-153-35-178.au.ngrok.io//link", requestOptions)
    .then(response => response.text())
    .then(result => {
      // console.log(result);
      setLoading(false);
      // setOutputValue(result);
    })
    .catch(error => console.log('error', error));
}

const find_keyword = async (keyword, setOutputValue, setItems) => {
  var formdata = new FormData();
  formdata.append("keyword", keyword);
  formdata.append("number", 15);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch("https://2860-45-153-35-178.au.ngrok.io//timestamps", requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result);
      setOutputValue(result);
      setItems(result);
      // console.log(JSON.stringify(result));
    })
    .catch(error => console.log('error', error));
}





function InputForm() {

  // const [isLoading, setIsLoading] = useState(false);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setIsLoading(true);

  //   // Simulate an asynchronous request
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // }
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);

  const handleSelectItem = (item) => {
    setSelectedItem(item[2]);
  };



  const [input1Value, setInput1Value] = useState('');
  const [input2Value, setInput2Value] = useState('');
  const [outputValue, setOutputValue] = useState([]);

  const handleInput1Submit = (event) => {
    event.preventDefault();
    transcript_video(input1Value, setOutputValue, setLoading);
    // console.log(input1Value);
    // handle input1 form submit here
  };

  const handleInput2Submit = (event) => {
    event.preventDefault();
    find_keyword(input2Value, setOutputValue, setItems);
  };

  return (
    <div className="input-form">
      {/* <Background /> */}
      <Loader state={loading} />
      <form onSubmit={handleInput1Submit}>
        <input
          type="text"
          value={input1Value}
          onChange={(event) => setInput1Value(event.target.value)}
          placeholder="Enter the url of video here"
        />
        <button className='submit1' type="submit">Submit1</button>
      </form>
      <form onSubmit={handleInput2Submit}>
        <input
          type="text"
          value={input2Value}
          onChange={(event) => setInput2Value(event.target.value)}
          placeholder="Search for a topic"
        />
        <button type="submit">Submit2</button>
        {/* {isLoading && <LoadingAnimation />} */}
      </form>
      <div className="output-box" style={{ width: "900px", height: "500px" }}>
  <ul>
    {outputValue.map((item, index) => (
      <li key={index}>
        <p>
          <strong>Filename: </strong> {item.filename}
        </p>
        {item.longest_interval && (
          <p>
            <strong>Start: </strong> {item.longest_interval.start} <br />
            <strong>End: </strong> {item.longest_interval.end} <br /> <br/>
            <strong>Transcript: </strong> {item.longest_interval.text} <br />
          </p>
        )}
      </li>
    ))}
  </ul>
</div>


    </div>
  );
}

export default InputForm;
