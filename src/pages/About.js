import "./About.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import ziran from "./foto/ziran.jpg";
import citra from "./foto/citra.jpg";
import nasywa from "./foto/nasywa.jpg";

function About() {
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">MoviesZone</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex">
              <Navbar.Brand href="/home">Dashboard</Navbar.Brand>
              <Navbar.Brand href="/about">About Us</Navbar.Brand>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container">
        <h2
          className="section-title"
          style={{ margin: "10px 0", fontWeight: "bold" }}
        >
          About Us
        </h2>
        <div className="card-container">
          <div className="cont">
            <div className="card">
              <div className="card-content">
                <img src={ziran} alt="Team Member" />
                <h3>Khalif Ziran Maulana</h3>
                <p>00000071749</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <img src={citra} alt="Team Member" />
                <h3>Nadhila Citra Nur Rahmalina</h3>
                <p>00000072495</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <img src={nasywa} alt="Team Member" />
                <h3>Nasywa Naura Aulia</h3>
                <p>00000071873</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
