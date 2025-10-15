export interface MdxContent {
    content: string;
    metadata?: Record<string, any>;
}

export interface ViewerProps {
    mdxContent: MdxContent;
    className?: string;
    style?: React.CSSProperties;
}