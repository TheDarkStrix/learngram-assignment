import axios from "axios";
import { useEffect, useState, useRef } from "react";
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
import { useFirstRender } from "../../shared/hooks/onlyOnce";
const VideoList = ({ videos }) => {
  const [currentVideo, setCurrentVideo] = useState(
    videos.length > 0
      ? {
          location: videos[0].location,
          name: videos[0].fileName,
        }
      : null
  );
  const firstRender = useFirstRender();
  const [searchText, setSearchText] = useState("");

  const videoRef = useRef();

  const handleCurrentVideo = ({ location, name }) => {
    setCurrentVideo({
      location: location,
      name: name,
    });
  };

  useEffect(() => {
    console.log("video was updated");
    if (!firstRender && videoRef.current && currentVideo) {
      videoRef.current.load();
      videoRef.current.scrollIntoView();
    }
  }, [currentVideo]);

  return (
    <>
      <div>
        {currentVideo ? (
          <div>
            <video width="100%" controls ref={videoRef}>
              {console.log(currentVideo.location)}
              <source src={currentVideo.location} />
            </video>
            <div className={style.currentLectureName}>{currentVideo.name}</div>
          </div>
        ) : (
          ""
        )}
      </div>

      

      {videos && videos.length > 0 ? (
<>
        <div className={style.searchContainer}>
        <InputGroup>
          <Input
            placeholder="Search"
            className={style.searchInput}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <InputGroupAddon addonType="append">
            <InputGroupText className={style.groupText}>
              <img
                width="20"
                className={style.searchIcon}
                src={search}
                alt="search_icon"
              />
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
                  className="d-flex justify-content-center p-0"
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
      ) : (
        <div className="text-center my-4">No videos to display</div>
      )}
    </>
  );
};

export default VideoList;
