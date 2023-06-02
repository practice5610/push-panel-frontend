import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import API_URL from "../url";
import { getHeader } from "../dataProvider/session.js";

import {
  List,
  Datagrid,
  TextField,
  Filter,
  SearchInput,
  ImageField,
  useRefresh,
} from "react-admin";
import { useEffect } from "react";
import Switch from "@material-ui/core/Switch";

export default function TemplateList(props) {
  const [redirect, setRedirect] = useState("");
  const [clusters, setClusters] = useState(1);

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
    console.log(countClusters);
    setClusters(countClusters);
  }, []);

  const refresh = useRefresh();

  const PostFilter = (props) => (
    <Filter {...props}>
      <SearchInput source="q" alwaysOn />
    </Filter>
  );

  const AutoSendSwitch = ({ record }) => {
    async function block(userIds, state) {
      await fetch(`${API_URL}/admin/templates/${userIds[0]}`, {
        method: "PATCH",
        headers: getHeader(),
        body: JSON.stringify({ autosend: state }),
      });
      refresh();
    }
    return (
      <Switch
        color="secondary"
        checked={record.autosend == true}
        inputProps={{ "aria-label": "primary checkbox" }}
        onChange={(e) => block([record._id], e.target.checked)}
      />
    );
  };

  const SendNotificationButton = ({ record }) => (
    <Button
      variant="contained"
      color="secondary"
      onClick={async () => {
        const response = await fetch(`${API_URL}/admin/sendnotification`, {
          method: "POST",
          headers: getHeader(),
          body: JSON.stringify({
            title: record.title,
            body: record.body,
            url: record.url,
            imgurIconUrl: record.icon,
            imgurImageUrl: record.image,
            clusters: clusters,
            skipSites: record.skipSites,
          }),
        });

        setRedirect("/Reports");
      }}
    >
      Send
    </Button>
  );

  //redirections
  if (redirect !== "") {
    return <Redirect to={redirect} />;
  }

  return (
    <List {...props} filters={<PostFilter />}>
      <Datagrid>
        <ImageField source="icon" />
        <TextField source="title" />
        <TextField source="body" />
        <TextField source="url" />
        <SendNotificationButton />
        <AutoSendSwitch />
      </Datagrid>
    </List>
  );
}
