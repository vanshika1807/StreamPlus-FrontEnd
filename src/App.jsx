import { useState } from 'react'
import reactLogo from './assets/react.svg';
import viteLogo from './assets/react.svg';
import './App.css';
import VideoUpload from './componets/VideoUpload';
import { Toast, TextInput, Button } from 'flowbite-react';
import { Toaster } from "react-hot-toast";
import VideoPlayer from './componets/VideoPlayer';

function App() {
  const [count, setCount] = useState(0);
  const [fieldValue, setFieldValue]  =  useState(null);
  const [videoId, setVideoId] = useState(
    "fed9b13a-e84f-401e-b04d-1b58026d3381"
  );

  function playVideo(videoId){
    setVideoId(videoId);
  };



  return (
    <>
      <Toaster />

      <div className="flex items-center justify-center py-9">
        <img src="/src/assets/S.png" alt="StreamPlus Logo" className="w-36 h-auto" />

        {/*<img src="/src/assets/S.png" alt="StreamPlus Logo" className="w-36 h-auto" /> */}

      </div>
      <div className="flex flex-col  items-center space-y-5 flex justify-center">
        <h1 className="font-extrabold text-5xl dark:text-gray-100 ">
          Welcome to Stream<span className="font-extrabold text-5xl dark:text-blue-300">Plus</span>
        </h1>

        <div className="flex w-full justify-around">
          <div>
            <h1 className="text-white text-center mt-2">Playing Video</h1>
            {/*<video
              style={{
                width: 500,
              }}
              src={`http://localhost:8081/api/v1/videos/stream/range/${videoId}`}
              controls
            ></video>*/}

            {/* <video
              id="my-video"
              className="video-js"
              controls
              preload="auto"
              width="640"
              //height="264"
              
              data-setup="{}"
            >
              <source src={`http://localhost:8081/api/v1/videos/stream/range/${videoId}`} type="video/mp4" />
              
              <p className="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
                <a href="https://videojs.com/html5-video-support/" target="_blank"
                >supports HTML5 video</a
                >
              </p>
            
            </video> */}


            
            <div>
              <VideoPlayer src={`http://localhost:8081/api/v1/videos/${videoId}/master.m3u8`}></VideoPlayer>
            </div>

          </div>
          <VideoUpload />
        </div>
      </div>

      <div className="my-4">
              <TextInput  
              onClick={(event)=>{
                setFieldValue(event.target.value);
              }}
              style={{
                width: "600px",
                marginLeft:"500px",
                borderRadius: "0px",
              }
              }
              placeholder="Enter Video Id here" 
              name="video_id_field" 
             
              />
              <Button 
              onClick={()=>{
                setVideoId(fieldValue);
              }}
              style={{
                marginLeft:"750px",
                marginTop:"10px",
                borderRadius: "0px",
              }}
              
              >Play</Button>
            </div>

    </>
  );
}

export default App
