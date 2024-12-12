import { comp } from 'horizon-core/component'
import { useComputed, useSignal } from 'horizon-core/state'
import container from '../ux/container'
import textInput from '../ux/text.input'
import button from '../ux/button'
import checkboxInput from '../ux/checkbox.input'
import screens from '../ux/screens'

export default comp((_, { text }) => {
    const firstScreen = () => {
        container({ styleTags: ['column'], style: { height: '100%', gap: '2em', justifyContent: 'center', translate: '0 0%', width: 'min(400px, 100%)', margin: 'auto' } }, () => {
            const login = useSignal('')
            const password = useSignal('')
            const showPassword = useSignal(false)

            textInput({
                model: login,
                name: 'username',
                title: "Login",
                styleTags: ['light']
            })

            textInput({
                model: password,
                title: "Password",
                password: useComputed(() => !showPassword.value),
                styleTags: ['light']
            })

            checkboxInput({
                model: showPassword,
                title: 'Show password',
                styleTags: ['light', 'm', 'along']
            })

            button({}, () => text('Login'))
            button({ click: () => setScreen(2), type: 'ghost' }, () => text('Register'))
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
                container({ styleTags: ['row', 'no-pad'], style: { gap: '1em' } }, () => {
                    button({ click: () => prevScreen(), style: 'flex: 1 1;', type: 'light' }, () => text('Back'))
                    button({ click: () => nextScreen(), style: 'flex: 1 1;' }, () => text('Next'))
                })
            })
        })
    }

    const thirdScreen = () => {
        container({ styleTags: ['column'], style: { height: '100%', gap: '2em', width: 'min(400px, 100%)', margin: 'auto' } }, () => {
            textInput({
                model: useSignal(''),
                title: "Username",
                styleTags: ['light']
            })

            textInput({
                model: useSignal(''),
                title: "Email",
                styleTags: ['light']
            })

            textInput({
                model: useSignal(''),
                title: "Password",
                password: true,
                styleTags: ['light']
            })

            textInput({
                model: useSignal(''),
                title: "Confirm Password",
                password: true,
                styleTags: ['light']
            })

            container({ styleTags: ['collapse-row', 'pc-reverse', 'no-pad'], style: { gap: '1em', marginTop: 'auto' } }, () => {
                checkboxInput({
                    model: useSignal(false),
                    title: 'Agree',
                    styleTags: ['light', 'm', 'along']
                })
                container({ styleTags: ['row', 'no-pad'], style: { gap: '1em' } }, () => {
                    button({ click: () => setScreen(0), style: 'flex: 1 1;', type: 'light' }, () => text('Back'))
                    // button({ click: () => nextScreen(), style: 'flex: 1 1;' }, () => text('Next'))
                })
            })
        })

    }

    const { nextScreen, prevScreen, setScreen } = screens({
        animation: 'fade',
        key: 'main',
        timing: 500,
        screens: [
            firstScreen,
            secondScreen,
            thirdScreen
        ]
    })
})
