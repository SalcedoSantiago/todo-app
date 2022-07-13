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
import { useTodos } from "../../hooks";
import CardTodo from '../Card';
import CurrentTodo from "../modal/Screens/CurrentTodo";
import { Item, SortableItem } from "./Item";
import List from "./List";



function DroppableContainer({
  children,
  columns = 1,
  id,
  items,
  getStyle = () => ({}),
  title,
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
      title={title}
      count={Boolean(items?.length) ? items.length : 0}
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
  modifiers,
  strategy = verticalListSortingStrategy,
  trashable = false,
  vertical = false
}) {

  const {
    setStatusItems,
    statusItems,
    todos,
    setTodos
  } = useTodos();


  const [clonedItems, setClonedItems] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [openModal, setOpenModal] = useState(false)
  const [currentTodo, setCurrentTodo] = useState('');
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const findContainer = (id) => {
    if (id in statusItems) {
      return id;
    }

    return Object.keys(statusItems).find((key) => statusItems[key].includes(id));
  };

  const onDragCancel = () => {
    if (clonedItems) {
      setStatusItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };
  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragStart={({ active }) => {
          setActiveId(active.id);
          setClonedItems(statusItems);
        }}
        onDragOver={({ active, over }) => {
          const overId = over?.id;
          if (!overId) {
            return;
          }
          const overContainer = findContainer(overId);
          const activeContainer = findContainer(active.id);
          if (!overContainer || !activeContainer) {
            return;
          }

          if (activeContainer !== overContainer) {
            setStatusItems((items) => {
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
            setStatusItems((items) => ({
              ...(trashable && over?.id === VOID_ID ? items : clonedItems),
              [VOID_ID]: []
            }));
            setCurrentTodo(active.id);
            setOpenModal(true);
            setActiveId(null);
            return;
          }

          const overContainer = findContainer(overId);

          if (activeContainer && overContainer) {
            const activeIndex = statusItems[activeContainer].indexOf(active.id);
            const overIndex = statusItems[overContainer].indexOf(overId);

            if (activeIndex !== overIndex) {
              setStatusItems((items) => ({
                ...items,
                [overContainer]: arrayMove(
                  items[overContainer],
                  activeIndex,
                  overIndex
                )
              }));
            }
          }

          const newTodo = todos.map((todo) => {
            if (todo.id == active.id) {
              return {
                ...todo,
                status: overContainer
              }
            }
            return todo
          })
          setTodos(newTodo)
          setActiveId(null);
        }}
        cancelDrop={cancelDrop}
        onDragCancel={onDragCancel}
        modifiers={modifiers}
      >
        <Stack direction="row" overflowX={'scroll'}>
          {Object.keys(statusItems)
            .filter((key) => key !== VOID_ID)
            .map((containerId) => (
              <SortableContext
                key={containerId}
                items={statusItems[containerId]}
                strategy={strategy}
              >
                <DroppableContainer
                  id={containerId}
                  columns={columns}
                  items={statusItems[containerId]}
                  title={containerId}
                >
                  {statusItems[containerId].map((value, index) =>
                    <SortableItem key={value} id={value}>
                      <CardTodo todo={todos.filter((todo) => todo.id == value)[0]} />
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
              <Box id={activeId}>
                <CardTodo todo={todos.filter((todo) => todo.id == activeId)[0]} />
              </Box>
              : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>

      {openModal &&
        <CurrentTodo isOpen={openModal} toggleModal={setOpenModal} id={currentTodo} />
      }
    </>
  );
}
function insert(arr, index, elem) {
  const copy = arr.slice();
  copy.splice(index, 0, elem);
  return copy;
}
