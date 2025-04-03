import React from "react";
import { Grid } from "semantic-ui-react";
import ColdStorage from "./ColdStorage";
import Details from "./Details";
import "../stylesheets/Headquarters.css";

function Headquarters({hosts, selHost, onHostClick, updateActivity, updateLocation}) {

  
  return (
    <Grid celled="internally">
      <Grid.Column width={8}><ColdStorage hosts={hosts} selHost={selHost} onHostClick={onHostClick}/></Grid.Column>
      <Grid.Column width={5}>
        <Details selHost={selHost} updateActivity={updateActivity}updateLocation={updateLocation}/>
      </Grid.Column>
      <Grid.Column width={3}>
        {/* and here. Take visual cues from the screenshot/video in the Readme. */}
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
