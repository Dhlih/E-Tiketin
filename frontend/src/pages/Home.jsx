import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Definition from "../components/Definition";
import Features from "../components/Features";
import Testimonial from "../components/Testimonial";
import GetStarted from "../components/GetStarted";
import Footer from "../components/Footer";

import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Definition />
      <Features />
      <Testimonial />
      <GetStarted />
      <Footer />
    </div>
  );
};

export default Home;
