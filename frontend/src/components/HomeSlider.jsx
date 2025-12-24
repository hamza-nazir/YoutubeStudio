import React, { useRef, useState, useEffect } from "react";
import "../css/HomeSlider.css";
import { FaChevronLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
const HomeSlider = () => {
  const sliderRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const items = [ "All",    "Music",    "Mixes",    "Coding",    "AI Tools",    "Travel",    "Gaming", "Tech","Movies", "Coding", "AI Tools", "Travel","Gaming", "Tech","Movies","Cricket", "Motivation","Funny","Shorts"];


  const checkScroll = () => {
    const el = sliderRef.current;
    if (!el) return;

    setAtStart(el.scrollLeft === 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
  }, []);

  const scrollAmount = 200;

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="homeslider-wrapper">
      {!atStart && (
        <button className="arrow-btn left" onClick={scrollLeft}>
          <FaChevronLeft className="fs-6 mb-2"/>
        </button>
      )}

      <div className="homeslider" ref={sliderRef} onScroll={checkScroll}>
        {items.map((item, i) => (
          
          <div  key={i} className="slider-item">
            {item}
          </div>
          ))}
      </div>

      {!atEnd && (
        <button className="arrow-btn right" onClick={scrollRight}>

          <FaChevronRight className="fs-6 mb-2"/>
        </button>
      )}
    </div>
  );
};

export default HomeSlider;
