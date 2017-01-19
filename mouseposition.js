// formats DD to DMS
L.NumberFormatter = {
  toDMS: function(deg) {
    var d = Math.floor(Math.abs(deg));
    var minfloat = (Math.abs(deg) - d) * 60;
    var m = Math.floor(minfloat);
    var secfloat = (minfloat - m) * 60;
    var s = Math.round(secfloat);
    if (s == 60) {
      m++;
      s = "00";
    }
    if (m == 60) {
      d++;
      m = "00";
    }
    if (s < 10) {
      s = "0" + s;
    }
    if (m < 10) {
      m = "0" + m;
    }
    return ("" + d + "&deg; " + m + "' " + s + "''");
  }
};

L.Control.MousePosition = L.Control.extend({

  onAdd: function(map) {
    this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
    L.DomEvent.disableClickPropagation(this._container);
    map.on('mousemove', this._onMouseMove, this);
    this._container.innerHTML = this.options.emptyString;
	L.DomEvent.addListener(this._container, 'click', this._toggle, this);
    return this._container;
  },

  onRemove: function(map) {
    map.off('mousemove', this._onMouseMove)
  },

  _onMouseMove: function(e) {
	this.lastE = e;
    var lng = this.options.DMS ? L.NumberFormatter.toDMS(e.latlng.lng) : L.Util.formatNum(e.latlng.lng, this.options.numDigits);
    var lat = this.options.DMS ? L.NumberFormatter.toDMS(e.latlng.lat) : L.Util.formatNum(e.latlng.lat, this.options.numDigits);
    var NorS = (e.latlng.lat > 0) ? 'N' : 'S';
    var EorW = (e.latlng.lng > 0) ? 'E' : 'W';
    var value = this.options.lngFirst ? lng + EorW + ' , ' + lat + NorS : lat + NorS + ' , ' + lng + EorW;
    this._container.innerHTML = value;
  },

  initialize: function(options) {
    L.Util.setOptions(this, options);
  },

 _toggle: function() {
	this.options.DMS = !this.options.DMS;
  	this._onMouseMove(this.lastE);

	}
});
