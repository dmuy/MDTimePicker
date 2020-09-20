MDTimePicker
========

Material design inspired time picker plugin.

**[DEMO](https://dmuy.github.io/MDTimePicker/)**

![alt text](https://i.imgur.com/M7Jb5H3.png "TimePicker: Hour")
![alt text](https://i.imgur.com/LmIkHoU.png "TimePicker: Minute")
![alt text](https://i.imgur.com/WyS2aHd.png "TimePicker: Dark")
![alt text](https://i.imgur.com/kNqqKMZ.png "TimePicker: 24-hour mode")

## Installation
### NPM
Install via npm:
```
npm i @dmuy/timepicker
```

Include in your app
```javascript
import '@dmuy/timepicker/dist/mdtimepicker.css'
import mdtimepicker from '@dmuy/timepicker'
```

[Older version (with jQuery dependency)](https://www.npmjs.com/package/@dmuy/jquery-timepicker)

### CDN
Use the following if you don't want to host the `js` and `css` files:
```
https://cdn.jsdelivr.net/gh/dmuy/MDTimePicker@{version}/mdtimepicker.css
https://cdn.jsdelivr.net/gh/dmuy/MDTimePicker@{version}/mdtimepicker.js
```
Minified version:
```
https://cdn.jsdelivr.net/gh/dmuy/MDTimePicker@{version}/mdtimepicker.min.css
https://cdn.jsdelivr.net/gh/dmuy/MDTimePicker@{version}/mdtimepicker.min.css
```
***Note: Replace `{version}` with the version you want to use.***

[Learn more about the CDN](https://www.jsdelivr.com/features#gh)

### Self Hosting
Copy `mdtimepicker.css` and `mdtimepicker.js` (or the minified versions `*.min.js` and `*.min.css`) in the `dist` folder and include in your app:
```html
<link rel="stylesheet" type="text/css" href="{path-to}/mdtimepicker.css">
<script type="text/javascript" src="{path-to}/mdtimepicker.js"></script>
```
***Note: Replace `{path-to}` with the absolute or relative path to where you copied the css and js files.***

## Options
Calling `mdtimepicker()` will initialize the time picker. If `selectors` is not provided, the plugin will look for input elements with the class `mdtimepicker-input`.
```javascript
mdtimepicker(
  [selectors],  // optional; input element selectors; input element; Array or NodeList of input elements
  [config],     // optional; time picker configurations
  [...params]   // optional; this is used when calling time picker built-in methods which requires parameters like 'setValue'
)
```

### Default configurations
```javascript
{
  timeFormat: 'hh:mm:ss.000', // format of the time value (data-time attribute)
  format: 'h:mm tt',          // format of the input value
  theme: 'blue',              // theme of the timepicker
  hourPadding: false,         // determines if display value has zero padding for hour value less than 10 (i.e. 05:30 PM); 24-hour format has padding by default
  clearBtn: false,            // determines if clear button is visible
  is24hour: false,            // determines if the clock will use 24-hour format in the UI; format config will be forced to `hh:mm` if not specified
  events: {
    timeChanged: null,    // Callback function on time selection
    ready: null,          // Callback function when time picker is initialized
    shown: null,          // Callback function when time picker is shown
    hidden: null          // Callback function when time picker is hidden
  }
}
```

#### Callback functions
```javascript
events: {
  /**
   * Callback function on time selection
   * Parameters: 
   *    data         - Object contains the data of the selected time.
   *      data.time  - Formatted time using `timeFormat`
   *      data.value - Formatted time using `format`; The same with the input value
   *    timepicker   - The time picker object instance
   */
  timeChanged(data, timepicker);

  /**
   * Callback function when time picker is initialized
   * Parameter:
   *     timepicker - The time picker object instance
   */
  ready(timepicker);

  /**
   * Callback function when time picker is shown
   */
  shown();
  
  /**
   * Callback function when time picker is hidden
   */
  hidden();
}
```

### Formatting

| Variable      | Code         | Output  |
| ------------- |--------------|---------|
| Hour          | `h`          | 12-hour format, no zero padding; you can add zero padding for hours less than 10 by setting the option `hourPadding` to `true`  |
|               | `hh`         | 24-hour format |
| Minute        | `mm`         | 30      |
| AM/PM         | `t`          | am      |
|               | `tt`         | AM      |

The default value of the `format` option is `h:mm tt`. You can specify the format you want by adding a parameter on initialization:
```javascript
//Initializes the time picker and uses the specified format (i.e. 23:30)
mdtimepicker('#timepicker', { format: 'hh:mm' });
```
***Note: If `is24hour` configuration is set to `true`, `format` default will be `hh:mm`.***

## Usage
Add this piece of code in your script:
```javascript
//Initializes a time picker for each input element with the class name '.mdtimepicker-input'
mdtimepicker();

//Initializes the time picker using the specified query selector
mdtimepicker('#timepicker');

//Initializes a time picker using then matched input element
mdtimepicker(document.querySelector('#timepicker'));

//Initializes a time picker for each mached input element
mdtimepicker(document.querySelectorAll('.timepicker'));
```

### Using configurations
During initialization, you can also specify the configurations like min and max time.
```javascript
mdtimepicker('#timepicker', { theme: 'dark', clearBtn: true, minTime: '3:00 PM', maxTime: '11:00 PM' });
```

### Min and Max
To specify the mininum and/or maximum time the user can select on othe time picker, just specify data-mintime and/or data-maxtime attributes on your input element
```html
<!-- sets minimum time to current client (system) time -->
<input type="text" id="timepicker" data-mintime="now"/>
<!-- sets minimum time to 3:00 PM -->
<input type="text" id="timepicker" data-mintime="3:00 PM"/>
```
Specify both the mininum and maximum time to create a specific time range acceptable:
```html
<!-- sets minimum to 1:00 AM and maximum to current client (system) time-->
<input type="text" id="timepicker" data-mintime="1:00 AM" data-maxtime="now"/>
```
Or specify `minTime` and/or `maxTime` in the initialization configurations as shown above.

### Usable built-in methods
Below are some built-in methods you can use (assuming the time picker is already initialized).

`setValue` - Sets the (selected) value
```javascript
mdtimepicker('#timepicker', 'setValue', '3:00 PM');
```
`setMinTime` - Sets the minimum time selectable
```javascript
mdtimepicker('#timepicker', 'setMinTime', '1:00 PM');
```
`setMaxTime` - Sets the maximum time selectable
```javascript
mdtimepicker('#timepicker', 'setMaxTime', 'now');
```
`show` - Programmatically shows the time picker
```javascript
mdtimepicker('#timepicker', 'show');
```
`hide` - Programmatically hides the time picker
```javascript
mdtimepicker('#timepicker', 'hide');
```
`destroy` - Removes the time picker plugin
```javascript
mdtimepicker('#timepicker', 'destroy');
```

### Event
The event `timechanged` is fired after selection of time (after OK button is clicked).
You can use this to get the new time value:
```javascript
mdtimepicker('#timepicker');
document.querySelector('#timepicker').addEventListener('timechanged', function(e){
  console.log(e.value); // gets the input value
  console.log(e.time);  // gets the data-time value
});
```

Or you can use the `events.timeChanged` callback configuration to catch the time selection changes.

### Themes
You can specify the color theme of the time picker by adding `theme` option upon initialization:
```javascript
mdtimepicker('#timepicker', { theme: 'green' });
```
Or by adding a data-theme attribute on the input element:
```javascript
<input type="text" id="timepicker" data-theme="dark"/>
```
***Note: If `data-theme` attribute is used, `theme` configuration will be overridden.***

Predefined themes are: `red`,`blue`, `green`, `purple`, `indigo`, `teal` and `dark`.
If you don't specify the theme, the default theme (`blue`) will be used.

#### Custom theme
If you want to customize the theme, just use the `src/themes/_format.scss` file and change the following:
```scss
$theme: 'yellow';  // theme name
$color: #F9A825;   // theme color
```
Then compile it using any sass compiler. Or if you are using this project, just run the npm scripts `compile-theme-css` and `minify-theme-css` (for a compressed version).

If you prefer editing a `css` file, you can edit the `dist/mdtimepicker-theme.css` file.

### Remember
Comment or remove the line shown below in the css file if you already have a link to the Roboto font.
```css
@import url('https://fonts.googleapis.com/css?family=Roboto');
```