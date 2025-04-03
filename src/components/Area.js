import React from "react";
import HostList from "./HostList";
import "../stylesheets/Area.css";

function Area({area, hosts, onHostClick, selHost}) {

const feederList = hosts.filter(host => (
  host.active && host.area === area.name
))

const [first, second] = area.name.split("_");

const capitalizedFirst = first.charAt(0).toUpperCase() + first.slice(1);
const capitalizedSecond = second
  ? second.charAt(0).toUpperCase() + second.slice(1)
  : "";

const areaName = second
  ? `${capitalizedFirst} ${capitalizedSecond}`
  : capitalizedFirst;


  return (
    <div
      className="area"
      id={area.name}
    >
      <h3 className="labels">
      {areaName}
      </h3>
      <HostList feederList={feederList} onHostClick={onHostClick} selHost={selHost}/>
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
