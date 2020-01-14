import React, { useState, useEffect, useCallback, useContext } from "react";
import fetch from "isomorphic-fetch";
import ParseLinkHeader from "parse-link-header";
import { Row, Col } from "react-bootstrap";
import { isEmpty } from "lodash";
import { OK, getStatusText, INTERNAL_SERVER_ERROR } from "http-status-codes";

import { backendAPI, limits } from "../../utils/app-config";
import PhotoGrid from "../PhotoGrid/PhotoGrid";
import ErrorAlert from "../ErrorAlert/ErrorAllert";
import Pagination from "../Pagination/Pagination";
import PageLimit from "../PageLimit/PageLimit";
import { LoadingContext } from "../../context/LoadingContext";

function PhotoGallery() {
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
      : limits[0]
  );
  const [photos, setPhotos] = useState([]);
  const [linkHeader, setLinkHeader] = useState({});
  const [error, setError] = useState({});
  const { setIsLoading } = useContext(LoadingContext);

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

      if (response.status === OK) {
        const respondedPhotos = await response.json();
        setPhotos(respondedPhotos);
        const respondedLinks = response.headers.get("Link");
        const respondedLinkHeader = ParseLinkHeader(respondedLinks);
        setLinkHeader(respondedLinkHeader);
        setError({});
      } else {
        setError({
          status: response.status,
          errMsg: getStatusText(response.status)
        });
      }
    } catch (error) {
      setError({
        status: error.status || INTERNAL_SERVER_ERROR,
        errMsg: getStatusText(error.status || INTERNAL_SERVER_ERROR)
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, limit, setIsLoading]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return !isEmpty(error) ? (
    <ErrorAlert tryAgain={fetchPhotos} errorDetails={error} />
  ) : (
    <div className="text-center" data-testid={"img-gallery"}>
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
            <PageLimit onSelect={onLimitChange} limit={limit} limits={limits} />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default PhotoGallery;
