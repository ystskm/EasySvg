#:: EasySvg ::

##Abstract
#### Make [SVG](http://www.w3.org/Graphics/SVG/) elements easily.

##Prepare for use
in &lt;head&gt;

	<script type="text/javascript" src="/EasySvg/EasySvg.js"></script>

##Usage
__create SVG canvas__

	var c = new SVG(300, 300)
in this case, a 300px x 300px canvas is made.

__draw line__

	c.line({x1:100, y1:100, x2:200 , y2:200})
attributes could be drawn by object-formatted.
in this case, a part of diagonal line will be drawn

__draw text__

	c.text('TEST WRITE', {x:150 ,y:150})
