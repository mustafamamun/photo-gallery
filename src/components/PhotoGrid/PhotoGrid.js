import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function PhotoGrid({ photos = [] }) {
  return (
    <Row className="justify-content-center">
      {photos.map(photo => {
        return (
          <Col
            data-testid={"img-elm"}
            xs={"auto"}
            key={photo.id}
            className={"mt-5"}
          >
            {" "}
            <Link to={`/photos/${photo.id}`} data-testid={`link-${photo.id}`}>
              <Image src={photo.thumbnailUrl} thumbnail={true} />
              <div>{photo.id}</div>
            </Link>
          </Col>
        );
      })}
    </Row>
  );
}

export default PhotoGrid;
