import React from "react";
import Host from "./Host";
import { Card } from "semantic-ui-react";

function HostList({ feederList, onHostClick, selHost }) {
  const hostList = feederList.map((host) => (
    <Host key={host.id} host={host} onHostClick={onHostClick} selHost={selHost} />
  ));

  return <Card.Group itemsPerRow={6}>{hostList}</Card.Group>;
}

export default HostList;
