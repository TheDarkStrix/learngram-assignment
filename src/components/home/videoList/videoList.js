import axios from "axios";
import { useEffect, useState } from "react";
import urls from "../../shared/urls";
import {
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import play from "../../../assets/images/play.svg";
import search from "../../../assets/images/search.svg";
import style from "./videoList.module.css";
const VideoList = () => {
  const [videos, setVideos] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [searchText, setSearchText] = useState("");

  const fetchAllVideos = async () => {
    try {
      const res = await axios.get(urls.video.all);
      if (res.data) {
        setVideos(res.data.videos);
        setCurrentVideo({
          location: res.data.videos[0].location,
          name: res.data.videos[0].name,
        });
        console.log(res.data.videos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllVideos();
  }, []);

  const handleCurrentVideo = ({ location, name }) => {
    setCurrentVideo({
      location: location,
      name: name,
    });
  };

  useEffect(() => {
    console.log("video was updated");
  }, [currentVideo]);

  return (
    <>
      <div>
        {currentVideo ? (
          <video width="400" controls>
            <source src={currentVideo.location} />
          </video>
        ) : (
          ""
        )}
      </div>

      <div>
        <InputGroup>
          <Input
            placeholder="Search"
            className={style.searchInput}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <InputGroupAddon addonType="append">
            <InputGroupText className={style.groupText}>
              <img src={search} alt="search_icon" />
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <Row>
        {videos &&
          videos
            .filter((item) => {
              if (!searchText) return true;
              if (item.fileName.toLowerCase().includes(searchText)) {
                return true;
              }
            })
            .map((data) => (
              <Col
                md="6"
                key={data._id}
                className="d-flex justify-content-center"
              >
                <div
                  className={style.videoCard}
                  onClick={() =>
                    handleCurrentVideo({
                      location: data.location,
                      name: data.fileName,
                    })
                  }
                >
                  <div className={style.title}>{data.fileName}</div>
                  <div>
                    <img src={play} alt="playBtn" />
                  </div>
                </div>
              </Col>
            ))}
      </Row>
    </>
  );
};

export default VideoList;
