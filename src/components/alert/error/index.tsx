import { 
  Alert, 
  AlertTitle 
} from "@mui/material"
import React from "react"

interface ErrorAlertProps {
  visible: boolean
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  visible
}) => {

  return (
    visible ? (
      <Alert className="top-4 fixed" variant="filled" severity="error">
        <AlertTitle 
          className="text-lg font-semibold font-lato" >
            <h2 className="text-lg font-semibold font-lato">
              Error
            </h2>
          </AlertTitle>
        <h2
          className="text-md font-normal font-lato" 
          style={{ maxWidth: 450 }} >
            You already contributed to this project and your pull request 
            is still pending. Ask reviewers to merge it or close 
            it to contribute again
        </h2>
      </Alert>
    ) : null
  )
  
}

export default ErrorAlert