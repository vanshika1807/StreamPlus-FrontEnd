
import { useState } from "react";
import videoLogo from "../assets/upload-logo.png";
import { Button, Card, TextInput, Label, Textarea, Progress, Alert } from "flowbite-react";
import { toast } from 'react-hot-toast';

import axios from 'axios';


function VideoUpload() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [meta, setMeta] = useState({
    title: "",
    description: "",
  });
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  function handleFileChange(event) {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  }

  function formFieldChange(event) {
    setMeta({
      ...meta,
      [event.target.name]: event.target.value
    });
  }

  function handleForm(formEvent) {
    formEvent.preventDefault();
    if (!selectedFile) {
      alert("Please select a File.")
      return;
    }
    //submit the file to the server
    saveVideoToServer(selectedFile, meta);
  }

  function resetForm() {
    setMeta({
      title: "",
      description: "",
    });
    setSelectedFile(null);
    setUploading(false);
    //setMessage("");
  }

  async function saveVideoToServer(video, videoMetaData) {
    setUploading(true);
    //api call

    try {
      let formData = new FormData();
      formData.append("title", videoMetaData.title);
      formData.append('description', videoMetaData.description);
      formData.append("file", selectedFile);

      let response = await axios.post(
        'http://localhost:8081/api/v1/videos',
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total

            );
            console.log(progress);
            setProgress(progress);
          },
        }
      );
      console.log(response);
      setProgress(0);

      setMessage("File uploaded " + response.data.videoId);
      setUploading(false);
      toast.success("File Uploaded successfully!");
      resetForm();
    } catch (error) {
      console.log(error);
      setMessage("Error in uploading File");
      setUploading(false);
      toast.error("File cannot be uploaded!!");
    }
  }


  return (<div className="text-white">
    <Card className="flex flex-col item-center justify-center">
      <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Upload Your Video
      </h1>
      <div>
        <form noValidate className="flex flex-col space-y-6" onSubmit={handleForm}>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="video-title" value="Enter Title" />
            </div>
            <TextInput
            id="video-title"
              value={meta.title}
              onChange={formFieldChange}
              name="title"
              placeholder="Ex.: Video Lectures on Cloud Computing" />
          </div>

          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="video-description" value="Enter Description" />
            </div>
            <Textarea
              value={meta.description}
              onChange={formFieldChange}
              name="description"
              id="video-description"
              placeholder="Ex.: Tell the users about your video.." required rows={1} />
          </div>

          <div className="flex items-center space-x-5 justify-center">

            <div className="shrink-0">
              <img className="h-16 w-16 object-cover rounded-full" src={videoLogo} alt="Current profile photo" />
            </div>
            <label className="block" htmlFor="file-upload">
              <span className="sr-only">Choose video file</span>
              <input
                id="file-upload"
                name="file"
                onChange={handleFileChange}
                type="file"
                className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-grey-700
      hover:file:bg-violet-100
    "/>
            </label>

          </div>

          <div className="">
            {uploading && (
              <Progress

                progress={progress}
                textLabel="Uploading"
                size={"lg"}
                labelProgress
                labelText
              />
            )}
          </div>



          <div className="">
            {message && (
              <Alert color={"success"}
                rounded 
                withBorderAccent
                onDismiss={() => {
                  setMessage("");
                }}>

                <span className="font-medium">Success alert! </span>
                {message}

              </Alert>
            )}
          </div>



          <div className="flex justify-center">
            <Button disabled={uploading} type="submit" style={{ borderRadius: '0' }}>Upload</Button>
          </div>


        </form>
      </div>

    </Card>
  </div>

  );

}

export default VideoUpload;