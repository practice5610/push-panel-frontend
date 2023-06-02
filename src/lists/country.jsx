import React from "react";

import { List, Datagrid, TextField, Filter, SearchInput } from "react-admin";

export default function CountryList(props) {
  const PostFilter = (props) => (
    <Filter {...props}>
      <SearchInput source="q" alwaysOn />
    </Filter>
  );
  return (
    <List {...props} filters={<PostFilter />}>
      <Datagrid>
        <TextField source="name" />
        <TextField source="tokens" />
      </Datagrid>
    </List>
  );
}
