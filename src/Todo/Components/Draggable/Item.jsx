import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from '@chakra-ui/react';

export const Item = ({ children, ...rest }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export function SortableItem({ id, children }) {
  const sortable = useSortable({
    id
  });
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging
  } = sortable;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners} minH="100px">
      <Item>{children}</Item>
    </Box>
  );
}
