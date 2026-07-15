---
date: '2026-01-29T08:55:16+05:30'
draft: false
title: 'Principal Component Analysis (PCA)'
math: true
categories: ["Artificial Intelligence"]
tags: ["pca", "dimensionality-reduction", "machine-learning"]
series: ["Introduction to Machine Learning"]
---

*This article is part of a series on [Introduction to Machine Learning](/series/introduction-to-machine-learning/), follow along to learn more about different machine learning algorithms intuitively*

---

Let's imagine you have a dataset consisting of 10 features. As a data scientist, your first job with any dataset is exploratory data analysis.

But, how many 2-D plots can you even explore ?

For a dataset with 10 features, You'll have to explore over 45 2-dimensional plots. PCA solves this problem by transforming your higher dimensional dataset to a lower dimension still preserving most of the original information.

PCA revolves around the idea that the eigen vectors of the covariance matrix always point in the direction of maximum variance, and since it's symmetric, the eigen vectors are orthogonal to each other.

Steps involved with PCA:
1. Standardize the data
   1. Standardization ensures equal feature importance, it prevents variables with large scales from overpowering variables with small scales and centers the data around the mean.
   $$
   \boxed{
    x_j = \frac{x_j - \mu_j}{\sigma_j}
    }
   $$
2. Calculate covariance matrix
   1. The diagonal entries of the covariance matrix contains the variance of each variable
   2. The other entries are the covariance of all feature pairs
3. Calculate eigen values of covariance matrix
4. Calculate eigen vectors of covariance matrix, Now these vectors you get are your principal axes and they point in the direction of maximum variance and their corresponding eigen values gives us the measure of the variance in that direction
5. Now, comes the fun part. Instead of considering all n eigen vectors. We can only consider the top k eigen vectors that account for 99% of the variance in the data. This is how PCA helps in dimensionality reduction
6. In order to get your new features, project your dataset along the top k principal axes to get your new dataset. The features in your new dataset thus formed are called principal components !

## Some observations
1. Calculate the covariance between the principal components and see
   - The covariance between the components will be zero, because PCA removes correlation between the features
   - So, all the features you get from PCA are completely uncorrelated with each other
2. PCA literally gives you the best features to work with for any machine learning task. Explore online and you'll be impressed. One example I found interesting was the example of the application of PCA in analysis of diastolic and systolic blood pressure as well as it's application in analyzing gene expression patterns. Yess, PCA is cool !

## The intuition
Having understood the process, now figuring out the intuition is kinda easy. Initially, we had a feature system where each feature may or may not be correlated with other features in the system. After PCA, you get a new feature system where each feature is independent of other features in the system (i.e. $Cov(x, y) = 0$). And, each feature points in the direction of maximum variance arranged by the decreasing order of eigen values of the covariance matrix.

The new feature system is essentially some linear combination of the original feature system, in such a way that maximum variance is captured. The coefficient for this linear combination is given by the eigen vectors. Quite funny, that the same idea can be illustrated in multiple different perspectives :)

In this new feature system, you can take only the top k features and still retain a majority of the information from the original feature system. Here, is where the dimensionality reduction power of PCA comes in to play. 

Hope you got a good grip of the intuition behind PCA, HAPPY LEARNING !

