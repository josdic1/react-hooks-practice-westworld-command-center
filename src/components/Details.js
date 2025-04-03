import React from "react";
import HostInfo from "./HostInfo";
import { Segment, Image } from "semantic-ui-react";
import * as Images from "../services/Images";

function Details({selHost, updateActivity, updateLocation}) {


  return (
    <Segment id="details" className="HQComps">
  {!selHost ? (
  <Image size="medium" src={Images.westworldLogo} />
) : (
  <HostInfo selHost={selHost} updateLocation={updateLocation} updateActivity={updateActivity} />
)}
    </Segment>
  );
}

export default Details;
