import React from "react";

import {
  List,
  Datagrid,
  TextField,
  Filter,
  SearchInput,
  ImageField,
} from "react-admin";

export default function siteList(props) {
  const PostFilter = (props) => (
    <Filter {...props}>
      <SearchInput source="q" alwaysOn />
    </Filter>
  );
  return (
    <List {...props} filters={<PostFilter />}>
      <Datagrid>
        <TextField source="sitename" />
        <TextField source="clusters" />
        <TextField source="tokens" />
      </Datagrid>
    </List>
  );
}
