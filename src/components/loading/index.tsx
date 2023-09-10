import React from "react";
import { PiAirplaneTakeoffFill } from "react-icons/pi";
import { 
  LinearProgress, 
  ThemeProvider, 
  createTheme 
} from "@mui/material";
import { Oval } from "react-loading-icons";
import Puff from "react-loading-icons/dist/esm/components/puff";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7024f8"
    }
  },
});

const Loader: React.FC = () => {

  return (
    <div className="items-center justify-around flex repository">
      <div className="justify-around items-center flex pb-2">
        <Puff height={84} width={84} strokeWidth={2.54} stroke={"#7024f8"}/>
      </div>
    </div>
  );
}

export default Loader