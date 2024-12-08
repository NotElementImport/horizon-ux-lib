import { mod } from 'horizon-core/component'
import { CSS } from 'horizon-core/@types'
import './css/alert.css'

interface UxAlert {
    title?: string
    type?: 'info'|'danger'|'warning'
    rounded?: true
    style?: CSS.Style|{}|string
}

const alertTitle = {
    'info': 'Information',
    'warning': 'Warning Information',
    'danger': 'Danger',
}

export default mod<UxAlert, {}>(({ title, type = 'info', rounded = false, style = '' }, { $,  slot }) => {
    const bClass = ['h-alert', type, rounded ? 'circle' : 'square']

    title = title ?? alertTitle[type]

    $('section', {
        // @ts-ignore
        style,
        class: bClass
    }, () => {
        $('div', { class: ['h-alert__title'], html: title })
        $('div', { class: ['h-alert__content'] }, () => slot({}))
    })
})