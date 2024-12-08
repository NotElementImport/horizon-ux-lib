import { mod } from 'horizon-core/component'
import { CSS, Props, Signal } from 'horizon-core/@types'
import './css/input.css'
import { useComputed } from 'horizon-core/state'
import { AttributeSize } from './@types'

interface UxSliderInput {
    styleTags?: ('along'|'light'|AttributeSize)[]
    model: Signal.Signal<boolean>
    required?: Props.OrSignal<boolean>
    title?: Props.OrSignal<string>|(() => void)
    style?: CSS.Style|{}|string
    disabled?: Props.OrSignal<boolean>
}

export default mod<UxSliderInput, {}>(({ model, disabled = false, required = false, title = '', style = '', styleTags = ['m']}, { $, input, implement }) => {
    const bClass = ['h-input', 'h-input-slider', ...styleTags].join(' ').trim()
    
    // @ts-ignore
    $('label', { style, class: useComputed(unSignal => [bClass, unSignal(disabled) && 'disabled']) }, () => {
        $('div', { class: useComputed(unSignal => ['h-input__title', unSignal(required) ? 'required' : '']) }, () => {
            implement(title)
        })
        input({ type: 'checkbox', '#model': model })
        $('div', { class: ['h-input__slider'] })
    })
})