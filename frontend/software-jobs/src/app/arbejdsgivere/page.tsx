"use client";
import React from "react";
import Header from "../components/Header/Header";
import CompanyBanner from "../components/CompanyBanner/CompanyBanner";
import CompanyList from "../components/CompanyList/CompanyList";
import { useState } from "react";

export default function page() {
  const [companys, setCompanys] = useState([
    {
      logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_142579.png&f=1&nofb=1&ipt=6890fde49a172b8e01f25b029d9e98101810609e8a6eb88faed598edd1eb6160&ipo=images",
      name: "Acme Corporation",
    },
    {
      logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_142579.png&f=1&nofb=1&ipt=6890fde49a172b8e01f25b029d9e98101810609e8a6eb88faed598edd1eb6160&ipo=images",
      name: "Widgets Inc.",
    },
    {
      logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_142579.png&f=1&nofb=1&ipt=6890fde49a172b8e01f25b029d9e98101810609e8a6eb88faed598edd1eb6160&ipo=images",
      name: "Globex Corporation",
    },
    {
      logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_142579.png&f=1&nofb=1&ipt=6890fde49a172b8e01f25b029d9e98101810609e8a6eb88faed598edd1eb6160&ipo=images",
      name: "Initech",
    },
    {
      logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_142579.png&f=1&nofb=1&ipt=6890fde49a172b8e01f25b029d9e98101810609e8a6eb88faed598edd1eb6160&ipo=images",
      name: "ABC Corporation",
    },
    // Add more sample data here...
    {
      logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_142579.png&f=1&nofb=1&ipt=6890fde49a172b8e01f25b029d9e98101810609e8a6eb88faed598edd1eb6160&ipo=images",
      name: "XYZ Ltd.",
    },
    {
      logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_142579.png&f=1&nofb=1&ipt=6890fde49a172b8e01f25b029d9e98101810609e8a6eb88faed598edd1eb6160&ipo=images",
      name: "123 Industries",
    },
    {
      logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_142579.png&f=1&nofb=1&ipt=6890fde49a172b8e01f25b029d9e98101810609e8a6eb88faed598edd1eb6160&ipo=images",
      name: "Tech Solutions",
    },
    // Add more sample data here...
  ]);

  return (
    <div>
      <div className="banner-header pb-4">
        <Header />
        <CompanyBanner />
      </div>
      <div className="row mt-5">
        <div className="col-2">
          <div className="filter-container">
            <p>Filter</p>
          </div>
        </div>
        <div className="col-10">
          {companys ? <CompanyList companies={companys} /> : null}
        </div>
      </div>
    </div>
  );
}
