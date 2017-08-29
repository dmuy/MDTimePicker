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
		EX_KEYS = [9,112,113,114,115,116,117,118,119,120,121,122,123];

	var MDTimePicker = function (input, config) {
		var that = this;

		this.visible = false;
		this.activeView = 'hours';
		this.hTimeout = null;
		this.mTimeout = null;
		this.input = $(input);
		this.config = config;
		this.time = { hour: 12, minute: 0, t: 'AM' };
		this.selected = { hour: 12, minute: 0, t: 'AM' }
		this.timepicker = {
			overlay : $('<div class="mdtp__overlay animate hidden"></div>'),
			wrapper : $('<div class="mdtp__wrapper animate"></div>'),
			timeHolder : {
				wrapper: $('<section class="mdtp__time_holder"></section>'),
				hour: $('<span class="mdtp__time_h">12</span>'),
				dots: $('<span class="mdtp__timedots">:</span>'),
				minute: $('<span class="mdtp__time_m">00</span>'),
				am_pm: $('<span class="mdtp__ampm">AM</span>')
			},
			clockHolder : {
				wrapper: $('<section class="mdtp__clock_holder"></section>'),
				am: $('<span class="mdtp__am">AM</span>'),
				pm: $('<span class="mdtp__pm">PM</span>'),
				clock: {
					wrapper: $('<div class="mdtp__clock"></div>'),
					dot: $('<span class="mdtp__clock_dot"></span>'),
					hours: $('<div class="mdtp__hour_holder"></div>'),
					minutes: $('<div class="mdtp__minute_holder"></div>')
				},
				buttonsHolder : {
					wrapper: $('<div class="mdtp__buttons">'),
					btnOk : $('<span class="mdtp__button ok">Ok</span>'),
					btnCancel: $('<span class="mdtp__button cancel">Cancel</span>')
				}
			}
		};

		var picker = that.timepicker;

		that.input.on('keydown', function (e) { return !(EX_KEYS.indexOf(e.which) < 0 && that.config.readOnly); });

		that.setup(picker).appendTo('body');

		picker.clockHolder.am.click(function () { that.setT('am'); });
		picker.clockHolder.pm.click(function () { that.setT('pm'); });
		picker.timeHolder.hour.click(function () { if (that.activeView !== 'hours') that.switchView('hours'); });
		picker.timeHolder.minute.click(function () { if (that.activeView !== 'minutes') that.switchView('minutes'); });
		picker.clockHolder.buttonsHolder.btnOk.click(function () {
			that.setValue(that.selected);

			var formatted = that.getFormattedTime();

			that.input.trigger($.Event('timechanged', { time: formatted.time, value: formatted.value }))
				.trigger('onchange');	// for ASP.Net postback
				
			that.hide();
		});
		picker.clockHolder.buttonsHolder.btnCancel.click(function () { that.hide(); });

		that.input.click(function () { that.show(); })
	        .keydown(function (e) { if (e.keyCode === 13) that.show(); });

		if(that.input.val() !== '') {
			var time = that.parseTime(that.input.val(), 'hh:mm t');

			that.setValue(time);
		} else {
			var now = new Date(), h = now.getHours() % 12, m = now.getMinutes(), t = now.getHours() > 12 ? 'PM' : 'AM';

			that.setTime({ hour: h, minute: m, t: t });
		}

		that.resetSelected();
		that.switchView(that.activeView);
	};

	MDTimePicker.prototype = {
		constructor : MDTimePicker,

		setup : function (picker) {
			var that = this, overlay = picker.overlay, wrapper = picker.wrapper,
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
					hour = $('<div class="mdtp__digit rotate-' + deg + '" data-hour="' + value + '"><span>'+ value +'</span></div>');
				
				hour.find('span').click(function () {
					that.setHour($(this).parent().data('hour'));
					that.switchView('minutes');
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
					that.setMinute($(this).parent().data('minute'));
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
			clock.buttonsHolder.wrapper.append(clock.buttonsHolder.btnCancel)
				.append(clock.buttonsHolder.btnOk)
				.appendTo(clock.wrapper);

			clock.wrapper.appendTo(wrapper);

			switch(that.config.theme) {
				case 'red':
				case 'blue':
				case 'green':
				case 'purple':
				case 'indigo':
				case 'teal':
					wrapper.attr('data-theme', that.config.theme);
				break;
				default:
					wrapper.attr('data-theme', $.fn.mdtimepicker.defaults.theme);
				break;
			}

			wrapper.appendTo(overlay);

			return overlay;
		},

		setHour : function (hour) {
			this.selected.hour = hour;
			this.timepicker.timeHolder.hour.text(hour);

			this.timepicker.clockHolder.clock.hours.children('div').each(function (idx, div) {
				var el = $(div), val = el.data('hour');

				el[val === hour ? 'addClass' : 'removeClass']('active');
			});
		},

		setMinute : function (minute) {
			this.selected.minute = minute;
			this.timepicker.timeHolder.minute.text(minute < 10 ? '0' + minute : minute);

			this.timepicker.clockHolder.clock.minutes.children('div').each(function (idx, div) {
				var el = $(div), val = el.data('minute');

				el[val === minute ? 'addClass' : 'removeClass']('active');
			});
		},

		setT : function (value) {
			var t = value.toUpperCase();
			this.selected.t = t;

			this.timepicker.timeHolder.am_pm.text(t);
			this.timepicker.clockHolder.am[t === 'AM' ? 'addClass' : 'removeClass']('active');
			this.timepicker.clockHolder.pm[t === 'PM' ? 'addClass' : 'removeClass']('active');
		},

		setTime: function (time) {
			this.time.hour = time.hour;
			this.time.minute = time.minute;
			this.time.t = time.t;
		},

		setValue : function (value) {
			var time = typeof value === 'string' ? this.parseTime(value, 'hh:mm t') : value;

			this.setTime(time);

			var formatted = this.getFormattedTime();

			this.input.val(formatted.time)
				.attr('value', formatted.time)
				.attr('data-time', formatted.value);
		},

		resetSelected : function () {
			this.setHour(this.time.hour);
			this.setMinute(this.time.minute);
			this.setT(this.time.t);
		},

		value: function () { return this.formatTime(this.config.valueFormat, this.time, this.config._24Hour) },

		getFormattedTime : function () {
			var hFormat = this.config.hPadding ? 'hh' : 'h',
				tFormat = this.config.lowerCase ? 't' : 'tt',
				time = this.formatTime(hFormat + ':mm ' + tFormat, this.time, false),
				tValue = this.formatTime(this.config.valueFormat, this.time, this.config._24Hour);

			return { time: time, value: tValue };
		},

		formatTime : function (format, time, _24Hour) {
			var hour = _24Hour && time.t.toLowerCase() === 'pm' ? (time.hour + 12) % 24 : time.hour;

			return $.trim(format.replace(/(hh|h|mm|ss|tt|t)/gi, function (e) { 
				switch(e.toLowerCase()){
					case 'h': return hour;
					case 'hh': return (hour < 10 ? '0' + hour : hour);
					case 'mm': return (time.minute < 10 ? '0' + time.minute : time.minute);
					case 'ss': return '00';
					case 't': return _24Hour ? '' : time.t.toLowerCase();
					case 'tt': return _24Hour ? '' : time.t.toUpperCase();
				}
			}));
		},

		parseTime : function (time, tFormat) {
			var that = this, format = typeof tFormat === 'undefined' ? that.config.valueFormat : tFormat,
				hLength = (format.match(/h/g) || []).length, mLength = (format.match(/m/g) || []).length, tLength = (format.match(/t/g) || []).length,
				hNoPadding = hLength === 1, timeLength = time.length,
				fH = format.indexOf('h'), lH = format.lastIndexOf('h'),
				fM = format.indexOf('m'), lM = format.lastIndexOf('m'),
				fT = format.indexOf('t'),
				hour = '', min = '', t = '';

			// Parse hour
			if (!hNoPadding) {
				hour = time.substr(fH, mLength);
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

			// Parse minute
			var prevM = format.substring(fM - 1, fM), nextM = format.substring(lM + 1, lM + 2);

			if (lM === format.length - 1) {
				min = time.substring(time.indexOf(prevM, fM - 1) + 1, timeLength);
			} else if (fM === 0) {
				min = time.substring(0, time.indexOf(nextM, fM));
			} else {
				min = time.substring(time.indexOf(prevM, fM - 1) + 1, time.indexOf(nextM, fM + 1));
			}

			// Parse t (am/pm)
			t = time.substr(fT, 2);

			return { hour: parseInt(hour), minute: parseInt(min), t : that.config.lowerCase ? t.toLowerCase() : t.toUpperCase() };
		},

		switchView : function (view) {
			var that = this, picker = this.timepicker, anim_speed = 350;

			if (view !== 'hours' && view !== 'minutes') return;

			that.activeView = view;

			picker.timeHolder.hour[view === 'hours' ? 'addClass' : 'removeClass']('active');
			picker.timeHolder.minute[view === 'hours' ? 'removeClass' : 'addClass']('active');

			picker.clockHolder.clock.hours.addClass('animate');
			if (view === 'hours') picker.clockHolder.clock.hours.removeClass('hidden');

			clearTimeout(that.hTimeout);

			that.hTimeout = setTimeout(function() {
				if (view !== 'hours') picker.clockHolder.clock.hours.addClass('hidden');
				picker.clockHolder.clock.hours.removeClass('animate');
			}, view === 'hours' ? 20 : anim_speed);

			picker.clockHolder.clock.minutes.addClass('animate');
			if (view === 'minutes') picker.clockHolder.clock.minutes.removeClass('hidden');

			clearTimeout(that.mTimeout);

			that.mTimeout = setTimeout(function() {
				if (view !== 'minutes') picker.clockHolder.clock.minutes.addClass('hidden');
				picker.clockHolder.clock.minutes.removeClass('animate');
			}, view === 'minutes' ? 20 : anim_speed);
		},

		show : function () {
			var that = this;

			if (that.input.val() === '') {
				var now = new Date(), h = now.getHours() % 12, m = now.getMinutes(), t = now.getHours() > 12 ? 'PM' : 'AM';

				that.setTime({ hour: h, minute: m, t: t });
			}

			that.resetSelected();

			$('body').attr('mdtimepicker-display', 'one');

			that.timepicker.wrapper.addClass('animate');
			that.timepicker.overlay.removeClass('hidden').addClass('animate');
			setTimeout(function() {
				that.timepicker.overlay.removeClass('animate');
				that.timepicker.wrapper.removeClass('animate');

				that.visible = true;
				that.input.blur();
			}, 10);
		},

		hide : function () {
			var that = this;

			that.timepicker.overlay.addClass('animate');
			that.timepicker.wrapper.addClass('animate');
			setTimeout(function() {
				that.switchView('hours');
				that.timepicker.overlay.addClass('hidden').removeClass('animate');
				that.timepicker.wrapper.removeClass('animate');

				$('body').removeAttr('mdtimepicker-display');

				that.visible = false;
				that.input.focus();
			}, 300);
		}
	};

	$.fn.mdtimepicker = function (config) {
		return $(this).each(function (idx, el) {
			var that = this,
				$that = $(this),
				picker = $(this).data(MDTP_DATA);
				options = $.extend({}, $.fn.mdtimepicker.defaults, $that.data(), typeof config === 'object' && config);

			if (!picker) {
				$that.data(MDTP_DATA, (picker = new MDTimePicker(that, options)));
			}
			if(typeof config === 'string') picker[config]();

			$(document).on('keydown', function (e) {
				if(e.keyCode !== 27) return;

				if (picker.visible) picker.hide();
			});
		});
	}

	$.fn.mdtimepicker.defaults = {
		_24Hour: false,				// determines if value format is 24-hour
		valueFormat: 'hh:mm tt',	// string format of the time value (data-time attribute); different from display value
		theme: 'blue',				// theme of the timepicker
		readOnly: true,				// determines if input is readonly
		lowerCase: true,			// determines if display value is in lowercase (i.e. 5:30 pm)
		hPadding: false				// determines if display value has zero padding for hour value less than 10 (i.e. 05:30 PM)
	};
}(jQuery);