import React from 'react';
import Banner from './Banner';
import ContactUs from './ContactUs';
import Footer from './Footer';
import Navbar from '../Navbar';
import Steps from './Steps';
import TopProducts from './TopProducts';

const Landing = () => {
  return <div>
      <Navbar/>
      <Banner/>
      <Steps/>
      <TopProducts/>
      <ContactUs/>
      <Footer/>
  </div>;
};

export default Landing;
