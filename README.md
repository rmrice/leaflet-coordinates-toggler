# leaflet-coordinates-toggler
Update coordinates on leaflet map upon mousemove and toggle between degrees minutes seconds and decimal degrees.

### Demo here:
http://jsfiddle.net/rrrrrice/h9ua1y4b/13/

### How to use:
Customize from the index.html or add this to your existing code:
```
	var mousePosition =  new L.Control.MousePosition({
	    position: 'bottomright',
	    emptyString: '',
	    lngFirst: false,
	    DMS: true,
	    numDigits: 5
	  });

	mousePosition.addTo(map);
  ```

This is based off https://github.com/ardhi/Leaflet.MousePosition/. I just simplified the code a bit and added the toggle between DMS and DD.
