import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import CreateSpotForm from "./components/SpotForm/CreateSpotForm";
import UpdateSpotForm from "./components/SpotForm/UpdateSpotForm";
import SpotsIndex from "./components/SpotsIndex";
import ShowSpot from "./components/ShowSpot";
import CurrentSpotsIndex from "./components/CurrentSpotsIndex";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/' component={SpotsIndex} />
          <Route path="/spots/new" component={CreateSpotForm} />
          <Route path='/spots/current' component={CurrentSpotsIndex} />
          <Route path="/spots/:spotId/edit" component={UpdateSpotForm} />
          <Route path="/spots/:spotId" component={ShowSpot} />
        </Switch> 
      )}
      <Footer />
    </>
  );
}

export default App;