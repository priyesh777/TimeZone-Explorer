import React, { useState, useEffect } from "react";
import { Typography, Row, Card, Button } from "antd";
import Select from "react-dropdown-select";
import { EnvironmentOutlined, GlobalOutlined } from "@ant-design/icons";

const Zone = () => {
  const { Text } = Typography;

  const [dateStore, setDateStore] = useState({
    currentTime: "",
    currentDate: ""
  });

  const [countryData, setCountryData] = useState([]);
  const [weather, setWeather] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // const [searchResult, setSearchResult] = useState({});

  const regions = [
    { label: "America/Chicago", value: 23 },
    { label: "America/Denver", value: 21 },
    { label: "Europe/Berlin", value: 2 },
    { label: "Asia/Dubai", value: 29 },
    { label: "Europe/London", value: 12 },
    { label: "Europe/Busigen", value: 13 },
    { label: "America/Sao_Paulo", value: 16 },
    { label: "America/Fortalenza  ", value: 17 }
  ];

  useEffect(() => {
    getCurrentTime();
  }, []);

  const getCurrentTime = () => {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    let hourMinute = `${hour}: ${minute}`;
    let currentDateNow = `${year}-${month}-${date}`;
    setDateStore({ currentTime: hourMinute, currentDate: currentDateNow });
  };

  const fetchData = () => {
    //fetching names of country below
    fetch(
      `https://api.timezonedb.com/v2.1/get-time-zone?key=J9X3EOT2EM8U&format=json&by=zone&zone=${inputValue}`
    )
      .then(res => res.json())
      .then(json => {
        setCountryData([...countryData, json]);
        getCurrentTime();
      });
  };
  console.log("data :::", countryData);

  const handleChange = values => {
    setInputValue(values.map(item => item.label));
  };

  const handleAdd = () => {
    fetchData();
  };

  return (
    <>
      <Row>
        <div
          className="center-middle"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <h1>Welcome to TimeZone Explorer </h1>
            <Text mark>Enter the name of a country or region</Text>
            <br />

            <div style={{ display: "flex" }}>
              <Select
                style={{ width: 300, marginTop: "10px" }}
                options={regions}
                dropdownGap={5}
                onChange={values => handleChange(values)}
              />
              <Button
                type="primary"
                onClick={handleAdd}
                style={{ marginTop: "12px", marginLeft: "2%" }}
              >
                Add{" "}
              </Button>
            </div>
          </div>

          <div
            className="current-data"
            style={{
              height: "100%"
            }}
          >
            <Card
              style={{
                width: 250,
                marginLeft: "20px",
                border: "2px solid #c4c4c4",
                borderRadius: "10px",
                height: 125
              }}
            >
              {dateStore && dateStore.currentDate ? (
                <>
                  <p
                    style={{
                      fontSize: "16px",
                      fontFamily: "monospace",
                      color: "#136cdc"
                    }}
                  >
                    Current Time ({dateStore.currentTime || ""})
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      fontFamily: "monospace",
                      color: "#136cdc"
                    }}
                  >
                    Date : {dateStore.currentDate || ""}
                  </p>
                </>
              ) : (
                "Loading ..."
              )}
            </Card>
          </div>
        </div>
        <div className="country-info">
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              fontFamily: "monospace",
              color: "#136cdc"
            }}
          >
            Please choose the region for which you want to know the current
            Time-zone and weather
          </p>

          {countryData.map((each, index) => (
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Card
                id={`country-${index}`}
                style={{
                  width: 440,
                  border: "2px solid #c4c4c4",
                  borderRadius: "10px",
                  marginTop: "10px"
                }}
              >
                {each.countryName ? (
                  <>
                    <div>
                      <p style={{ fontFamily: "monospace" }}>
                        <h1>
                          <EnvironmentOutlined style={{ color: "#136cdc" }} />{" "}
                          {each.countryName}
                        </h1>
                      </p>
                      <p>
                        <h2
                          style={{
                            fontFamily: "monospace",
                            color: "#136cdc",
                            fontWeight: "bold"
                          }}
                        >
                          TimeZone : {each.formatted}
                        </h2>
                      </p>
                    </div>
                    <p
                      style={{
                        fontFamily: "monospace",
                        color: "#136cdc",
                        fontWeight: "bold"
                      }}
                    >
                      Area: {each.zoneName}
                    </p>
                    <p style={{ fontFamily: "monospace" }}>
                      country code: {each.countryCode}
                    </p>
                  </>
                ) : (
                  "No data found"
                )}
              </Card>
              <div>
                <Card
                  style={{
                    width: 300,
                    marginTop: "10px",
                    marginLeft: "20px",
                    border: "2px solid #c4c4c4",
                    borderRadius: "10px",
                    height: 136
                  }}
                >
                  <GlobalOutlined
                    style={{ color: "#136cdc", fontSize: "40px" }}
                  />
                </Card>
                <Button
                  type="dashed"
                  danger
                  style={{ float: "right", marginTop: "10px" }}
                >
                  delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Row>
    </>
  );
};
export default Zone;
