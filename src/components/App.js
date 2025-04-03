import { useState, useEffect } from "react";
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters";
import { Segment } from "semantic-ui-react";
import { Log } from "../services/Log";
import "../stylesheets/App.css";

function App() {
  const [hosts, setHosts] = useState([]);
  const [selHost, setSelHost] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchHosts();
  }, []);

  function fetchHosts() {
    fetch("http://localhost:3001/hosts")
      .then((r) => r.json())
      .then(setHosts)
      .catch((err) => console.error("❌ Fetch error:", err));
  }

  function handleHostClick(host) {
    setSelHost(host);
  }

  function addLog(log) {
    setLogs((prev) => [log, ...prev]);
  }

  function allHostsActive() {
    return hosts.every((host) => host.active);
  }

  async function handleToggleAll() {
    const nextStatus = !allHostsActive();
    const updates = await Promise.all(
      hosts.map(async (host) => {
        const updatedHost = { ...host, active: nextStatus };
        const res = await fetch(`http://localhost:3001/hosts/${host.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedHost),
        });
        const data = await res.json();
        addLog(
          nextStatus
            ? Log.warn(`Activated ${data.firstName}`)
            : Log.error(`Decommissioned ${data.firstName}`)
        );
        return data;
      })
    );
  
    setHosts(updates);
  }
  

  function updateActivity(host, newActive) {
    const updated = { ...host, active: newActive };
    handleActivity(updated);
    addLog(
      newActive
        ? Log.warn(`Activated ${host.firstName}`)
        : Log.error(`Decommissioned ${host.firstName}`)
    );
  }

  function updateLocation(host, newArea) {
    const updated = { ...host, area: newArea };
    handleLocation(updated);
    addLog(Log.notify(`${host.firstName} set in area ${newArea}`));
  }

  function handleActivity(obj) {
    fetch(`http://localhost:3001/hosts/${obj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((r) => r.json())
      .then((data) => {
        const updatedList = hosts.map((h) => (h.id === data.id ? data : h));
        setHosts(updatedList);
      })
      .catch((err) => console.error("❌ PATCH error:", err));
  }

  function handleLocation(obj) {
    fetch(`http://localhost:3001/hosts/${obj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((r) => r.json())
      .then((data) => {
        const updatedList = hosts.map((h) => (h.id === data.id ? data : h));
        setHosts(updatedList);
      })
      .catch((err) => console.error("❌ PATCH error:", err));
  }

  return (
    <Segment id="app">
      <WestworldMap
        hosts={hosts}
        selHost={selHost}
        onHostClick={handleHostClick}
      />
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
