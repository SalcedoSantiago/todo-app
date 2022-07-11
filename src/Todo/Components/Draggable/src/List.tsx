import React from "react";

export interface Props {
  children: React.ReactNode;
  columns?: number;
  style?: React.CSSProperties;
  horizontal?: boolean;
}

export const List = React.forwardRef<HTMLUListElement, Props>(
  ({ children, columns = 1, horizontal, style }: Props, ref) => {
    return (
      <ul ref={ref} className={"rounded bg-gray-200 p-2"}>
        <div className="flex justify-between py-1">
          <h3 className="text-sm ">Completed</h3>
          <svg
            className="h-4 fill-current text-grey-900 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
          </svg>
        </div>
        <div className="grid gap-2 text-sm mt-2">{children}</div>
      </ul>
    );
  }
);
