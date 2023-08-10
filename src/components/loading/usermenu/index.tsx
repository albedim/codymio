import React from "react";
import ContentLoader from "react-content-loader";

interface LoaderProps {
  backgroundColor: string,
  foregroundColor: string
}

const Loader: React.FC<LoaderProps> = ({
  backgroundColor,
  foregroundColor
}) => {

  return (
    <div className="items-center flex">
      <ContentLoader
        speed={2}
        width={114}
        height={48}
        viewBox="0 0 114 48"
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
      >
        <rect x="4" y="14" rx="3" ry="3" width="16" height="16" />
        <circle cx="64" cy="23" r="20" />
      </ContentLoader>
    </div>
  );
}

export default Loader