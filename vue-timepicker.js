import './dist/mdtimepicker.css'
import mdtimepicker from './dist/mdtimepicker.js'

export default {
    install(Vue, options) {

        if (! options) options = {}

        // <mdtimepicker /> component
        Vue.component('mdtimepicker', {
            render(createElement) {
                return createElement('input', {
                    domProps: {
                        type: 'text'
                    },
                    on: {
                        timechanged: e => {
                            this.$emit('timechanged', e)
                        }
                    }
                })
            },
            props: {
                options: { type: Object },
                ready: { type: Function },
                timeChanged: { type: Function },
                shown: { type: Function },
                hidden: { type: Function }
            },
            methods: {
                setValue(value) { mdtimepicker(this.$el, 'setValue', value) },
                setMinTime(value) { mdtimepicker(this.$el, 'setMinTime', value) },
                setMaxTime(value) { mdtimepicker(this.$el, 'setMaxTime', value) },
                show() { mdtimepicker(this.$el, 'show') },
                hide() { mdtimepicker(this.$el, 'hide') },
                destroy() { mdtimepicker(this.$el, 'destroy') }
            },
            mounted() {
                let evtProps = {
                    events: { ready: this.ready, timeChanged: this.timeChanged, shown: this.shown, hidden: this.hidden }
                }

                // remove undefined callbacks
                Object.keys(evtProps.events).forEach(key => evtProps.events[key] === undefined && delete evtProps.events[key])

                // initialize
                mdtimepicker(this.$el, { ...options, ...this.options, ...evtProps })
            },
            destroyed() {
                this.destroy()
            }
        })

        // v-mdtimepicker directive
        Vue.directive('mdtimepicker', {
            bind(el, binding) {
                mdtimepicker(el, { ...options, ...binding.value })
            },
            unbind(el) {
                mdtimepicker(el, 'destroy')
            }
        })
    }
}