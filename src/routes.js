import React from "react";
import { Switch, Route } from "react-router-dom";
import PhotoGallery from "./components/PhotoGallery/PhotoGallery";
import PhotoItem from "./components/PhotoItem/PhotoItem";
import NotFound from "./components/NotFound/NotFound";

const Routes = props => (
  <Switch>
    <Route exact path="/">
      <PhotoGallery />
    </Route>
    <Route exact path="/photos/:id">
      <PhotoItem />
    </Route>
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
