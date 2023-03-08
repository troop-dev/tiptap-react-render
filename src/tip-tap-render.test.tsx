import React from "react";
import { render } from "@testing-library/react";
// import '@testing-library/jest-dom'
import TipTapRender, { NodeHandlers, NodeRenderer, TipTapNode } from "./tip-tap-render";


describe("TipTapRender", () => {
  test("renders an empty node", () => {
    // create a dummy renderer
    const dummy: NodeRenderer = (props) => (<div id="some-id">this a doc</div>)
    // create a handler
    const handlers: NodeHandlers = {
      "doc": dummy,
    }
    // define a shallow tip tap node
    const node: TipTapNode = {
      type: "doc",
    }
    // render it!
    const actual = render(<TipTapRender handlers={handlers} node={node} />);
    expect(actual.getByText("this a doc")).toBeInTheDocument();
});
});
