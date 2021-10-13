import style from "./landing.module.css";
import { Row, Col } from "reactstrap";
import Authentication from "./authentication/authentication";
const Landing = () => {
  return (
    <>
      <div className={style.main}>
        <Row>
          <Col md={6}>
            <Authentication />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Landing;
