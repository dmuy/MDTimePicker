## Options
Default time picker configurations.
```javascript
{
    timeFormat: 'hh:mm:ss.000', // format of the time value (data-time attribute)
    format: 'h:mm tt',          // format of the input value
    theme: 'blue',              // theme of the timepicker
    hourPadding: false,         // determines if display value has zero padding for hour value less than 10 (i.e. 05:30 PM); 24-hour format has padding by default
    clearBtn: false,            // determines if clear button is visible
    is24hour: false             // determines if the clock will use 24-hour format in the UI; format config will be forced to `hh:mm` if not specified
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
$('#timepicker').mdtimepicker({format: 'hh:mm'}); //Initializes the time picker and uses the specified format (i.e. 23:30)
```
***Note: If `is24hour` configuration is set to `true`, `format` default will be `hh:mm`.***

## How to use
Make sure you include the jQuery library first.
Include `mdtimepicker.css` and `mdtimepicker.js` in your html file:
```html
<link rel="stylesheet" type="text/css" href="mdtimepicker.css">
<script type="text/javascript" src="mdtimepicker.js"></script>
```

Add a reference on your `input` element for later use:
```html
<input type="text" id="timepicker"/>
```

Then add this piece of code in your `script` tag:
```javascript
<script>
  $(document).ready(function(){
    $('#timepicker').mdtimepicker(); //Initializes the time picker
  });
</script>
```

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

### Using configurations
During initialization, you can also specify the configurations like min and max time.
```javascript
$('#timepicker').mdtimepicker({ theme: 'dark', clearBtn: true, minTime: '3:00 PM', maxTime: '11:00 PM' });
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
$('#timepicker').mdtimepicker('setValue', '3:00 PM');
```
`setMinTime` - Sets the minimum time selectable
```javascript
$('#timepicker').mdtimepicker('setMinTime', '1:00 PM');
```
`setMaxTime` - Sets the maximum time selectable
```javascript
$('#timepicker').mdtimepicker('setMaxTime', 'now');
```
`show` - Programmatically shows the time picker
```javascript
$('#timepicker').mdtimepicker('show');
```
`hide` - Programmatically hides the time picker
```javascript
$('#timepicker').mdtimepicker('hide');
```
`destroy` - Removes the time picker plugin
```javascript
$('#timepicker').mdtimepicker('destroy');
```

### Event
The event `timechanged` is fired after selection of time (after OK button is clicked).
You can use this to get the new time value:
```javascript
$('#timepicker').mdtimepicker().on('timechanged', function(e){
  console.log(e.value); // gets the input value
  console.log(e.time);  // gets the data-time value
});
```

### Remember
Comment or remove the line shown below in the css file if you already have a link to the Roboto font.
```css
@import url('https://fonts.googleapis.com/css?family=Roboto');
```

### Themes
You can specify the color theme of the time picker by adding `theme` option upon initialization:
```javascript
$('#timepicker').mdtimepicker({theme: 'green'});
```
Or by adding a data-theme attribute on the input element:
```javascript
<input type="text" id="timepicker" data-theme="dark"/>
```
***Note: If `data-theme` attribute is used, `theme` configuration will be overridden.***

Predefined themes are: `red`,`blue`, `green`, `purple`, `indigo`, `teal` and `dark`.
If you don't specify the theme to use or specify a theme which isn't there, the default theme will be used.