import { ifProps } from '@types'

const If = (props: ifProps) => {
    const { condition, children, elseComp } = props
    if (condition) {
        return children
    }
    else {
        return elseComp ? elseComp : null
    }
}

export default If
