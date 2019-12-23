import React, { useState, useEffect, useCallback } from "react";
import { withRouter, Link } from "react-router-dom";
import { get } from "lodash";
import { Image, Button } from "react-bootstrap";
import { isValid, format } from "date-fns";
import LoadingOverlay from "react-loading-overlay";

import { backendAPI, statusOK } from "../../utils/app-config";
import ErrorAlert from "../ErrorAlert/ErrorAllert";

function PhotoItem(props) {
  const [photo, setPhoto] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isErrored, setIsErrored] = useState(false);
  const photoId = get(props, "match.params.id");

  const fetchPhoto = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${backendAPI}/${photoId}`);
      if (response.status === statusOK) {
        const photo = await response.json();
        setPhoto(photo);
      } else {
        setIsErrored(true);
      }
    } catch (error) {
      setIsErrored(true);
    } finally {
      setIsLoading(false);
    }
  }, [photoId]);

  useEffect(() => {
    fetchPhoto();
  }, [fetchPhoto]);

  return (
    <div className="text-center mt-5" data-testid={"item-view"}>
      <Link to="/">
        <Button data-testid={"btn-bck-to-grd-view"}>Back to Grid</Button>
      </Link>
      {isErrored ? (
        <ErrorAlert data-testid={"err-alrt"} tryAgain={fetchPhoto} />
      ) : (
        <LoadingOverlay active={isLoading} spinner text="Loading your photo...">
          <div data-testid={"img-details"} className="mt-3">
            <b>Id:</b> {photo.id}
            <br />
            <b>Title:</b> {photo.title}
            {photo.descripton && (
              <div>
                <b>Description:</b> {photo.descripton}
              </div>
            )}
            {photo.timeStamp && isValid(photo.timeStamp) && (
              <div>
                <b>Time:</b> {format(photo.timeStamp, "yyyy-MM-dd HH:mm")}
              </div>
            )}
            <div>
              <Image src={photo.url} />
            </div>
          </div>
        </LoadingOverlay>
      )}
    </div>
  );
}

export default withRouter(PhotoItem);
