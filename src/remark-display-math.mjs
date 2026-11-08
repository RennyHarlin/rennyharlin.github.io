// remark-math renders `$$ x $$` written on one line as inline math. Treat a paragraph
// made only of `$$ ... $$` equations as display equations, the way MathJax did on Hugo.
export default function remarkDisplayMath() {
  // `$$x$$` spans the content plus 4 delimiter characters, `$x$` only 2.
  const isDoubleDollar = (n) =>
    n.type === 'inlineMath' && n.position && n.position.end.offset - n.position.start.offset >= n.value.length + 4;
  const isBlank = (n) => n.type === 'text' && !n.value.trim();

  // Same shape remark-math gives a `$$` block, so rehype-katex renders it in display mode.
  const displayMath = ({ value, position }) => ({
    type: 'math',
    value,
    position,
    data: {
      hName: 'pre',
      hChildren: [
        {
          type: 'element',
          tagName: 'code',
          properties: { className: ['language-math', 'math-display'] },
          children: [{ type: 'text', value }],
        },
      ],
    },
  });

  const walk = (node) => {
    if (!node.children) return;
    node.children = node.children.flatMap((child) => {
      const parts = child.type === 'paragraph' ? child.children : [];
      if (parts.some(isDoubleDollar) && parts.every((n) => isDoubleDollar(n) || isBlank(n))) {
        return parts.filter(isDoubleDollar).map(displayMath);
      }
      walk(child);
      return [child];
    });
  };

  return walk;
}
