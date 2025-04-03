import {useState, useEffect  } from 'react';
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";

function App() {

  const [hosts, setHosts ] = useState([])

useEffect(() => {
  fetchHosts()
},[])

  async function fetchHosts() {
    try {
      const r = await fetch(`http://localhost:3001/hosts`)
      if(!r.ok){
        throw new Error("💥 Error");
      }
      const data = await r.json()
      setHosts(data)
    }catch (error) {console.error("❌ Caught error:", error);}
  }

  return (
    <Segment id="app">
      <WestworldMap hosts={hosts}/>
      <Headquarters hosts={hosts}/>
    </Segment>
  );
}

export default App;
