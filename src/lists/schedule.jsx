//importing librarys and components
import { Link } from "react-router-dom";
import { Title } from "react-admin";

//importing material-ui components
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";

//importing constants
import API_URL from "../url";
import { getHeader } from "../dataProvider/session.js";

//main function
function Schedule() {
  //hooks

  //state hooks
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [interval, setTheInterval] = useState("");
  const [submitted, setSubmitted] = useState(false);

  //use effect hooks
  useEffect(() => {
    async function getStuffs() {
      const response = await fetch(`${API_URL}/admin/schedule`, {
        headers: getHeader(),
      });
      const resBody = await response.json();
      setFrom(resBody.from);
      setTo(resBody.to);
      setTheInterval(resBody.interval);
    }
    getStuffs();
  }, []);

  //conditional return
  return (
    <>
      <Title title="Schedule" />
      <div className="container" style={{ marginTop: 20 }}>
        <TextField
          id="standard-basic"
          variant="filled"
          disabled={submitted}
          label="From (in hours)"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <br />
        <br />
        <TextField
          id="standard-basic"
          variant="filled"
          disabled={submitted}
          label="To (in hours)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <br />
        <br />
        <TextField
          id="standard-basic"
          variant="filled"
          disabled={submitted}
          label="Interval (in minutes)"
          value={interval}
          onChange={(e) => setTheInterval(e.target.value)}
        />
        <br />
        <br />
        <Button
          variant="contained"
          color="secondary"
          disabled={submitted}
          onClick={async () => {
            setSubmitted(true);
            await fetch(`${API_URL}/admin/schedule`, {
              method: "PATCH",
              headers: getHeader(),
              body: JSON.stringify({
                from: Number(from),
                to: Number(to),
                interval: Number(interval),
              }),
            });
            setSubmitted(false);
          }}
        >
          Update
        </Button>
      </div>
    </>
  );
}

export default Schedule;
