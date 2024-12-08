import { mod } from 'horizon-core/component'
import { CSS, Props, Signal } from 'horizon-core/@types'
import './css/input.css'
import { tryGetRaw, useComputed } from 'horizon-core/state'

interface UxNumberInput {
    model: Signal.Signal<string>
    lazy?: boolean
    light?: boolean
    required?: Props.OrSignal<boolean>
    title?: Props.OrSignal<string>|(() => void)
    disabled?: Props.OrSignal<boolean>
    style?: CSS.Style|{}|string
}

export default mod<UxNumberInput, {}>(({ model, lazy = false, disabled = false, required = false, title = '', style = '', light = false }, { $, text, input }) => {
    const bClass = ['h-input', light && 'light' ]
    
    // Load ip addres
    let ipAddr = [0,0,0,0]
    tryGetRaw(model).split('.').map((v, i) => ipAddr[i] = (+v))

    const ipPartChange = (event: Event, index: number, toNext: HTMLElement|null = null) => { 
        const dom = event.target as HTMLInputElement
    
        if(dom.valueAsNumber > 255)
            dom.valueAsNumber = 255
        else if(dom.valueAsNumber < 0)
            dom.valueAsNumber = 0

        ipAddr[index] = dom.valueAsNumber

        if(model)
            model.value = ipAddr.join('.')

        if(toNext)
            toNext.focus()
    }

    // @ts-ignore
    $('div', { style, class: useComputed(raw => [...bClass, tryGetRaw(disabled) && 'disabled'])}, () => {
        $('div', { class: useComputed(raw => ['h-input__title', raw(required) ? 'required' : '']) }, () => {
            if(typeof title != 'function' && title)
                text(title)
            else if(typeof title == 'function')
                title()
        })
        $('div', { class: ['h-input-ip'] }, () => {
            input({
                disabled,
                value: ipAddr[0],
                type: 'number',
                '@change': event => ipPartChange(event, 0),
                '@press.enter': event => ipPartChange(event, 0, part2)
            })
            $('div', { class: ['h-input-ip__circle'] })
            const { dom: part2 } = input({ 
                disabled,
                value: ipAddr[1],
                type: 'number',
                '@change': event => ipPartChange(event, 1),
                '@press.enter': event => ipPartChange(event, 1, part3)
            })
            $('div', { class: ['h-input-ip__circle'] })
            const { dom: part3 } = input({ 
                disabled,
                value: ipAddr[2],
                type: 'number',
                '@change': event => ipPartChange(event, 2),
                '@press.enter': event => ipPartChange(event, 2, part4)
            })
            $('div', { class: ['h-input-ip__circle'] })
            const { dom: part4 } = input({ 
                disabled,
                value: ipAddr[3],
                type: 'number',
                '@change': event => ipPartChange(event, 3),
                '@press.enter': event => ipPartChange(event, 3)
            })
        })
    })
})