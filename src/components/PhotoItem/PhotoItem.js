import React, { useState, useEffect, useCallback, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import { get, isEmpty } from "lodash";
import { Image, Button } from "react-bootstrap";
import { isValid, format } from "date-fns";
import { OK, getStatusText, INTERNAL_SERVER_ERROR } from "http-status-codes";

import { backendAPI } from "../../utils/app-config";
import ErrorAlert from "../ErrorAlert/ErrorAllert";
import { LoadingContext } from "../../context/LoadingContext";

function PhotoItem(props) {
  const [photo, setPhoto] = useState({});
  const [error, setError] = useState(false);
  const photoId = get(props, "match.params.id");
  const { setIsLoading } = useContext(LoadingContext);
  const fetchPhoto = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${backendAPI}/${photoId}`);

      if (response.status === OK) {
        const photo = await response.json();
        setPhoto(photo);
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
  }, [photoId, setIsLoading]);

  useEffect(() => {
    fetchPhoto();
  }, [fetchPhoto]);

  return (
    <div className="text-center mt-5" data-testid={"item-view"}>
      <Link to="/">
        <Button data-testid={"btn-bck-to-grd-view"}>Back to Grid</Button>
      </Link>
      {!isEmpty(error) ? (
        <ErrorAlert tryAgain={fetchPhoto} errorDetails={error} />
      ) : (
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
      )}
    </div>
  );
}

export default withRouter(PhotoItem);
