import React from "react";
import { PiAirplaneTakeoffFill } from "react-icons/pi";
import { 
  LinearProgress, 
  ThemeProvider, 
  createTheme 
} from "@mui/material";

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
      <div>
      <div className="justify-around items-center flex pb-2">
        <PiAirplaneTakeoffFill size={54} color={"#7024f8"}/>
      </div>
      <h2 
        className="text-[#475072] text-xl font-semibold font-lato">Loading...
      </h2>
      <div className="mt-4">
        <ThemeProvider theme={theme}>
          <LinearProgress/>
        </ThemeProvider>
      </div>
      </div>
    </div>
  );
}

export default Loader