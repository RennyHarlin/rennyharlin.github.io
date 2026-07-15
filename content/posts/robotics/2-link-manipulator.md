---
date: '2025-12-02T10:58:35+05:30'
draft: false
title: 'Forward and inverse kinematics of a 2-link manipulator'
categories: ['Robotics']
tags: ["kinematics", "manipulator", "robotics"]
params:
    math: true
---

The 2-link manipulator is a fundamental robotics system that is used by robot enthusiasts to understand the principles of kinematics. A 2-link manipulator consists of two rigid links connected by revolute joints, allowing for planar motion. 

In this post, we will explore the forward and inverse kinematics of a 2-link manipulator.

**Forward kinematics**  - Given joint parameters, what is the position of the end-effector

**Inverse kinematics**  - Given the position of the end-effector, what are the joint parameters

![2-R manipulator](/imgs/robotics/2-R/manipulator.png)

In the above diagram, 
- Joint parameters: 
    - \(\theta_1, \theta_2\)
- Link parameters: 
    -   \(l_1, l_2\)
- End-effector position: 
    -   \(x, y\)
## Forward Kinematics

The forward kinematics of 2-link manipulators is highly intuitive using geometry.

$$ x = l_1cos(\theta_1) + l_2cos(\theta_1 + \theta_2) $$

$$ y = l_1sin(\theta_1) + l_2sin(\theta_1 + \theta_2) $$

## Inverse Kinematics

Let \(\phi = \theta_1 + \theta_2\) 

By geometry we know that,

$$ tan(\phi) = y/x$$
$$ \phi = Atan2(y, x) $$

Now, if we square and add both the forward kinematic equations. \
We get:


$$ x^2 + y^2 = l_1^2 + l_2^2 + 
2l_1l_2(cos(\theta_2)) $$

$$ cos(\theta_2) = {x^2 + y^2 - l_1^2 + l_2^2 \over 2l_1l_2}$$

$$ \theta_2 = Atan2(\sqrt{1 - cos^2(\theta_2)}, cos^2(\theta_2))$$

Now, that we know \(\theta_2\)

$$ \theta_1 = \phi - \theta_2 $$


And, that's it. Both forward kinematics and inverse kinematics equations are derived.


