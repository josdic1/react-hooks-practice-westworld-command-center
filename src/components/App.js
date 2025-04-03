import {useState, useEffect  } from 'react';
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters";
import { Segment } from "semantic-ui-react";
import { Log } from "../services/Log";
import "../stylesheets/App.css";

function App() {

  const [hosts, setHosts ] = useState([])
  const [selHost, setSelHost ] = useState(null)
  const [logs, setLogs] = useState([]);

useEffect(() => {
  fetchHosts()
},[])



function addLog(log) {
  setLogs(prev => [log, ...prev]);
}

function allHostsActive() {
  return hosts.every(h => h.active);
}
function handleToggleAll() {
  const nextStatus = !allHostsActive();
  const updated = hosts.map((host) => ({ ...host, active: nextStatus }));

  updated.forEach((host) => {
    handleActivity(host);
    addLog(
      nextStatus
        ? Log.warn(`Activated ${host.firstName}`)
        : Log.error(`Decommissioned ${host.firstName}`)
    );
  });
}

function handleHostClick(host) {
  setSelHost(host)
}

function updateActivity(host, newActive) {
  const latest = hosts.find(h => h.id === host.id); 
  const updatedObj = { ...latest, active: newActive };
  handleActivity(updatedObj);
}

function updateLocation(host, newArea) {
  const latest = hosts.find(h => h.id === host.id); 
  const updatedObj = { ...latest, area: newArea };
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
      <Headquarters
  hosts={hosts}
  selHost={selHost}
  onHostClick={handleHostClick}
  updateActivity={updateActivity}
  updateLocation={updateLocation}
  logs={logs}
  handleToggleAll={handleToggleAll}
  allActive={allHostsActive()}
/>
    </Segment>
  );
}

export default App;
