import React from "react";
import { render } from "@testing-library/react";
import {
  TipTapRender,
  NodeHandlers,
  NodeHandler,
  TipTapNode,
} from "./tip-tap-render";

describe("TipTapRender", () => {
  test("renders an empty node", () => {
    // create a dummy renderer
    const dummy: NodeHandler = (props) => (<div id="some-id">this a doc</div>)
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
    const parent: NodeHandler = (props) => (<>{props.children}</>)
    const child: NodeHandler = (props) => (<>{props.node.text}</>)
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
    const doc: NodeHandler = (props) => (<>{props.children}</>)
    const text: NodeHandler = (props) => (<div>{props.node.text}</div>)
    const img: NodeHandler = (props) => (<img src={props.node.src} alt={props.node.alt}/>)
    // create a handler
    const handlers: NodeHandlers = {
      "doc": doc,
      "text": text,
      "img": img,
    }
    // make a text node
    const child1: TipTapNode = {
      type: "text",
      text: "hello"
    }
    // make an image node
    const child2: TipTapNode = {
      type: "img",
      src: "https://images.com/hi.jpeg",
      alt: "some-image"
    }
    // wrap in a document
    const node: TipTapNode = {
      type: "doc",
      content: [child1, child2]
    }
    // render it!
    const actual = render(<TipTapRender handlers={handlers} node={node} />);
    expect(actual.getByText(child1.text)).toBeInTheDocument();
    expect(actual.getByAltText(child2.alt)).toHaveAttribute("src", child2.src);
  });

  test("renders depth 3", () => {
    // create a dummy renderer
    const doc: NodeHandler = (props) => (<>{props.children}</>)
    const text: NodeHandler = (props) => (<span>{props.node.text}</span>)
    const paragraph: NodeHandler = (props) => (<p>{props.children}</p>)
    // create a handler
    const handlers: NodeHandlers = {
      "doc": doc,
      "text": text,
      "paragraph": paragraph,
    }
    // paragraph with text in it
    const p1: TipTapNode = {
      type: "paragraph",
      content: [{
        type: "text",
        text: "hello"
      }]
    }
    // wrap in document
    const node: TipTapNode = {
      type: "doc",
      content: [p1]
    }
    // render it!
    const actual = render(<TipTapRender handlers={handlers} node={node} />);
    expect(actual.getByText("hello")).toBeInTheDocument();
  });

  test("no-op on unhandled type", () => {
    // create a dummy renderer
    const doc: NodeHandler = (props) => (<>{props.children}</>)
    const paragraph: NodeHandler = (props) => (<p>{props.children}</p>)
    const text: NodeHandler = (props) => (<span>{props.node.text}</span>)
    // create a handler
    const handlers: NodeHandlers = {
      "doc": doc,
      "text": text,
      "paragraph": paragraph,
    }
    // paragraph with text in it
    const p1: TipTapNode = {
      type: "paragraph",
      content: [{type: "text", text: "text 1"}]
    }
    // unhandled type with text in it
    const p2: TipTapNode = {
      type: "bad-type",
      content: [{type: "text", text: "text 2"}]
    }
    // wrap in document
    const node: TipTapNode = {
      type: "doc",
      content: [p1, p2]
    }
    // render it!
    const actual = render(<TipTapRender handlers={handlers} node={node} />);
    // text 1 should render
    expect(actual.getByText("text 1")).toBeInTheDocument();
    // text 2 should not!
    expect(actual.queryByText("text 2")).toBeNull();
  });
});
