import React, { useState, useEffect } from "react";
import { Typography, Row, Card, Button, Col } from "antd";
import Select from "react-dropdown-select";
import { EnvironmentOutlined, GlobalOutlined } from "@ant-design/icons";

const Zone = () => {
  const { Text } = Typography;

  const regions = [
    { label: "Asia/Kathmandu", value: 7 },
    { label: "America/Chicago", value: 23 },
    { label: "America/Toronto", value: 21 },
    { label: "Europe/Berlin", value: 2 },
    { label: "Europe/London", value: 12 },
    { label: "Europe/Sofia", value: 13 },
    { label: "America/Sao_Paulo", value: 16 },
    { label: "America/Creston", value: 17 },
    { label: "Australia/Darwin  ", value: 77 }
  ];

  const [dateStore, setDateStore] = useState({
    currentTime: "",
    currentDate: ""
  });

  const [countryData, setCountryData] = useState([]);
  const [weather, setWeather] = useState([]);
  const [inputValue, setInputValue] = useState("");

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

  const fetchWeather = name => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=50bd5aef9e30aad379f3f80016fb973d`
    )
      .then(res => res.json())
      .then(json => {
        setWeather([...weather, json]);
        getCurrentTime();
      });
  };

  const fetchTime = () => {
    fetch(
      `http://api.timezonedb.com/v2.1/get-time-zone?key=8TN2JC2CTI9L&format=json&by=zone&zone=${inputValue}`
    )
      .then(res => res.json())
      .then(json => {
        fetchWeather(json.countryName);
        setCountryData([...countryData, json]);
        getCurrentTime();
      });
  };

  const handleChange = values => {
    setInputValue(values.map(item => item.label));
  };

  const handleAdd = () => {
    fetchTime();
  };

  const handleClear = () => {
    window.location.reload();
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

              <Button
                type="dashed"
                onClick={handleClear}
                danger
                style={{ marginTop: "12px", marginLeft: "5px" }}
              >
                CLEAR
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

          <Row>
            <Col>
              {countryData.map((each, index) => (
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
              ))}
            </Col>

            <Col>
              {weather.map((each, index) => (
                <div style={{ marginTop: "3%" }}>
                  <Card
                    id={`weather-${index}`}
                    style={{
                      width: 300,
                      height: 227,
                      marginLeft: "20px",
                      border: "2px solid #c4c4c4",
                      borderRadius: "10px"
                    }}
                  >
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly"
                        }}
                      >
                        <GlobalOutlined
                          style={{ color: "#136cdc", fontSize: "40px" }}
                        />
                        <p
                          style={{
                            fontFamily: "monospace",
                            color: "#136cdc",
                            fontWeight: "bold",
                            fontSize: "25px"
                          }}
                        >
                          {each.main.temp} F
                        </p>
                      </div>
                      <p
                        style={{
                          fontFamily: "monospace",
                          color: "#136cdc",
                          fontWeight: "bold"
                        }}
                      >
                        Humidity : {each.main.humidity} %
                      </p>
                      <p
                        style={{
                          fontFamily: "monospace",
                          color: "#136cdc",
                          fontWeight: "bold"
                        }}
                      >
                        At.Pressure : {each.main.pressure} mbar
                      </p>
                      <p
                        style={{
                          fontFamily: "monospace",
                          color: "#136cdc",
                          fontWeight: "bold"
                        }}
                      >
                        Wind : {each.wind.speed} km/hr
                      </p>
                    </>
                  </Card>
                </div>
              ))}
            </Col>
          </Row>
        </div>
      </Row>
    </>
  );
};
export default Zone;
