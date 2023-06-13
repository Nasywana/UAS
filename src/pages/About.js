import React, { useEffect, useState, useRef } from "react";
import "./About.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import ziran from "./foto/ziran.jpg";
import citra from "./foto/citra.jpg";
import nasywa from "./foto/nasywa.jpg";

const API_URL = "https://api.themoviedb.org/3/discover/movie";
const API_KEY = "9c37e727bcf771c5aae268e8767844cd";

function About() {
  const [setMovies] = useState([]);
  const [setLatestMovies] = useState([]);
  const [setPopularMovies] = useState([]);
  const [currentPage] = useState(1);
  const [setTotalPages] = useState(0);
  const [filterByRating] = useState(false);
  const [filterByLatest] = useState(false);
  const [setScrollPosition] = useState(0);
  const [setContainerWidth] = useState(0);
  const [sortByName] = useState(false);
  const horizontalScrollRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = `${API_URL}?api_key=${API_KEY}&with_original_language=id&region=ID&primary_release_year=2022&page=${currentPage}`;

        if (filterByRating) {
          url += "&sort_by=vote_average.desc";
        } else if (filterByLatest) {
          url += "&sort_by=release_date.desc";
        } else if (sortByName) {
          url += "&sort_by=original_title.asc";
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        const sortedMovies = data.results.sort((a, b) =>
          a.title.localeCompare(b.title, "id", { numeric: true })
        );
        setMovies(sortedMovies);
        setTotalPages(data.total_pages);

        // Set the latestMovies state with the first 5 movies from the results
        setLatestMovies(sortedMovies.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [currentPage, filterByRating, filterByLatest, sortByName]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const url = `${API_URL}?api_key=${API_KEY}&with_original_language=id&region=ID&sort_by=popularity.desc&page=1`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch popular movies");
        }

        const data = await response.json();
        setPopularMovies(data.results.slice(0, 10)); // Set popularMovies state with the first 10 popular movies
      } catch (error) {
        console.error(error);
      }
    };

    fetchPopularMovies();
  }, []);

  useEffect(() => {
    const updateContainerWidth = () => {
      if (horizontalScrollRef.current) {
        setContainerWidth(horizontalScrollRef.current.offsetWidth);
      }
    };

    const handleScroll = () => {
      if (horizontalScrollRef.current) {
        setScrollPosition(horizontalScrollRef.current.scrollLeft);
      }
    };

    window.addEventListener("resize", updateContainerWidth);
    window.addEventListener("scroll", handleScroll);
    updateContainerWidth();

    return () => {
      window.removeEventListener("resize", updateContainerWidth);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
