import React from 'react';
import { useNavigate } from 'react-router';
import Countdown from './components/Countdown';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Sponsors from './components/Sponsors';

export default function App() {

  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="font-sans px-4 py-2 md:px-6" style={{ fontFamily: "Roboto Condensed, sans- serif" }}>
        {/* Hero Section */}
        <section className="p-4 md:p-8 text-center surface-section">
          <Hero />
        </section>

        <Countdown />

        <Sponsors />

        <div class="surface-ground mx-4">
          <div class="flex flex-wrap relative overflow-hidden" style={{ borderRadius: '1rem', background: "radial-gradient(100% 1126.49% at 100% 0%, rgb(255, 255, 255) 0%, rgb(143, 90, 38) 100%), #212121" }}>
            <div class="px-6 py-8">
              <span class="uppercase text-green-100 font-bold">BE THE FIRST ONE</span>
              <div class="text-white text-medium text-5xl mt-3 mb-5 ">Reserve your seat Today!</div>
              <button class="p-ripple appearance-none p-3 bg-green-100 hover:bg-cyan-300 cursor-pointer transition-colors font-medium gray-900 border-none p-component transition-colors transition-duration-150"
                style={{ borderRadius: "35px" }} onClick={() => navigate('payment')}>
                Buy Your Ticket
              </button>
            </div>
          </div>
        </div>

        {/* Venue */}
        <section className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-3">Venue Location</h2>
          <p>National Theatre
            <br /> South Liberia Road, Accra</p>
          <iframe
            className="w-full mt-4 border-round"
            height="400"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.206445650484!2d-0.19961855615088045!3d5.55655923542194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a70d%3A0xdca0d478b50348e!2sNational%20Theatre!5e0!3m2!1sen!2sgh!4v1746279816387!5m2!1sen!2sgh"
            allowFullScreen
            loading="lazy"
          />
        </section>

        {/* Footer */}
        <footer className="p-4 text-center text-gray-400 bg-black">
          © 2025 Anvil Productions. All rights reserved.
          <br />
          Powered by Effesus Software Solutions
        </footer>
      </div>
    </div>
  );
}
