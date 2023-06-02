import React, { useState, useEffect } from "react";
import { Eclipse } from "react-loading-io";
import { getHeader } from "../dataProvider/session";
//import { Show, SimpleShowLayout } from "react-admin";

//const API_URL = "https://allinonepush.live/api";
import API_URL from "../url";
import { Redirect } from "react-router";

export default function SendNotification() {
  //form datas
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");
  const [icon, setIcon] = useState("");
  const [image, setImage] = useState("");
  const [clusters, setClusters] = useState(1);

  //data from api's
  const [sites, setSites] = useState([]);
  const [totalClusters, setTotalClusters] = useState(1);

  const [checkedState, setCheckedState] = useState(
    new Array(sites.length).fill(false)
  );

  //states for the ui
  const [isLimitChangable, setIsLimitChangable] = useState(false);
  const [isSiteSelectable, setIsSiteSelectable] = useState(false);
  const [isIgnoreListChangable, setIsIgnoreListChangable] = useState(false);
  const [subRoute, setSubRoute] = useState("");

  const [sitename, setSiteName] = useState("localhost");

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  useEffect(async () => {
    const response = await fetch(`${API_URL}/admin/sites`, {
      headers: getHeader(),
    });
    const body = await response.json();
    let countClusters = 0;
    console.log(body);
    body.data.forEach((site) => {
      countClusters += site.clusters;
    });
    setTotalClusters(countClusters);
    setClusters(countClusters);
    setSites(body.data);
    setCheckedState(new Array(body.data.length).fill(false));
  }, []);
  if (subRoute === "reports") {
    return <Redirect to="/Reports" />;
  }

  if (subRoute === "loading") {
    return (
      <div className="center">
        <Eclipse size={300} />
      </div>
    );
  }
  return (
    <div className="container" style={{ marginTop: 20 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (title == "" || body === "" || link == "") {
            alert("Title, Body and Url must be provided");
            return;
          }
          setSubRoute("loading");

          const formData = new FormData();

          const ignoreList = sites.reduce((current, { sitename }, index) => {
            if (!checkedState[index]) {
              return current;
            }
            return [...current, sitename];
          }, []);

          const obj = {
            title: title,
            body: body,
            url: link,
            icon: icon,
            image: image,
            clusters: clusters,
            skipSites: ignoreList,
          };

          if (isSiteSelectable) {
            obj.sitename = sitename;
          }

          var key;
          for (key in obj) {
            formData.append(key, obj[key]);
          }

          //send the notification to the server
          console.log("sending....");
          fetch(API_URL + "/admin/sendnotification", {
            headers: getHeader("multipart/form-data"),
            method: "POST",
            body: formData,
          }).then((response) => {
            console.log(response);
            response.json().then((body) => {
              setSubRoute("reports");
              console.log(body);
            });
          });
        }}
      >
        <div class="form-group">
          <label for="exampleInputEmail1">Title:</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Body:</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Body"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Link:</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Link"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
          <small id="emailHelp" class="form-text text-muted">
            Note : Use http or Https
          </small>
        </div>
        <div class="form-group">
          <label for="exampleFormControlFile1">Icon:</label>
          <input
            type="file"
            class="form-control-file"
            id="exampleFormControlFile1"
            onChange={(e) => {
              setIcon(e.target.files[0]);
            }}
          />
        </div>
        <div class="form-group">
          <label for="exampleFormControlFile1">Image:</label>
          <input
            type="file"
            class="form-control-file"
            id="exampleFormControlFile1"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
        <div class="form-group">
          <label>Target Audience Filter:</label>
          <br />
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              value="option1"
              checked={isLimitChangable}
              onChange={(e) => {
                console.log("changed");
                setIsLimitChangable(e.target.checked);
              }}
            />
            <label class="form-check-label" for="inlineCheckbox1">
              Limit
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value="option2"
              checked={isSiteSelectable}
              onChange={(e) => {
                setIsSiteSelectable(e.target.checked);
                if (!e.target.checked) {
                  //if unchecked then set the total and clusters value to max
                  let thetotalClusters = 0;
                  sites.forEach((site) => {
                    thetotalClusters += site.clusters;
                  });
                  setTotalClusters(thetotalClusters);
                  setClusters(thetotalClusters);
                } else {
                  //if checked
                  setTotalClusters(sites[0].clusters);
                  setClusters(sites[0].clusters);
                }
              }}
            />
            <label class="form-check-label" for="inlineCheckbox2">
              Site
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              value="option1"
              checked={isIgnoreListChangable}
              onChange={(e) => {
                console.log("changed");
                setIsIgnoreListChangable(e.target.checked);
              }}
            />
            <label class="form-check-label" for="inlineCheckbox1">
              Ignore Sites
            </label>
          </div>
        </div>
        {isLimitChangable && (
          <div class="form-group">
            <label>Clusters: {clusters}</label>
            <input
              type="range"
              name="test"
              min="0"
              max={totalClusters}
              value={clusters}
              onChange={(e) => {
                setClusters(e.target.value);
              }}
              style={{
                width: totalClusters > 9 ? "100%" : "auto",
                display: "block",
              }}
              class="slider"
              id="myRange"
            />
          </div>
        )}
        {isSiteSelectable && (
          <div class="form-group">
            <label for="exampleFormControlSelect1">Site select:</label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              //value={sitename}
              onChange={(e) => {
                let findTheSite = {};
                sites.forEach((site) => {
                  if (site.sitename == e.target.value) {
                    findTheSite = site;
                  }
                });

                setTotalClusters(findTheSite.clusters);
                setClusters(1);
                setSiteName(e.target.value);
              }}
            >
              {sites.map((site) => {
                return <option>{site.sitename}</option>;
              })}
            </select>
          </div>
        )}

        {isIgnoreListChangable && (
          <div className="form-group">
            <label for="exampleFormControlSelect1">Ignore Sites:</label>
            {sites.map(({ sitename }, index) => {
              return (
                <div className="toppings-list-item">
                  <div className="left-section">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={sitename}
                      value={sitename}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                    />
                    <label htmlFor={`custom-checkbox-${index}`}>
                      {sitename}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <button type="submit" class="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
}
