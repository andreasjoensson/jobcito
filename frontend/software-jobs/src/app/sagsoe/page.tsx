import React from "react";
import Header from "../components/Header/Header";
import Image from "next/image";
import "./sagsoe.css";
import { GrMoney } from "react-icons/gr";

export default function page() {
  return (
    <div>
      <div className="banner-header pb-4">
        <Header />
        <div className="container position-relative">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6 text-center">
              <h2>Contact</h2>
              <p>
                Odio et unde deleniti. Deserunt numquam exercitationem. Officiis
                quo odio sint voluptas consequatur ut a odio voluptatem. Sit
                dolorum debitis veritatis natus dolores. Quasi ratione sint. Sit
                quaerat ipsum dolorem.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section id="about" className="about mt-5">
        <div className="container aos-init aos-animate" data-aos="fade-up">
          <div className="row gy-4">
            <div className="col-lg-6 position-relative align-self-start order-lg-last order-first">
              <Image src={"/about.jpg"} width={546} height={409} />
              <a
                href="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                className="glightbox play-btn"
              ></a>
            </div>
            <div className="col-lg-6 content order-last  order-lg-first">
              <h3>Ik sagsøg mig</h3>
              <p>
                Først og fremmest kan jeg virkelig ikke lide at blive sagsøgt.
                Jeg mener, hvem gør egentlig? Jeg har ikke engang tid til at
                rode med retssager, når jeg har travlt med at finde de bedste
                jobmuligheder til dig!
              </p>
              <ul>
                <li
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="aos-init aos-animate"
                >
                  <GrMoney size={70} />
                  <div>
                    <h5>Penge</h5>
                    <p>
                      Okay, nu til pengene. Lad os slå noget fast - jeg er ikke
                      nogen grådig kapitalist, der svømmer i penge som Anders
                      And.
                    </p>
                  </div>
                </li>
                <li
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="aos-init aos-animate"
                >
                  <i className="bi bi-fullscreen-exit"></i>
                  <div>
                    <h5>Giv mig heads up</h5>
                    <p>
                      Please send mig en sød bedsked på forhånd, hvor du beder
                      mig om at lukke siden ned jeg skal nok gøre det.
                    </p>
                  </div>
                </li>
                <li
                  data-aos="fade-up"
                  data-aos-delay="300"
                  className="aos-init aos-animate"
                >
                  <i className="bi bi-broadcast"></i>
                  <div>
                    <h5>Jeg sender alt traffik til jer</h5>
                    <p>
                      Alle joblinks går direkte tilbage til jeres hjemmeside.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
