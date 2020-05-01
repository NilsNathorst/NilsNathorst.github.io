import ReactDOM from "react-dom";
import React, { Suspense, useEffect, useRef, useMemo } from "react";
import { Canvas, Dom, useLoader, useFrame } from "react-three-fiber";
import { TextureLoader, LinearFilter } from "three";
import lerp from "lerp";
import { Text, MultilineText } from "./components/Text";
import Plane from "./components/Plane";
import { Block, useBlock } from "./blocks";
import state from "./store";
import "./styles.css";
import * as THREE from "three";
function Startup() {
  const ref = useRef();
  useFrame(
    () =>
      (ref.current.material.opacity = lerp(
        ref.current.material.opacity,
        0,
        0.025
      ))
  );
  return (
    <Plane
      ref={ref}
      color="#0e0e0f"
      position={[0, 0, 200]}
      scale={[100, 100, 1]}
    />
  );
}

function Content() {
  const images = useLoader(
    TextureLoader,
    state.paragraphs.map(({ image }) => image)
  );
  useMemo(
    () => images.forEach((texture) => (texture.minFilter = LinearFilter)),
    [images]
  );
  const { contentMaxWidth: w, canvasWidth, canvasHeight } = useBlock();
  return (
    <>
      <Block factor={1} offset={0}>
        <Block factor={1.2}>
          <MultilineText
            top
            left
            size={w * 0.15}
            lineHeight={w / 4.6}
            position={[-w / 2, 2, -1]}
            color="#fff"
            text={"Nils\nNathorst\nWindahl"}
          />
        </Block>
      </Block>
      <Block factor={1.2} offset={2}>
        <MultilineText
          top
          left
          size={w * 0.15}
          lineHeight={w / 4.6}
          position={[-w / 2, 2, -1]}
          color="#fff"
          text={"Nils\nNathorst\nWindahl"}
        />
      </Block>
      {state.stripes.map(({ offset, color, height }, index) => (
        <Block key={index} factor={-1.5} offset={offset}>
          <Plane
            args={[50, height, 32, 32]}
            shift={-4}
            color={color}
            position={[0, 0, -10]}
          />
        </Block>
      ))}
      <Block factor={1.25} offset={8}>
        <Dom
          className="bottom-left"
          position={[-canvasWidth / 2, -canvasHeight / 2, 0]}
        >
          Something something footer.
        </Dom>
      </Block>
    </>
  );
}

function App() {
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
  return (
    <>
      <Canvas
        concurrent
        pixelRatio={1}
        orthographic
        camera={{ zoom: state.zoom, position: [0, 0, 500] }}
      >
        <Suspense
          fallback={<Dom center className="loading" children="Loading..." />}
        >
          <Plane
            args={[100, 2000, 32, 32]}
            color={"lightgrey"}
            position={[0, 0, -10]}
            blending={THREE.MultiplyBlending}
          />
          <Content />
          <Startup />
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        {new Array(state.sections).fill().map((_, index) => (
          <div
            key={index}
            id={"0" + index}
            style={{ height: `${(state.pages / state.sections) * 100}vh` }}
          />
        ))}
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
