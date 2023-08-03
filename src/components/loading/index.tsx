import React from "react";
import { USED_COLORS } from "../../App";

interface LoaderProps{
  n: number,
  padding: number,
  width: number | "auto",
  height: number | "auto",
  direction: "vertical" | "horizontal"
}

const Loader: React.FC<LoaderProps> = ({
  n,
  width,
  height,
  direction,
  padding
}) => {

  const wrapperStyle = () => {
    if(direction == "horizontal")
      return "flex flex-wrap"
    if(direction == "vertical")
      return ""
  }

  const style = () => {
    let obj: any = { backgroundColor: USED_COLORS[2] }
    if(width != "auto")
      obj = { ...obj, width: width }
    if(height != "auto")
      obj = { ...obj, height: height }
    return obj
  }

  return(
    <div className={wrapperStyle()}>
      {
        [...Array(n)].map((e, i) => (
          <div style={{ padding: padding }}>
            <div style={ style()} className="rounded-lg">
              <div className="loading-screen"></div>
            </div>
          </div>
        ))
      }
  </div>
  );
}

export default Loader