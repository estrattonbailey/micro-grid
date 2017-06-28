# micro-grid
Tiny, simple, zero-dependency flexbox grid for React. [Demo](http://estrattonbailey.com/micro-grid/) 🍻

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## Features/Goals
1. Configure widths, gutters, flex alignment, order, and offsets
2. Configure arbitrary breakpoints and widths
3. Outputs real CSS and media queries
4. Nestable
5. Relative units for breakpoints and whitespace
6. Lightweight **~3.8kb**

## Usage
Grid with four items:
```javascript
import { Flex, Box } from 'micro-grid'

<Flex>
  <Box width={1/4}>25% wide</Box>
  <Box width={1/4}>25% wide</Box>
  <Box width={1/4}>25% wide</Box>
  <Box width={1/4}>25% wide</Box>
</Flex>
```

Grid with four items and a `1em` gutter:
```javascript
<Flex gutter={1}>
  <Box width={1/4}>25% wide</Box>
  <Box width={1/4}>25% wide</Box>
  <Box width={1/4}>25% wide</Box>
  <Box width={1/4}>25% wide</Box>
</Flex>
```

Widths at different breakpoints:
```javascript
<Flex gutter={1}>
  <Box width={[
    [1/2],
    [768, 1/4]
  ]}>
    50% wide, 25% wide above 768px
  </Box>
  <Box width={[
    [1],
    [768, 1/2]
    [1280, 1/4] ]}>
    100% wide, 50% wide above 768px, 25% wide above 1280px
  </Box>
  <Box width={1/4}>25% wide</Box>
  <Box width={1/4}>25% wide</Box>
</Flex>
```

Adjust the gutter at different breakpoints:
```javascript
<Flex gutter={[
  [1],
  [768, 2]
]}>
  <Box width={1/4}>25% wide</Box>
  <Box width={1/4}>25% wide</Box>
  <Box width={1/4}>25% wide</Box>
  <Box width={1/4}>25% wide</Box>
</Flex>
```

Fixed width columns:
```javascript
<Flex gutter={1}>
  <Box width={[
    [1],
    [768, '200px']
  ]}>1000% wide, 200px wide above 768px</Box>
</Flex>
```

Flexible width columns, that fill their space:
```javascript
<Flex gutter={1}>
  <Box width={[
    [1],
    [768, '200px']
  ]}>1000% wide, 200px wide above 768px</Box>
  <Box width={[
    [1],
    [768, 'auto']
  ]}>1000% wide, fills remainging space above 768px</Box>
</Flex>
```

Allow boxes to wrap:
```javascript
<Flex gutter={1} wrap={true}>
  <Box width={[
    [1],
    [768, 1/2]
  ]}>100% wide, 50% wide above 768</Box>
  <Box width={[
    [1],
    [768, 1/2]
  ]}>100% wide, 50% wide above 768</Box>
</Flex>
```

Allow boxes to wrap at different breakpoints:
```javascript
<Flex gutter={1} wrap={[
  [true],
  [768, false]
]}>
  <Box width={[
    [1],
    [768, 1/2]
  ]}>100% wide, 50% wide above 768</Box>
  <Box width={[
    [1],
    [768, 1/2]
  ]}>100% wide, 50% wide above 768</Box>
</Flex>
```

## Notes
- breakpoints are min-width by default, with no way to configure, currently

MIT License
