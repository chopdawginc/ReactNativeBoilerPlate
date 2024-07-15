import { ReactNode } from 'react'

interface ifProps {
    condition: any
    children: ReactNode
    elseComp?: ReactNode
}

export const If = (props: ifProps) => {
    const { condition, children, elseComp } = props
    if (condition) {
        return children
    }
    else {
        return elseComp ? elseComp : null
    }
}
