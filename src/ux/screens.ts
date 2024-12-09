import { mod } from 'horizon-core/component'
import { Props, CSS } from 'horizon-core/@types'
import './css/screens.css'
import { unSignal, useSignal, useStrongRef } from 'horizon-core/state'
import router from 'horizon-core/router'

interface UxContainer {
    screens: Props.OrSignal<Function[]>
    key?: string
    timing?: Props.OrSignal<number>
    currentScreen?: Props.OrSignal<number>
    animation?: Props.OrSignal<'h-slide' | 'v-slide' | 'fade'>
    style?: CSS.Style | {} | string
}

// @ts-ignore
export default (props: UxContainer = {}) => {
    const key = props.key
    const currentScreenIndex = useSignal(props.currentScreen ?? 0, {
        onInit(signal) {
            const { query } = router.current
            // @ts-ignore
            if (key && key in query) signal.value = +query[key]
        }
    });
    let domScreens: HTMLElement[] = [];

    (mod<UxContainer, {}>(({ screens, style = '' }, { $, dyn }) => {
        // @ts-ignore
        $('div', { class: ['h-screens'], style }, () => {
            dyn([screens], () => {
                domScreens = [];
                const screensRaw = unSignal(screens)

                for (const index in screensRaw) {
                    if (Number.isNaN(+index)) continue
                    const screen = screensRaw[index]
                    const { dom } = $('div', { class: ['h-screens__item', currentScreenIndex.value == +index ? 'show' : ''] }, () => screen())
                    domScreens.push(dom)
                }
            })
        })
    }))(props)

    const updateScreen = (index: number, reverse: boolean = false) => {
        const timing = unSignal(props.timing ?? 250)
        const oldIndex = currentScreenIndex.value
        const oldScreen: HTMLElement = domScreens[oldIndex]
        const newScreen: HTMLElement = domScreens[index]

        if (key) {
            const { query } = router.current
            router.push({ query: { ...query, [key]: index } }, { silent: true })
        }

        newScreen.classList.add('show')

        const animates = {
            'h-slide': () => {
                oldScreen.animate([
                    { left: '0', opacity: 1, scale: 1 },
                    { left: reverse ? '100vw' : '-100vw', opacity: 0, scale: 0.85 }
                ], {
                    duration: timing,
                    easing: 'ease-in-out'
                }).addEventListener('finish', () => oldScreen.classList.remove('show'))
                newScreen.animate([
                    { left: reverse ? '-100vw' : '100vw', opacity: 0, scale: 0.85 },
                    { left: '0', opacity: 1, scale: 1 }
                ], {
                    duration: timing,
                    easing: 'ease-in-out'
                })
            },
            'v-slide': () => {
                oldScreen.animate([
                    { top: '0', opacity: 1, scale: 1 },
                    { top: reverse ? '100vh' : '-100vh', opacity: 0, scale: 0.85 }
                ], {
                    duration: timing,
                    easing: 'ease-in-out'
                }).addEventListener('finish', () => oldScreen.classList.remove('show'))
                newScreen.animate([
                    { top: reverse ? '-100vh' : '100vh', opacity: 0, scale: 0.85 },
                    { top: '0', opacity: 1, scale: 1 }
                ], {
                    duration: timing,
                    easing: 'ease-in-out'
                })
            },
            'fade': () => {
                oldScreen.animate([
                    { top: '0', opacity: 1, scale: 1 },
                    { top: reverse ? '5vh' : '-5vh', opacity: 0, scale: 0.85 }
                ], {
                    duration: timing,
                    easing: 'ease-in-out'
                }).addEventListener('finish', () => oldScreen.classList.remove('show'))
                newScreen.animate([
                    { top: reverse ? '-5vh' : '5vh', opacity: 0, scale: 0.85 },
                    { top: '0', opacity: 1, scale: 1 }
                ], {
                    duration: timing,
                    easing: 'ease-in-out'
                })
            }
        }

        // @ts-ignore
        animates[unSignal(props.animation ?? 'h-slide')]()

        currentScreenIndex.value = index
    }

    return {
        nextScreen() {
            const screens = unSignal(props.screens)
            const nextIndex = currentScreenIndex.value + 1
            const notReachEnd = !(nextIndex >= screens.length)
            if (notReachEnd)
                updateScreen(nextIndex)
            return notReachEnd
        },
        prevScreen() {
            const nextIndex = currentScreenIndex.value - 1
            const notReachEnd = nextIndex >= 0
            if (notReachEnd)
                updateScreen(nextIndex, true)
            return notReachEnd
        },
        setScreen(index: number) {
            if (index == currentScreenIndex.value) return
            const screens = unSignal(props.screens)
            if (index < 0) throw new Error('Screens/setScreen: index is less zero')
            else if (index >= screens.length) throw new Error(`Screens/setScreen: index is greater ${screens.length - 1}`)
            updateScreen(index, index < currentScreenIndex.value)
        }
    }
}
