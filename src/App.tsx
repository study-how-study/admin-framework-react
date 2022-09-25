import React, { ReactNode } from 'react'


/**
 * 页面头部
 */
const UdPageHeader: React.FC<IUdPageHeaderProps> = (props) => {

  const back = () => {
    if (props.onBack === true) {
      window.history.back()
    } else {
      (props.onBack as any)()
    }
  }

  if (props.useAffix !== false) {
    return <div>222</div>
  }

  return <div>333</div>
}

export interface IUdPageHeaderProps {

  /**
   * 标题
   */
  title: ReactNode
  /**
   * 副标题
   */
  subTitle?: ReactNode
  /**
   * 是否使用固钉
   * @default true
   */
  useAffix?: boolean

  /**
   * 刷新
   */
  onRefresh?: () => void
  /**
   * 回退，传入 `true` 为返回上一页
   */
  onBack?: boolean | (() => void)
}

export default UdPageHeader
