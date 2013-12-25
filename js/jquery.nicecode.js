/* 
	Плагин		:	jQuery.niceCode
	Версия		:	1.2 (25.12.2013)
	Автор		:	ПафНутиЙ 
	Сайт		:	http://git.io/S7w2Wg
	Назначение	:	Красивый вывод исходного кода со стилизацией под цветовую схему Solarized Light


	Использование:

		HTML:

		<pre class="cn-pre" data-text="arResult1">Исходный код arResult1</pre>


	Инициализация (переинициализация):

		jQuery(function($) {
			$('.cn-pre').niceCode();
		});	

*/
// Определяем версию IE (что бы можно было отключить скрипт для ie8 ибо говнобраузер)
var uagent = navigator.userAgent,
	ie = uagent.indexOf("MSIE");
if (ie != -1) {
	var ie_ver = uagent,
	ieVer = ie_ver.substr(ie + 5, 2)*1; 
};

if(ieVer !='8') {
	// Добавим стилей на страницу
	var css = "pre code{padding:0;border:0;color:inherit;background:transparent}pre.cn-pre{border-color:rgba(0,0,0,.3);border-style:solid;border-width:30px 2px 2px;padding:20px;margin:20px;border-radius:5px;box-shadow:inset 0 -1px 10px 0 rgba(0,0,0,.1),inset 0 1px 0 0 rgba(0,0,0,.5),0 0 30px 0 rgba(255,255,255,.5);display:block;white-space:pre;white-space:pre-wrap;background:#fdf6e3;color:#586e75;font:400 14px/20px Consolas,'Courier New',monospace;text-shadow:0 1px 1px #fff;word-break:break-all;word-wrap:break-word;position:relative}pre.cn-pre::selection{background:#073642;color:#fff;text-shadow:0 1px 1px #000}pre.cn-pre:after{color:#fff;font:400 16px/30px Consolas,'Courier New',monospace;content:'Исходный код:  'attr(data-text);text-shadow:0 1px 3px rgba(0,0,0,.7);height:30px;left:20px;position:absolute;right:20px;top:-30px}.cn-pre-but{border-radius:4px;padding:0 15px;box-shadow:inset 0 -4px 15px -4px rgba(0,0,0,.2),inset 0 3px 15px -3px rgba(255,255,255,.7);border:solid 1px rgba(0,0,0,.4);display:inline-block;color:#fff;background:#b0ac9e;font:400 14px/30px Consolas,'Courier New',monospace;text-shadow:0 1px 3px rgba(0,0,0,.7);cursor:pointer}.cn-pre-but:hover{box-shadow:inset 0 2px 10px -2px rgba(0,0,0,.2),inset 0 -3px 10px -3px rgba(255,255,255,.7)}.cn-pre-close{font:700 16px/20px Arial,sans-serif;text-shadow:1px 1px 0 rgba(255,255,255,.7);position:absolute;top:27px;right:30px;cursor:pointer}.cn-pre-close:hover{color:#f96;text-shadow:1px 1px 1px rgba(0,0,0,.6)}.cn-pre-inner{position:relative;max-height:100%;overflow-y:auto;-ms-overflow-y:auto;-webkit-box-size:border-box;-moz-box-size:border-box;-ms-box-size:border-box;-o-box-size:border-box;box-size:border-box}.cn-pre-wrap{display:none;background:#323232;background:rgba(0,0,0,.8);position:fixed;top:0;left:0;bottom:0;right:0;z-index:9999}",
	    head = document.getElementsByTagName('head')[0],
	    style = document.createElement('style');
	if (style.styleSheet){
	  style.styleSheet.cssText = css;
	} else {
	  style.appendChild(document.createTextNode(css));
	}

	head.appendChild(style);
}

(function($){ 

	$.fn.niceCode = function() {

		make = function() {

			var $this = $(this); 
			var text = ($this.data('text')) ? $this.data('text') : '';

			if ($this.hasClass('wrapped')) {
				return; // Если элемент имеет класс wrapped - идём мимо
			} 
			else { // Если элемент без класса wrapped - работаем с ним.	
				$this
				.addClass('wrapped') // Добавляем класс чтобы понять, что элемент уже стилизован
				.wrap('<div class="cn-pre-wrap"><div class="cn-pre-inner"></div></div>') // Заворачиваем элемент в обёртку, которая будет нашим окном.
				.parent() // поднимаемся на уровень выше.
				.append('<div class="cn-pre-close">X</div>') // Добавляем кнопку закрытия.
				.parent() // Поднимаемся ещё на один уровень выше.
				.before('<span class="btn cn-pre-but">Показать код '+text+'</span>'); // Создаём кнопку открытия окна с кодом.
			}
		};

		// Запускаем указанную выше ф-цию.
		return this.each(make);
		
	};
})(jQuery);

// Обрабатываем поведение
var nk_doc = $(document);
var nk_body = $('body');

nk_doc
	// Обрабатываем клик по кнопке открытия
	.on('click', '.cn-pre-but', function () {
		$(this).addClass('active').next().fadeToggle(200);
		nk_body.css({overflow: 'hidden'});
	})
	// Обрабатываем клик по кнопке закрытия
	.on('click', '.cn-pre-close', function () {
		$('.cn-pre-but.active').removeClass('active').next().fadeOut(100); 
		nk_body.css({overflow: 'auto'});
	})
	// Обрабатываем клик по клавише Esc
	.keyup(function(e) {
		if (e.keyCode == 27) { 
			$('.cn-pre-close').trigger('click'); 
		}
	});
// Инициализация
jQuery(function($) {
	$('.cn-pre').niceCode();
});
