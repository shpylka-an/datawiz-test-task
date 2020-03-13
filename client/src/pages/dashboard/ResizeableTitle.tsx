import React from "react";
import { Resizable } from "react-resizable";
import "./ResizeableTitle.css"

const ResizeableTitle = (props: any) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={resizeHandle => (
        <span
          className={`react-resizable-handle react-resizable-handle-${resizeHandle}`}
          onClick={e => {
            e.stopPropagation();
          }}
        />
      )}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

export default ResizeableTitle;
