import React, { useState } from "react";
import { Container } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";

import Routes from "../routes";
import { LoadingContext } from "../context/LoadingContext";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ setIsLoading }}>
      <LoadingOverlay active={isLoading} spinner text="Loading your photo...">
        <Container>
          <Routes />
        </Container>
      </LoadingOverlay>
    </LoadingContext.Provider>
  );
}

export default App;
