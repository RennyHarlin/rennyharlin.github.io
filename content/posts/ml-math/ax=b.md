---
date: '2026-02-04T12:02:16+05:30'
draft: false
title: 'Ax=b: The Jack of all Trades'
math: true
series: ['Math for Machine Learning']
---

$Ax=b$, seems so simple right ?

To find $x$ just compute $A^{-1}b$, and most math libraries will give you the answer. 

But, every linear algebra student knows the real pain behind this nightmare equation :(

The problem with this equation is that $x=A^{-1}b$ won't work for all possible values of $A$ and $b$. So, there are like a ton of boundary conditions to consider inorder to find the right solution for $x$. And, the entirety of modern machine learning revolves around this idea. 

Since, nowadays all prominent machine learning libraries handle these boundary conditions for us. All we are exposed to is a function called $inv()$, which just magically computes the inverse of $A$. So, all the intricacies behind the inverse computation is hidden. Now, in this article I'm going to unravel this mystery along with its mathematical nuances. Knowing this will unlock a whole new perspective on how you see data and most importantly *linear regression*.

## Vector Spaces
Vector space refers to a set of vectors which are closed under addition and scaling, and also includes the null vector.

I know, all of this sounds scary. But, it's actually something we are already way too familiar with. $\mathbb{R}^1$, $\mathbb{R}^2$ and $\mathbb{R}^3$ although they are lightly used in a lot of math contexts to represent real numbers of n dimensions, they are all vector spaces!!

Why ? (Let's consider $\mathbb{R}^2$)
1. Any linear combination we perform between the vectors in $\mathbb{R}^2$, we end up in $\mathbb{R}^2$ itself. Hence, it's closed by addition and scalar multiplication
2. $\mathbb{R}^2$ also consists of the null vector $\begin{pmatrix} 0 \\ 0 \end{pmatrix}$

Hence, we've already been using vector spaces all our lives.

## Basis Vectors
Now, consider the vector space of $\mathbb{R}^2$ for example. 

Ask yourself a question, *Can all vectors in $\mathbb{R}^2$ be reproduced by just 2 vectors ?*

If you consider the unit vectors of $\mathbb{R}^2$ in $X$ and $Y$ direction, which are $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $\begin{pmatrix} 0 \\ 1 \end{pmatrix}$

Any vector in $\mathbb{R}^2$ = $\alpha\begin{pmatrix} 1 \\ 0 \end{pmatrix} + \beta \begin{pmatrix} 0 \\ 1 \end{pmatrix}$

Ponder on the above formulation yourself, think of a random vector in $\mathbb{R}^2$ and check if you can recreate it by choosing some $\alpha$ and $\beta$. I can guarantee you that you'll be able to do it. These two vectors are called basis vectors. 

For a $n$-dimensional space, you'll have $n$ basis vectors. Using these $n$ basis vectors you can reproduce the entire space.

These vectors need not necessarily be unit vectors, they can literally be anything. But, the one condition that ensures that they can reproduce the entire vector space is that all the vectors in the basis set should be linearly independent from each other (i.e. no vector in the basis set can be expressed as a linear combination of the other vectors in the set).
## Vector Subspaces
This is the very concept that powers $Ax=b$. Let's nail this one down too.

As the name suggests, a vector subspace is a subspace inside a vector space that follows all the properties of a vector space as discussed above. 
Now, there are 4 standard subspaces:
1. Column space
2. Row space
3. Left Null space
4. Right Null space

These 4 subspaces are associated with our matrix $A$. \
But, How ? Let's look at them one by one.

Consider an $m \times n$ example matrix,
$$
A = \begin{pmatrix} 1 & 2 & 3\\ 2 & 4 & 6 \\ 1 & 1 & 1 \end{pmatrix}
$$

Column rank = No. of independent columns \
Row rank = No. of independent rows
> *Rank* of a matrix is the column rank (which is also equal to row rank), it essentially tells about how many independent directions your matrix can truly represent

So, for the above matrix:
1. Row rank = 2 (Row 2 $\rightarrow 2 \times$ Row 1. So, only Row 1 and Row 3 are independent)
2. Col rank = Row rank = 2

Rank of the matrix = 2

For a matrix of rank 2 there are 2 basis vectors that span the column space and 2 basis vectors that span the row space.

> The dimension of a vector space is number of linearly independent vectors that span the space. Here, dim(column space) = 2 and dim(row space) = 2

So, now what are these basis vectors ?
1. The independent columns in $A$ are the basis vectors for the column space, the independent columns in $A$ are the pivotal columns you get after doing Gaussian Elimination.
2. The independent rows in $A$ are the basis vectors for the row space, the independent rows in $A$ are the non-zero rows you get after doing Gaussian Elimination.

So, now you should be in a place where you can identify the basis vectors of both the column space and the row space.
   
And one important detail to consider, the vectors in column space $\in\mathbb{R}^m$ and the vectors in row space $\in\mathbb{R}^n$. This is also called as the *tuple space* of the column space and row space. Check out for this term, because I'll be extensively using this term for the rest of this article.

> $rank(A) = r$

Now, just focus on the column space of $A$. It has $r$ number of basis vectors. But, we know that inorder to span the entirety of $\mathbb{R}^m$(the tuple space of the column space) we need $m$ basis vectors. So, we still need $(m - r)$ number of basis vectors to span $\mathbb{R}^m$.

If $r = m$ then it's fine. Because, we have $m$ linearly independent columns. They'll span the tuple space of the columns. The problem is when $r < m$.

 When $r$ < $m$, we expect to have $m$ basis vectors to span the column tuple space, but we only have $r$ independent columns. Now, the question arises where do these $(m - r)$ vectors actually lie if they're not physical present in $A$. Here is where the concept of left null space comes in to picture. In order to span the tuple space of the columns, we consider vectors that lie orthogonal or perpendicular to the column space of $A$. This vector space orthogonal to the column space, from which the remaining basis vectors are taken from is called Left Null Space. 

So, in short for any matrix $A$, you get $r$ number of basis vectors for the column space, and $(m - r)$ number of basis vectors for the left null space. Together these vectors span the tuple space of the columns (i.e. $\mathbb{R}^m$).

The same applies to row space also, the tuple space dimension of the row space if $\mathbb{R}^n$, so we need $n$ basis vectors to span the tuple space of the rows. We only know $r$ number of basis vectors from rowspace. We still need $(n - r)$ number of basis vectors. Where do you think they are in ?

They are in a vector space perpendicular to the rowspace, called as the *Right Null Space*. So, overall the $r$ number of basis vectors derived from the row space of $A$ and the $(n - r)$ number of basis vectors derived from the right null space of $A$, span the entire tuple space of the rows (i.e. $\mathbb{R}^n$).

So, now we know given a matrix $A$:
1. We have two tuple spaces involved with this matrix, row tuple space $\mathbb{R}^n$ and column tuple space $\mathbb{R}^m$. Our goal is to find the basis vectors that span these spaces from $A$.
2. For the column tuple space, from $A$ we can derive the column space of dimension $r$, and the remaining $(m - r)$ basis vectors can be derived from the left null space of $A$.
$$
dim(LNS) = (m - r)
$$
3. For the row tuple space, from $A$ we can derive the row space of dimension $r$, and the remaining $(n - r)$ basis vectors can be derived from the right null space of $A$.
$$
dim(RNS) = (n - r)
$$
4. Now, this is the big picture of Linear Algebra.

## The Nice Case $(r = m = n)$
So, when can we actually use $A^{-1}b$ to compute $x$ ? 

Some obvious replies would be:
1. When $A$ is a square matrix
2. When $|A|\not ={0}$

But, now that we know about vector subspaces. Think in terms of that. 
Just look at $Ax$ as a linear combinations of the columns of $A$.

$$\begin{pmatrix} 1 & 2 & 3\\ 2 & 4 & 6 \\ 1 & 1 & 1 \end{pmatrix} \begin{pmatrix} x \\ y \\ z \end{pmatrix} = x\begin{pmatrix} 1 \\ 2 \\ 1 \end{pmatrix} + y\begin{pmatrix} 2 \\ 4 \\ 1 \end{pmatrix} + z\begin{pmatrix} 3 \\ 6 \\ 1 \end{pmatrix}$$

The $b$ we get after performing $Ax$, is a linear combination of the columns of $A$. So, which subspace is $b$ supposed to lie in ? \
$b$ is supposed to lie in the column space of $A$.

Alright, that's fine. But, in real life, does $b$ always be in the column space of $A$ ? What if it's in the left null space ?

Here comes the aha moment, can you think of a case where $b$ is always in the column space of $A$?\
The above scenario can happen only when $A$ is full rank or I should say the $r$ = number of columns. So, there will be no vector in the left null space. The entirety of $\mathbb{R}^m$ is spanned by the columns of $A$. In this case, $b$ has no where else to go it can only stay with in the column space of $A$.

Now, this scenario is exactly where your inverse works.

When $A$ is full rank square matrix, it's determinant will not be zero and inverse is guranteed to exist. On solving you get one solution for $x$, and it's a unique solution.

> An unique solution exists for $x$ iff $A$ is a full rank square matrix


## Annoying case $(r = \min(m, n))$

Now, the above nice case exists only when $A$ is a square matrix. Now, there are yet another 3 cases to consider:
1. What if $r = m$, which is less than $n$ ? 
2. What if $r = n$, which is less than $m$ ? 
3. What if $r < (m \land n)$ ?

Quite the hastle here, but since we are already masters of vector subspaces. The above cases will be quite intuitive to understand.

### Case 1 : $r = m \land m < n$

If $r = m$, what does that tell ?
All columns of $A$ are independent, that means all columns span $\mathbb{R}^m$. So, you'll be really tempted to say unique solution. But, it's not. I'll tell you exactly why not.

Till now we have discussed about the vector subspace in which $b$ lies. Which if all columns are independent, then it'll lie in the column space. But, what about $x$ ?

Which vector space will $x$ be ?

$x\in\mathbb{R}^n$, so $x$ should belong either to the row space or the right null space.

Also, we know that vectors in the right null space are orthogonal to the rows of $A$.
Which can be expressed as,
$$ 
Ax_{RNS} = 0 \tag{1}
$$
So, to conclude if $b$ is not the null vector then defnitely $x$ should belong to the rowspace of A.
$$
Ax_{ROW} = b \tag{2}
$$

Now, comes the most interesting part of this article. If I just add equations $(1) \land (2)$, 
what do I get ?

$$
\boxed{
   A(x_{ROW} + x_{RNS}) = b
}
$$

So, not only do you have a solution in the row space, you can combine your solution with any arbitrary vector in the right null space and still get $b$ as your solution. Hence, there are infinitely many solutions possible. 

This is only possible if you indeed have a right null space. In case 1, where $r = m = n$, there is not right null space available, hence we got an unique solution. But, here we have a right null space of dimension $(m - r)$ available. So, we end up with infinite solutions.

> If $r = m \land m < n$, there are infinite solutions possible

### Case 2 : $r = n \land n < m$
This case is the most important case, because almost all machine learning datasets available follow this trend.

If $r = n$, what does that tell you ? 

All rows are independent, which means all rows span $\mathbb{R}^n$. So, no right null space to worry about.

Similar to life, when you have to not worry about one thing, and an other thing shows up out of the blue. Here, too we have a thing to worry about. 

All columns are not independent. What does that tell you ?
An unique solution to $Ax = b$ only exists if $b$ is in the column space, but here column space does not span $\mathbb{R}^m$, so there are several possible $b's$ that can be reproduced only by a linear combination of vectors in column space and the left null space, Because at the end of the day $b$ can be any vector in $\mathbb{R}^m$. And to reproduce any vector in $\mathbb{R}^m$, We need both, the basis vectors of the column space as well as the basis vectors of the left null space.

So, how do we put up with this ?

$$
\boxed{
   b = b_{Col} + b_{LNS}
}
$$

So, our $b$ can be decomposed in to 2 components: 
1. The component of $b$ in column space
2. The component of $b$ in left null space

So, how do you get these components ?

Here is where the important concept of projections come in to picture. If we project our actual $b$ into the column space of $A$. We get the component of $b$ in the column space of $A(b_{Col}$).

The component of $b$ in column space $(b_{Col})$ is what we're really interested in, because obviously this is the component explained by our matrix $A$. If we consider component of $b$ in the left null space ($b_{LNS}$), then we're pretty much working with a component that literally has nothing to do with $A$. So, yeah that's the intuitive explanation on why we are so interested in the component of $b$ in the column space of $A$.

So, how do we obtain the value of $x$ for $b_{Col}$ ?

There's a really clever way to approach this problem. 

$$
b_{LNS} = b - b_{Col}
$$

We know that $b_{LNS}$ lies in the left null space, which is orthogonal to the column space of $A$, which means $A^Tb_{LNS} = 0$.

$$
A^T(b-b_{Col}) = 0
$$

$$
b_{Col} = Ax
$$

$$
A^T(b - Ax) = 0
$$

$$
x = (A^TA)^{-1}A^Tb
$$

And there you have it.

Moral of the story: You can only estimate $x$ for the component of $b$ in the column space, the component of $b$ in the left null space is the error associated with the prediction.

That's a lot, but I hope you get the idea. 

> Summary: There is a possibility of $b$ being out of the column space of $A$, in that case we only consider the projection of b in to the column space of $A$ and find $x$ for that projection. This $x$ is the solution to our problem. Offcourse, there is an error involved here. But, I can guarantee you that this error is the minimum possible error. I can prove this using the method of least squares, but it'd make this already long article even long. For now, trust me, but may be later in another article I'll explain this proof in detail :)

### Case 3 : $r < (m \land n)$

This is the messiest case of all. No full column rank and no full row rank :(

It's essentially kinda intuitive. It's a combination of Case 2 and Case 3.

So, your optimal solution is the value of $x$ for the component of $b$ in the column space of $A$ and you indeed have infinitely many solutions due to the presence of the right null space of $A$.


Alright, all cases are explored. But still I want to talk about Case 2 and 3, where there are infinite solutions possible here. You only need one right ? So, which solution would you choose ?

For machine learning, generally the value $x$ with the minimal norm is chosen as the apt solution. That's it. 

### Now, to the Generalization Moore-Penrose Pseudoinverse
All the above cases we discussed, can be unified into one single expression:
$$
\boxed{
   x = A^+b
}
$$
where $A^+$ is the pseudoinverse

| Case             | What $A^+$ does                       |
| ---------------- | ------------------------------------- |
| $r = m = n$      | Its just $A^{-1}$                     |
| $r = m < n$      | Minimum norm among infinite solutions |
| $r = n < m$      | Projection $x = (A^TA)^{-1}A^Tb$      |
| $r < (m\land n)$ | Projection + Minimum norm             |

Next time you use $inv()$, don't take it lightly. It is one of the most influential tools that powers modern machine learning.
 
Thank you for reading, HAPPY LEARNING !



