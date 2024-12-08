import { mod } from 'horizon-core/component'
import { Props } from 'horizon-core/@types'
import { useDocumentBody } from 'horizon-core/composables'
import './css/layout.css'
import { useStrongRef } from 'horizon-core/state'

interface UxLayout {
    themeColor?: string
    theme?: Props.OrSignal<'dark'|'light'>
    header?: () => void
    aside?: () => void
}

export default mod<UxLayout, {}>(({ header, aside, theme = false, themeColor }, { $, slot }) => {
    useDocumentBody(body => {
        if(themeColor)
            useStrongRef(themeColor, themeColor => body.setAttribute('style', `--h-accent: ${themeColor};`))

        useStrongRef(theme, theme => body.setAttribute('class', theme))
    })

    $('div', { class: ['h-layout'] }, () => {
        if(header)
            $('header', { class: ['h-layout-header'] }, header)

        $('div', { class: ['h-layout-body'] }, () => {
            if(aside)
                $('aside', { class: ['h-layout-body__aside'] }, aside)
            $('main',  { class: ['h-layout-body__main'] }, () => slot({}))
        })
    })
})