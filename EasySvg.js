/***/
// EasySvg.js
// - make svg item easily 
function Svg(attr) {
  this.svg = this.item(null, attr);
  this.svg.style.position = 'absolute';
  this.svg.style.top = 0, this.svg.style.left = 0;
}

(function() {

  var NS = {
    SVG: 'http://www.w3.org/2000/svg',
    XLINK: 'http://www.w3.org/1999/xlink'
  };
  var SvgProtos = {
    appendTo: appendTo,
    item: item,
    line: normal('line'),
    rect: normal('rect'),
    circle: normal('circle'),
    ellipse: normal('ellipse'),
    text: text,
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

  function appendTo($dom) {
    (typeof $ == 'function' && $dom instanceof $ ? $dom.get(0): $dom)
        .appendChild(this.svg);
  }

  function normal(type) {
    return function(attr) {
      var item = this.item(type, attr);
      return this.svg.appendChild(item), item;
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
})();
