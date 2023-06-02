import React, { useState, useEffect } from "react";
import VizG from "react-vizgrammar";
import { getHeader } from "../dataProvider/session";
//const API_URL = "https://allinonepush.live/api";
import API_URL from "../url";

export default function Dashboard() {
  //tokens counts:number
  const [todaysofar, setTodaysofar] = useState(0);
  const [yesterday, setyesterday] = useState(0);
  const [last7days, setlast7days] = useState(0);
  const [thisMonth, setThisMonth] = useState(0);

  const [totaltokens, setTotaltokens] = useState(0);

  //arrays of token/other counts: Array
  const [topsites, setTopsites] = useState([]);
  const [last10dayarray, setLast10dayarray] = useState([]);

  //test
  let config = {
    x: "Day",
    charts: [
      {
        type: "line",
        y: "Tokens",
        color: "axisName",
        colorDomain: ["", "", ""],
        fill: "#000",
      },
    ],
    maxLength: 7,
    legend: true,
  };
  let metadata = {
    names: ["Day", "Tokens", "axisName"],
    types: ["linear", "linear", "linear"],
  };

  let thedata = [];

  last10dayarray.forEach((site) => {
    let theday = new Date(site.createdAt);
    thedata.push([theday.toDateString(), site.tokens, "Tokens"]);
  });

  //top sites
  let topSitesConfig = {
    charts: [
      {
        type: "arc",
        x: "tokens",
        color: "sitename",
        mode: "pie",
      },
    ],
    //legendOrientation: "top",
    legend: true,
  };

  let topSitesMetadata = {
    names: ["tokens", "sitename"],
    types: ["linear", "linear"],
  };
  let topSitesData = [];

  topsites.forEach((site) => {
    topSitesData.push([site.tokens, site.sitename]);
  });

  useEffect(async () => {
    //declaring a response var and body var
    let response;
    let resBody;

    //todaysofar
    response = await fetch(`${API_URL}/admin/counttokenswithin/1`, {
      method: "GET",
      headers: getHeader(),
    });
    resBody = await response.json();
    setTodaysofar(resBody.tokens);

    //yesterday by calculating and substracting today
    let gToday = resBody.tokens;
    response = await fetch(`${API_URL}/admin/counttokenswithin/2`, {
      method: "GET",
      headers: getHeader(),
    });
    resBody = await response.json();
    setyesterday(resBody.tokens - gToday);

    //last 7 days
    response = await fetch(`${API_URL}/admin/counttokenswithin/7`, {
      method: "GET",
      headers: getHeader(),
    });
    resBody = await response.json();
    setlast7days(resBody.tokens);

    //this month
    response = await fetch(`${API_URL}/admin/counttokenswithin/30`, {
      method: "GET",
      headers: getHeader(),
    });
    resBody = await response.json();
    setThisMonth(resBody.tokens);

    //total Tokens
    response = await fetch(`${API_URL}/admin/counttokenswithin/all`, {
      method: "GET",
      headers: getHeader(),
    });
    resBody = await response.json();
    setTotaltokens(resBody.tokens);

    //fetching array datas
    //topsites
    response = await fetch(
      `${API_URL}/admin/sites?perPage=5&page=1&sortBy=tokens&sortingOrder=DSC`,
      {
        headers: getHeader(),
      }
    );
    resBody = await response.json();
    setTopsites(resBody.data);

    //last10day
    response = await fetch(`${API_URL}/admin/tokenswithin/10`, {
      headers: getHeader(),
    });
    resBody = await response.json();
    console.log(resBody);
    setLast10dayarray(resBody);
  }, []);

  //retrive all the data

  return (
    <div className="container py-5">
      <div class="row">
        <div class="col-md-8 py-3 border-n mx-1 my-2 text-white bg-primary">
          <div class="row py-2">
            <div class="col-md-11 text_col1">
              <h5>Estimated Tokens</h5>
            </div>
            <div class="col-md-1 text_col2">
              <svg
                width="1.5em"
                height="2em"
                viewBox="0 0 16 16"
                class="bi bi-three-dots-vertical"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                />
              </svg>
            </div>
          </div>
          <div class="row py-2">
            <div class="col-md-3 box_col">
              <p>Today so far</p>
              <h3>TK {todaysofar}</h3>
            </div>
            <div class="col-md-3 box_col">
              <p>Yesterday</p>
              <h3>TK {yesterday}</h3>
            </div>
            <div class="col-md-3 box_col">
              <p>Last 7 days</p>
              <h3>TK {last7days}</h3>
            </div>
            <div class="col-md-3 box_col">
              <p>This month</p>
              <h3>TK {thisMonth}</h3>
            </div>
          </div>
        </div>
        <div class="col-md-3 py-3 border-n mx-1 my-2 text-white bg-primary">
          <div class="row py-2">
            <div class="col-md-10 text_col1">
              <h5>Tokens</h5>
            </div>
            <div class="col-md-1 text_col2">
              <svg
                width="1.5em"
                height="2em"
                viewBox="0 0 16 16"
                class="bi bi-three-dots-vertical"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                />
              </svg>
            </div>
          </div>
          <div class="row py-2">
            <div class="col-md-12">
              <p>Total Tokens</p>
              <h3>TK {totaltokens}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="card" style={{ display: "block", margin: "10px auto" }}>
          <div class="card-body">
            <h5 class="card-title">Per Day Stats</h5>
            <VizG
              config={config}
              data={thedata}
              metadata={metadata}
              onClick={(data) => {
                /* function to perform */
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="card" style={{ display: "block", margin: "10px auto" }}>
          <div class="card-body">
            <h5 class="card-title">Top 5 Websites Stats</h5>
            <VizG
              config={topSitesConfig}
              data={topSitesData}
              metadata={topSitesMetadata}
              onClick={(data) => {
                /* function to perform */
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
