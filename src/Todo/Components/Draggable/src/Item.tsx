import React from "react";
import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Item = ({ children, ...rest }: any) => {
  return (
    <div className={`bg-white p-2 rounded cursor-pointer text-sm`}>
      {children}
    </div>
  );
};

export function SortableItem({ id, children }: any) {
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
    opacity: isDragging ? 0.3 : 1
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item>{children}</Item>
    </div>
  );
}

// export function SortableItem({ id, children }: any) {
//   const sortable = useSortable({
//     id,
//     transition: null
//   });

//   const {
//     attributes,
//     setNodeRef,
//     listeners,
//     transform,
//     isSorting,
//     isDragging
//   } = sortable;

//   return (
//     <motion.div
//       layout
//       layoutId={id}
//       ref={setNodeRef}
//       animate={{
//         x: transform?.x,
//         y: transform?.y,
//         opacity: isDragging ? 0.3 : 1
//       }}
//       transition={{
//         easing: { type: "spring" },
//         duration: isSorting ? 0.25 : 0
//       }}
//       {...attributes}
//       {...listeners}
//     >
//       <Item>{children}</Item>
//     </motion.div>
//   );
// }
