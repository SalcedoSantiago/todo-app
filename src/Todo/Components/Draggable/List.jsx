import React from "react";
import { Stack } from "@chakra-ui/react";

const List = ({ children, forwarRef }) => {
  return (
    <ul ref={forwarRef} className={"rounded bg-gray-200 p-2"}>
      <div className="flex justify-between py-1">
        <h3 className="text-sm ">Completed</h3>
      </div>
      <Stack direction={'column'} w="250px">
        {children}
      </Stack>
    </ul>
  );
}

export default List;