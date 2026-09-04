---
date: '2026-07-15T09:34:46+05:30'
draft: true
title: 'Trees'
---
## 235. Lowest Common Ancestor of a Binary Search Tree

```python
class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if p.val <= root.val <= q.val or q.val <= root.val <= p.val:
            return root
        
        if p.val < root.val and q.val < root.val and root.left:
            return self.lowestCommonAncestor(root.left, p, q)
        
        elif root.right:
            return self.lowestCommonAncestor(root.right, p, q)
```

## 102. Binary Tree Level Order Traversal

```python
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []

        q = deque()
        q.append(root)
        ans = []
        while(q):
            level_size = len(q)
            level = []
            for i in range(level_size):
                el = q.popleft()
                level.append(el.val)
                if el.left:
                    q.append(el.left)
                if el.right:
                    q.append(el.right)
            ans.append(level)
        return ans
```

## 98. Validate Binary Search Tree

```python
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def helper(root, low, high):
            if not root:
                return True
            elif low < root.val < high:
                return helper(root.left, low, root.val) and helper(root.right, root.val, high)
            else:
                return False
        
        return helper(root, float('-inf'), float('inf'))
```

## 