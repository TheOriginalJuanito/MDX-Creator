# Image
The `Image` component can be used to regurlarly display images.

In combination with the `Markers` component things on these Images can be Marked.

```jsx title='index.mdx'  showLineNumbers
<Image imgSrc="/img/docusaurus-social-card.jpg">
    <Markers top="13%" left="15%" type="square" markerWidth="69%" markerHeight="18%"></Markers>
    <Markers top="58%" left="52%">2</Markers>
    <Markers top="71%" left="88%">3</Markers>
</Image>
```



## Props `Image`

imgSrc: string - The source URL of the image.


## Props `Markers`

top: string - The top position of the marker.
left: string - The left position of the marker.
type: string - The type of the marker (e.g., "square", "circle").
markerWidth: string - The width of the marker.
markerHeight: string - The height of the marker.

:::info[info]
 while Marker `Type` is set to `circle` only top and left Props are required.
:::

----------
### Marker-Creator
[Marker-Creator](http://localhost/dev/Marker-Creator/)
