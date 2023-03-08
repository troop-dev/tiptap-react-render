import React from 'react';
import { NodeHandlers, NodeProps, NodeRenderer } from "./tip-tap-render"

const TextRender: NodeRenderer = (props: NodeProps) => {

  if (!props.node.text) {
    console.log("missing text", props)
    return <></>
  }

  const payload: string = props.node.text

  // define variable for react style
  let style: React.CSSProperties = {}

  // dynamically process text marks
  props.node.marks && props.node.marks.forEach(mark => {
    switch (mark.type) {
      case 'bold':
        style.fontWeight = 'bold'
        break;
      case 'italic':
        style.fontStyle = 'italic'
        break;
      case 'underline':
        style.textDecorationLine = 'underline'
        break;
      case 'textStyle':
        const markAttrs = mark.attrs
        if (!!markAttrs?.color) {
          style.color = markAttrs.color
        }
        break;
      case 'strike':
        style.textDecorationLine = 'line-through'
        break;
      default:
        console.log('unhandled mark', mark)
    }
  })

  return <span style={style}>{payload}</span>
}

const Paragraph: NodeRenderer = (props) => {
  // dynamically process text marks
  let style: React.CSSProperties = {}

  if (!!props.node.attrs) {
    const attrs = props.node.attrs;

    if (attrs.textAlign) {
      style.textAlign = attrs.textAlign;
    }
  }

  return (<><p style={style}>{props.children}</p></>)
}

const HardBreak: NodeRenderer = (props) => {
  return (<br/>)
}

const Passthrough: NodeRenderer = (props) => {
  return (<>{props.children}</>)
}

const Image: NodeRenderer = (props) => {
  const attrs = props.node.attrs
  return <img alt={attrs?.alt} src={attrs?.src} title={attrs?.title} />
}

export const SampleMapping: NodeHandlers = {
  "text": TextRender,
  "paragraph": Paragraph,
  "doc": Passthrough,
  "hardBreak": HardBreak,
  "image": Image,
}
