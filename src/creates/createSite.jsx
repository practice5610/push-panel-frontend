import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";

export default function CreateSite(props) {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="sitename" />
      </SimpleForm>
    </Create>
  );
}
