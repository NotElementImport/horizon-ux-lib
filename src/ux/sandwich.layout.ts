import { mod } from 'horizon-core/component'
import HorizonRouter from 'horizon-core/router'
import { Component, Props } from 'horizon-core/@types'
import { useDocumentBody } from 'horizon-core/composables'
import './css/sandwichLayout.css'
import { unSignal, useComputed, useStrongRef } from 'horizon-core/state'

interface UxSandwichLayout {
  hideBar?: Props.OrSignal<boolean>
  themeColor?: string
  theme?: Props.OrSignal<'dark' | 'light'>
  useRouter?: boolean
  mobileBarMaxCount?: number
  items: Props.OrSignal<{
    title: Props.OrSignal<string>
    slug?: string
    icon?: (Function | Component.Component)
    click?: () => unknown
  }[]>
  beforeBar?: () => void
  afterBar?: () => void
}

export default mod<UxSandwichLayout, {}>((config, { use, text, $, slot, input, dyn, implement }) => {
  const { themeColor, theme, hideBar } = config
  const { useRouter, items, beforeBar, afterBar } = config

  useDocumentBody(body => {
    if (themeColor)
      useStrongRef(themeColor, themeColor => body.style.setProperty(`--h-accent`, themeColor))
    useStrongRef(theme, theme => body.setAttribute('class', theme))
  })

  $('div', { class: useComputed(raw => ['h-sandwich-layout', raw(hideBar ?? false) ? 'hide-bar' : '']) }, () => {
    $('div', { class: ['h-sandwich-layout__content'] }, () => {
      if (useRouter)
        use(HorizonRouter)
      else
        slot({})
    })
    $('nav', { class: ['h-sandwich-layout__nav'] }, () => {
      $('label', { class: ['h-sandwich-layout__nav-button'] }, () => {
        input({ type: 'checkbox' })
        $('div', { class: ['h-sandwich-layout__nav-button__bar'] })
      })
      if (beforeBar) {
        $('section', { class: ['h-sandwich-layout__nav-panels'] }, () => {
          $('div', { style: 'width: 100%;' }, () => implement(beforeBar))
        })
      }
      $('div', { class: ['h-sandwich-layout__nav-bar'] }, () => {
        dyn([items], () => {
          const rawItems = unSignal(items)
          for (const barItem of rawItems) {
            $('div', {
              '@click': () => { barItem.click?.() },
              class: ['h-sandwich-item']
            }, () => {
              $('div', { class: ['h-sandwich-item__icon', !barItem.icon ? 'fake-icon' : ''] }, () => {
                if (barItem.icon) {
                  implement(barItem.icon)
                } else {
                  text(
                    useComputed(raw => (raw(barItem.title)[0] ?? '').toLocaleUpperCase())
                  )
                }
              })
              $('div', { class: ['h-sandwich-item__title'] }, () => {
                text(barItem.title)
              })
            })
          }
        })
      })
      if (afterBar) {
        $('section', { class: ['h-sandwich-layout__nav-panels'] }, () => {
          $('div', { style: 'width: 100%;' }, () => implement(afterBar))
        })
      }
    })
  })
})
