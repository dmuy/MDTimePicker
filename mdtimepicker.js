/* -- DO NOT REMOVE --
 * jQuery MDTimePicker v1.0 plugin
 * 
 * Author: Dionlee Uy
 * Email: dionleeuy@gmail.com
 *
 * Date: Tuesday, August 28 2017
 *
 * @requires jQuery
 * -- DO NOT REMOVE -- */
if (typeof jQuery === 'undefined') { throw new Error('MDTimePicker: This plugin requires jQuery'); }
+function ($) {
	var MDTP_DATA = "mdtimepicker", HOUR_START_DEG = 120, MIN_START_DEG = 90, END_DEG = 360, HOUR_DEG_INCR = 30, MIN_DEG_INCR = 6,
		EX_KEYS = [9, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123];

	/**
	 * Time object
	 * @param {number} hour Hour value (0 - 23)
	 * @param {number} minute Minute value (0 - 59)
	 */
	var Time = function (hour, minute) {
		this.hour = hour;
		this.minute = minute;

		this.format = function (format, hourPadding) {
			var that = this, is24Hour = (format.match(/h/g) || []).length > 1;

			return $.trim(format.replace(/(hh|h|mm|ss|tt|t)/g, function (e) {
				switch (e.toLowerCase()) {
					case 'h':
						var hour = that.getHour(true);

						return (hourPadding && hour < 10 ? '0' + hour : hour);
					case 'hh': return (that.hour < 10 ? '0' + that.hour : that.hour);
					case 'mm': return (that.minute < 10 ? '0' + that.minute : that.minute);
					case 'ss': return '00';
					case 't': return is24Hour ? '' : that.getPeriod().toLowerCase();
					case 'tt': return is24Hour ? '' : that.getPeriod();
				}
			}));
		};

		this.setHour = function (value) { this.hour = value; };
		this.getHour = function (is12Hour) { return is12Hour ? [0, 12].indexOf(this.hour) >= 0 ? 12 : (this.hour % 12) : this.hour; };
		this.invert = function () {
			if (this.getPeriod() === 'AM') this.setHour(this.getHour() + 12);
			else this.setHour(this.getHour() - 12);
		};
		this.setMinutes = function (value) { this.minute = value; }
		this.getMinutes = function () { return this.minute; }
		this.getPeriod = function () { return this.hour < 12 ? 'AM' : 'PM'; };
	};

	/**
	 * Time picker object
	 * @param {HTMLInputElement} el Input element
	 * @param {Object} config Time picker configurations
	 */
	var MDTimePicker = function (el, config) {
		var _ = this;

		this.visible = false;
		this.activeView = 'hours';
		this.hTimeout = null;
		this.mTimeout = null;
		this.input = $(el);
		this.config = config;
		this.time = new Time(0, 0);
		this.selected = new Time(0, 0);
		this.timepicker = {
			overlay: $('<div class="mdtimepicker hidden"></div>'),
			wrapper: $('<div class="mdtp__wrapper"></div>'),
			timeHolder: {
				wrapper: $('<section class="mdtp__time_holder"></section>'),
				hour: $('<span class="mdtp__time_h">12</span>'),
				dots: $('<span class="mdtp__timedots">:</span>'),
				minute: $('<span class="mdtp__time_m">00</span>'),
				am_pm: $('<span class="mdtp__ampm">AM</span>')
			},
			clockHolder: {
				wrapper: $('<section class="mdtp__clock_holder"></section>'),
				am: $('<span class="mdtp__am">AM</span>'),
				pm: $('<span class="mdtp__pm">PM</span>'),
				clock: {
					wrapper: $('<div class="mdtp__clock"></div>'),
					dot: $('<span class="mdtp__clock_dot"></span>'),
					hours: $('<div class="mdtp__hour_holder"></div>'),
					minutes: $('<div class="mdtp__minute_holder"></div>')
				},
				buttonsHolder: {
					wrapper: $('<div class="mdtp__buttons">'),
					btnClear: $('<span class="mdtp__button clear-btn">Clear</span>'),
					btnOk: $('<span class="mdtp__button ok">Ok</span>'),
					btnCancel: $('<span class="mdtp__button cancel">Cancel</span>')
				}
			}
		};

		this.setMinTime(this.input.data('mintime') || this.config.minTime);
		this.setMaxTime(this.input.data('maxtime') || this.config.maxTime);

		var picker = _.timepicker;

		_.setup().appendTo('body');

		picker.overlay.click(function(e) { _.hide(); });
		picker.wrapper.click(function(e) { e.stopPropagation() });
		picker.clockHolder.am.click(function () { if (_.selected.getPeriod() !== 'AM') _.setPeriod('am'); });
		picker.clockHolder.pm.click(function () { if (_.selected.getPeriod() !== 'PM') _.setPeriod('pm'); });
		picker.timeHolder.hour.click(function () { if (_.activeView !== 'hours') _.switchView('hours'); });
		picker.timeHolder.minute.click(function () { if (_.activeView !== 'minutes') _.switchView('minutes'); });
		picker.clockHolder.buttonsHolder.btnOk.click(function () {
			var selected = _.selected;

			if (_.isDisabled(selected.getHour(), selected.getMinutes())) return;

			_.setValue(selected);

			var formatted = _.getFormattedTime();

			_.triggerChange({ time: formatted.time, value: formatted.value });
			_.hide();
		});
		picker.clockHolder.buttonsHolder.btnCancel.click(function () { _.hide(); });

		if (_.config.clearBtn) {
			picker.clockHolder.buttonsHolder.btnClear.click(function () {
				_.input.val('')
					.attr('data-time', null)
					.attr('value', '');

				_.triggerChange({ time: null, value: '' });
				_.hide();
			});
		}

		_.input.on('keydown', function (e) {
			if (e.keyCode === 13) _.show();
			return !(EX_KEYS.indexOf(e.which) < 0 && _.config.readOnly);
		}).on('click', function () { _.show(); })
		.prop('readonly', true);

		if (_.input.val() !== '') {
			var time = _.parseTime(_.input.val(), _.config.format);

			_.setValue(time);
		} else {
			var time = _.getSystemTime();

			_.time = new Time(time.hour, time.minute);
		}

		_.resetSelected();
		_.switchView(_.activeView);
	};

	MDTimePicker.prototype = {
		constructor: MDTimePicker,

		/**
		 * Setup time picker html elements
		 */
		setup: function () {
			var _ = this, picker = _.timepicker, overlay = picker.overlay, wrapper = picker.wrapper,
				time = picker.timeHolder, clock = picker.clockHolder;

			// Setup time holder
			time.wrapper.append(time.hour)
				.append(time.dots)
				.append(time.minute)
				.append(time.am_pm)
				.appendTo(wrapper);

			// Setup hours
			for (var i = 0; i < 12; i++) {
				var value = i + 1, deg = (HOUR_START_DEG + (i * HOUR_DEG_INCR)) % END_DEG,
					hour = $('<div class="mdtp__digit rotate-' + deg + '" data-hour="' + value + '"><span>' + value + '</span></div>');

				hour.find('span').click(function () {
					var _hour = parseInt($(this).parent().data('hour')),
						_selectedT = _.selected.getPeriod(),
						_value = (_hour + ((_selectedT === 'PM' && _hour < 12) || (_selectedT === 'AM' && _hour === 12) ? 12 : 0)) % 24,
						disabled = _.isDisabled(_value, 0);

					if (disabled) return;

					_.setHour(_value);
					_.switchView('minutes');
				});

				clock.clock.hours.append(hour);
			}

			// Setup minutes
			for (var i = 0; i < 60; i++) {
				var min = i < 10 ? '0' + i : i, deg = (MIN_START_DEG + (i * MIN_DEG_INCR)) % END_DEG,
					minute = $('<div class="mdtp__digit rotate-' + deg + '" data-minute="' + i + '"></div>');

				if (i % 5 === 0) minute.addClass('marker').html('<span>' + min + '</span>');
				else minute.html('<span></span>');

				minute.find('span').click(function () {
					var _minute = parseInt($(this).parent().data('minute')),
						_hour = _.selected.getHour(),
						disabled = _.isDisabled(_hour, _minute);

					if (disabled) return;

					_.setMinute(_minute);
				});

				clock.clock.minutes.append(minute);
			}

			// Setup clock
			clock.clock.wrapper
				.append(clock.am).append(clock.pm)
				.append(clock.clock.dot)
				.append(clock.clock.hours)
				.append(clock.clock.minutes)
				.appendTo(clock.wrapper);

			// Setup buttons
			if (_.config.clearBtn) {
				clock.buttonsHolder.wrapper.append(clock.buttonsHolder.btnClear);
			}

			clock.buttonsHolder.wrapper.append(clock.buttonsHolder.btnCancel)
				.append(clock.buttonsHolder.btnOk)
				.appendTo(clock.wrapper);

			clock.wrapper.appendTo(wrapper);

			// Setup theme
			wrapper.attr('data-theme', _.input.data('theme') || _.config.theme || $.fn.mdtimepicker.defaults.theme);

			wrapper.appendTo(overlay);

			return overlay;
		},

		/**
		 * Sets the hour value of the selected time
		 * @param {number} hour Hour value
		 */
		setHour: function (hour) {
			if (typeof hour === 'undefined') throw new Error('Expecting a value.');

			var that = this;

			this.selected.setHour(hour);
			this.timepicker.timeHolder.hour.text(this.selected.getHour(true));

			this.timepicker.clockHolder.clock.hours.children('div').each(function (idx, div) {
				var el = $(div), val = el.data('hour');

				el[val === that.selected.getHour(true) ? 'addClass' : 'removeClass']('active');
			});
		},

		/**
		 * Sets the minute value of the selected time
		 * @param {number} minute Minute value
		 */
		setMinute: function (minute) {
			if (typeof minute === 'undefined') throw new Error('Expecting a value.');

			this.selected.setMinutes(minute);
			this.timepicker.timeHolder.minute.text(minute < 10 ? '0' + minute : minute);

			this.timepicker.clockHolder.clock.minutes.children('div').each(function (idx, div) {
				var el = $(div), val = el.data('minute');

				el[val === minute ? 'addClass' : 'removeClass']('active');
			});
		},

		/**
		 * Sets the time period of the selected time
		 * @param {string} period Period value (AM/PM)
		 */
		setPeriod: function (period) {
			if (typeof period === 'undefined') throw new Error('Expecting a value.');

			if (this.selected.getPeriod() !== period.toUpperCase()) this.selected.invert();

			var _period = this.selected.getPeriod();

			this.setDisabled(this.activeView);

			this.timepicker.timeHolder.am_pm.text(_period);
			this.timepicker.clockHolder.am[_period === 'AM' ? 'addClass' : 'removeClass']('active');
			this.timepicker.clockHolder.pm[_period === 'PM' ? 'addClass' : 'removeClass']('active');
		},

		/**
		 * Sets the value of the selected time
		 * @param {string} value Time string values
		 */
		setValue: function (value) {
			if (typeof value === 'undefined') throw new Error('Expecting a value.');

			var time = typeof value === 'string' ? this.parseTime(value, this.config.format) : value;

			this.time = new Time(time.hour, time.minute);

			var formatted = this.getFormattedTime();

			this.input.val(formatted.value)
				.attr('data-time', formatted.time)
				.attr('value', formatted.value);
		},

		/**
		 * Sets the minimum time constraint
		 * @param {string} time Minimum time value
		 */
		setMinTime: function(time) { this.minTime = time },

		/**
		 * Sets the maximum time constraint
		 * @param {string} time Maximum time value
		 */
		setMaxTime: function(time) { this.maxTime = time },

		/**
		 * Sets the disabled digits of the clock
		 * @param {string} view View name
		 */
		setDisabled: function(view) {
			if (view !== 'hours' && view !== 'minutes') return;

			var _ = this, clock = this.timepicker.clockHolder.clock;

			if (view === 'hours') {
				clock.hours.find('.mdtp__digit').each(function(i, hEl) {
					var hour = $(hEl), value = parseInt(hour.data('hour')),
						period = _.selected.getPeriod(),
						time = new Time(value, 0);
					
					if (period !== time.getPeriod()) time.invert();

					var disabled = _.isDisabled(time.getHour(), 0);

					hour[disabled ? 'addClass' : 'removeClass']('digit--disabled');
				});
			}

			if (view === 'minutes') {
				clock.minutes.find('.mdtp__digit').each(function(i, mEl) {
					var minute = $(mEl), value = parseInt(minute.data('minute')),
						hour = _.selected.getHour(),
						disabled = _.isDisabled(hour, value);

					minute[disabled ? 'addClass' : 'removeClass']('digit--disabled');
				});
			}
		},

		/**
		 * Determines if the given time is disabled
		 * @param {number} hour Hour value
		 * @param {number} minute Minute value
		 */
		isDisabled: function(hour, minute) {
			var _ = this, minT = null, min = null, maxT = null, max = null, now = new Date(),
				time = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0),
				hourView = _.activeView === 'hours';

			if (_.minTime) minT = _.minTime === 'now' ? _.getSystemTime()  : _.parseTime(_.minTime);
			if (_.maxTime) maxT = _.maxTime === 'now' ? _.getSystemTime()  : _.parseTime(_.maxTime);

			if (minT) {
				min = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 
					minT.getHour(), hourView ? 0 : minT.getMinutes(), 0, 0)
			}

			if (maxT) {
				max = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 
					maxT.getHour(), hourView ? 0 : maxT.getMinutes(), 0, 0)
			}

			return (min && time < min) || (max && time > max);
		},

		/**
		 * Resets the selected time to client (system) time
		 */
		resetSelected: function () {
			this.setHour(this.time.hour);
			this.setMinute(this.time.minute);
			this.setPeriod(this.time.getPeriod());
		},

		/**
		 * Returns the selected time string
		 */
		getFormattedTime: function () {
			var time = this.time.format(this.config.timeFormat, false),
				tValue = this.time.format(this.config.format, this.config.hourPadding);

			return { time: time, value: tValue };
		},

		/**
		 * Returns the current client (system) time
		 */
		getSystemTime: function () {
			var now = new Date();

			return new Time(now.getHours(), now.getMinutes());
		},

		/**
		 * Parses the given time string into a Time object
		 * @param {string} time Time value
		 * @param {string} tf Time format
		 */
		parseTime: function (time, tf) {
			var that = this, format = typeof tf === 'undefined' ? that.config.format : tf,
				hLength = (format.match(/h/g) || []).length,
				is24Hour = hLength > 1,
				mLength = (format.match(/m/g) || []).length, tLength = (format.match(/t/g) || []).length,
				timeLength = time.length,
				fH = format.indexOf('h'), lH = format.lastIndexOf('h'),
				hour = '', min = '', t = '';

			// Parse hour
			if (that.config.hourPadding || is24Hour) {
				hour = time.substr(fH, 2);
			} else {
				var prev = format.substring(fH - 1, fH), next = format.substring(lH + 1, lH + 2);

				if (lH === format.length - 1) {
					hour = time.substring(time.indexOf(prev, fH - 1) + 1, timeLength);
				} else if (fH === 0) {
					hour = time.substring(0, time.indexOf(next, fH));
				} else {
					hour = time.substring(time.indexOf(prev, fH - 1) + 1, time.indexOf(next, fH + 1));
				}
			}

			format = format.replace(/(hh|h)/g, hour);

			var fM = format.indexOf('m'), lM = format.lastIndexOf('m'),
				fT = format.indexOf('t');

			// Parse minute
			var prevM = format.substring(fM - 1, fM), nextM = format.substring(lM + 1, lM + 2);

			if (lM === format.length - 1) {
				min = time.substring(time.indexOf(prevM, fM - 1) + 1, timeLength);
			} else if (fM === 0) {
				min = time.substring(0, 2);
			} else {
				min = time.substr(fM, 2);
			}

			// Parse t (am/pm)
			if (is24Hour) t = parseInt(hour) > 11 ? (tLength > 1 ? 'PM' : 'pm') : (tLength > 1 ? 'AM' : 'am');
			else t = time.substr(fT, 2);

			var isPm = t.toLowerCase() === 'pm',
				outTime = new Time(parseInt(hour), parseInt(min));
			if ((isPm && parseInt(hour) < 12) || (!isPm && parseInt(hour) === 12)) {
				outTime.invert();
			}

			return outTime;
		},

		/**
		 * Switches the time picker view (screen)
		 * @param {string} view View name
		 */
		switchView: function (view) {
			var _ = this, picker = this.timepicker, anim_speed = 350;

			if (view !== 'hours' && view !== 'minutes') return;

			_.activeView = view;
			_.setDisabled(view);

			picker.timeHolder.hour[view === 'hours' ? 'addClass' : 'removeClass']('active');
			picker.timeHolder.minute[view === 'hours' ? 'removeClass' : 'addClass']('active');

			picker.clockHolder.clock.hours.addClass('animate');
			if (view === 'hours') picker.clockHolder.clock.hours.removeClass('hidden');

			clearTimeout(_.hTimeout);

			_.hTimeout = setTimeout(function () {
				if (view !== 'hours') picker.clockHolder.clock.hours.addClass('hidden');
				picker.clockHolder.clock.hours.removeClass('animate');
			}, view === 'hours' ? 20 : anim_speed);

			picker.clockHolder.clock.minutes.addClass('animate');
			if (view === 'minutes') picker.clockHolder.clock.minutes.removeClass('hidden');

			clearTimeout(_.mTimeout);

			_.mTimeout = setTimeout(function () {
				if (view !== 'minutes') picker.clockHolder.clock.minutes.addClass('hidden');
				picker.clockHolder.clock.minutes.removeClass('animate');
			}, view === 'minutes' ? 20 : anim_speed);
		},

		/**
		 * Shows the time picker
		 */
		show: function () {
			var that = this;

			if (that.input.val() === '') {
				var time = that.getSystemTime();
				this.time = new Time(time.hour, time.minute);
			}

			that.resetSelected();

			$('body').attr('mdtimepicker-display', 'on');

			that.timepicker.wrapper.addClass('animate');
			that.timepicker.overlay.removeClass('hidden').addClass('animate');
			setTimeout(function () {
				that.timepicker.overlay.removeClass('animate');
				that.timepicker.wrapper.removeClass('animate');

				that.visible = true;
				that.input.blur();
			}, 10);
		},

		/**
		 * Hides the time picker
		 */
		hide: function () {
			var that = this;

			that.timepicker.overlay.addClass('animate');
			that.timepicker.wrapper.addClass('animate');
			setTimeout(function () {
				that.switchView('hours');
				that.timepicker.overlay.addClass('hidden').removeClass('animate');
				that.timepicker.wrapper.removeClass('animate');

				$('body').removeAttr('mdtimepicker-display');

				that.visible = false;
				that.input.focus();
			}, 300);
		},

		/**
		 * Removes the time picker
		 */
		destroy: function () {
			var that = this;

			that.input.removeData(MDTP_DATA)
				.unbind('keydown').unbind('click')
				.removeProp('readonly');
			that.timepicker.overlay.remove();
		},

		/**
		 * Triggers the change event on the input element
		 * @param {Object} data Event data
		 */
		triggerChange: function (data) {
			this.input.trigger($.Event('timechanged', data))
				.trigger('onchange')	// for ASP.Net postback
				.trigger('change');
		}
	};

	$.fn.mdtimepicker = function () {
		var mdtp_args = arguments,
			arg0 = mdtp_args[0];

		return $(this).each(function (idx, el) {
			var that = this,
				$that = $(this),
				picker = $(this).data(MDTP_DATA),
				options = $.extend({}, $.fn.mdtimepicker.defaults, $that.data(), typeof arg0 === 'object' && arg0);

			if (!picker) {
				$that.data(MDTP_DATA, (picker = new MDTimePicker(that, options)));
			}

			if (typeof arg0 === 'string')
				picker[arg0].apply(picker, Array.prototype.slice.call(mdtp_args).slice(1));

			$(document).on('keydown', function (e) {
				if (e.keyCode !== 27) return;

				if (picker.visible) picker.hide();
			});
		});
	}

	$.fn.mdtimepicker.defaults = {
		timeFormat: 'hh:mm:ss.000',	// format of the time value (data-time attribute)
		format: 'h:mm tt',			// format of the input value
		theme: 'blue',				// theme of the timepicker
		hourPadding: false,			// determines if display value has zero padding for hour value less than 10 (i.e. 05:30 PM); 24-hour format has padding by default
		clearBtn: false             // determines if clear button is visible
	};
}(jQuery);