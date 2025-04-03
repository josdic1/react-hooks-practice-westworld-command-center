import { useState, useEffect } from "react";
import Area from "./Area";
import { Segment } from "semantic-ui-react";

function WestworldMap({ hosts, selHost, onHostClick }) {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/areas")
      .then((r) => r.json())
      .then(setAreas)
      .catch((err) => console.error("❌ Area fetch failed:", err));
  }, []);

  const areaList = areas.map((area) => (
    <Area
      key={area.id}
      area={area}
      hosts={hosts}
      selHost={selHost}
      onHostClick={onHostClick}
    />
  ));

  return <Segment id="map">{areaList}</Segment>;
}

export default WestworldMap;
