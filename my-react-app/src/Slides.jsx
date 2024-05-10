import Carousel from 'react-bootstrap/Carousel';
import React from "react";
import Ask from "./Ask";
import Last from "./Last";
import Mid from "./Mid";

export default function Slides({ sym, curr }) {

  return (
    <Carousel id="myCarousel">
      <Carousel.Item>
        <Ask symbol={sym} currency={curr}></Ask>
      </Carousel.Item>
      <Carousel.Item>
        <Last symbol={sym} currency={curr}></Last>
      </Carousel.Item>
      <Carousel.Item>
        <Mid symbol={sym} currency={curr}></Mid>
      </Carousel.Item>
    </Carousel>
  );
}