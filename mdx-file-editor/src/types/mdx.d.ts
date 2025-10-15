declare module '@mdx-js/runtime' {
  import { ComponentType, ReactNode } from 'react';

  interface MDXProps {
    children: string;
    components?: {
      [key: string]: ComponentType<any>;
    };
  }

  const MDX: ComponentType<MDXProps>;
  export default MDX;
}
