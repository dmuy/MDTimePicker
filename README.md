MDTimePicker
========

Material concept time picker jquery plugin.

**[DEMO](https://dmuy.github.io/timepicker/)**

![alt text](https://lh3.googleusercontent.com/OOnJBzhy26yXtuiw8Lo5ftRhSv4Fnbra5Ss53s2YuQ-tY6vCbwKkKCASWLbFcVKK4S1e5vRFVvNoz6hdcVTTeYrjjdTU5oeqOLaFjRBTTgst50KPDeJK3-HHxeJl_5dNCx3J71IsE_hjkUHwT9hjywmXWgCWFdrjDhuZnU3XsXXsjBofMugQiyQ-HozCgbFVytl4G-lxv-BvSrJcSVIh-6NFo7ycxWX4XClBCfBzGk05HdiH3uKDMjZPR59X3qo28Kty2tl5XnFsNTla2Ipt6DR2d9YT3YLogN-5ltUVURqTq0_5fntF_AC8X8LDc6qXpr-dE-zq4cDxI6uNGDRk0ZWFWbiyHADE1XLbIkuK6N6w8cYTw__z0LWxARbz65tuWe0VRgDJSb0_IhX51hd9kBn0xGpFNVUmSyjCniD43lsx50lZyvGNMHB-cOGwYoJRNQcFcqdOx7aN9RsK4lP34BhxygBUFwQi3ns_ZVlTb5x1iygXJZNej2KQqorOoxmGKgiy724S_JZ0DpICAwz-SoJmQXgvoNtThtUP1E8M4j6SLfO5EUzHP70o1dLJjd7fWNlEQ-9ztHciXcUcQ8nPTFwZZlx09Mb1Icewx_YvCnEMu8vliuF2=w390-h470-no "TimePicker: Hour")
![alt text](https://lh3.googleusercontent.com/HIuOZKI4vuXuyp1OlvyAyC_CndIv_A1Q3PQLmAuD84kxTrFVwErEh6a2S0sZaivPb6v9csZUBztI3-O64AcdUqkcRSN7gn7MWyo6rAX0xbQ-5W-frFSxvkUIwJhcooItWMlgWY4AWbfuaRZgIJkM0LNySCbbBPLcFfzwoIzvPkMnA-ED0Y5wkjiH0csYeYwt-xedkS3jvPAKGcId-eJNUOE-3NmMFM2FTYtjvLDXi_FbZejN7cSFT69WDaTSQ8G2LzlOZEifGRD8FMNEisBoeQ9vBLMr-ewIpoCDIkE32tnqHbCpSwaXpXm_EyU1npATloYmslscB4M_9MPrDMuNxJ7R6-h5ZshH6TC0QIN8tg58pJ_kQLh_ANWqrrZztvXWLFGeQwQWalMmV7xkZlJJkjK9pUCJcDCGV3L_1EX10b_jiznqTQkbf7tLFdikNihF4M7WodiufhfbR1D4UCxl9zakSmEKPymoNvbl30d4GREVrvYPMceAtL3pekXJZSpQ_2PvaqzCgC64n-gDDhA5mVNxHxsCQj2aad6REkHdFEYh25xr85Nmz6tAVzWocDCiSQblInBSwV3IhgSbu6MI4OZTMyqcXwaZPlkKfGHdxLOgY6Stwjq9=w390-h470-no "TimePicker: Minute")

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
https://cdn.jsdelivr.net/gh/dmuy/MDTimePicker@1.0/mdtimepicker.css
https://cdn.jsdelivr.net/gh/dmuy/MDTimePicker@1.0/mdtimepicker.js
```
Minified version:
```
https://cdn.jsdelivr.net/gh/dmuy/MDTimePicker@1.0/mdtimepicker.min.css
https://cdn.jsdelivr.net/gh/dmuy/MDTimePicker@1.0/mdtimepicker.min.css
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
| Hour          | `h`          | 12-hour format, no zero padding; you can add zero padding for hours less than 10 by setting the option `hourPadding` to `true`  |
|               | `hh`         | 24-hour format |
| Minute        | `mm          | 30      |
| AM/PM         | `t`          | am      |
|               | `tt`         | AM      |

The default value of the `format` option is `h:mm tt`. You can specify the format you want by adding a parameter on initialization:
```javascript
<script>
  $(document).ready(function(){
    $('#timepicker').mdtimepicker({format: 'hh:mm'}); //Initializes the time picker and uses the specified format (i.e. 23:30)
  });
</script>
```

## Event
The event `timechanged` is fired after selection of time (after OK button is clicked).
You can use this to get the new time value:
```javascript
<script>
  $(document).ready(function(){
    $('#timepicker').mdtimepicker().on('timechanged', function(e){
      console.log(e.value); // gets the input value
      console.log(e.time);  // gets the data-time value
    });
  });
</script>
```

## Themes
You can specify the color theme of the time picker by adding `theme` option upon initialization:
```javascript
<script>
  $(document).ready(function(){
    $('#timepicker').mdtimepicker({theme: 'green'});
  });
</script>
```
Predefined themes are: `red`,`blue` *(default)*, `green`, `purple`, `indigo` and `teal`.
If you don't specify the theme to use or specify a theme which isn't there, the default theme will be used.
