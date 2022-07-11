import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  CancelDrop,
  closestCorners,
  CollisionDetection,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  Modifiers,
  PointerSensor,
  useDroppable,
  UniqueIdentifier,
  useSensors,
  useSensor,
  defaultDropAnimation,
  DropAnimation
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  SortingStrategy
} from "@dnd-kit/sortable";

import { Item, SortableItem } from "./Item";
import { List } from "./List";

const defaultInitializer = (index) => index;

export function createRange(
  length,
  initializer,
){
  return [...new Array(length)].map((_, index) => initializer(index));
}
export default {
  title: "Presets/Sortable/Multiple Containers"
};

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
      ref={setNodeRef}
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
export const defaultContainerStyle = ({ isOverContainer }) => ({
  marginTop: 40,
  backgroundColor: isOverContainer
    ? "rgb(235,235,235,1)"
    : "rgba(246,246,246,1)"
});

export const VOID_ID = "void";

export function MultipleContainers({
  itemCount = 3,
  cancelDrop,
  collisionDetection = closestCorners,
  columns,
  items: initialItems,
  getContainerStyle = defaultContainerStyle,
  modifiers,
  strategy = verticalListSortingStrategy,
  trashable = false,
  vertical = false
}) {
  const [items, setItems] = useState(
    () =>
      initialItems ?? {
        A: createRange(itemCount, (index) => `A${index + 1}`),
        B: createRange(itemCount, (index) => `B${index + 1}`),
        C: createRange(itemCount, (index) => `C${index + 1}`),
        D: createRange(itemCount, (index) => `D${index + 1}`),
        [VOID_ID]: []
      }
  );
  const [clonedItems, setClonedItems] = React.useState < Items | null > (null);
  const [activeId, setActiveId] = React.useState < string | null > (null);
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
      onDragEnd={({ active, over }) => {
        const activeContainer = findContainer(active.id);

        if (!activeContainer) {
          setActiveId(null);
          return;
        }

        const overId = over?.id || VOID_ID;

        if (overId === VOID_ID) {
          setItems((items) => ({
            ...(trashable && over?.id === VOID_ID ? items : clonedItems),
            [VOID_ID]: []
          }));
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
      <div className="inline-grid items-start grid-flow-col gap-4 bg-blue-400 w-full h-screen p-8 font-sans">
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
                getStyle={getContainerStyle}
              >
                {items[containerId].map((value, index) => {
                  return (
                    <SortableItem key={value} id={value}>
                      {value}
                    </SortableItem>
                  );
                })}
              </DroppableContainer>
            </SortableContext>
          ))}
      </div>
      {createPortal(
        <DragOverlay dropAnimation={dropAnimation} adjustScale={true}>
          {activeId ? <Item id={activeId}>{activeId}</Item> : null}
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
