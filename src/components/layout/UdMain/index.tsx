import React, { CSSProperties, ReactNode } from 'react'
import classNames, { Value } from 'classnames'
const UdMain: React.FC<IUdMainProps> = (props: IUdMainProps) => {
  return (
    <div style={props.style} className={classNames('ud-main', props.className)}>
      {props.children}
    </div>
  )
}
export interface IUdMainProps {
  /**
    * 样式
    */
  style?: CSSProperties
  /**
   * class
   * 不管传没传，都会有一个 `ud-layout` 的 className
   */
  className?: Value
  /**
   * 内容
   */
  children?: ReactNode
}
export { UdMain }
