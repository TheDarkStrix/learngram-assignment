import style from "./uploadVideo.module.css";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";

const UploadVideo = () => {
  return (
    <div className={style.uploadContainer}>
      <Row>
        <Col md={8}>
          <FormGroup>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="with a placeholder"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <button className={style.blueBtn}>Upload lecture</button>
        </Col>
      </Row>
    </div>
  );
};

export default UploadVideo;
