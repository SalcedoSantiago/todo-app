import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "../Card";
import { useTodos } from "../../hooks";
import { Stack } from '@chakra-ui/react';

const SortableItem = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });
  const { todos } = useTodos();


  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const currTodo = todos.filter((todo) => todo.id == props.id)[0];

  return (
    <Stack direction={'column'} w="200px" minW={'200px'} maxW="200px" style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
      <Card
        todo={currTodo}
      />
    </Stack>
  );
};

export default SortableItem;
