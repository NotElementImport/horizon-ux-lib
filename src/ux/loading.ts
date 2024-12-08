import { mod } from 'horizon-core/component'
import { unSignal } from 'horizon-core/state'
import { CSS, Props } from 'horizon-core/@types'
import { AttributeSize } from './@types'
import './css/loading.css'

interface UxLoading {
    isLoading?: Props.OrSignal<boolean>
    color?: 'accent'|'light'|'text-color'
    style?: CSS.Style|{}|string
    size?: AttributeSize
}

export default mod<UxLoading, {}>(({ style = '', color = 'accent', size = 'm', isLoading = false }, { $, slot, dyn }) => {
    const bClass = ['h-loading', `spin-${size}`, color]

    $('div', {
        loading: isLoading,
        // @ts-ignore
        style,
        class: bClass
    }, () => {
        dyn([ isLoading ], () => {
            if(unSignal(isLoading))
                $('div', { class: ['h-loading__bar'] })
            else
                slot({})
        })
    })
})