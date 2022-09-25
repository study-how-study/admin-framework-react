import React, { ReactNode, useState } from 'react'
import classNames from 'classnames'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
const UdSidebar: React.FC<IUdSidebarProps> = (props: IUdSidebarProps) => {
  const [collapse, setCollapse] = useState(false)
  return (
    <>
      <div className={classNames('ud-sidebar', {
        collapse: collapse
      })}>
        <div className='ud-sidebar-title'>{props.title}</div>
        <div className='ud-sidebar-body'>{props.children}</div>
        {props.footer && <div className='ud-sidebar-footer'>{props.footer}</div>}
      </div>

      <div className={classNames('ud-sidebar-collapse', {
        collapse: collapse
      })}>
        <div className='ud-sidebar-collapse-bg' onClick={() => setCollapse(!collapse)}>
          {collapse ? <MenuUnfoldOutlined className="icon" /> : <MenuFoldOutlined className="icon" />}
        </div>
      </div>
    </>
  )
}
export interface IUdSidebarProps {

  /**
  * 标题
  */
  title: ReactNode
  /**
   * 内容
   */
  children?: ReactNode
  /**
   * 底部
   */
  footer?: ReactNode
}
export { UdSidebar }
