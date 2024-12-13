import { mod } from "horizon-core/component";
import './css/lines.css';

export default mod((_, { $, slot }) => {
  $('section', { 'aria-label': 'Vertical line', class: ['h-vertical-line'] }, () => {
    $('div', { class: ['h-vertical-line__line'] })
    slot({})
    $('div', { class: ['h-vertical-line__line'] })
  })
})
