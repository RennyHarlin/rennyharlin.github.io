---
date: "2025-12-31T10:13:54+05:30"
draft: true
title: "RSA, the algorithm that rules the world"
math: true
categories: ["Computer Security"]
tags: ["rsa", "cryptography", "public-key"]
---

## Some math,

1. Euler's Totient Function
   - For any integer \(n > 1\), the Euler's Totient function \(\phi(n)\) is defined as the number of integers from 1 to \(n\) that are coprime to \(n\).
     For example, let's do it for \(n = 18\):
     $$n = 18$$
     $$18 = 2 * 3^2 $$
    $$\phi(18) = 18 _ (1 - {1 \over 2}) _ (1 - {1 \over 3}) = 6$$
   - If \(n\) is a product of two distinct prime numbers \(p\) and \(q\), then,
     $$ \phi(n) = (p-1)(q-1) $$
2. Euler's Theorem
    - For any integer \(n > 1\) and an integer \(a\) such that gcd(a, n) = 1,
      $$ a^{\phi(n)} \equiv 1 \ (mod \ n) $$


## Now, let's dive into RSA.


