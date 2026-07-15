---
date: "2025-12-23T17:43:33+05:30"
draft: false
title: "HDFS and MapReduce: Revolutionizing Big Data Processing"
categories: ["Big Data"]
tags: ["hdfs", "map-reduce", "hadoop"]
---

HDFS and MapReduce can be confusing at times. Let's break down the entire process step-by-step with a concrete example.

The example I'm going to use is calculating the average movie rating per genre from a CSV file. First, we have to upload the CSV file into HDFS, and then we will run a MapReduce job to compute the average ratings.

We assume:

- Data format:

  `genre,rating`

- Goal: **average rating per genre**
- Environment: Hadoop (HDFS + YARN + MapReduce)

---

# STEP 0 — Your local file (before Hadoop)

On your local machine you have a file:

```
genre_ratings.csv
```

Contents:

```
Drama,4.5
Comedy,3.0
Drama,5.0
Sci-Fi,4.8
Comedy,3.5
```

At this point:

- Hadoop is **not involved**
- This is a normal OS file

---

# STEP 1 — Uploading the CSV into HDFS

You now copy the file into HDFS.

### Command

```bash
hdfs dfs -mkdir -p /movies/genre_ratings
hdfs dfs -put genre_ratings.csv /movies/genre_ratings/
```

---

## What happens internally (very important)

1. **Client contacts NameNode**
2. NameNode:

   - Checks permissions
   - Chooses DataNodes to store blocks

3. File is split into **HDFS blocks**

   - Default block size = **128 MB**
   - Your file is small → **1 block**

4. Block is:

   - Written to **3 DataNodes** (replication factor = 3)

5. Different views of the file:

    - User view of HDFS:
    ```
    /movies/genre_ratings/genre_ratings.csv
    ```

    - NameNode view of file (Name Node metadata)

   ```
    ratings.csv
        block_1 → DN2, DN4, DN7
        block_2 → DN1, DN3, DN6
   ```
   - DataNode view of blocks

   ```
    DN2: blk_1
    DN4: blk_1
    DN7: blk_1
    DN1: blk_2
    DN3: blk_2
    DN6: blk_2
   ```

Data is now **distributed and fault-tolerant**.

---

# STEP 2 — Submitting the MapReduce job

You submit a MapReduce job (e.g., Hadoop Streaming).

### Example command

```bash
hadoop jar hadoop-streaming.jar \
  -input /movies/genre_ratings/genre_ratings.csv \
  -output /movies/output_avg \
  -mapper mapper.py \
  -reducer reducer.py
```

---

### What Hadoop does now

Job is submitted to YARN ResourceManager

1. ResourceManager:

   - Allocates containers

   - Launches an ApplicationMaster

2. ApplicationMaster:

   - Requests block locations from the NameNode

   - Determines number of map tasks

### Data Locality Optimization

- NameNode knows where blocks reside
- ApplicationMaster requests containers on the same nodes
- Mapper reads data locally from the DataNode disk

Each mapper runs:
- In its own YARN container
- As a separate JVM process
- One mapper per InputSplit
   

---

# STEP 3 — InputSplits and Map task creation (data locality)

### InputSplit creation

- File size < 128 MB
- **1 block → 1 InputSplit → 1 mapper**

If file were TBs:

- Thousands of blocks
- Thousands of mappers

For every InputSplit, 
- One mapper is created. 
- YARN tries to schedule mappers on DataNodes where data resides (data locality). 

---

# STEP 4 — Mapper execution (line-by-line)

### What a mapper receives

Each mapper receives:

```
(key, value)
```

Example:

```
(0, "Drama,4.5")
(10, "Comedy,3.0")
```

- `key` = byte offset (ignored)
- `value` = one line from CSV

---

## Mapper logic (conceptual)

1. Read one line
2. Split by comma
3. Convert rating to float
4. Emit genre as key

### Mapper output (logical)

```
Drama  → (4.5,1)
Comedy → (3.0,1)
Drama  → (5.0,1)
Sci-Fi → (4.8,1)
Comedy → (3.5,1)
```

---

## Mapper output (physical reality)

- Output is **buffered in memory**
- When buffer fills:

  - Data spilled to disk
  - Sorted by key (genre)

Example spill file:

```
Comedy  (3.0,1)
Comedy  (3.5,1)
Drama   (4.5,1)
Drama   (5.0,1)
Sci-Fi  (4.8,1)
```

---

# STEP 5 — Combiner (optional but realistic)

Before shuffle:

- Combiner runs **on mapper node**
- Performs local aggregation

### After combiner

```
Comedy → (6.5,2)
Drama  → (9.5,2)
Sci-Fi → (4.8,1)
```

This **drastically reduces network traffic**.

---

# STEP 6 — Shuffle and Sort phase

This is the **heart of MapReduce**. This is the most expensive phase in the job, because it involves **data transfer over the network**.

### What happens

1. Mapper outputs are:

   - Partitioned by key
   - Sent over the network

2. All records with same genre go to **same reducer** (partitioner decides)
3. Reducer receives data **already sorted**

Example reducer input:

```
Comedy → [(6.5,2)]
Drama  → [(9.5,2)]
Sci-Fi → [(4.8,1)]
```

---

# STEP 7 — Reducer execution

### Reducer logic

For each genre:

1. Sum all partial sums
2. Sum all counts
3. Compute average

### Reducer computation

```
Comedy:
  sum = 6.5
  count = 2
  avg = 3.25

Drama:
  sum = 9.5
  count = 2
  avg = 4.75

Sci-Fi:
  sum = 4.8
  count = 1
  avg = 4.8
```

---

## Reducer output

```
Comedy   3.25
Drama    4.75
Sci-Fi   4.8
```

---

# STEP 8 — Writing output to HDFS

1. Reducer writes output to HDFS
2. Stored as:

   ```
   /movies/output_avg/part-00000
   ```

3. Block replicated across DataNodes
4. Job marked **SUCCESS**

---

# STEP 9 — Viewing the result

### Command

```bash
hdfs dfs -cat /movies/output_avg/part-00000
```

### Output

```
Comedy   3.25
Drama    4.75
Sci-Fi   4.8
```

---

# STEP 10 — Job completion & cleanup

- YARN releases containers
- Temporary files removed
- Logs stored for debugging

---

# FULL PIPELINE

```
Local CSV
   ↓
HDFS upload (blocks + replication)
   ↓
InputSplit creation
   ↓
Mapper (parse, emit genre → rating)
   ↓
Combiner (local aggregation)
   ↓
Shuffle & Sort
   ↓
Reducer (sum, count, avg)
   ↓
Output written to HDFS
```
