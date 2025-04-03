import React from "react";
import HostList from "./HostList";
import "../stylesheets/Area.css";

function Area({area, hosts}) {

const feederList = hosts.filter(host => (
  host.area === area.name
))

  return (
    <div
      className="area"
      id={area.name}
    >
      <h3 className="labels">
      {area.name}
      </h3>
      <HostList feederList={feederList}/>
    </div>
  );
}

Area.propTypes = {
  hosts: function (props) {
    if (props.hosts.length > props.limit) {
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      );
    }
  },
};

export default Area;
