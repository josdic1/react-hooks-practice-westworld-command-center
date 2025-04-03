import {useState, useEffect  } from 'react';
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";

function App() {

  const [hosts, setHosts ] = useState([])
  const [selHost, setSelHost ] = useState(null)

useEffect(() => {
  fetchHosts()
},[])

function handleHostClick(host) {
  setSelHost(host)
}

function updateActivity(host, newVal) {
  const updatedObj = { ...host, active: newVal };
  handleActivity(updatedObj);
}

function updateLocation(host, newVal) {
  const updatedObj = { ...host, area: newVal };
  handleLocation(updatedObj);
}

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

  async function handleActivity(obj) {
    try {
      const r = await fetch(`http://localhost:3001/hosts/${obj.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(obj)
      })
      if(!r.ok) {
        throw new Error("💥 Error");
      }
      const data = await r.json()
      const updatedList = hosts.map(host => (
        host.id === data.id ? data : host
      ))
      setHosts(updatedList)
    }catch (error) {console.error("❌ Caught error:", error);}
  }

  async function handleLocation(obj) {
    try {
      const r = await fetch(`http://localhost:3001/hosts/${obj.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(obj)
      })
      if(!r.ok) {
        throw new Error("💥 Error");
      }
      const data = await r.json()
      const updatedList = hosts.map(host => (
        host.id === data.id ? data : host
      ))
      setHosts(updatedList)
    }catch (error) {console.error("❌ Caught error:", error);}
  }

  return (
    <Segment id="app">
      <WestworldMap hosts={hosts} selHost={selHost} onHostClick={handleHostClick} />
      <Headquarters hosts={hosts} selHost={selHost} onHostClick={handleHostClick} updateActivity={updateActivity} updateLocation={updateLocation}/>
    </Segment>
  );
}

export default App;
