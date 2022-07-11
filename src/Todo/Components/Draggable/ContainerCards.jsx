import React, { useState } from "react";
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Container from "./container";
import { Item } from "./sortable_item";
import { defaultAnnouncements } from './utils'
import { Stack } from "@chakra-ui/react";
import { useTodos } from "../../hooks";
import { map } from "lodash";


const ContainerCards = () => {

    const { todos_, allTodos, filterStatus } = useTodos();
    const [items, setItems] = useState(filterStatus);

    const [allTodos_test, setAllTodos_test] = useState(allTodos);
    const [todos_test, setTodos_test] = useState(todos_);
    const [activeId, setActiveId] = useState();

    return (
        <Stack direction={'row'}>
            <DndContext
                announcements={defaultAnnouncements}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <Stack direction={"row"}>
                    {map(items, (item, index) =>
                        <Container key={index} id={index} items={item} />
                    )}
                    {/* <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay> */}
                </Stack>
            </DndContext>
        </Stack>
    );

    function findContainer(id) {
        if (id in items) {
            return id;
        }

        return Object.keys(items).find((key) => items[key].includes(id));
    }

    function handleDragStart(event) {
        const { active } = event;
        const { id } = active;

        setActiveId(id);
    }

    function handleDragOver(event) {
        const { active, over, draggingRect } = event;
        const { id } = active;
        const { id: overId } = over;

        // Find the containers
        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        ) {
            return;
        }

        setItems((prev) => {
            const activeItems = prev[activeContainer];
            const overItems = prev[overContainer];

            // Find the indexes for the items
            const activeIndex = activeItems.indexOf(id);
            const overIndex = overItems.indexOf(overId);

            let newIndex;

            console.log('over.', over);
            console.log('draggingRect', draggingRect);

            if (overId in prev) {
                newIndex = overItems.length + 1;
            } else {
                // const isBelowLastItem =
                //     over &&
                //     overIndex === overItems.length - 1 &&
                //     draggingRect.top > over.rect.top + over.rect.height;

                const modifier = true ? 1 : 0;

                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return {
                ...prev,
                [activeContainer]: [
                    ...prev[activeContainer].filter((item) => item !== active.id)
                ],
                [overContainer]: [
                    ...prev[overContainer].slice(0, newIndex),
                    items[activeContainer][activeIndex],
                    ...prev[overContainer].slice(newIndex, prev[overContainer].length)
                ]
            };
        });
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        const { id } = active;
        const { id: overId } = over;

        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            return;
        }

        const activeIndex = items[activeContainer].indexOf(active.id);
        const overIndex = items[overContainer].indexOf(overId);

        if (activeIndex !== overIndex) {
            setItems((items) => ({
                ...items,
                [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
            }));
        }

        setActiveId(null);
    }
}


export default ContainerCards