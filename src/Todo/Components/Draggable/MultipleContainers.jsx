import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensors,
  useSensor,
  defaultDropAnimation,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Stack, Box } from '@chakra-ui/react';
import { Item, SortableItem } from "./Item";
import List from "./List";
import { useTodos } from "../../hooks";
import CardTodo from '../Card';



function DroppableContainer({
  children,
  columns = 1,
  id,
  items,
  getStyle = () => ({})
}) {
  const { over, isOver, setNodeRef } = useDroppable({
    id
  });
  const isOverContainer = isOver || (over ? items.includes(over.id) : false);

  return (
    <List
      forwarRef={setNodeRef}
      style={getStyle({ isOverContainer })}
      columns={columns}
    >
      {children}
    </List>
  );
}
const dropAnimation = {
  ...defaultDropAnimation,
  dragSourceOpacity: 0.5
};

export const VOID_ID = "void";

export function MultipleContainers({
  itemCount = 3,
  cancelDrop,
  collisionDetection = closestCorners,
  columns,
  items: initialItems,
  modifiers,
  strategy = verticalListSortingStrategy,
  trashable = false,
  vertical = false
}) {
  const { filterStatus, todos, toggleModal, flattenTodos } = useTodos();


  useEffect(() => {
    setItems(filterStatus)
  }, [filterStatus])

  const [items, setItems] = useState(filterStatus);
  const [clonedItems, setClonedItems] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const findContainer = (id) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  };

  const onDragCancel = () => {
    if (clonedItems) {
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={({ active }) => {
        setActiveId(active.id);
        setClonedItems(items);
      }}
      onDragOver={({ active, over }) => {
        const overId = over?.id;
        if (!overId) {
          console.log('no over ide');
          return;
        }
        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id);
        if (!overContainer || !activeContainer) {
          return;
        }

        if (activeContainer !== overContainer) {
          setItems((items) => {
            const activeItems = items[activeContainer];
            const overItems = items[overContainer];
            const overIndex = overItems.indexOf(overId);
            const activeIndex = activeItems.indexOf(active.id);

            let newIndex;

            if (overId in items) {
              newIndex = overItems.length + 1;
            } else {
              const isBelowLastItem =
                over &&
                overIndex === overItems.length - 1 &&
                active.rect.current.translated &&
                active.rect.current.translated.offsetTop >
                over.rect.offsetTop + over.rect.height;

              const modifier = isBelowLastItem ? 1 : 0;

              newIndex =
                overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return {
              ...items,
              [activeContainer]: [
                ...items[activeContainer].filter((item) => item !== active.id)
              ],
              [overContainer]: insert(
                items[overContainer],
                newIndex,
                items[activeContainer][activeIndex]
              )
            };
          });
        }
      }}
      onDragEnd={(parameters) => {
        const { active, over, delta } = parameters;
        const activeContainer = findContainer(active.id);

        if (!activeContainer) {
          setActiveId(null);
          return;
        }

        const overId = over?.id || VOID_ID;

        if (overId === VOID_ID || (delta.x == 0 && delta.y == 0)) {
          setItems((items) => ({
            ...(trashable && over?.id === VOID_ID ? items : clonedItems),
            [VOID_ID]: []
          }));
          toggleModal(true);
          console.log('active.id', active.id);
          setActiveId(null);
          return;
        }

        const overContainer = findContainer(overId);

        if (activeContainer && overContainer) {
          const activeIndex = items[activeContainer].indexOf(active.id);
          const overIndex = items[overContainer].indexOf(overId);

          if (activeIndex !== overIndex) {
            setItems((items) => ({
              ...items,
              [overContainer]: arrayMove(
                items[overContainer],
                activeIndex,
                overIndex
              )
            }));
          }
        }

        setActiveId(null);
      }}
      cancelDrop={cancelDrop}
      onDragCancel={onDragCancel}
      modifiers={modifiers}
    >
      <Stack direction="row">
        {Object.keys(items)
          .filter((key) => key !== VOID_ID)
          .map((containerId) => (
            <SortableContext
              key={containerId}
              items={items[containerId]}
              strategy={strategy}
            >
              <DroppableContainer
                id={containerId}
                columns={columns}
                items={items[containerId]}
              >
                {items[containerId].map((value, index) =>
                  <SortableItem key={value} id={value}>
                    <CardTodo todo={flattenTodos.filter((todo) => todo.id == value)[0]} />
                  </SortableItem>
                )
                }
              </DroppableContainer>
            </SortableContext>
          ))}
      </Stack>
      {createPortal(
        <DragOverlay dropAnimation={dropAnimation} adjustScale={false}>
          {activeId ?
            <Box id={activeId} maxH={'100px'}>
              <CardTodo todo={flattenTodos.filter((todo) => todo.id == activeId)[0]} />
            </Box>
            : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
function insert(arr, index, elem) {
  const copy = arr.slice();
  copy.splice(index, 0, elem);
  return copy;
}
