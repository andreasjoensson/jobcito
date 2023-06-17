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
              <h2>Kontakt</h2>
              <p>Send en bedsked her. Jeg svarer så hurtigt jeg kan.</p>
            </div>
          </div>
        </div>
      </div>

      <section id="about" className="about mt-5">
        <div className="container aos-init aos-animate" data-aos="fade-up">
          <div className="row gy-4">
            <div className="col-lg-6 position-relative align-self-start order-lg-last order-first">
              <Image
                src={"/stockphoto.jpg"}
                alt="Random stock foto"
                width={646}
                height={409}
              />
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
                  <div>
                    <h5>Samlet på et sted</h5>
                    <p>
                      Jeg vil gerne tydeliggøre, at jeg ikke indsamler eller
                      anvender data på ulovlige måder og at jeg ikke
                      overbelaster de sider, hvorfra jeg indsamler
                      joboplysninger. Formålet med min tjeneste er at give
                      brugere en samlet oversigt over ledige job.
                    </p>
                  </div>
                </li>
                <li
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="aos-init aos-animate"
                >
                  <div>
                    <h5>Offentlig tilgængelighed</h5>
                    <p>
                      Alle de data, jeg indsamler, er offentligt tilgængelige og
                      tilgængelige via de kilder, jeg henviser til. Jeg
                      indsamler ikke personlige oplysninger om brugere uden
                      deres samtykke.
                    </p>
                  </div>
                </li>
                <li
                  data-aos="fade-up"
                  data-aos-delay="300"
                  className="aos-init aos-animate"
                >
                  <div>
                    <h5>Jeg sender alt traffik til jer</h5>
                    <p>
                      Jeg er meget opmærksom på at respektere kildehjemmesiderne
                      og deres ressourcer. Derfor sender jeg alt trafik tilbage
                      til kildehjemmesiderne, når brugere ønsker at få mere
                      information om et job eller ønsker at ansøge.
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
