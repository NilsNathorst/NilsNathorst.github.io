import { createRef } from "react";

const state = {
  sections: 5,
  pages: 4,
  zoom: 75,
  paragraphs: [
    {
      offset: 0.8,
      factor: 1.75,
      header: "Project 1",
      image: "fredman.png",
      aspect: 1,
      text: "Something about this project",
    },
  ],
  stripes: [
    { offset: 0, color: "#696969", height: 20 },
    { offset: 2, color: "#696969", height: 20 },
  ],

  top: createRef(),
};

export default state;
