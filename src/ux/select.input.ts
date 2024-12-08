import { mod } from 'horizon-core/component'
import { CSS, Props, Signal } from 'horizon-core/@types'
import './css/input.css'
import { unSignal, useComputed, useSignal } from 'horizon-core/state'

interface UxSelectInput<T extends unknown[] = unknown[]> {
    model: Signal.Signal<number|number[]|null>
    options: Props.OrSignal<T>

    /** 
     * Input header
     * ```ts
     * title: "Title"
     * // or
     * title: () => text('My template Title')
     * ```
     * @default undefined
    */
    title?: Props.OrSignal<string>|Function

    /** 
     * Can have several selected elements
     * @default false
    */
    multiple?: boolean
    /** 
     * Number of items displayed on input element\
     * `Test 1, Test 2, Test 3 ... and 2 more`
     * @default 3
    */
    multipleShowCount?: number

    /** 
     * Adding internationalization to select 
     * ```ts
     * i18n: {
     *  empty: "Empty"
     *  moreOf: (count) => `and ${count} more`
     * }
     * ``` 
    */
    i18n?: {
        empty?: Props.OrSignal<string>
        moreOf?: (count: number) => string
    }

    labelBuilder?: (item: T[number]) => string
    builder?: (item: T[number], index: number) => void
    onSearch?: (searchValue: string, item: T[number]) => boolean

    styleTags?: ('light')[]
    required?: Props.OrSignal<boolean>
    style?: CSS.Style|{}|string
}

export default mod<UxSelectInput, {}>(({ model, options, builder, onSearch, labelBuilder, title, i18n, multiple = false, multipleShowCount = 3, required = false, style = '', styleTags = [] }, { $, text, dyn, input, implement }) => {
    const bClass = ['h-input', ...styleTags]

    if(unSignal(multiple)) {
        if(!Array.isArray(model.value))
            model.value = []
    }

    const searchValue = useSignal('')

    const isEmpty = () => {
        // @ts-ignore
        if(model.value == 'null') return true
        // @ts-ignore
        if(unSignal(multiple)) return !model.value.length
        return !model.value
    }

    const isSelected = (index: number) => {
        // @ts-ignore
        return isEmpty() ? '' : (model.value.includes(index) ? 'selected' : '') 
    }

    const pickOption = (index: number) => {
        if(index == -1) return
        if(!unSignal(multiple)) {
            model.value = index
            // @ts-ignore
            document.activeElement?.blur()
        } else {
            if(model.unsafe == null)
                model.value = [];
            // @ts-ignore
            const findIndex = model.unsafe.findIndex((item) => item == index)
            if(findIndex !== -1) {
                // @ts-ignore
                model.value.splice(findIndex, 1)
            } else {
                // @ts-ignore
                model.value.push(index)
            }
        }
    }
    let inputSearch: HTMLInputElement|undefined

    // @ts-ignore
    $('div', { style, class: bClass }, () => {
        if(title) {
            $('div', { class: useComputed(un => ['h-input__title', un(required) ? 'required' : '']) }, () => {
                implement(title)
            })
        }

        let isActive = false
        const { dom: selectDom } = $('div', { 
            class: ['h-input-select', onSearch ? 'with-search' : ''], 'tabindex': -1,
            '@click.stop': (event) => {
                if(isActive == false) {
                    isActive = true
                    if(inputSearch) inputSearch.focus()
                } else {
                    // @ts-ignore
                    document.activeElement?.blur()
                }
            } 
        }, () => {
            text(useComputed(un => {
                if(!un(multiple)) {
                    const item = un(options)[un(model)]
                    return item ? (labelBuilder ? labelBuilder(item) : item) : (i18n?.empty ?? 'Empty')
                } else {
                    // @ts-ignore
                    if(model.value == 'null' || model.value.length == 0) return i18n?.empty ?? 'Empty'

                    // @ts-ignore
                    let result = model.value.slice(0, multipleShowCount).map((v) => {
                        const item = un(options)[v]
                        return item ? (labelBuilder ? labelBuilder(item) : item) : (i18n?.empty ?? 'Empty')
                    }).join(', ')

                    // @ts-ignore
                    if(multipleShowCount < model.value.length) {
                        // @ts-ignore
                        const countOfMore = model.value.length - multipleShowCount;
                        result += i18n?.moreOf ? i18n?.moreOf(countOfMore) : ` ...and ${countOfMore} more`
                    }

                    return result
                }
            }))

            $('button', { class: useComputed(() => ['h-input-select__clear', isEmpty() ? 'h-hide' : '']), '@click.stop': () => {
                model.value = unSignal(multiple) ? [] : null
                // @ts-ignore
                document.activeElement?.blur();
            }})

            if(onSearch) {
                const searchAtom = input({
                    placeholder: 'Search...',
                    class: [ 'h-input-select__search', 'un-h'],
                    "#model": searchValue,
                    '@press.enter': () => {
                        if(unSignal(multiple)) return
                        const searchIndex = unSignal<any[]>(options).findIndex(item => onSearch(searchValue.value, item))
                        pickOption(searchIndex)
                    }
                })
                inputSearch = searchAtom.dom as HTMLInputElement
            }

            $('div', { class: ['h-input-select__panel', multiple ? 'multiple' : ''] }, () => {
                dyn([options, (onSearch ? searchValue.value : null)], () => {
                    const searchingValue = searchValue.value

                    for (let [index, item] of Object.entries(unSignal(options))) {
                        if(onSearch && !onSearch(searchingValue, item))
                            continue

                        $('div', { 
                            class: unSignal(multiple) ? useComputed(() => ['h-input-select__item', isSelected(+index)]) : ['h-input-select__item'],
                            '@click.stop'(event) { pickOption(+index) }
                        }, () => {
                            if(builder)
                                builder(item, +index)
                            else
                                text(item)
                        })
                    }
                })
            })
        })
        selectDom.addEventListener('blur', () => isActive = false)
    })
}) as <T extends unknown[]>(props: UxSelectInput<T>) => void