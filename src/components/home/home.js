import NavBar from "../shared/navbar/NavBar";
import UploadVideo from "./uploadVideo/uploadVideo";
import VideoList from "./videoList/videoList";
import { useState, useEffect } from "react";
import axios from "axios";
import urls from "../shared/urls";
import style from "./home.module.css";
import { toast } from "react-toastify";

const Home = () => {
  const [videos, setVideos] = useState(null);

  const fetchAllVideos = async () => {
    try {
      const res = await axios.get(urls.video.all);
      if (res.data) {
        setVideos(res.data.videos);
        console.log(res.data.videos);
      }
    } catch (error) {
      console.log(error);
      if (error && error.response.data) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchAllVideos();
  }, []);

  return (
    <>
      <NavBar />
      <div className={["container", style.mainContent].join(" ")}>
        <UploadVideo refetch={fetchAllVideos} />
        {videos ? (
          <VideoList videos={videos} />
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </div>
    </>
  );
};

export default Home;
