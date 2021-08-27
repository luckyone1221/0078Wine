let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// мы должны вставить элемент в документ, иначе размеры будут равны 0
document.body.append(div);

let scrollWidth = div.offsetWidth - div.clientWidth;
let root = document.documentElement;
root.style.setProperty('--spacing-end', scrollWidth + 'px');
div.remove();
const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = ".link-modal-js";

		Fancybox.bind(link, {
			arrows: false,
			infobar: false,
			touch: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
				// PLAY_START: "Start slideshow",
				// PLAY_STOP: "Pause slideshow",
				// FULL_SCREEN: "Full screen",
				// THUMBS: "Thumbnails",
				// DOWNLOAD: "Download",
				// SHARE: "Share",
				// ZOOM: "Zoom"
			},
			// beforeLoad: function () {
			// 	root.style.setProperty('--spacing-end', scrollWidth + 'px');
			// },
			// afterClose: function () {
			// 	root.style.setProperty('--spacing-end', null);
			// },

		});

		// $(link).fancybox({
		// });

		$(".modal-close-js").click(function () {
			Fancybox.close();
		})
		// fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed")); 
		}, { passive: true });
	},
	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;
		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed")); 
		}

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 768px)").matches) this.closeMenu();
		}, { passive: true });
	},
	// /mobileMenu

	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			event.preventDefault();
			const th = $(this);
			var data = th.serialize();

			//check cart on empty
			if (this.querySelector('.cart-inp-js').value === '' || this.querySelector('.cart-inp-js').value === '{}'){
				let cartWrap = document.querySelector('.cart-items-js');
				cartWrap.innerHTML = '<h4>Что бдем Покупать?</h4>';
				return;
			}

			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {
				Fancybox.close();
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	checkEmptyVal() {
		((this.value !== '' || (this.tagName == "SELECT" && (this.querySelector('option').value !== null && this.querySelector('option').text) )) || this.type == "date")
			? $(this).addClass('not-empty')
			: $(this).removeClass('not-empty')
	},
};
const $ = jQuery;

function eventHandler() {
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	// JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.sendForm();
	// JSCCommon.heightwindow();
	// JSCCommon.animateScroll();

	// $('.has-ph-js').blur(JSCCommon.checkEmptyVal).each(JSCCommon.checkEmptyVal);
	// $('.has-ph-js.select-custom--js').on('select', JSCCommon.checkEmptyVal);

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}
	// modal window

	//luckyoneJs
	let topNav = document.querySelector(".top-nav--js");
	function calcHeaderHeight() {
		document.documentElement.style.setProperty('--header-h', `${topNav.offsetHeight}px`);

		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');

	}
	window.addEventListener('resize', calcHeaderHeight, { passive: true });
	window.addEventListener('scroll', calcHeaderHeight, { passive: true });
	calcHeaderHeight();

	//
	let sSliderSlider = new Swiper('.sSlider-slider-js', {
		slidesPerView: 'auto',
		loop: false,
		spaceBetween: 36,

		pagination: {
			el: '.swiper-pagination',
			type: "progressbar",
			//type: 'bullets',
		},
		navigation: {
			nextEl: '.swiper-next',
			prevEl: '.swiper-prev',
		},

	});
	//
	let thisYear = new Date().getFullYear();
	$('.set-active-class-js').each(function (){
		if(thisYear >= Number(this.getAttribute('data-year'))){
			$(this).addClass('dot-active');
		}
	})
	//inpmaks??
	$('.number-mask-js').each(function (){
		Inputmask(this.getAttribute('data-mask')).mask(this);
	});
	//readmore
	let readMoreConts = document.querySelectorAll('.rm-cont-js');
	for (let cont of readMoreConts){
		let btn = cont.querySelector('.rm-btn-js');

		btn.addEventListener('click', function (){
			this.classList.toggle('active');
			let hidden = cont.querySelector('.rm-hidden-js');
			let visiable = cont.querySelector('.rm-visible-js');

			$(hidden).slideToggle(function (){
				$(this).toggleClass('active');
			});
			$(visiable).toggleClass('active');
		});
	}
	//cart

	//controll
	let cart = {
		cartItems: {},
		cartWrap: document.querySelector('.cart-items-js'),
		hiddenInp: document.querySelector('.hidden-inputs-js input[type="hidden"]'),
		makeProdControlls: function (Proditem){
			let cart = this;
			let inp = Proditem.querySelector('.amount-inp-js');
			let min = Proditem.querySelector('.min-btn-js');
			let plus = Proditem.querySelector('.plus-btn-js');
			let add = Proditem.querySelector('.add-btn-js');

			$(min).click(function (){
				inp.value = Number(inp.value) - 1;
				!inp.reportValidity() ? inp.value = 1 : '';
				Proditem.setAttribute('data-amount', inp.value);
			})
			$(plus).click(function (){
				inp.value = Number(inp.value) + 1;
				!inp.reportValidity() ? inp.value = 1 : '';
				Proditem.setAttribute('data-amount', inp.value);
			})
			$(inp).change(function (){
				!inp.reportValidity() ? inp.value = 1 : '';
				Proditem.setAttribute('data-amount', inp.value);
			});
			$(add).click(cart.addProdItem.bind(this, Proditem));
		},
		addProdItem: function (Proditem){
			let itemProps = {
				name: Proditem.getAttribute('data-name'),
				descr: Proditem.getAttribute('data-descr'),
				price: Proditem.getAttribute('data-price'),
				amount: Proditem.getAttribute('data-amount')
			};

			this.cartItems[Proditem.getAttribute('id')] = itemProps;
			this.renderCart();
		},
		//cart methods
		onCartInputChange: function (cartItem){
			let thisProdItemId = cartItem.getAttribute('data-prod-item-id');
			let thisProdItem = document.querySelector(`#${thisProdItemId}`);
			let thisProdItemInp = thisProdItem.querySelector(`.amount-inp-js`);
			let inp = cartItem.querySelector('.amount-inp-js');

			thisProdItemInp.value = inp.value;
			thisProdItem.setAttribute('data-amount', inp.value);
			cart.cartItems[thisProdItemId].amount = inp.value;
			cart.renderCart();
		},
		makeCartControlls: function (cartItem){
			let cart = this;

			let thisProdItemId = cartItem.getAttribute('data-prod-item-id');
			let thisProdItem = document.querySelector(`#${thisProdItemId}`);
			let thisProdItemInp = thisProdItem.querySelector(`.amount-inp-js`);

			let inp = cartItem.querySelector('.amount-inp-js');
			let min = cartItem.querySelector('.min-btn-js');
			let plus = cartItem.querySelector('.plus-btn-js');
			let removeBtn = cartItem.querySelector('.remove-btn-js');

			$(min).click(function (){
				inp.value = Number(inp.value) - 1;
				!inp.reportValidity() ? inp.value = 1 : '';

				cart.onCartInputChange(cartItem);
			})
			$(plus).click(function (){
				inp.value = Number(inp.value) + 1;
				!inp.reportValidity() ? inp.value = 1 : '';

				cart.onCartInputChange(cartItem);
			})
			$(inp).change(function (){
				!inp.reportValidity() ? inp.value = 1 : '';

				cart.onCartInputChange(cartItem);
			});

			$(removeBtn).click(function (){
				delete cart.cartItems[thisProdItemId];

				thisProdItemInp.value = 1;
				thisProdItem.setAttribute('data-amount', 1);
				cart.renderCart();
			});
		},
		getCardTemplate: function (itemObj, itemId){
			// cart-item-js[data-prod-item-id]
			// amount-inp-js
			// min-btn-js
			// plus-btn-js
			// remove-btn-js
			let template = `
				<div class="sCart__item cart-item-js" data-prod-item-id="${itemId}">
					<div class="sCart__i-row row align-items-center gy-3">
						<div class="col-auto">
							<div class="sCart__num"></div>
						</div>
						<div class="col">
							<div class="sCart__name">
								${itemObj.name}
							</div>
							${itemObj.descr && `<div class="sCart__descr"> ${itemObj.descr} </div>` || ''}
						</div>
						<div class="col-12 m-0 d-md-none"></div>
						<div class="col col-md-auto">
							<div class="sCart__control">
								<button class="sCart__btn sCart__btn--minus min-btn-js" type="button">
									-
								</button>
								<input 
									class="sCart__input form-control amount-inp-js"
									pattern="[0-9]{1,2}" type="number" min="1" max="99"
									value="${itemObj.amount}" />
								<button class="sCart__btn sCart__btn--plus plus-btn-js" type="button">
									+
								</button>
							</div>
						</div>
						<div class="col-auto">
							<div class="sCart__price">
								<b>${Number(itemObj.amount.replace(/\s/g, '')) * Number(itemObj.price.replace(/\s/g, ''))}</b>
								р.
							</div>
						</div>
						<div class="col-auto">
							<button class="sCart__remove-btn remove-btn-js" type="button">
								+
							</button>
						</div>
					</div>
				</div>
			`;
			return template;
		},
		renderCart: function (){
			this.cartWrap.innerHTML = '';
			for (let [itemId,itemObj] of Object.entries(this.cartItems)){
				this.cartWrap.innerHTML += this.getCardTemplate(itemObj, itemId)
			}

			let cartItems = this.cartWrap.querySelectorAll('.cart-item-js');
			for (let item of cartItems){
				this.makeCartControlls(item);
			}
			this.renderHiddenInps();
		},
		//
		renderHiddenInps: function (){
			this.hiddenInp.value = JSON.stringify(this.cartItems);
		},
	};

	//start cart
	$('.prod-item--js').each(function (){
		cart.makeProdControlls(this);
	});
	//-
	let sSocSlider = new Swiper('.sSoc-slider-js', {
		slidesPerView: 'auto',
		loop: false,
		spaceBetween: 36,

		pagination: {
			el: '.sSoc--js .swiper-pagination',
			type: "fraction",
		},
		navigation: {
			nextEl: '.sSoc--js .swiper-next',
			prevEl: '.sSoc--js .swiper-prev',
		},

	});

	//end luckyoneJs

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }