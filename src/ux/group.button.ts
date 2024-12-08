import { CSS } from 'horizon-core/@types'
import { mod } from 'horizon-core/component'
import { AttributeSize } from './@types'
import './css/button.css'

interface UxGroupButton {
    rounded?: boolean
    style?: CSS.Style|{}|string,
    block?: boolean
    size?: AttributeSize
}

export default mod<UxGroupButton, {}>(({ rounded, block, size = 'm', style = '' }, { $, slot }) => {
    // @ts-ignore
    $('div', { style, class: ['h-group-button', 'h-group' , rounded ? 'circle' : 'square', block ? 'block' : 'inline', `h-pad-${size}` ] }, () => {
        slot({})
    })
})