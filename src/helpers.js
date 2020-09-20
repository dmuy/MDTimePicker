/**
 * Helper functions
 */
export const hf = {
    /**
     * Appends element(s) to parent
     * @param {Element|Element[]} elem Element(s) to append to parent
     * @param {Element} to Parent element
     */
    appendTo: function (elem, to, idx) {
        if (Array.isArray(elem)) {
            elem.forEach(function (el) {
                if (idx === 0) to.insertBefore(el, to.childNodes[idx] || null)
                else to.appendChild(el)
            })
        } else {
            if (idx === 0) to.insertBefore(elem, to.childNodes[idx] || null)
            else to.appendChild(elem)
        }
    },
    /**
     * Adds event listener to element(s)
     * @param {Element|Element[]} elem Element(s) to add event
     * @param {string} event Event name
     * @param {Function} handler Event handler
     */
    addEvent: function (elem, event, handler) {
        function listenEvent(el, evt, fn) {
            el.addEventListener(evt, fn, false)
        }

        if (Array.isArray(elem)) {
            elem.forEach(function (e) {
                listenEvent(e, event, handler)
            })
        } else listenEvent(elem, event, handler)
    },
    /**
     * Removes event listener to element(s)
     * @param {Element|Element[]} elem Element(s) to remove event
     * @param {string} event Event name
     * @param {Function} handler Event handler
     */
    removeEvent: function (elem, event, handler) {
        function delEvent(el, evt, fn) {
            el.removeEventListener(evt, fn, false)
        }

        if (Array.isArray(elem)) {
            elem.forEach(function (e) { delEvent(e, event, handler) })
        } else delEvent(elem, event, handler)
    },
    /**
     * Removes child nodes
     * @param {Element} elem Html element to empty
     */
    empty: function (elem) {
        while (elem.firstChild) { elem.removeChild(elem.firstChild) }
    },
    /**
     * Creates an HTML element; `document.createElement` helper function
     * @see {@link http://jsfiddle.net/andr3ww/pvuzgfg6/13/}
     * @param {string} tag HTML tag name (i.e. `div`, `span`, `a`)
     * @param {Object} attributes Attribute object
     * @param {string|Element} content Element content: text or HTML element(s)
     * @param {Boolean} isHtml Determines if `content` specified should added as an html element
     */
    createElem: function (tag, attributes, content, isHtml) {
        var el = document.createElement(tag)

        if (typeof content !== 'undefined')
            el[isHtml || false ? 'innerHTML' : 'innerText'] = content

        if (typeof attributes !== 'undefined')
            hf.setAttributes(el, attributes)

        return el
    },
    /**
     * Sets the attribute(s) of the element
     * @param {Element} el Html element
     * @param {Object} attrs Attribute object
     */
    setAttributes: function (el, attrs) {
        for(var attr in attrs) { el.setAttribute(attr, attrs[attr]) }
    },
    /**
    * Vanilla JavaScript version of jQuery.extend()
    * @see {@link https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/}
    */
    extend: function () {
        // Variables
        var extended = {}
        var deep = false
        var i = 0
        var length = arguments.length

        // Check if a deep merge
        if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
            deep = arguments[0]
            i++
        }

        // Merge the object into the extended object
        var merge = function (obj) {
            for (var prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    // If deep merge and property is an object, merge properties
                    if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                        extended[prop] = hf.extend(true, extended[prop], obj[prop])
                    } else {
                        extended[prop] = obj[prop]
                    }
                }
            }
        }

        // Loop through each object and conduct a merge
        for (; i < length; i++) {
            var obj = arguments[i]
            merge(obj)
        }

        return extended
    },
    /**
     * Triggers the `change`, `onchange`, `datechanged` event on the specified input element
     * @param {HTMLInputElement} el HTML input element
     * @param {Object} data Event data
     */
    triggerChange: function (el, data) {
        el.dispatchEvent(new Event('change'))
        el.dispatchEvent(new Event('onchange'))

        function CustomEvent(data) {
            var changeEvt = document.createEvent('CustomEvent')

            changeEvt.initCustomEvent('datechanged', false, false)
            changeEvt.data = data

            return changeEvt
        }
        el.dispatchEvent(new CustomEvent(data))
    }
}