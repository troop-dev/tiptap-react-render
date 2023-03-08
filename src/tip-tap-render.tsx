import React from 'react';

/**
 * Render a tip tap JSON node and all its children
 * @param node the JSON node to render
 * @param mappings a handler for each node type
 * @returns tree of components as react elements
 */
export default function TipTapRender(props: {node: TipTapNode, mapping: NodeHandlers}): JSX.Element {
  const {node, mapping} = props;
  // recursively render child content
  const children: JSX.Element[] = [];
  node.content && node.content.forEach((child, ix) => {
    children.push(
      <TipTapRender
        node={child}
        mapping={mapping}
        key={`${child?.type}-${ix}`}
      />
    )
  })
  // return empty if we are missing a handler for this type
  if (!(node.type in Object)) {
    console.warn(`missing type`, node)
    return <></>
  }
  // render the handler for this type
  const Handler = mapping[node.type]
  return <Handler node={node}>{children}</Handler>
}

interface Attrs {
  readonly [attr: string]: any;
};

export interface TipTapNode {
  type: string
  attrs: Attrs
  marks: Attrs[]
  content?: TipTapNode[]
  readonly [attr: string]: any;
}

export interface NodeProps {
  children?: React.ReactNode;
  node: TipTapNode;
}

export type NodeRenderer = (props: NodeProps) => JSX.Element

export interface NodeHandlers {
  readonly [attr: string]: NodeRenderer
}
