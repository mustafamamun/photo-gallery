import React from "react";
import { Alert, Button } from "react-bootstrap";

function ErrorAllert({ tryAgain, errorDetails }) {
  return (
    <Alert
      variant="danger"
      className="mt-5 text-center"
      data-testid={"err-alrt"}
    >
      <Alert.Heading>
        {errorDetails.status}!! {errorDetails.errMsg}!!
      </Alert.Heading>
      <p>Please try again later</p>
      <div className="d-flex justify-content-end">
        <Button
          data-testid="btn-tryagain"
          variant="outline-success"
          onClick={tryAgain}
        >
          Try again!
        </Button>
      </div>
    </Alert>
  );
}

export default ErrorAllert;
