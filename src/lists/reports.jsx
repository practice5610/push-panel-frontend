import React from "react";

import {
  List,
  Datagrid,
  TextField,
  Filter,
  SearchInput,
  ImageField,
} from "react-admin";

export default function CountryList(props) {
  const PostFilter = (props) => (
    <Filter {...props}>
      <SearchInput source="q" alwaysOn />
    </Filter>
  );
  return (
    <List {...props} filters={<PostFilter />}>
      <Datagrid>
        <ImageField source="icon" />
        <TextField source="title" />
        <TextField source="body" />
        <TextField source="url" />

        <TextField source="createdAt" />
      </Datagrid>
    </List>
  );
}
