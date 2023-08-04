import React from "react";
import { USED_COLORS } from "../../App";
import ContentLoader from "react-content-loader";

interface LoaderProps {
  n: number,
  padding: number,
  backgroundColor: string,
  foregroundColor: string,
  width: number,
  height: number,
  direction: "vertical" | "horizontal"
}

const Loader: React.FC<LoaderProps> = ({
  n,
  width,
  backgroundColor,
  foregroundColor,
  height,
  direction,
  padding
}) => {

  const wrapperStyle = () => {
    if (direction == "horizontal")
      return "flex flex-wrap"
    if (direction == "vertical")
      return ""
  }

  return (
    <div className={wrapperStyle()}>
      {
        [...Array(n)].map((e, i) => (
          <div>
            <ContentLoader
              speed={2}
              width={width}
              height={height}
              viewBox={"0 0 " + width + " " + height}
              backgroundColor={backgroundColor}
              foregroundColor={foregroundColor}
            >
              <rect x="16" y="25" rx="2" ry="2" width={width - padding} height={height - padding} />
            </ContentLoader>
          </div>
        ))
      }
    </div>
  );
}

export default Loader