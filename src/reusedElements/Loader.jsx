/* eslint-disable react/prop-types */
import styled from "styled-components";
import React from "react";

const Loader = ({ state }) => {
  return (
    <>
      {state ? (
        <LoaderContainer>
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            display="block"
            style={{ background: "transparent" }}
          >
            <circle
              cx="50"
              cy="50"
              fill="none"
              stroke="#333333"
              strokeWidth="5"
              r="35"
              strokeDasharray="35 35"
              transform="rotate(311.234 50 50)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1s"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
              ></animateTransform>
            </circle>
          </svg>
        </LoaderContainer>
      ) : null}
    </>
  );
};
export default Loader;

const LoaderContainer = styled("div")({
  position: "fixed",
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
  position: "fixed",
  "background-color": "rgba(0, 0, 0, 0.1)",
  "z-index": "1000",
});
