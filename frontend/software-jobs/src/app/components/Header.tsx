"use client";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";

export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container fluid={true} className="p-3 px-5">
        <Navbar.Brand className="me-3" href="#home">
          <Image
            src="/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#findjobs">Find Jobs</Nav.Link>
            <Nav.Link href="#employers">Employers</Nav.Link>
            <Nav.Link href="#uploadjob">Upload Job</Nav.Link>
            <Nav.Link href="#aboutus">About Us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Ik sagsøg mig</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
