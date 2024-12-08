import { mod } from 'horizon-core/component'
import { CSS } from 'horizon-core/@types'
import { AttributeSize } from './@types'
import './css/button.css'

interface UxButton {
    click?: (ev: MouseEvent) => unknown
    type?: 'primary'|'ghost'|'light'|'ghost light'
    rounded?: boolean
    style?: CSS.Style|{}|string
    size?: AttributeSize
}

export default mod<UxButton, {}>(({ type, click, style = '', rounded, size = 'm' }, { $,  slot }) => {
    const bClass = ['h-button', type ?? 'primary', rounded ? 'circle' : 'square', `h-pad-${size}`]

    $('button', {
        "@click.stop": click ?? (() => void 0),
        // @ts-ignore
        style,
        class: bClass
    }, () => {
        slot({})
    })
})