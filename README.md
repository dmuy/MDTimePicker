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
$(document).ready(function(){
  $('#timepicker').mdtimepicker(); //Initializes the time picker
});
```

### CDN
Use the following if you don't want to host the `js` and `css` files:
```
https://cdn.jsdelivr.net/gh/dmuy/MDTimePicker/mdtimepicker.css
https://cdn.jsdelivr.net/gh/dmuy/MDTimePicker/mdtimepicker.js
```
Minified version:
```
https://cdn.jsdelivr.net/gh/dmuy/MDTimePicker/mdtimepicker.min.css
https://cdn.jsdelivr.net/gh/dmuy/MDTimePicker/mdtimepicker.min.css
```

[Learn more about the CDN](https://www.jsdelivr.com/features#gh)

### Remember
Comment or remove the line shown below in the css file if you already have a link to the Roboto font.
```css
@import url('https://fonts.googleapis.com/css?family=Roboto');
```

## Options
Default time picker configurations.
```javascript
{
    timeFormat: 'hh:mm:ss.000', // format of the time value (data-time attribute)
    format: 'h:mm tt',    // format of the input value
    theme: 'blue',        // theme of the timepicker
    readOnly: true,       // determines if input is readonly
    hourPadding: false    // determines if display value has zero padding for hour value less than 10 (i.e. 05:30 PM); 24-hour format has padding by default
}
```

## Formatting

| Variable      | Code         | Output  |
| ------------- |--------------|---------|
| Hour          | `h`          | 12-hour format, no zero padding; you can add zero padding for hours less than 10 by setting the option `hourPadding` to `true` |
|               | `hh`         | 24-hour format |
| Minute        | `mm`         | 30      |
| AM/PM         | `t`          | am      |
|               | `tt`         | AM      |

The default value of the `format` option is `h:mm tt`. You can specify the format you want by adding a parameter on initialization:
```javascript
$('#timepicker').mdtimepicker({format: 'hh:mm'}); //Initializes the time picker and uses the specified format (i.e. 23:30)
```

## Event
The event `timechanged` is fired after selection of time (after OK button is clicked).
You can use this to get the new time value:
```javascript
$('#timepicker').mdtimepicker().on('timechanged', function(e){
  console.log(e.value); // gets the input value
  console.log(e.time);  // gets the data-time value
});
```

## Themes
You can specify the color theme of the time picker by adding `theme` option upon initialization:
```javascript
$('#timepicker').mdtimepicker({theme: 'green'});
```
Predefined themes are: `red`,`blue` *(default)*, `green`, `purple`, `indigo` and `teal`.
If you don't specify the theme to use or specify a theme which isn't there, the default theme will be used.