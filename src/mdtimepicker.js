import { MDTP_DATA, DEFAULT_CLASS, HOUR_START_DEG, HOUR_DEG_INCR, MIN_START_DEG, MIN_DEG_INCR, END_DEG, EX_KEYS, DEFAULTS } from './vars'
import { hf } from './helpers'

/**
 * Time class
 */
class Time {
	/**
	 * Creates a time object
	 * @param {number} hour Hour value (0 - 23)
 	 * @param {number} minute Minute value (0 - 59)
	 */
	constructor(hour, minute) {
		this.hour = hour
		this.minute = minute
	}
	setHour(value) { this.hour = value }
	getHour(is12Hour) {
		return is12Hour ? [0, 12].indexOf(this.hour) >= 0 ? 12 : (this.hour % 12) : this.hour
	}
	invert() {
		if (this.getPeriod() === 'AM') this.setHour(this.getHour() + 12)
		else this.setHour(this.getHour() - 12)
	}
	setMinutes(value) { this.minute = value }
	getMinutes() { return this.minute }
	getPeriod() { return this.hour < 12 ? 'AM' : 'PM' }
	format(format, hourPadding) {
		let that = this, is24Hour = (format.match(/h/g) || []).length > 1

		return format.replace(/(hh|h|mm|ss|tt|t)/g, function (e) {
			switch (e.toLowerCase()) {
				case 'h':
					let hour = that.getHour(true)
					return (hourPadding && hour < 10 ? '0' + hour : hour)
				case 'hh': return (that.hour < 10 ? '0' + that.hour : that.hour)
				case 'mm': return (that.minute < 10 ? '0' + that.minute : that.minute)
				case 'ss': return '00'
				case 't': return is24Hour ? '' : that.getPeriod().toLowerCase()
				case 'tt': return is24Hour ? '' : that.getPeriod()
			}
		})
	}
}

/**
 * Time picker class
 */
class MDTimePicker {
	/**
	 * Creates a time picker object
	 * @param {HTMLInputElement} el Input element
	 * @param {Object} config Time picker configurations
	 */
	constructor(el, config) {
		let _ = this

		this.visible = false
		this.activeView = 'hours'
		this.hTimeout = null
		this.mTimeout = null
		this.input = el
		this.input.readOnly = true
		this.config = config
		this.time = new Time(0, 0)
		this.selected = new Time(0, 0)
		this.timepicker = {
			overlay: hf.createElem('div', { class: 'mdtimepicker hidden' }),
			wrapper: hf.createElem('div', { class: 'mdtp__wrapper', tabindex: 0 }),
			timeHolder: {
				wrapper: hf.createElem('section', { class: 'mdtp__time_holder' }),
				hour: hf.createElem('span', { class: 'mdtp__time_h' }, '12'),
				dots: hf.createElem('span', { class: 'mdtp__timedots' }, ':'),
				minute: hf.createElem('span', { class: 'mdtp__time_m' }, '00'),
				am_pm: hf.createElem('span', { class: 'mdtp__ampm' }, 'AM')
			},
			clockHolder: {
				wrapper: hf.createElem('section', { class: 'mdtp__clock_holder' }),
				am: hf.createElem('span', { class: 'mdtp__am' }, 'AM'),
				pm: hf.createElem('span', { class: 'mdtp__pm' }, 'PM'),
				clock: {
					wrapper: hf.createElem('div', { class: 'mdtp__clock' }),
					dot: hf.createElem('span', { class: 'mdtp__clock_dot' }),
					hours: hf.createElem('div', { class: 'mdtp__hour_holder' }),
					minutes: hf.createElem('div', { class: 'mdtp__minute_holder' })
				},
				buttonsHolder: {
					wrapper: hf.createElem('div', { class: 'mdtp__buttons' }),
					btnClear: hf.createElem('span', { class: 'mdtp__button clear-btn' }, 'Clear'),
					btnOk: hf.createElem('span', { class: 'mdtp__button ok' }, 'Ok'),
					btnCancel: hf.createElem('span', { class: 'mdtp__button cancel' }, 'Cancel')
				}
			}
		}

		this.setMinTime(this.input.dataset.mintime || this.config.minTime)
		this.setMaxTime(this.input.dataset.maxtime || this.config.maxTime)

		let picker = _.timepicker

		hf.appendTo(_._setup(), document.body)

		hf.addEvent(picker.overlay, 'click', () => { _.hide() })
		
		hf.addEvent(picker.wrapper, 'click', e => e.stopPropagation())
		hf.addEvent(picker.wrapper, 'keydown', e => {
			if (e.keyCode !== 27) return

			_.hide()
		})
		
		hf.addEvent(picker.clockHolder.am, 'click', () => {
			if (_.selected.getPeriod() !== 'AM') _.setPeriod('am')
		})
		
		hf.addEvent(picker.clockHolder.pm, 'click', () => {
			if (_.selected.getPeriod() !== 'PM') _.setPeriod('pm')
		})
		
		hf.addEvent(picker.timeHolder.hour, 'click', () => {
			if (_.activeView !== 'hours') _._switchView('hours')
		})
		
		hf.addEvent(picker.timeHolder.minute, 'click', () => {
			if (_.activeView !== 'minutes') _._switchView('minutes')
		})
		
		hf.addEvent(picker.clockHolder.buttonsHolder.btnOk, 'click', () => {
			let selected = _.selected

			if (_.isDisabled(selected.getHour(), selected.getMinutes(), false)) return

			_.setValue(selected)

			let formatted = _.getFormattedTime()

			_._triggerChange({ time: formatted.time, value: formatted.value })
			_.hide()
		})
		
		hf.addEvent(picker.clockHolder.buttonsHolder.btnCancel, 'click', () => { _.hide() })

		if (_.config.clearBtn) {
			hf.addEvent(picker.clockHolder.buttonsHolder.btnClear, 'click', () => {
				_.input.value = ''
				hf.setAttributes(_.input, {
					'value': '', 'data-time': null
				})

				_._triggerChange({ time: null, value: '' })
				_.hide()
			})
		}

		/* input event handlers */
		function _inputClick() { _.show() }

		function _inputKeydown(e) {
			if (e.keyCode === 13) {
				_.show()
			}
			return !(EX_KEYS.indexOf(e.which) < 0)
		}

		/**
		 * Unbinds input `click` and `keydown` event handlers
		 */
		this._unbindInput = function () {
			_.input.readOnly = false
			_.input.removeEventListener('click', _inputClick)
			_.input.removeEventListener('keydown', _inputKeydown)
		}
		
		hf.addEvent(_.input, 'keydown', _inputKeydown)
		hf.addEvent(_.input, 'click', _inputClick)

		if (_.input.value !== '') {
			let time = _.parseTime(_.input.value, _.config.format)

			_.setValue(time)
		} else {
			let time = _.getSystemTime()

			_.time = new Time(time.hour, time.minute)
		}

		_.resetSelected()
		_._switchView(_.activeView)

		if (_.config.events && _.config.events.ready)
			_.config.events.ready.call(_, _)
	}
	/**
	 * Setup time picker html elements
	 */
	_setup() {
		let _ = this, picker = _.timepicker, overlay = picker.overlay, wrapper = picker.wrapper,
			time = picker.timeHolder, clock = picker.clockHolder

		hf.appendTo([time.hour, time.dots, time.minute], time.wrapper)
		hf.appendTo(time.wrapper, wrapper)

		if (!_.config.is24hour) hf.appendTo(time.am_pm, time.wrapper)

		// Setup hours
		let _hours = _.config.is24hour ? 24 : 12
		for (let i = 0; i < _hours; i++) {
			let value = i + 1, deg = ((HOUR_START_DEG + (i * HOUR_DEG_INCR)) % END_DEG) - (_.config.is24hour && value < 13 ? 15 : 0),
				is24 = value === 24,
				hour = hf.createElem('div', { class: `mdtp__digit rotate-${deg}`, 'data-hour': (is24 ? 0 : value) }),
				hourInner = hf.createElem('span', null, (is24 ? '00' : value))

			hf.appendTo(hourInner, hour)

			if (_.config.is24hour && value < 13) hour.classList.add('inner--digit')
			
			hf.addEvent(hourInner, 'click', function() {
				let _hour = parseInt(this.parentNode.dataset.hour),
					_selectedT = _.selected.getPeriod(),
					_value = _.config.is24hour ? _hour :
						(_hour + ((_selectedT === 'PM' && _hour < 12) || (_selectedT === 'AM' && _hour === 12) ? 12 : 0)) % 24,
					disabled = _.isDisabled(_value, 0, true)

				if (disabled) return

				_.setHour(_value)
				_._switchView('minutes')
			})

			hf.appendTo(hour, clock.clock.hours)
		}

		// Setup minutes
		for (let i = 0; i < 60; i++) {
			let min = i < 10 ? '0' + i : i, deg = (MIN_START_DEG + (i * MIN_DEG_INCR)) % END_DEG,
				minute = hf.createElem('div', { class: `mdtp__digit rotate-${deg}`, 'data-minute': i }),
				minuteInner = hf.createElem('span')

			hf.appendTo(minuteInner, minute)

			if (i % 5 === 0) {
				minute.classList.add('marker')
				minuteInner.innerText = min
			}
			
			hf.addEvent(minuteInner, 'click', function() {
				let _minute = parseInt(this.parentNode.dataset.minute),
					_hour = _.selected.getHour(),
					disabled = _.isDisabled(_hour, _minute, true)

				if (disabled) return

				_.setMinute(_minute)
			})

			hf.appendTo(minute, clock.clock.minutes)
		}

		// Setup clock
		if (!_.config.is24hour) {
			hf.appendTo([clock.am, clock.pm], clock.clock.wrapper)
		}

		hf.appendTo([clock.clock.dot, clock.clock.hours, clock.clock.minutes], clock.clock.wrapper)
		hf.appendTo(clock.clock.wrapper, clock.wrapper)

		// Setup buttons
		if (_.config.clearBtn) {
			hf.appendTo(clock.buttonsHolder.btnClear, clock.buttonsHolder.wrapper)
		}

		hf.appendTo([clock.buttonsHolder.btnCancel, clock.buttonsHolder.btnOk], clock.buttonsHolder.wrapper)
		hf.appendTo(clock.buttonsHolder.wrapper, clock.wrapper)

		hf.appendTo(clock.wrapper, wrapper)

		// Setup theme
		wrapper.dataset.theme = _.input.dataset.theme || _.config.theme

		hf.appendTo(wrapper, overlay)

		return overlay
	}
	/**
	 * Sets the hour value of the selected time
	 * @param {number} hour Hour value
	 */
	setHour(hour) {
		if (typeof hour === 'undefined')
			throw new Error('Expecting a value.')

		let is12Hour = !this.config.is24hour

		this.selected.setHour(hour)

		let _selectedH = this.selected.getHour(is12Hour)

		this.timepicker.timeHolder.hour.innerText = is12Hour ? _selectedH : this.selected.format('hh')
		
		this.timepicker.clockHolder.clock.hours.querySelectorAll('div').forEach(div => {
			let val = parseInt(div.dataset.hour)

			div.classList[val === _selectedH ? 'add' : 'remove']('active')
		})
	}
	/**
	 * Sets the minute value of the selected time
	 * @param {number} minute Minute value
	 */
	setMinute(minute) {
		if (typeof minute === 'undefined')
			throw new Error('Expecting a value.')

		this.selected.setMinutes(minute)
		
		this.timepicker.timeHolder.minute.innerText = minute < 10 ? '0' + minute : minute
		
		this.timepicker.clockHolder.clock.minutes.querySelectorAll('div').forEach(div => {
			let val = parseInt(div.dataset.minute)

			div.classList[val === minute ? 'add' : 'remove']('active')
		})
	}
	/**
	 * Sets the time period of the selected time
	 * @param {string} period Period value (AM/PM)
	 */
	setPeriod(period) {
		if (typeof period === 'undefined')
			throw new Error('Expecting a value.')

		if (this.selected.getPeriod() !== period.toUpperCase())
			this.selected.invert()

		let _period = this.selected.getPeriod()

		this._setDisabled(this.activeView)
		this.timepicker.timeHolder.am_pm.innerText = _period
		this.timepicker.clockHolder.am.classList[_period === 'AM' ? 'add' : 'remove']('active')
		this.timepicker.clockHolder.pm.classList[_period === 'PM' ? 'add' : 'remove']('active')
	}
	/**
	 * Sets the value of the selected time
	 * @param {string} value Time string values
	 */
	setValue(value) {
		if (typeof value === 'undefined')
			throw new Error('Expecting a value.')

		let time = typeof value === 'string' ? this.parseTime(value, this.config.format) : value

		this.time = new Time(time.hour, time.minute)

		let formatted = this.getFormattedTime()

		this.input.value = formatted.value
		hf.setAttributes(this.input, {
			'value': formatted.value,
			'data-time': formatted.time
		})
	}
	/**
	 * Sets the minimum time constraint
	 * @param {string} time Minimum time value
	 */
	setMinTime(time) { this.minTime = time }
	/**
	 * Sets the maximum time constraint
	 * @param {string} time Maximum time value
	 */
	setMaxTime(time) { this.maxTime = time }
	/**
	 * Sets the disabled digits of the clock
	 * @param {string} view View name
	 */
	_setDisabled(view) {
		if (view !== 'hours' && view !== 'minutes') return

		let _ = this, clock = this.timepicker.clockHolder.clock

		if (view === 'hours') {
			clock.hours.querySelectorAll('.mdtp__digit').forEach(hour => {
				let value = parseInt(hour.dataset.hour),
					period = _.selected.getPeriod(),
					time = new Time(value, 0)

					if (!_.config.is24hour && period !== time.getPeriod())
						time.invert()
	
					let disabled = _.isDisabled(time.getHour(), 0, true)
	
					hour.classList[disabled ? 'add' : 'remove']('digit--disabled')
			})
		}

		if (view === 'minutes') {
			clock.minutes.querySelectorAll('.mdtp__digit').forEach(minute => {
				let value = parseInt(minute.dataset.minute),
					hour = _.selected.getHour(),
					disabled = _.isDisabled(hour, value, true)

				minute.classList[disabled ? 'add' : 'remove']('digit--disabled')
			})
		}
	}
	/**
	 * Determines if the given time is disabled
	 * @param {number} hour Hour value
	 * @param {number} minute Minute value
	 * @param {boolean} renderMode `true` if called upon rendering; `false` otherwise
	 */
	isDisabled(hour, minute, renderMode) {
		let _ = this, minT = null, min = null, maxT = null, max = null, now = new Date(),
			time = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0),
			hourView = _.activeView === 'hours'

		if (_.minTime)
			minT = _.minTime === 'now' ? _.getSystemTime() : _.parseTime(_.minTime)
		if (_.maxTime)
			maxT = _.maxTime === 'now' ? _.getSystemTime() : _.parseTime(_.maxTime)

		if (minT) {
			min = new Date(now.getFullYear(), now.getMonth(), now.getDate(),
				minT.getHour(), hourView && renderMode ? 0 : minT.getMinutes(), 0, 0)
		}

		if (maxT) {
			max = new Date(now.getFullYear(), now.getMonth(), now.getDate(),
				maxT.getHour(), hourView && renderMode ? 0 : maxT.getMinutes(), 0, 0)
		}

		return (min && time < min) || (max && time > max)
	}
	/**
	 * Resets the selected time to client (system) time
	 */
	resetSelected() {
		this.setHour(this.time.hour)
		this.setMinute(this.time.minute)
		this.setPeriod(this.time.getPeriod())
	}
	/**
	 * Returns the selected time string
	 */
	getFormattedTime() {
		let time = this.time.format(this.config.timeFormat, false),
			tValue = this.time.format(this.config.format, this.config.hourPadding)

		return { time: time, value: tValue }
	}
	/**
	 * Returns the current client (system) time
	 */
	getSystemTime() {
		return (now => {
			return new Time(now.getHours(), now.getMinutes())
		})(new Date())
	}
	/**
	 * Parses the given time string into a Time object
	 * @param {string} time Time value
	 * @param {string} tf Time format
	 */
	parseTime(time, tf) {
		let that = this, format = typeof tf === 'undefined' ? that.config.format : tf,
			hLength = (format.match(/h/g) || []).length,
			is24Hour = hLength > 1,
			// mLength = (format.match(/m/g) || []).length, 
			tLength = (format.match(/t/g) || []).length,
			timeLength = time.length,
			fH = format.indexOf('h'), lH = format.lastIndexOf('h'),
			hour = '', min = '', t = ''

		// Parse hour
		if (that.config.hourPadding || is24Hour) {
			hour = time.substr(fH, 2)
		} else {
			let prev = format.substring(fH - 1, fH), next = format.substring(lH + 1, lH + 2)

			if (lH === format.length - 1) {
				hour = time.substring(time.indexOf(prev, fH - 1) + 1, timeLength)
			} else if (fH === 0) {
				hour = time.substring(0, time.indexOf(next, fH))
			} else {
				hour = time.substring(time.indexOf(prev, fH - 1) + 1, time.indexOf(next, fH + 1))
			}
		}

		format = format.replace(/(hh|h)/g, hour)

		let fM = format.indexOf('m'), lM = format.lastIndexOf('m'),
			fT = format.indexOf('t')

		// Parse minute
		let prevM = format.substring(fM - 1, fM), nextM = format.substring(lM + 1, lM + 2)

		if (lM === format.length - 1) {
			min = time.substring(time.indexOf(prevM, fM - 1) + 1, timeLength)
		} else if (fM === 0) {
			min = time.substring(0, 2)
		} else {
			min = time.substr(fM, 2)
		}

		// Parse t (am/pm)
		if (is24Hour)
			t = parseInt(hour) > 11 ? (tLength > 1 ? 'PM' : 'pm') : (tLength > 1 ? 'AM' : 'am')
		else
			t = time.substr(fT, 2)

		let isPm = t.toLowerCase() === 'pm',
			outTime = new Time(parseInt(hour), parseInt(min))
		if ((isPm && parseInt(hour) < 12) || (!isPm && parseInt(hour) === 12)) {
			outTime.invert()
		}

		return outTime
	}
	/**
	 * Switches the time picker view (screen)
	 * @param {string} view View name
	 */
	_switchView(view) {
		let _ = this, picker = this.timepicker, anim_speed = 350

		if (view !== 'hours' && view !== 'minutes') return

		_.activeView = view
		_._setDisabled(view)

		picker.timeHolder.hour.classList[view === 'hours' ? 'add' : 'remove']('active')
		picker.timeHolder.minute.classList[view === 'hours' ? 'remove' : 'add']('active')

		picker.clockHolder.clock.hours.classList.add('animate')
		if (view === 'hours')
			picker.clockHolder.clock.hours.classList.remove('hidden')

		clearTimeout(_.hTimeout)

		_.hTimeout = setTimeout(() => {
			if (view !== 'hours')
				picker.clockHolder.clock.hours.classList.add('hidden')
			picker.clockHolder.clock.hours.classList.remove('animate')
		}, view === 'hours' ? 20 : anim_speed)

		picker.clockHolder.clock.minutes.classList.add('animate')
		if (view === 'minutes')
			picker.clockHolder.clock.minutes.classList.remove('hidden')

		clearTimeout(_.mTimeout)

		_.mTimeout = setTimeout(() => {
			if (view !== 'minutes')
				picker.clockHolder.clock.minutes.classList.add('hidden')
			picker.clockHolder.clock.minutes.classList.remove('animate')
		}, view === 'minutes' ? 20 : anim_speed)
	}
	/**
	 * Shows the time picker
	 */
	show() {
		let _ = this

		if (_.input.value === '') {
			let time = _.getSystemTime()
			this.time = new Time(time.hour, time.minute)
		}

		_.resetSelected()

		document.body.setAttribute('mdtimepicker-display', 'on')

		_.timepicker.wrapper.classList.add('animate')
		_.timepicker.overlay.classList.remove('hidden')
		_.timepicker.overlay.classList.add('animate')
		setTimeout(function () {
			_.timepicker.overlay.classList.remove('animate')
			_.timepicker.wrapper.classList.remove('animate')
			_.timepicker.wrapper.focus()

			_.visible = true
			_.input.blur()

			if (_.config.events && _.config.events.shown)
				_.config.events.shown.call(_)
		}, 10)
	}
	/**
	 * Hides the time picker
	 */
	hide() {
		let _ = this

		_.timepicker.overlay.classList.add('animate')
		_.timepicker.wrapper.classList.add('animate')
		setTimeout(function () {
			_._switchView('hours')
			_.timepicker.overlay.classList.add('hidden')
			_.timepicker.overlay.classList.remove('animate')
			_.timepicker.wrapper.classList.remove('animate')

			document.body.removeAttribute('mdtimepicker-display')

			_.visible = false
			_.input.focus()

			if (_.config.events && _.config.events.hidden)
				_.config.events.hidden.call(_)
		}, 300)
	}
	/**
	 * Removes the time picker
	 */
	destroy() {
		this._unbindInput()
		this.timepicker.overlay.remove()
		delete this.input[MDTP_DATA]
	}
	/**
	 * Triggers the change event on the input element
	 * @param {Object} data Event data
	 */
	_triggerChange(data) {
		hf.triggerChange(this.input, data)

		if (this.config.events && this.config.events.timeChanged)
			this.config.events.timeChanged.call(this, data, this)
	}
}

/**
 * Time picker wrapper
 */
function mdtimepicker() {
	let args = arguments,
		arg0 = args[0], arg0IsList = arg0 instanceof NodeList || Array.isArray(arg0), arg0IsElem = arg0 instanceof Element,
		inputs = typeof arg0 === 'string' ? document.querySelectorAll(arg0) :
			(arg0IsList ? arg0 : (arg0IsElem ? [arg0] : document.querySelectorAll(DEFAULT_CLASS))),
		options = typeof arg0 === 'object' && !(arg0IsList) && !(arg0IsElem) ? arg0 : args[1] && typeof args[1] === 'object' ? args[1] : {},
		_defaults = hf.extend({}, DEFAULTS)

	if (options && options.is24hour) _defaults.format = 'hh:mm'

	Array.from(inputs).forEach(el => {
		let picker = el[MDTP_DATA]

		if (!picker) {
			el[MDTP_DATA] = (picker = new MDTimePicker(el, hf.extend(_defaults, options)))
		}

		if ((typeof arg0 === 'string' || arg0IsList || arg0IsElem) && (args[1] && typeof args[1] === 'string')) {
			picker[args[1]].apply(picker, Array.prototype.slice.call(args).slice(2))
		}
	})
}

export default mdtimepicker