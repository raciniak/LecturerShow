(function(){
	var polozenieY=0;
    function each(fn, arr) {
        var i = arr.length;
        while(i--) {
            fn(arr[i]);
        }
    }

    function filter(fn, arr) {
        for(var ret = [], i = 0; i < arr.length; i++) {
            if (fn(arr[i])) {
                ret.push(arr[i]);
            }
        }
        return ret;
    }

    function reduceRight(fn, seed, arr) {
        each(function(item) {
            seed = fn(seed, item);
        }, arr);
        return seed;
    }

    function partial(fn/*, ...args*/) {
        var args = Array.prototype.slice.call(arguments, 1);
       return function() {
           return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
       }
    }

    function compose(/*...fns*/) {
        var fns = arguments;
        return function() {
            return reduceRight(function (arg, fn) { return fn(arg); }, arguments[0], fns);
        };
    }

    function invoke(fn) {
        return fn.apply(this, arguments);
    }

    function findInput(name, range) {
        return range.querySelector ?
            range.querySelector('input[name="' + name + '"]') :
            filter(function(el) {
                return el.tagName === 'INPUT' && el.getAttribute('name') === name;
            }, range.children)[0];
    }

    function findSlider(name, range) {
        return range.querySelector ?
            range.querySelector('.slider[data-name="' + name + '"]') :
            filter(function(el) {
                return hasClass('slider', el) && el.getAttribute('data-name') === name;
            }, range.children)[0];
    }

    function createInput(name, value, range) {
        var input = document.createElement('input'); 
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', name);
        input.setAttribute('value', value);
        range.appendChild(input);
        return input;
    }

    function createSlider(name, value, range) {
    	var timee;
        var slider = document.createElement('div');
        slider.className = 'slider draggable';
        timee = upConversionTimes(value);
        slider.innerHTML = "<div class='underSlider'><img src='movies/movie1/images/"+name+".png' width='140' height='70' alt='"+name+"'/><p id='movetime"+name+"' class='timeSlider'>"+timee+"</p></div>";
        if("PoczatekFilmu"===name || "KoniecFilmu"===name)
        {
        	slider.className = 'slider MovieTime';
        	slider.innerHTML = "<div class='underSliderTime'><b>"+name+"</b><p id='movetime"+name+"'>"+timee+"</p></div>";
        }
        slider.setAttribute('data-name', name);
        slider.setAttribute('data-value', value);
        slider.setAttribute('tabindex', 0);
        range.appendChild(slider);
        return slider;
    }
    
    //  Konwersja czasów podanych w sekundach na czas w postaci 00:00:00 do wyświetlania
    function upConversionTimes(times)
	{
		var sek, min, hour, timee;
		hour=Math.floor(times/3600);
		timee=times%3600;
		min=Math.floor(timee/60);
		sek=timee%60;
		if(hour<10)
		{
			hour='0'+hour;
		}
		if(min<10)
		{
			min='0'+min;
		}
		if(sek<10)
		{
			sek='0'+sek;
		}
		times=hour+':'+min+':'+sek;
		return times;
	}

    function getSliders(root) {
        return root.querySelectorAll ?
            root.querySelectorAll('.range > .slider') :
            filter(isSlider, root.getElementsByClassName('slider'));
    }

    function getSliderInputs(root) {
        return root.querySelectorAll ?
            root.querySelectorAll('.range > input') :
            filter(isSliderInput, root.getElementsByTagName('input'));
    }

    function isSlider(el) {
        return hasClass('slider', el) && el.parentNode && hasClass('range', el.parentNode);
    }

    function isSliderInput(el) {
        return el.tagName === 'INPUT' && el.parentNode && hasClass('range', el.parentNode);
    }

    function hasClass(clazz, el) {
        return el.classList ?
            el.classList.contains(clazz) :
            ~((' ' + el.className + ' ').replace(/[\t\n\f\r]/g, ' ').indexOf(' ' + clazz + ' '));
    }

    function getEvent(e) {
        return e || window.event;
    }

    function preventDefault(e) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }

    function addListener(type, fn, el) {
        el.addEventListener ? el.addEventListener(type, fn) : el.attachEvent(type, fn);
    }

    function removeListener(type, fn, el) {
        el.removeEventListener ? el.removeEventListener(type, fn) : el.detachEvent(type, fn);
    }

    function mouseXToValue(slide, mouseX) {
        var ratioLeft = (mouseX - slide.rangeXStart) / slide.rangeWidth;
        return ratioLeft * slide.width + slide.min;
    }
    function nearestStep(slide, value) {
        if (value < slide.min) return slide.min;
        if (value > slide.max) return slide.max;
        
        return Math.round((value - slide.min)/slide.step)*slide.step + slide.min;
    }
    function getOffsetLeft(el) {
        var o = 0;
        do {
            o += el.offsetLeft;
        } while((el = el.offsetParent));
        return o;
    }
    
    
    //wlasny innerhtml
    function doInnerHTML(elementId, stringHTML) 
    {
 
   try {
      var elem = document.getElementById(elementId);
      var children = elem.childNodes;
 
      for (var i = 0; i < children.length; i++) {
         elem.removeChild(children[i]);
      }
 
      var nodes = new DOMParser().parseFromString(
         stringHTML, 'text/xml');
      var range = document.createRange();
      range.selectNodeContents(
         document.getElementById(elementId));
      range.deleteContents();
 
      for (var i = 0; i < nodes.childNodes.length; i++) {
         document.getElementById(elementId).appendChild(
            nodes.childNodes[i]);
      }
      return true;
      } catch (e) {
         try {
            document.getElementById(elementId).innerHTML =
               stringHTML;
            return true;
         }
      catch(ee) {
         return false;
      }
   }
}
    
    function moveSlider(slider, slide, value, init) {
        if (value > slide.max) value = slide.max;
        else if (value < slide.min) value = slide.min;
        
        if (!init && value === slide.value) return;
        
        var percent = 100*(value - slide.min) / slide.width;
        slider.style.left = percent + '%';
        slider.setAttribute('data-value', value);
        slide.input.setAttribute('value', value);
        //moja zmianka odnosnie okienka windows i zmiany na zywo czasu pod slajdem slidera
        var timee=0;
        timee = upConversionTimes(value);
        name=slide.input.getAttribute("name");
        doInnerHTML("movetime"+name, "<b>"+timee+"</b>");
        timee = timee.split(":");
        if(name!="PoczatekFilmu" && name!="KoniecFilmu")
        {
        	document.getElementById("textboxhour"+name).setAttribute('value', timee[0]);
        	document.getElementById("textboxmin"+name).setAttribute('value', timee[1]);
        	document.getElementById("textboxsek"+name).setAttribute('value', timee[2]);
        }
        //
        slide.value = value;

        if (init) return;
        
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('change', true, true);
        slider.dispatchEvent(evt);
    }
    function getSlide(slider) {
        var range = slider.parentNode;
        var rangeXStart = getOffsetLeft(range);
        var rangeWidth = range.offsetWidth;
        var min = Number(range.getAttribute('data-min')) | 0;
        var max = range.getAttribute('data-max');
        max = max == null ? 100 : Number(max);
        var step = Number(range.getAttribute('data-step')) || 1;
        
        var value = slider.getAttribute('data-value');
        var name = slider.getAttribute('data-name');

        var input = findInput(name, range);
        
        var slide = {
            min : min,
            max : max,
            width : max - min,
            step : step,
            value : value,
            name : name,
            rangeXStart : rangeXStart,
            rangeWidth : rangeWidth,
            input : input,
            range : range
        };
        slide.value = nearestStep(slide, value == null ? (max < min ? min : (max + min) / 2) : Number(value));
        return slide;
    }

    function beginHandleDrag(e) {
        e = getEvent(e);
        if (isSlider(e.target)) {
            preventDefault(e);
            
            var slider = e.target;
            var slide = getSlide(slider);
            
            var endHandleDrag = function (e) {
                e = getEvent(e);
                removeListener('mouseup', endHandleDrag, document.documentElement);
                removeListener('mousemove', handleDrag, document.documentElement);
            };
            var handleDrag = function (e) {
                e = getEvent(e);
                var rawValue = mouseXToValue(slide, e.pageX);
                var value = nearestStep(slide, rawValue);
                if (slide.value !== value) {
                    moveSlider(slider, slide, value);
                }
            }
            addListener('mouseup', endHandleDrag, document.documentElement);
            addListener('mousemove', handleDrag, document.documentElement);
            
        }
    }

    function handleSlide(e) {
        e = getEvent(e);
        if (e.keyCode === 37 || e.keyCode === 39) { // left/right
            if (isSlider(e.target)) {
                preventDefault(e);

                var slider = e.target;
                var slide = getSlide(slider);
                var valueAdd = e.keyCode === 37 ? -1 : +1;
                moveSlider(slider, slide, slide.value + valueAdd);
            }
        }
    }

    function initializeSlider(slider) {
        var slide = getSlide(slider);
        if (!slide.input) {
            slide.input = createInput(slide.name, slide.value, slide.range);
        }
        moveSlider(slider, slide, slide.value, true);
    }

    function initializeInput(input) {
        var name = input.getAttribute('name');
        var range = input.parentNode;
        var slider = findSlider(name, range);
        if (!slider) {
            initializeSlider(createSlider(name, input.getAttribute('value'), range));
        }
    }

    function pokazslajd(e){
        if (isSlider(e.target)) {
        	polozenieY=e.clientY;

        	dragdrop.set(e.target, {onstart: start, onmove: move, onstop: stop});
    	}
    }
    
    function wyrzucslajd(e){
    	if (isSlider(e.target)) {
			var name = e.target.getAttribute('data-name');
			var value = e.target.getAttribute('data-value');
       		var range = e.target.parentNode;
			range.removeChild(e.target); 
			if(e.clientY-polozenieY<40){
			initializeSlider(createSlider(name, value, range));
			}else{
				var check = document.getElementById("checkbox"+name);
				check.checked = false;
			}
    	}
    }

    
    addListener('mousedown', beginHandleDrag, document.documentElement);
    addListener('mouseover', pokazslajd, document.documentElement);
    addListener('mouseup', wyrzucslajd, document.documentElement);
	
    var initializeSliders = partial(each, initializeSlider);
    var initializeInputs = partial(each, initializeInput);
    addListener('DOMContentLoaded', partial(each, invoke, [
        compose(initializeSliders, partial(getSliders, document)),
        compose(initializeInputs, partial(getSliderInputs, document))
    ]), window);

})();