import { comp } from 'horizon-core/component'
import { useComputed, useSignal } from 'horizon-core/state'
import container from '../ux/container'
import textInput from '../ux/text.input'
import button from '../ux/button'
import checkboxInput from '../ux/checkbox.input'
import screens from '../ux/screens'
import groupButton from '../ux/group.button'

export default comp((_, { text }) => {
    const firstScreen = () => {
        container({ styleTags: ['column'], style: { height: '100%', gap: '2em', justifyContent: 'center', translate: '0 -10%', width: 'min(400px, 100%)', margin: 'auto' } }, () => {
            const login = useSignal('')
            const password = useSignal('')
            const showPassword = useSignal(false)
    
            textInput({
                model: login,
                title: "Login", 
                styleTags: ['light']
            })
    
            textInput({
                model: password,
                title: "Password",
                password: useComputed(un => !un(showPassword)), 
                styleTags: ['light']
            })
    
            checkboxInput({
                model: showPassword,
                title: 'Show password',
                styleTags: ['light', 'm', 'along']
            })
    
            button({ click: () => nextScreen() }, () => text('Login'))
        })
    }

    const secondScreen = () => {
        container({ styleTags: ['column'], style: { height: '100%', gap: '1em' } }, () => {
            container({ styleTags: ['column', 'background'], style: { flex: '1 1', gap: '2em' } }, () => {
                text('Some content...')
            })
            container({ styleTags: ['collapse-row', 'pc-reverse', 'no-pad'], style: { gap: '1em' } }, () => {
                checkboxInput({
                    model: useSignal(false),
                    title: 'Agree',
                    styleTags: ['light', 'm', 'along']
                })
                groupButton({ }, () => {
                    button({ click: () => prevScreen(), type: 'ghost' }, () => text('Back'))
                    button({ click: () => nextScreen() }, () => text('Next'))
                })
            })
        })
    }

    const { nextScreen, prevScreen } = screens({
        animation: 'v-slide',
        key: 'main',
        timing: 500,
        screens: [
            firstScreen,
            secondScreen
        ]
    })
})