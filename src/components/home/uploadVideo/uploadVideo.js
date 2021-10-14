import style from "./uploadVideo.module.css";
import { useRef, useState } from "react";
import { Row, Col, FormGroup, Label, Input, Progress } from "reactstrap";
import axios from "axios";
import urls from "../../shared/urls";
import wrong from "../../../assets/images/close.svg";

const UploadVideo = ({ refetch }) => {
  const hiddenFileInput = useRef(null);
  const [currentFileUpload, setCurrentFileUpload] = useState(null);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(null);

  const handleUploadClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleChange = (event) => {
    console.log(
      event.target.files[0].size,
      (event.target.files[0].size / 1048576).toFixed(2)
    );
    if ((event.target.files[0].size / 1048576).toFixed(2) > 1000) {
      setError("Please choose video less than 1000MB");
    } else {
      setCurrentFileUpload(event.target.files[0]);
    }
  };

  const removeVideo = (e) => {
    e.stopPropagation();
    setCurrentFileUpload(null);
    setProgress(null);
  };

  const handleVideoUpload = async () => {
    let formData = new FormData();
    formData.append("file", currentFileUpload);
    formData.append("customFileName", currentFileUpload.name);
    try {
      const res = await axios.post(urls.video.uploadVideo, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (data) => {
          console.log(Math.round((100 * data.loaded) / data.total));
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      });
      if (res.data) {
        console.log(res.data);
        refetch();
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  return (
    <div className={style.uploadContainer}>
      <Row>
        <Col md={9}>
          <FormGroup>
            <div className={style.uploader} onClick={() => handleUploadClick()}>
              <div>
                {!error
                  ? currentFileUpload
                    ? currentFileUpload.name
                    : "Choose"
                  : error
                  ? error
                  : ""}
              </div>
              <Input
                innerRef={hiddenFileInput}
                type="file"
                name="upload"
                id="upload"
                accept="video/*"
                placeholder="with a placeholder"
                onChange={handleChange}
                style={{ display: "none" }}
              />
              {currentFileUpload ? (
                <div onClick={(e) => removeVideo(e)} className={style.cancel}>
                  <img src={wrong} alt="cancel_icon" />
                </div>
              ) : (
                ""
              )}
            </div>
          </FormGroup>
        </Col>
        <Col md={3}>
          <button className={style.blueBtn} onClick={() => handleVideoUpload()}>
            Upload lecture
          </button>
        </Col>
      </Row>
      {progress && (
        <div className="my-3">
          <Progress value={progress}>
            {progress !== 100 ? `${progress}%` : "Completed"}
          </Progress>
        </div>
      )}
    </div>
  );
};

export default UploadVideo;
