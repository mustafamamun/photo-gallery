import React, { useState, useEffect, useCallback } from "react";
import fetch from "isomorphic-fetch";
import ParseLinkHeader from "parse-link-header";
import LoadingOverlay from "react-loading-overlay";
import { Row, Col } from "react-bootstrap";
import { isEmpty } from "lodash";

import { backendAPI, limits, statusOK } from "../../utils/app-config";
import PhotoGrid from "../PhotoGrid/PhotoGrid";
import ErrorAlert from "../ErrorAlert/ErrorAllert";
import Pagination from "../Pagination/Pagination";
import PageLimit from "../PageLimit/PageLimit";

function PhotoGallery(props) {
  const locStIdCurPg = "photo_gallery_current_page";
  const locStIdLim = "photo_gallery_limit";

  const [currentPage, setCurrentPage] = useState(
    sessionStorage.getItem(locStIdCurPg)
      ? Number(sessionStorage.getItem(locStIdCurPg))
      : 1
  );
  const [limit, setLimit] = useState(
    sessionStorage.getItem(locStIdLim)
      ? Number(sessionStorage.getItem(locStIdLim))
      : 18
  );
  const [photos, setPhotos] = useState([]);
  const [linkHeader, setLinkHeader] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  const onPageChange = page => {
    sessionStorage.setItem(locStIdCurPg, page);
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const onLimitChange = limit => {
    sessionStorage.setItem(locStIdLim, limit);
    sessionStorage.setItem(locStIdCurPg, 1);
    window.scrollTo(0, 0);
    setCurrentPage(1);
    setLimit(limit);
  };

  const fetchPhotos = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${backendAPI}?_page=${currentPage}&_limit=${limit}`
      );
      if (response.status === statusOK) {
        const respondedPhotos = await response.json();
        setPhotos(respondedPhotos);
        const respondedLinks = response.headers.get("Link");
        const respondedLinkHeader = ParseLinkHeader(respondedLinks);
        setLinkHeader(respondedLinkHeader);
      } else {
        setIsErrored(true);
      }
    } catch (error) {
      setIsErrored(true);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, limit]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return isErrored ? (
    <ErrorAlert tryAgain={fetchPhotos} />
  ) : (
    <LoadingOverlay active={isLoading} spinner text="Loading your photos...">
      <div className="text-center">
        <h1 className="mt-5">Photo Gallery</h1>
        <PhotoGrid photos={photos} />
        {!isEmpty(photos) && (
          <Row className={"mt-5 mb-3"}>
            <Col md={8} xs={12}>
              <Pagination
                currentPage={currentPage}
                linkHeader={linkHeader}
                onSelect={onPageChange}
              />
            </Col>
            <Col md={4} xs={12}>
              <PageLimit
                onSelect={onLimitChange}
                limit={limit}
                limits={limits}
              />
            </Col>
          </Row>
        )}
      </div>
    </LoadingOverlay>
  );
}

export default PhotoGallery;
