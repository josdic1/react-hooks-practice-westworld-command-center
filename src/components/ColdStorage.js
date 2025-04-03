import React from "react";
import { Segment } from "semantic-ui-react";
import HostList from "./HostList";

function ColdStorage({ hosts, selHost, onHostClick }) {
  const feederList = hosts.filter((host) => !host.active);

  return (
    <Segment.Group className="HQComps">
      <Segment compact>
        <h3 className="labels">ColdStorage</h3>
      </Segment>
      <Segment compact>
        <HostList feederList={feederList} selHost={selHost} onHostClick={onHostClick} />
      </Segment>
    </Segment.Group>
  );
}

export default ColdStorage;
