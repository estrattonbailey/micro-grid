# micro-grid
Tiny, simple, zero-dependency flexbox grid for React.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## Features/Goals
1. Configure widths, gutters, and flex alignment
2. Configure arbitrary breakpoints and widths
3. Outputs Real CSS™ and media queries
4. Nestable
5. Relative units for breakpoints and whitespace

## Usage
Grid with four items:
```javascript
import { Flex, Box } from 'micro-grid'

<Flex>
  <Box w={1/4}>25% wide</Box>
  <Box w={1/4}>25% wide</Box>
  <Box w={1/4}>25% wide</Box>
  <Box w={1/4}>25% wide</Box>
</Flex>
```

Grid with four items and a `1em` gutter:
```javascript
<Flex g={1}>
  <Box w={1/4}>25% wide</Box>
  <Box w={1/4}>25% wide</Box>
  <Box w={1/4}>25% wide</Box>
  <Box w={1/4}>25% wide</Box>
</Flex>
```

Widths at different breakpoints:
```javascript
<Flex g={1}>
  <Box w={[
    [1/2],
    [768, 1/4]
  ]}>
    50% wide, 25% wide above 768px
  </Box>
  <Box w={[
    [1],
    [768, 1/2]
    [1280, 1/4]
  ]}>
    100% wide, 50% wide above 768px, 25% wide above 1280px
  </Box>
  <Box w={1/4}>25% wide</Box>
  <Box w={1/4}>25% wide</Box>
</Flex>
```

Adjust the gutter at different breakpoints:
```javascript
<Flex g={[
  [1],
  [768, 2]
]}>
  <Box w={1/4}>25% wide</Box>
  <Box w={1/4}>25% wide</Box>
  <Box w={1/4}>25% wide</Box>
  <Box w={1/4}>25% wide</Box>
</Flex>
```

## Notes
- breakpoints are min-width by default, with no way to configure, currently

MIT License
