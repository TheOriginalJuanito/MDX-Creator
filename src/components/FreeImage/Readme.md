# FreeImage

The FreeImage component allows you to freely add and position images within a responsive container.


To Use FreeImages you need 2 Components:
 1. `FreeImage`: The wrapper component that defines the image container.
 2. `ImgPosition`: The Singular Images which can be positioned within the container.

---

## Wraper
```jsx title='index.mdx'  showLineNumbers
<FreeImage aspectRatio='16/9'>
</FreeImage>
```
### Props

- `aspectRatio`: Defines the aspect ratio of the image container (e.g., '16/9', '4/3').
- `children`: The `ImgPosition` components to be rendered within the container.

## Image
```jsx title='index.mdx'  showLineNumbers
<ImagePosition Top='50%' Left='25%' Width='100px' src='/img/logo.png' Border='10px' />
```

### Props

- `Top`: Defines the top position of the image within the container (e.g., '50%').
- `Left`: Defines the left position of the image within the container (e.g., '25%').
- `Width`: Defines the width of the image (e.g., '100px').
- `src`: The source URL of the image.
- `Border`: Defines the border Radius of the image (e.g., '10px').

