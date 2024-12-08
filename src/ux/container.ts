import { mod } from 'horizon-core/component'
import { CSS } from 'horizon-core/@types'
import './css/container.css'

interface UxContainer {
    styleTags?: ('shadow'|'background'|'row'|'column'|'collapse-row'|'no-pad'|'pc-reverse')[]
    style?: CSS.Style|{}|string
}

export default mod<UxContainer, {}>(({ style = '', styleTags = [] }, { $, slot }) => {
    // @ts-ignore
    $('div', { class: ['h-container', ...styleTags], style }, () => slot({}))
})