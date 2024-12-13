import { comp } from 'horizon-core/component'
import { getSnapshotApp } from 'horizon-core/testing'
import './ux/hux.css'
import { useSignal } from 'horizon-core/state'
import router from 'horizon-core/router'
import horizontalLine from './ux/horizontal.line'
import verticalLine from './ux/vertical.line'

const testSignal = useSignal("Hello world!", { key: 'Test value' })

export default comp((_, { $, text }) => {
  $('div', {}, () => {
    text(testSignal)

    console.log(getSnapshotApp())
  })
})
