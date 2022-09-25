import React, { ReactNode, useState } from 'react'
import { Menu } from 'antd'
import menus from './../../../../../config/menus'
import { useNavigate } from 'react-router-dom'

const UdMenu: React.FC<IUdMenuProps> = (props: IUdMenuProps) => {
  const navigate = useNavigate()
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  function findMenuByKey(key: string): IMenuItem | null {
    let result: IMenuItem | null = null
    const recursion = (menus: IMenuItem[]) => {
      for (const item of menus) {
        if (result) {
          break
        }
        if (item.key === key) {
          result = item
          break
        } else {
          if (result == null && item.children) {
            recursion(item.children)
          }
        }
      }
    }
    recursion(menus)
    return result
  }
  function menuClick(info: any) {
    console.log(info)
    setSelectedKeys([info.key])
    const menu = findMenuByKey(info.key)
    if (menu) {
      navigate(menu.path || '/')
    }
    //
  }
  function menuOpenChange(openKeys: string[]) {
    //
    setOpenKeys(openKeys)
  }

  return (
    <div className='ud-menu'>
      <Menu
        items={menus}
        inlineIndent={10} theme="light" mode="inline"
        onClick={menuClick}
        onOpenChange={menuOpenChange}
        openKeys={openKeys}
        selectedKeys={selectedKeys} />
    </div>
  )
}
export interface IUdMenuProps {
  menus: IMenuItem[]
}
export interface IMenuItem {
  /** 
   * Key
   * 可使用 customId
   */
  key: string
  /** 
   * 显示内容
   */
  label: ReactNode
  /** 
   * 跳转路径 
   */
  path?: string
  /**
   * 外部地址，超链接地址
   * 可用于 菜单超链接地址和点击菜单地址 为不同的地址
   * 为空时，则取 path 属性。
   */
  externalUrl?: string
  /**
   * 打开方式
   * 空：表示本窗口
   * _blank：新窗口
   */
  target?: '_blank'
  /**
   * 跳转方式
   * route: 前端路由模式
   * a: 超链接跳转
   * @default route
   */
  jumpMode?: 'route' | 'a'
  /** 
   * 图标，string：antd icon name
   * @type string | ReactNode
   */
  icon?: string | ReactNode
  /** 
   * 子菜单
   */
  children?: IMenuItem[],
  /** 
   * 关联其他路径 
   */
  relevantPaths?: (string | RegExp)[]
  component?: any
}
export { UdMenu }
