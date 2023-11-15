import React from "react";

const ScrollingComponent = () => {
  const image_url = "https://picsum.photos/200/300"; // Define the image URL outside of JSX

  return (
    <div className="scroll-container">
      <div className="scroll-content">
        {/* Your content goes here */}
        <p>Item 1</p>
        <img alt="some image" src={image_url}></img>
        <p>Item 2</p>
        <img alt="some image" src={image_url}></img>
        <p>Item 3</p>
        <img alt="some image" src={image_url}></img>
        <p>Item 4</p>
        <img alt="some image" src={image_url}></img>
        <p>Item 5</p>
        <img alt="some image" src={image_url}></img>
        <p>Item 6</p>
        {/* Add more items as needed */}
      </div>
    </div>
  );
};

export default ScrollingComponent;
