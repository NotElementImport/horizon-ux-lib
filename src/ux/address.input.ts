import { mod } from 'horizon-core/component'
import { CSS, Props, Signal } from 'horizon-core/@types'
import './css/input.css'
import { useComputed } from 'horizon-core/state'

interface UxNumberInput {
    model: Signal.Signal<string>
    lazy?: boolean
    light?: boolean
    required?: Props.OrSignal<boolean>
    title?: Props.OrSignal<string>|(() => void)
    style?: CSS.Style|{}|string
}

export default mod<UxNumberInput, {}>(({ model, lazy = false, required = false, title = '', style = '', light = false }, { $, text, input, implement }) => {
    const bClass = ['h-input', light && 'light']
    
    // @ts-ignore
    $('div', { style, class: bClass }, () => {
        $('div', { class: useComputed(raw => ['h-input__title', raw(required) ? 'required' : '']) }, () => {
            implement(title as any)
        })
        $('div', { class: ['h-input-address'] }, () => {
            $('label', { class: ['h-input-address_item'] }, () => {
                text('Country')
                input({  })
            })

            $('label', { class: ['h-input-address_item'] }, () => {
                text('City')
                input({  })
            })

            $('label', { class: ['h-input-address_item'] }, () => {
                text('City')
                input({  })
            })
        })
    })
})