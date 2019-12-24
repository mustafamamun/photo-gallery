import React from "react";
import { Alert, Button } from "react-bootstrap";

function ErrorAllert({ tryAgain }) {
  return (
    <Alert variant="danger" className="mt-5" data-testid={"err-alrt"}>
      <Alert.Heading>Oh snap! We got an error!</Alert.Heading>
      <p>Most probably a network issue. Please try again later</p>
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
