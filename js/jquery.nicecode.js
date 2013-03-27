/* 
	Плагин		:	jQuery.niceCode
	Версия		:	1.0 (27.03.2013)
	Автор		:	ПафНутиЙ 
	Сайт		:	http://pafnuty.name
	Назначение	:	Красивый вывод исходного кода со стилизацией под цветовую схему Solarized Light


	Использование:

		HTML:

		<pre class="cn-pre" data-text="arResult1">Исходный код arResult1</pre>


		CSS:
			pre.cn-pre {
				background: #fdf6e3;
				border-color: rgba(0,0,0,0.3);
				border-style: solid;
				border-width: 30px 2px 2px;
				color: #586e75;
				display: block;
				font: normal 14px/20px Consolas,'Courier New',monospace;
				padding: 20px;
				margin:  20px;
				position: relative;
				text-shadow: 0 1px 1px #fff;
				-webkit-border-radius: 5px;
				border-radius: 5px;
				-moz-box-shadow: inset 0 -1px 10px 0 rgba(0,0,0,0.1),inset 0 1px 0 0 rgba(0,0,0,0.5), 0 0 30px 0 rgba(255, 255, 255, 0.5);
				box-shadow: inset 0 -1px 10px 0 rgba(0,0,0,0.1),inset 0 1px 0 0 rgba(0,0,0,0.5), 0 0 30px 0 rgba(255, 255, 255, 0.5);
				white-space: pre;
				white-space: pre-wrap;
				word-break: break-all;
				word-wrap: break-word;
				}
				pre.cn-pre::-moz-selection {
					background: #073642;
					text-shadow: 0 1px 1px #000;
					color:  #fff;
					}
				pre.cn-pre::selection {
					background: #073642;
					text-shadow: 0 1px 1px #000;
					color:  #fff;
					}
				pre.cn-pre:after {
					color: #fff;
					content: "Исходный код: " attr(data-text);
					font: normal 16px/30px Consolas,'Courier New',monospace;
					height: 30px;
					left: 20px;
					position: absolute;
					right: 20px;
					text-shadow: 0 1px 3px rgba(0,0,0,0.7);
					top: -30px;
					}
				.cn-pre-wrap {
					display: none;
					position: fixed;
					top: 0;
					left: 0;
					bottom: 0;
					right: 0;
					background: #323232; 
					background: rgba(0, 0, 0, 0.8);
					z-index: 9999;
					}
					.cn-pre-inner {
						position: relative;
						max-height: 100%;
						overflow-y: auto;
						-webkit-box-size: border-box;
						-moz-box-size: border-box;
						-ms-box-size: border-box;
						-o-box-size: border-box;
						box-size: border-box;
						}
					.cn-pre-close {
						position: absolute;
						top: 27px;
						right: 30px;
						font: bold 16px/20px Arial, sans-serif;
						text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.7);
						cursor: pointer;
						}
						.cn-pre-close:hover {
							color: #f96;
							text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.6);
							}
				.cn-pre-but {
					cursor: pointer;
					display: inline-block;
					color: #fff;
					background: #b0ac9e;
					border-radius: 4px;
					padding: 0 15px;
					font: normal 14px/30px Consolas,'Courier New',monospace;
					text-shadow: 0 1px 3px rgba(0,0,0,0.7);
					-moz-box-shadow: inset 0 -4px 15px -4px rgba(0, 0, 0, 0.2), inset 0 3px 15px -3px rgba(255, 255, 255, 0.7);
					box-shadow: inset 0 -4px 15px -4px rgba(0, 0, 0, 0.2), inset 0 3px 15px -3px rgba(255, 255, 255, 0.7);
					border: solid 1px rgba(0, 0, 0, 0.4);
					}
					.cn-pre-but:hover {
						-moz-box-shadow: inset 0 2px 10px -2px rgba(0, 0, 0, 0.2), inset 0 -3px 10px -3px rgba(255, 255, 255, 0.7);
						box-shadow: inset 0 2px 10px -2px rgba(0, 0, 0, 0.2), inset 0 -3px 10px -3px rgba(255, 255, 255, 0.7);
						}
				pre code {
					padding: 0;
					color: inherit;
					background-color: transparent;
					border: 0;
				} 



	Инициализация (переинициализация):

		jQuery(function($) {
			$('.cn-pre').niceCode();
		});	

*/

(function($){ 

	$.fn.niceCode = function() {

		make = function() {

			$this = $(this); 

			if ($(this).hasClass('wrapped')) {
				return; // Если элемент имеет класс wrapped - идём мимо
			} 
			else { // Если элемент без класса wrapped - работаем с ним.	
				$(this)
				.addClass('wrapped') // Добавляем класс чтобы понять, что элемент уже стилизован
				.wrap('<div class="cn-pre-wrap"><div class="cn-pre-inner"></div></div>') // Заворачиваем элемент в обёртку, которая будет нашим окном.
				.parent() // поднимаемся на уровень выше.
				.append('<div class="cn-pre-close">X</div>') // Добавляем кнопку закрытия.
				.parent() // Поднимаемся ещё на один уровень выше.
				.before('<span class="btn cn-pre-but">Показать код '+$(this).data('text')+'</span>'); // Создаём кнопку открытия окна с кодом.
			}
		};

		// Запускаем указанную выше ф-цию.
		return this.each(make);
		
	};
})(jQuery);

// Обрабатываем поведение

jQuery(document).ready(function($) {
	// Обрабатываем клик по кнопке открытия
	$('body').on('click', '.cn-pre-but', function () {
		$(this).addClass('active').next().fadeToggle(200);
		$('body').css({overflow: 'hidden'});
	});

	// Обрабатываем клик по кнопке закрытия
	$('body').on('click', '.cn-pre-close', function () {
		$('.cn-pre-but.active').removeClass('active').next().fadeOut(100); 
		$('body').css({overflow: 'auto'});
	});

	// Обрабатываем клик по клавише Esc
	$(document).keyup(function(e) {
		if (e.keyCode == 27) { 
			$('.cn-pre-close').trigger('click'); 
		}
	});
});