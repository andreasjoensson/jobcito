"use client";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";
import "./Header.css";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <Navbar collapseOnSelect expand="lg">
      <Container fluid={true} className="p-3 px-5">
        <Navbar.Brand className="me-3" href="/">
          <Image
            src="/arbejdeit.png"
            width="100"
            height="46"
            className="d-inline-block align-top"
            alt="ItJobs logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="ms-5" id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="p-4" href="/" active={pathname === "/"}>
              Find Jobs
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              className="p-4"
              href="/sagsoe"
              active={pathname === "/sagsoe"}
            >
              Ik sagsøg mig
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
