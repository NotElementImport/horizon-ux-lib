import { mod } from 'horizon-core/component'
import { CSS, Props, Signal } from 'horizon-core/@types'
import './css/input.css'
import { useComputed } from 'horizon-core/state'

interface UxNumberInput {
    model: Signal.Signal<number>
    lazy?: boolean
    light?: boolean
    required?: Props.OrSignal<boolean>
    title?: Props.OrSignal<string>|(() => void)
    style?: CSS.Style|{}|string
    disabled?: Props.OrSignal<boolean>
}

export default mod<UxNumberInput, {}>(({ model, lazy = false, disabled = false, required = false, title = '', style = '', light = false }, { $, text, input }) => {
    const bClass = ['h-input', light && 'light']
    
    // @ts-ignore
    $('div', { style, class: useComputed(raw => [...bClass, raw(disabled) && 'disabled']) }, () => {
        $('div', { class: useComputed(raw => ['h-input__title', raw(required) ? 'required' : '']) }, () => {
            if(typeof title != 'function' && title)
                text(title)
            else if(typeof title == 'function')
                title()
        })
        // @ts-ignore
        input({ '#model': model, '#lazy': lazy, type: 'number', disabled })
    })
})