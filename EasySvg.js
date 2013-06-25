/***/
// EasySvg.js
// - make svg item easily with jQuery
function Svg(attr) {
  this.svg = this.item(null, attr);
  this.svg.style.position = 'absolute';
  this.svg.style.top = 0, this.svg.style.left = 0;
}

(function(window, $) {

  var NS = {
    SVG: 'http://www.w3.org/2000/svg',
    XLINK: 'http://www.w3.org/1999/xlink'
  };
  var SvgProtos = {
    attr: attr,
    removeAttr: removeAttr,
    find: find,
    appendTo: appendTo,
    appendItem: appendItem,
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    clear: clear,
    item: item,
    line: normal('line'),
    rect: normal('rect'),
    circle: normal('circle'),
    ellipse: normal('ellipse'),
    text: text,
    use: use,
    image: image
  };
  for( var i in SvgProtos)
    Svg.prototype[i] = SvgProtos[i];

  function attr(k, v, $targ) {
    if(v && typeof v == 'object')
      $targ = v, v = null;
    var item = retrieve($targ, this);
    if(typeof k == 'string' && v == null)
      return item.getAttribute(k);
    var attrs = {};
    if(typeof k == 'string')
      attrs[k] = v;
    else
      attrs = k;
    for( var i in attrs)
      if(typeof attrs[i] == 'string')
        item.setAttribute(i, attrs[i]);
      else
        item.removeAttribute(i);
  }

  function removeAttr(k, $targ) {
    var item = retrieve($targ, this);
    [].concat(k).forEach(function(k) {
      item.removeAttribute(k);
    });
  }

  function find(sel, $targ) {
    return $(retrieve($targ, this)).find(sel);
  }

  function item(type, attr) {
    var item = document.createElementNS(NS.SVG, type || 'svg');
    if(attr)
      for( var k in attr)
        item.setAttribute(k, attr[k]);
    return item;
  }

  function appendItem(type, attr, $parent) {
    return normal(type).call(this, attr, $parent);
  }

  function appendTo($wrap) {
    ($wrap.get && $wrap.get(0) || $wrap).appendChild(this.svg);
  }

  function hasClass(sel, cls) {
    var item = this.find(sel).get(0);
    return !!(item && _classList(item)[cls]);
  }

  function addClass(sel, cls) {
    this.find(sel).each(function() {
      var clsls = _classList(this);
      cls.split(' ').forEach(function(cls) {
        clsls[cls] = true;
      });
      this.setAttribute('class', Object.keys(clsls).join(' '));
    });
  }

  function removeClass(sel, cls) {
    this.find(sel).each(function() {
      var clsls = _classList(this);
      cls.split(' ').forEach(function(cls) {
        delete clsls[cls];
      });
      this.setAttribute('class', Object.keys(clsls).join(' '));
    });
  }

  function _classList(item) {
    var clsls = {}, ga_cls = item.getAttribute('class');
    ga_cls && ga_cls.split(' ').forEach(function(cls) {
      clsls[cls] = true;
    });
    return clsls;
  }

  function clear($parent) {
    var svgNode = retrieve($parent, this);
    while(svgNode.firstChild)
      svgNode.removeChild(svgNode.firstChild);
  }

  function normal(type) {
    return function(attr, $parent) {
      var item = this.item(type, attr);
      return retrieve($parent, this).appendChild(item), item;
    };
  }

  function text(t, attr, $parent) {
    var item = this.item('text', attr);
    item.textContent = t;
    return retrieve($parent, this).appendChild(item), item;
  }

  function image(href, attr, $parent) {
    var item = this.item('image', attr);
    item.setAttributeNS(NS.XLINK, 'xlink:href', href);
    return retrieve($parent, this).appendChild(item), item;
  }

  function use(href, attr, $parent) {
    var item = this.item('use', attr);
    item.setAttributeNS(NS.XLINK, 'xlink:href', href);
    return retrieve($parent, this).appendChild(item), item;
  }

  function retrieve($parent, inst) {
    return $parent ? ($parent.get && $parent.get(0) || $parent): inst.svg;
  }

})(window, window.jQuery);
