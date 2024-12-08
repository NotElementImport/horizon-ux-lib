import { comp } from 'horizon-core/component'
import horizonRouter from 'horizon-core/router'
import './ux/hux.css'
import layout from './ux/layout'
import { useColorSheme } from 'horizon-core/composables'

const wrapperStyle = {
    margin: 'auto',
    width: 'min(1000px, 100%)',
    boxSizing: 'border-box'
}

export default comp((_, { $, use }) => {
    const header = () => {
        $('div', { style: { ...wrapperStyle, paddingInline: '0.5em' } }, () => {
            $('h1', { html: 'Test App' })
        })
    }

    layout({ header, theme: useColorSheme() }, () => {
        $('div', { style: { ...wrapperStyle, height: '100%' } }, () => {
            use(horizonRouter)
        })
    })
})