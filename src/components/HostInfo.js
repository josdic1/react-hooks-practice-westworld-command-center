import React, { useState, useEffect } from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import "../stylesheets/HostInfo.css";

function HostInfo({ selHost, updateLocation, updateActivity }) {
  const [value, setValue] = useState(selHost.area);
  const [isActive, setIsActive] = useState(selHost.active);

  useEffect(() => {
    setValue(selHost.area);
    setIsActive(selHost.active);
  }, [selHost]);

  const options = [
    { key: "badlands", text: "Badlands", value: "badlands" },
    { key: "high_plains", text: "High Plains", value: "high_plains" },
    { key: "lowlands", text: "Lowlands", value: "lowlands" },
    { key: "pariah", text: "Pariah", value: "pariah" },
    { key: "python_pass", text: "Python Pass", value: "python_pass" },
    { key: "under_construction", text: "Under Construction", value: "under_construction" },
  ];

  function handleRadioChange() {
    const newVal = !isActive;
    setIsActive(newVal);
    updateActivity(selHost, newVal);
  }

  function handleOptionChange(e, { value }) {
    setValue(value);
    updateLocation(selHost, value);
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={selHost.imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {selHost.gender === "Male" ? <Icon name="man" /> : <Icon name="woman" />}
            </Card.Header>
            <Card.Meta>
              <Radio
                onChange={handleRadioChange}
                label={isActive ? "Active" : "Decommissioned"}
                checked={isActive}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              value={value}
              options={options}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
