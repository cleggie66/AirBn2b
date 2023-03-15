import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import CreateSpotForm from "./components/CreateSpotForm";
import SpotsIndex from "./components/SpotsIndex";
import ShowSpot from "./components/ShowSpot";

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
          <Route path="/CreateSpot" component={CreateSpotForm} />
          <Route path="/spots/:spotId" component={ShowSpot} />
        </Switch> 
      )}
    </>
  );
}

export default App;