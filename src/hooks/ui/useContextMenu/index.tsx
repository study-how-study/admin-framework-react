import classNames, { Value } from 'classnames'
import _ from 'lodash'
import React from 'react'
import { ReactNode, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'


const useContextMenu = () => {
  const wrapperElement = useRef<HTMLDivElement>()
  const contextMenu = useRef<HTMLUListElement>()
  const triggerElement = useRef<HTMLElement>()
  useEffect(() => {
    wrapperElement.current = document.createElement('div')
    document.body.append(wrapperElement.current)
    document.addEventListener('click', () => {
      if (contextMenu.current) {
        contextMenu.current.style.display = 'none'
      }
    })
    return () => {
      if (wrapperElement.current) {
        wrapperElement.current.remove()
      }
    }
  }, [])
  const bind = (actions: IContextMenuItem[] | ((e: any) => IContextMenuItem[] | null)) => {
    const render = (items: IContextMenuItem[]) => {
      return ReactDOM.render((<ul
        ref={(e: any) => contextMenu.current = e}
        className="ud-context-menu ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical"
      >
        {
          items.map((item, index) => {
            if (React.isValidElement(item)) {
              return item
            }
            const menu = item as IContextMenuItemProps<any>

            return <li
              key={index}
              className={classNames('ant-dropdown-menu-item ant-dropdown-menu-item-only-child', menu.className)}
              onClick={() => {
                const { onClick, ...otherProps } = menu
                onClick && onClick(otherProps)
              }}
            >
              {menu.content}
            </li>
          })
        }
      </ul> as any), wrapperElement.current as any)
    }

    const listenner = (e: MouseEvent) => {
      e.preventDefault()
      const items = _.isFunction(actions) ? actions(e) : actions
      if (_.isArray(items) && items.length > 0) {
        render(items)
        if (contextMenu.current) {
          const { clientX, clientY } = e
          contextMenu.current.style.display = 'block'
          contextMenu.current.style.left = clientX + 'px'
          contextMenu.current.style.top = clientY + 'px'
        }
      }
    }

    triggerElement.current && triggerElement.current.addEventListener('contextmenu', listenner)
    return () => {
      triggerElement.current && triggerElement.current.removeEventListener('contextmenu', listenner)
    }

  }
  return { triggerElement, bindContextMenu: bind }

}

interface IContextMenuItemProps<T> {
  content: string
  onClick?: (e: IContextMenuItemProps<T>) => any
  className?: Value
  data?: any
}

type IContextMenuItem = IContextMenuItemProps<any> | ReactNode

export { useContextMenu }
