import { mod } from "horizon-core/component";
import './css/lines.css';

export default mod((_, { $, slot }) => {
  $('section', { 'aria-label': 'Vertical line', class: ['h-horizontal-line'] }, () => {
    $('div', { class: ['h-horizontal-line__line'] })
    slot({})
    $('div', { class: ['h-horizontal-line__line'] })
  })
})
