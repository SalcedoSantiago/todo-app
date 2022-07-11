import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import React from "react";
import { Box } from '@chakra-ui/react';

const DroppableList = ({ id, items }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <div ref={setNodeRef} >
        {items.map((item) => (
          <SortableItem key={item} id={item} />
        ))}
      </div>
    </SortableContext>
  );
};

export default DroppableList;
