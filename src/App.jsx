import React, { useState } from "react";
import styled from "styled-components";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Controller } from "./components/Controller";
import { AlgoDisplay } from "./components/AlgoDisplay";
import {  ValueTable } from "./components/SaveInput";

const Container = styled.div`
  margin: 0 10px;
  min-height: calc(100vh - 50px);
  position: relative;
  margin-bottom: 50px;
`;



export default function App() {
  return (
    <Container>
      <NavBar />
      <Controller />
      <AlgoDisplay />
      <ValueTable />
      <Footer />
    </Container>
  );
}
