import { mod } from 'horizon-core/component'
import { CSS, Props, Signal } from 'horizon-core/@types'
import './css/input.css'
import { useComputed } from 'horizon-core/state'

interface UxTextInput {
    model: Signal.Signal<string>
    lazy?: boolean
    name?: string
    styleTags?: ('light')[]
    password?: Props.OrSignal<boolean>
    required?: Props.OrSignal<boolean>
    disabled?: Props.OrSignal<boolean>
    title?: Props.OrSignal<string> | (() => void)
    style?: CSS.Style | {} | string
}

export default mod<UxTextInput, {}>(({ model, name, password = false, disabled = false, lazy = false, required = false, title = '', style = '', styleTags = [] }, { $, implement, input }) => {
    const bClass = ['h-input', ...styleTags]

    // @ts-ignore
    $('div', { style, class: useComputed(raw => [...bClass, raw(disabled) && 'disabled']) }, () => {
        $('div', { class: useComputed(raw => ['h-input__title', raw(required) ? 'required' : '']) }, () => {
            implement(title)
        })
        $('div', { style: 'position: relative;' }, () => {
            $('div', {
                '@click.stop': () => model.value = '',
                class: useComputed(raw => ['h-input__clear', !raw(model) ? 'h-hide' : ''])
            })
            // @ts-ignore
            input({ '#model': model, '#lazy': lazy, name, type: useComputed(raw => raw(password) ? 'password' : 'text'), disabled })
        })
    })
})
