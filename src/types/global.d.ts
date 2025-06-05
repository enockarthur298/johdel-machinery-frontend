// Type declarations for JSX files
declare module '*.jsx' {
  import { ReactNode } from 'react';
  const component: () => ReactNode;
  export default component;
}

// Type declarations for JS files
declare module '*.js' {
  import { ReactNode } from 'react';
  const component: () => ReactNode;
  export default component;
}
