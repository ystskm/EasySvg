/***/
// EasySvg.js
// - make svg item easily 
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

  function item(type, attr) {
    var item = document.createElementNS(NS.SVG, type || 'svg');
    if(attr)
      for( var k in attr)
        item.setAttribute(k, attr[k]);
    return item;
  }

  function appendItem(type, attr, parent) {
    return normal(type).call(this, attr, parent);
  }

  function appendTo($dom) {
    (typeof $ == 'function' && $dom instanceof $ ? $dom.get(0): $dom)
        .appendChild(this.svg);
  }

  function hasClass(sel, cls) {
    var _this = $(this.svg).find(sel).get(0);
    return !!(_this && _classList(_this)[cls]);
  }

  function addClass(sel, cls) {
    $(this.svg).find(sel).each(function() {
      var clsls = _classList(this);
      cls.split(' ').forEach(function(cls) {
        clsls[cls] = true;
      });
      this.setAttribute('class', Object.keys(clsls).join(' '));
    });
  }

  function removeClass(sel, cls) {
    $(this.svg).find(sel).each(function() {
      var clsls = _classList(this);
      cls.split(' ').forEach(function(cls) {
        delete clsls[cls];
      });
      this.setAttribute('class', Object.keys(clsls).join(' '));
    });
  }

  function _classList(_this) {
    var clsls = {}, ga_cls = _this.getAttribute('class');
    ga_cls && ga_cls.split(' ').forEach(function(cls) {
      clsls[cls] = true;
    });
    return clsls;
  }

  function clear() {
    var svgNode = this.svg;
    while(svgNode.firstChild)
      svgNode.removeChild(svgNode.firstChild);
  }

  function normal(type) {
    return function(attr, parent) {
      var item = this.item(type, attr);
      return (parent || this.svg).appendChild(item), item;
    };
  }

  function text(t, attr) {
    var item = this.item('text', attr);
    item.textContent = t;
    return this.svg.appendChild(item), item;
  }

  function image(href, attr) {
    var item = this.item('image', attr);
    item.setAttributeNS(NS.XLINK, 'xlink:href', href);
    return this.svg.appendChild(item), item;
  }

  function use(href, attr) {
    var item = this.item('use', attr);
    item.setAttributeNS(NS.XLINK, 'xlink:href', href);
    return this.svg.appendChild(item), item;
  }

})(window, window.jQuery);
