import NavBar from "../shared/navbar/NavBar";
import UploadVideo from "./uploadVideo/uploadVideo";
import VideoList from "./videoList/videoList";

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <UploadVideo />
        <VideoList />
      </div>
    </>
  );
};

export default Home;
