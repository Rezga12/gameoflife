(window.webpackJsonpuntitled=window.webpackJsonpuntitled||[]).push([[0],{14:function(e,t,a){},8:function(e,t,a){e.exports=a(9)},9:function(e,t,a){"use strict";a.r(t);var i=a(1),s=a(2),n=a(4),r=a(3),l=a(5),c=a(0),h=a.n(c),o=a(7),u=a.n(o),d=(a(14),function(e){function t(e){return Object(i.a)(this,t),Object(n.a)(this,Object(r.a)(t).call(this,e))}return Object(l.a)(t,e),Object(s.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){return e.size!==this.props.size||this.props.className!==e.className}},{key:"render",value:function(){var e={width:this.props.size,height:this.props.size};return h.a.createElement("div",{className:this.props.className,style:e,onClick:this.props.onClick})}}]),t}(h.a.Component)),m=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(n.a)(this,Object(r.a)(t).call(this,e))).handleStartClick=function(){a.setState({cells:a.state.cells,intervalID:setInterval(function(){return window.requestAnimationFrame(function(){return a.timeStep()})},100),isGenerating:!0})},a.handleStopClick=function(){-1!==a.state.intervalID&&(clearInterval(a.state.intervalID),a.setState({cells:a.state.cells,intervalID:-1,isGenerating:!1}))},a.state={cells:new Array(a.props.width*a.props.height).fill(0),intervalID:-1,isGenerating:!1,width:e.width,height:e.height},a}return Object(l.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){for(var e=this,t=Math.floor(this.props.pxWidth/this.state.width),a=[],i=function(i){for(var s=function(s){var n=void 0;n=s===e.state.height-1&&i===e.state.width-1?"cell":s===e.state.width-1?"cell border-bottom":i===e.state.height-1?"cell border-right":"cell border-bottom border-right",1===e.state.cells[e.state.width*i+s]?n+=" selected-color-early":2===e.state.cells[e.state.width*i+s]&&(n+=" selected-color"),a.push(h.a.createElement(d,{key:i+" "+s,className:n,size:t,onClick:function(){return e.handleClick(i,s)}}))},n=0;n<e.state.width;n++)s(n)},s=0;s<this.state.height;s++)i(s);var n,r,l={width:"".concat(t*this.state.width,"px"),height:"".concat(t*this.state.width,"px")};return this.state.isGenerating?(n="disabled-button",r="button"):(n="button",r="disabled-button"),h.a.createElement("div",{className:"container-main"},h.a.createElement("div",{className:"container",style:l},a),h.a.createElement("div",{className:"interface"},h.a.createElement("div",{className:"count-container"},h.a.createElement("div",{className:"label"},"Generations:"),h.a.createElement("div",{className:"label"},"live Cells:")),h.a.createElement("div",{className:"button-container"},h.a.createElement("div",{className:n,onClick:this.handleStartClick},"Start"),h.a.createElement("div",{className:r,onClick:this.handleStopClick},"Stop")),h.a.createElement("div",{className:"button-container"},h.a.createElement("div",{className:"button"},"Clear")),h.a.createElement("div",{className:"button-container"},h.a.createElement("div",{className:"button"},"Randomize")),h.a.createElement("div",{className:"slider-container"},h.a.createElement("div",{className:"label"},"Speed: "),h.a.createElement(v,{value:40,trackWidth:200,thumbWidth:10,onValueChanged:function(){}})),h.a.createElement("div",{className:"slider-container"},h.a.createElement("div",{className:"label"},"Size: "),h.a.createElement(v,{value:40,trackWidth:200,thumbWidth:10,onValueChanged:function(t){return e.handleValueChanged(t)}})),h.a.createElement("div",{className:"checkbox-container"},h.a.createElement("div",{className:"label"},"borders: "),h.a.createElement("input",{className:"checkbox",type:"checkbox"}))))}},{key:"handleValueChanged",value:function(e){var t=Math.round(20+e/5);this.setState({cells:new Array(t*t).fill(0),width:t,height:t})}},{key:"handleClick",value:function(e,t){var a=this.state.cells.slice();a[this.state.width*e+t]=(a[this.state.width*e+t]+1)%2,this.setState({cells:a})}},{key:"timeStep",value:function(){for(var e=this.state.cells.slice(),t=0;t<this.state.height;t++)for(var a=0;a<this.state.width;a++){var i=this.countNeighbours(t,a);this.getArrayByIndex(t,a)>0?e[this.state.width*t+a]=3===i||2===i?2:0:3===i&&(e[this.state.width*t+a]=1)}this.setState({cells:e})}},{key:"getArrayByIndex",value:function(e,t){return e<0?e=this.state.height+e:e>=this.state.height&&(e-=this.state.height),t<0?t=this.state.width+t:t>=this.state.width&&(t-=this.state.width),this.state.cells[this.state.width*e+t]}},{key:"countNeighbours",value:function(e,t){for(var a=[-1,-1,1,1,1,-1,0,0],i=[1,-1,1,0,-1,0,1,-1],s=0,n=0;n<8;n++)this.getArrayByIndex(e+a[n],t+i[n])>0&&s++;return s}}]),t}(h.a.Component),v=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(n.a)(this,Object(r.a)(t).call(this,e))).state={value:a.props.value,progress:a.props.trackWidth/100*a.props.value,isDragging:!1,prevX:-1},a.props.onValueChanged(a.props.value),a}return Object(l.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;document.addEventListener("mousemove",function(t){return e.handleMouseMove(t)}),document.addEventListener("mouseup",function(t){return e.handleThumbUp(t)})}},{key:"componentWillUnmount",value:function(){var e=this;document.removeEventListener("mousemove",function(t){return e.handleMouseMove(t)}),document.removeEventListener("mouseup",function(t){return e.handleThumbUp(t)})}},{key:"render",value:function(){var e=this,t=this.state.progress-this.props.thumbWidth/2-1,a=t<0?0:t,i="thumb";return this.state.isDragging&&(i+=" big-focus"),h.a.createElement("div",{className:"track",style:{width:this.props.trackWidth}},h.a.createElement("div",{className:i,style:{left:"".concat(t,"px"),width:this.props.thumbWidth},onMouseDown:function(t){return e.handleThumbDown(t)}}),h.a.createElement("div",{className:"fill",style:{width:"".concat(a,"px")}}))}},{key:"handleThumbDown",value:function(e){this.setState({value:this.state.value,isDragging:!0,prevX:e.clientX})}},{key:"handleThumbUp",value:function(){this.setState({value:this.state.value,isDragging:!1,prevX:-1})}},{key:"handleMouseMove",value:function(e){if(this.state.isDragging){var t=e.clientX-this.state.prevX,a=this.state.progress+t;a>this.props.trackWidth&&(a=this.props.trackWidth),a<0&&(a=0);var i=a/this.props.trackWidth*100;i!==this.state.value&&this.props.onValueChanged(i),this.setState({value:i,progress:a,isDragging:!0,prevX:e.clientX})}}}]),t}(h.a.Component);u.a.render(h.a.createElement(m,{width:50,height:50,pxWidth:500,pxHeight:500}),document.getElementById("root"))}},[[8,1,2]]]);
//# sourceMappingURL=main.e52073f6.chunk.js.map