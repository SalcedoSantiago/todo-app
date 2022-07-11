import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { Box } from "@chakra-ui/react";
import SortableItem from "./sortable_item";

const containerStyle = {
  padding: 10,
  margin: 10,
  flex: 1
};

export default function Container(props) {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id
  });

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <Box w="250px" ref={setNodeRef} >
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </Box>
    </SortableContext>
  );
}
