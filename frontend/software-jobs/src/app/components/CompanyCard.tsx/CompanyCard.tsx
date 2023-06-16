import React from "react";
import "./companycard.css";
import Image from "next/image";

interface CompanyProps {
  logo: string;
  name: string;
}

export default function CompanyCard({ logo, name }: CompanyProps) {
  return (
    <div>
      <div className="company-container p-3 d-flex align-items-center justify-content-between">
        <div className="company-logo">
          {logo ? (
            <Image
              src={logo}
              alt="Company Logo"
              width={50}
              height={50}
              className="company-logo"
            />
          ) : (
            <div className="default-logo">
              <span>Logo</span>
            </div>
          )}
        </div>
        <div className="company-name-container">
          <span className="company-name">
            {name.length > 18 ? name.substring(0, 18) : name}
          </span>
        </div>
      </div>
    </div>
  );
}
