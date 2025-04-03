import React from "react";
import Host from "./Host";
import { Card } from "semantic-ui-react";

function HostList({feederList}) {

  const hostList = feederList.map(host => (
    <Host key={host.id} host={host} />
  ))

  return (
    <Card.Group itemsPerRow={6}>{hostList}</Card.Group>
  );
}

export default HostList;
