# TipTap React Render

[![npm](https://img.shields.io/npm/v/@troop.com/tiptap-react-render.svg?style=flat)](https://www.npmjs.com/package/@troop.com/tiptap-react-render)
[![npm](https://img.shields.io/npm/dt/@troop.com/tiptap-react-render)](https://www.npmjs.com/package/@troop.com/tiptap-react-render)

This library renders [TipTap](https://tiptap.dev/) JSON payloads in React clients without embedding the editor.

### Installation
```sh
# npm
npm install @troop.com/tiptap-react-render

# yarn
yarn add @troop.com/tiptap-react-render
```

### Usage
```typescript
// handle the document
const doc: NodeHandler = (props) => (<>{props.children}</>)

// handle a paragraph
const paragraph: NodeHandler = (props) => {
  return <p>{props.children}</p>
}

// handle text
const text: NodeHandler = (props) => {
  // you could process text marks here from props.node.marks ...
  return <span>{props.node.text}</span>
}

// handle an image
const img: NodeHandler = (props) => {
  const { src, alt, title } = props.node;
  return (<img src={src} alt={alt} title={title} />)
}

// create a handlers wrapper
const handlers: NodeHandlers = {
  "doc": doc,
  "text": text,
  "paragraph": paragraph,
  "img": img,
}

// sample tip tap data
const data = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [{
        type: "text",
        text: "hello world"
      }],
      type: "paragraph",
      content: [{
        type: "img",
        src: "https://some-url.com/img.jpg",
        alt: "some alt text"
      }]
    }
  ]
}

// render it!
const rendered = <TipTapRender handlers={handlers} node={data} />
```

### Why?

Many folks render TipTap rich text by embedding the TipTap editor in a "read-only" mode. However, if you don't want to add TipTap as a dependency (or, like us, you're using a platform that can't support it like React Native), then this is a simple, lightweight tool for mapping TipTap nodes to presentation components!

We were inspired by Contentful's [rich-text-react-renderer](https://github.com/contentful/rich-text/tree/master/packages/rich-text-react-renderer) tool, so we built a similar one for TipTap payloads!

This repo was scaffolded using the [@alexeagleson/template-react-component-library](https://github.com/alexeagleson/template-react-component-library)
