import React from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host({ host, onHostClick, selHost }) {
  return (
    <Card
      className={selHost && host.id === selHost.id ? "host selected" : "host"}
      onClick={() => onHostClick(host)}
      image={host.imageUrl}
      raised
      link
    />
  );
}

export default Host;
