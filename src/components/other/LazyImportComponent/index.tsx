import React, { LazyExoticComponent } from 'react'
import { UdRouterFallback } from '../../fallback/UdRouterFallback'

const LazyImportComponent = (props: {
  lazyChildren: LazyExoticComponent<() => JSX.Element>;
}) => {
  return (
    <React.Suspense fallback={<UdRouterFallback />}>
      <props.lazyChildren />
    </React.Suspense>
  )
}
export { LazyImportComponent }
