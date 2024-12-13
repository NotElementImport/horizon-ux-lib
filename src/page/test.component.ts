import { comp } from 'horizon-core/component'
import { useComputed, useSignal } from 'horizon-core/state'
import container from '../ux/container'
import textInput from '../ux/text.input'
import button from '../ux/button'
import checkboxInput from '../ux/checkbox.input'
import screens from '../ux/screens'

export default comp((_, { text }) => {
  container({}, () => {
    text("test")
  })
})
