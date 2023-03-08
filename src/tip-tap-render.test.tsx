import React from "react";
import { render } from "@testing-library/react";
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

  test("renders a child node", () => {
    // create a dummy renderer
    const parent: NodeRenderer = (props) => (<>{props.children}</>)
    const child: NodeRenderer = (props) => (<>{props.node.text}</>)
    // create a handler
    const handlers: NodeHandlers = {
      "doc": parent,
      "text": child,
    }
    // define a shallow tip tap node
    const node: TipTapNode = {
      type: "doc",
      content: [{
        type: "text",
        text: "child text"
      }]
    }
    // render it!
    const actual = render(<TipTapRender handlers={handlers} node={node} />);
    expect(actual.getByText("child text")).toBeInTheDocument();
  });

  test("renders 2 children", () => {
    // create a dummy renderer
    const doc: NodeRenderer = (props) => (<>{props.children}</>)
    const text: NodeRenderer = (props) => (<div>{props.node.text}</div>)
    const img: NodeRenderer = (props) => (<img src={props.node.src} alt={props.node.alt}/>)
    // create a handler
    const handlers: NodeHandlers = {
      "doc": doc,
      "text": text,
      "img": img,
    }
    // define a shallow tip tap node

    const child1: TipTapNode = {
      type: "text",
      text: "hello"
    }

    const child2: TipTapNode = {
      type: "img",
      src: "https://images.com/hi.jpeg",
      alt: "some-image"
    }

    const node: TipTapNode = {
      type: "doc",
      content: [child1, child2]
    }
    // render it!
    const actual = render(<TipTapRender handlers={handlers} node={node} />);
    expect(actual.getByText(child1.text)).toBeInTheDocument();
    expect(actual.getByAltText(child2.alt)).toHaveAttribute("src", child2.src);
  });
});
