import $ from 'jquery';

$(function () {

	'use strict';

	const theme = localStorage.getItem('theme');

	checkTheme(theme);

	$('#toggle').click(function (e) {
		e.preventDefault();

		if ($('body').hasClass('dark')) {
			$('body').removeClass('dark');
			$('body').addClass('light');
		} else {
			$('body').removeClass('light');
			$('body').addClass('dark');
		}

		if (theme === 'dark') {
			localStorage.setItem('theme', 'light');
		} else {
			localStorage.setItem('theme', 'dark');
		}
	});

	function checkTheme(theme) {
		if (theme === 'dark') {
			$('body').addClass('dark');
		} else {
			$('body').addClass('light');
		}
	}

	$('.js-menu-toggle').click(function (e) {
		e.preventDefault();

		var $this = $(this);

		$('body').addClass('show-sidebar');
		$this.addClass('active');

	});

	// click outisde offcanvas
	$(document).mouseup(function (e) {
		var container = $(".sidebar");
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			if ($('body').hasClass('show-sidebar')) {
				$('body').removeClass('show-sidebar');
				$('body').find('.js-menu-toggle').removeClass('active');
			}
		}
	});

	let previousScroll = 0;
	$(window).scroll(function () {
		let currentScroll = $(this).scrollTop();

		if (currentScroll < 100) {
			showNav();
		} else if (currentScroll > 0 && currentScroll < $(document).height() - $(window).height()) {
			if (currentScroll > previousScroll) {
				hideNav();
			} else {
				showNav();
			}
			previousScroll = currentScroll;
		}
	});

	function hideNav() {
		$(".main-nav").removeClass("visible").addClass("hidden")
	}

	function showNav() {
		$(".main-nav").removeClass("hidden").addClass("visible");
	}
	$("#pick-month-btn").click(()=> {
		$(".dp__main input").focus();
	})

	// $(".total-balance-section .dp__input_wrap input").attr('type', 'hidden');

	
});