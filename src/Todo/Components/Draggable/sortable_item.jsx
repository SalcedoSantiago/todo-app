import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTodos } from "../../hooks";
import CardTodo from '../Card';
import { Stack} from '@chakra-ui/react'

export function Item(props) {
  const { todos } = useTodos();
  const currTodo = todos.filter(({ id }) => id === props.id)[0];

  return <CardTodo todo={currTodo} />
}

export default function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <Stack direction="column" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item id={props.id} />
    </Stack>
  );
}
