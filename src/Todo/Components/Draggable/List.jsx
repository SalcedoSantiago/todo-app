import React from "react";
import { Stack } from "@chakra-ui/react";

import HeaderList from "../HeaderList";


const List = ({ children, forwarRef, title, count }) => {
  return (
    <Stack direction={'column'} ref={forwarRef} className={"rounded bg-gray-200 p-2"} pt={5} minH={'60vh'}>
      <HeaderList
        title={title}
        count={count}
      />
      {/* </div> */}
      <Stack direction={'column'} w="250px">
        {children}
      </Stack>
    </Stack>
  );
}

export default List;