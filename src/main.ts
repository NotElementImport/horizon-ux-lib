import './style.css'
import { defineApp } from 'horizon-core'
import horizonRouter from 'horizon-core/router'
import mainRouter from './main.router'
import appComponent from './app.component'

const app = defineApp({ devMode: true })

// @ts-ignore
appComponent.composable.dom = document.querySelector('#app')

horizonRouter.defineRoutes(mainRouter)
  .push(`${window.location.pathname}${window.location.search}`)

app.renderDOM(appComponent)