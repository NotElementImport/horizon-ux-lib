import './style.css'
import { defineApp } from 'horizon-core'
import horizonRouter from 'horizon-core/router'
import mainRouter from './main.router'
import appComponent from './app.component'
import { comp } from 'horizon-core/component'

const app = defineApp({ devMode: true })

// @ts-ignore
appComponent.composable.dom = document.querySelector('#app')

horizonRouter.defineRoutes(mainRouter)
  .setNotFound(comp((_, { $, text }) => {
    $('div', { style: 'display: flex; justify-content: center; align-items: center; height: 100%;' }, () => {
      text('404 Not Found')
    })
  }))
  .push(`${window.location.pathname}${window.location.search}`)

app.renderDOM(appComponent)
