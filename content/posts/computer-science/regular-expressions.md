---
date: "2025-12-05T10:38:28+05:30"
draft: false
title: "Regular Expressions"
categories: ["Computer Science"]
tags: ["regex", "parsing", "text-processing"]
params:
  math: true
---

- In this blog, we are going to explore the world of regular expressions
- Regular expressions are used for parsing and validating strings especially in applications of Natural Language Processing

### 1. Literals

| Pattern | Meaning                                                |
| ------- | ------------------------------------------------------ |
| cat     | Match all occurences of "cat" anywhere inside the text |

### 2. Character Classes

| Pattern     | Meaning                             |
| ----------- | ----------------------------------- |
| [abc]       | a or b or c                         |
| [a-zA-Z0-9] | Any lowercase or uppercase or digit |
| [^a-z]      | Anything except lowercase           |

### 3. Quantifiers

| Pattern | Meaning                    |
| ------- | -------------------------- |
| \*      | 0 or more occurence        |
| +       | 1 or more occurence        |
| ?       | 0 or 1 occurence           |
| {n}     | Exactly n occurences       |
| {n,}    | n or more occurences       |
| {n, m}  | Between n and m occurences |

### 4. Anchors

| Pattern | Meaning           |
| ------- | ----------------- |
| ^       | Start of a string |
| $       | End of a string   |
| \b      | Word boundary     |
| \B      | Non-boundary      |

### 5. Grouping

| Pattern | Meaning                          |
| ------- | -------------------------------- |
| (abc)   | Grouping (useful for extraction) |

### 6. Alternation

| Pattern | Meaning              |
| ------- | -------------------- |
| a\|b    | Alternation (a or b) |

### 7. Escape Sequences

| Pattern | Meaning                                                                                        |
| ------- | ---------------------------------------------------------------------------------------------- |
| \\.     | When you want to use a "." or any other symbol in literal sense use "\\" as an escape sequence |

### 8. Predefined Classes

| Pattern | Meaning                     |
| ------- | --------------------------- |
| \d      | digit(0-9)                  |
| \D      | non-digit                   |
| \w      | word char (letters, digits) |
| \W      | non-word char               |
| \s      | whitespace                  |
| \S      | non-whitespace              |

### Python `re` module

1. Search ( Find first occurence of the pattern in the text )

> Find first word starting with capital letter

```python
pattern = r'\b[A-Z][a-zA-Z]*\b'
m = re.search(pattern, text)
print(m.group()) # matched text
```

> Find first date from the text

```python
pattern = r'[0-9]{2}-[0-9]{2}-[0-9]{4}'
m = re.search(pattern, text)
print(m.group())
```

> Area code + phone number extraction

```python
phone_text = "Call me at (080)-23456789"
pattern = r"\((?P<area_code>\d{3})\)-(?P<number>\d{8})"
match = re.search(pattern, phone_text)
if match:
    print("Area code:", match.group(1))
    print("Number:", match.group(2))
    print("Matches dictionary: ", match.groupdict())
    print("Match groups: ", match.groups())
```

2. Find all ( Find all non-overlapping occurences of a pattern in a text )

> Find all names in a sentence

```python
text = "Alice and Bob are attending the meeting with Charlie."
names = re.findall(r"\b[A-Z][a-z]+\b", text)
print(names)
````

3. Substitute ( Substitute occurences of a pattern with a replacement string )

> Normalize dates from DD-MM-YYYY to YYYY-MM-DD

```python
text = "The events are scheduled on 12-05-2023 and 23-06-2024."
pattern = "(\d{2})-(\d{2})-(\d{4})"
replacement = r"\3-\2-\1"
new_text = re.sub(pattern, replacement, text)
print(new_text)
```

> Irregular whitespace normalization

```python
text = "This   is  a    sample\ttext with irregular   spacing."
normalized_text = re.sub(r'\s+', ' ', text)
print(normalized_text)
```
