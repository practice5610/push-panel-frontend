import React, { useState, useEffect } from "react";
import {
  Create,
  FileInput,
  SimpleForm,
  TextInput,
  FileField,
  CheckboxGroupInput,
} from "react-admin";
import API_URL from "../url";
import { getHeader } from "../dataProvider/session";

export default function CreateTemplate(props) {
  const [sites, setSites] = useState([]);

  useEffect(async () => {
    const response = await fetch(`${API_URL}/admin/sites`, {
      headers: getHeader(),
    });
    const body = await response.json();
    body.data.forEach((d, index) => {
      body.data[index].id = d.sitename;
      body.data[index].name = d.sitename;
    });
    setSites(body.data);
  }, []);

  console.log(localStorage.getItem("currentUser"));
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="title" />
        <TextInput source="body" />
        <TextInput source="url" />
        <CheckboxGroupInput source="skipSites" choices={sites} />
        <FileInput source="icon" label="Select Icon" accept="image/jpeg">
          <FileField source="src" title="title" />
        </FileInput>
        <FileInput source="image" label="Select Image" accept="image/jpeg">
          <FileField source="src" title="title" />
        </FileInput>
      </SimpleForm>
    </Create>
  );
}
