import { comp } from 'horizon-core/component'
import './ux/hux.css'
import { useColorSheme } from 'horizon-core/composables'
import sandwichLayout from './ux/sandwich.layout'
import { useSignal } from 'horizon-core/state'
import container from './ux/container'

export const hideBar = useSignal(false)

export default comp((_, { text }) => {
    const beforeBar = () => {
        container({ styleTags: ['background'], style: 'padding: 1em' }, () => {
            text('User info: ')
        })
    }

    sandwichLayout({
        items: [
            { title: 'Home', click: () => console.log('Clicked!') },
            { title: 'Page' },
            { title: 'Utils' }
        ],
        beforeBar,
        hideBar,
        theme: useColorSheme(),
        useRouter: true,
    })
})
