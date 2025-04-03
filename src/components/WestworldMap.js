import {useState, useEffect  } from 'react';
import Area from "./Area";
import { Segment } from "semantic-ui-react";

function WestworldMap({hosts, selHost, onHostClick}) {

const [areas, setAreas ] = useState([])

useEffect(() => {
  fetchAreas()
},[])

const areaList = areas.map(area => (
  <Area key={area.id} area={area} hosts={hosts} selHost={selHost} onHostClick={onHostClick}/>
))

  async function fetchAreas() {
    try {
      const r = await fetch(`http://localhost:3001/areas`)
      if(!r.ok){
        throw new Error("💥 Error");
      }
      const data = await r.json()
      setAreas(data)
    }catch (error) {console.error("❌ Caught error:", error);}
  }

  return <Segment id="map">{areaList}</Segment>;
}

export default WestworldMap;
