import React, { useState } from 'react';
import './InputForm.css';
// import LoadingAnimation from './LoadingAnimation';
// import Background from './Background';

const transcript_video = async (video_link, setOutputValue) => {
  var formdata = new FormData();
  formdata.append("link", video_link);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  fetch("https://3c4b-31-12-82-146.eu.ngrok.io/link", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      setOutputValue(result);
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

fetch("https://3c4b-31-12-82-146.eu.ngrok.io/timestamps", requestOptions)
  .then(response => response.json())
  .then(result => {
    // console.log(result);
    
    setOutputValue(setItems(result));
  })
  .catch(error => console.log('error', error));
}



const students = [
  ["00:00:00.000", "00:00:09.840"],
  ["00:00:09.840", "00:00:13.360"],
  ["00:00:13.360", "00:00:17.840"],
  ["00:00:13.360", "00:00:17.840"],
  ["00:00:13.360", "00:00:17.840"],
  ["00:00:13.360", "00:00:17.840"],
  ["00:00:13.360", "00:00:17.840"],
  ["00:00:13.360", "00:00:17.840"],
];



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

  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);

  const handleSelectItem = (item) => {
    setSelectedItem(item[2]);
  };



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
    find_keyword(input2Value, setOutputValue, setItems);
  };

  return (
    <div className="input-form">
      {/* <Background /> */}
      <form onSubmit={handleInput1Submit}>
        <input
          type="text"
          value={input1Value}
          onChange={(event) => setInput1Value(event.target.value)}
          placeholder="Enter the url of video here"
        />
        <button type="submit">Submit1</button>
      </form>
      <form onSubmit={handleInput2Submit}>
        <input
          type="text"
          value={input2Value}
          onChange={(event) => setInput2Value(event.target.value)}
          placeholder="Enter the keyword here"
        />
        <button type="submit">Submit2</button>
        {/* {isLoading && <LoadingAnimation />} */}
      </form>
      <div className="output-box">
      
      <p>{selectedItem ? selectedItem : outputValue}</p>
      </div>


      <div className="container">
      <div className="dropdown">
        <button className="dropbtn">Intervals</button>
        <div className="dropdown-content">
          {items.map((item, index) => (
            <a key={index} onClick={() => handleSelectItem(item)}>
              {item[0].slice(0,8)} - {item[1].slice(0,8)}
            </a>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default InputForm;
