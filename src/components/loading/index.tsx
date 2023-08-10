import React, { useEffect, useState } from "react";
import { USED_COLORS } from "../../App";
import ContentLoader from "react-content-loader";
import { PiAirplaneTakeoffFill } from "react-icons/pi";
import { LinearProgress } from "@mui/material";

interface LoaderProps {
  color: string
}

const Loader: React.FC<LoaderProps> = ({
  color
}) => {

  return (
    <div className="items-center justify-around flex repository">
      <div>
      <div className="justify-around items-center flex pb-2">
        <PiAirplaneTakeoffFill size={54} color={color}/>
      </div>
      <h2 style={{ color: color }} className="text-xl font-semibold font-lato">Loading...</h2>
      <div className="mt-4">
        <LinearProgress color="inherit"/>
      </div>
      </div>
    </div>
  );
}

export default Loader