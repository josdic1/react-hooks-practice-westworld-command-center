import React from "react";
import { Segment, Button } from "semantic-ui-react";

function LogPanel({ logs, handleToggleAll, allActive }) {
  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logs.map((log, i) => (
          <p key={i} className={log.type}>
            {log.msg}
          </p>
        ))}
      </pre>
      <Button
        fluid
        color={allActive ? "yellow" : "red"}
        content={allActive ? "DECOMMISSION ALL" : "ACTIVATE ALL"}
        onClick={handleToggleAll}
      />
    </Segment>
  );
}

export default LogPanel;
