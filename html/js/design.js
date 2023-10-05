// 모바일일때 네비게이션 클래스 추가
$(document).ready(function () {
	$(window)
		.resize(function () {
			var width = window.innerWidth;
			if (!$('.header_wrap').hasClass('scroll')){
				$(".header_wrap").addClass("scroll");
			}
			if (width < 672) {
				// mobile
				$(".navigator").addClass("mobile");
			} else {
				//web
				$(".navigator").removeClass("mobile");
				$(".navigator").removeClass("fixed");
			}
		})
		.resize();
});

// 스크롤시 헤더 푸터 고정
var navigation = function () {
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $(".navigator.mobile").outerHeight() + 10;
	var headerTitle = $(".header_wrap").outerHeight() + 10;
	$(window).scroll(function (event) {
		didScroll = true;
	});
	setInterval(function () {
		if (didScroll) {
			hasScrolled();

			didScroll = false;
		}
	}, 250);
	function hasScrolled() {
		var st = $(this).scrollTop();
		
		var isPWA = window.matchMedia("(display-mode: standalone)").matches;

		if (isPWA && st < 1) {
			location.reload();
		}
		
		if (Math.abs(lastScrollTop - st) <= delta) return;
		// bottom nav
		if (st > lastScrollTop && st > navbarHeight) {
			// Scroll Down
			$(".navigator.mobile").removeClass("fixed");
			$(".header_wrap").addClass("scroll");
		} else {
			// Scroll Up
			if (st + $(window).height() < $(document).height()) {
				$(".navigator.mobile").addClass("fixed");
				// $(".header_wrap").removeClass("scroll");

				$(".navigator.mobile").addClass("fixed");
				// $(".header_wrap").removeClass("scroll");
			}
		}
		// header
		if (st > lastScrollTop && st > headerTitle) {
			// Scroll Down
			$(".header_wrap").addClass("scroll");
		} else {
			// Scroll Up
			if (st + $(window).height() < $(document).height()) {
				// $(".header_wrap").removeClass("scroll");
			}
		}
		lastScrollTop = st;
	}
};

var layerPopup = function () {
	$(".layerBtn").each(function (i) {
		$(this).click(function () {
			var no = $(this).attr("layer");
			layer_open(no);
		});
	});
	function layer_open(no) {
		$(".layerPopUp[layer=" + no + "]").addClass("show");
		$("html").addClass("ovh");
	}
	var CloseBtn = $(".btn_popclose");
	CloseBtn.on("click", function () {
		$(this).parents(".layerPopUp").removeClass("show");
		$("html").removeClass("ovh");
	});
};

// 글자수제한
function limitCharCount(inputId, maxLength) {
	$("#" + inputId).on("input", function () {
		var inputText = $(this).val();
		var charCount = inputText.length;
		$("#" + inputId)
			.next($("#charCount"))
			.html("<span>" + charCount + "</span>" + "/" + maxLength);
		if (charCount >= maxLength) {
			$(this).val(inputText.slice(0, maxLength));
		}
	});
}

// toggle btn
var btnTgShow = function () {
	$(".btnToggle").on("click", function () {
		var panelId = $(this).attr("data-panelid");
		$(this).toggleClass("up");
		$("#" + panelId).slideToggle("show");
	});
	$(".btn_down.btnToggle").on("click", function () {
		$("body").toggleClass("ovh");
	});
};

// tab
function toggleClass(target) {
	$(target).each(function () {
		var $btn = $(this).find(".toggle-btn");

		$btn.on("click", function () {
			$(this).next().toggleClass("selectd");
		});
	});
}

function toggleClose(target) {
	$(target).parent().removeClass("selectd");
}

function commonTab(target) {
	$(target).each(function () {
		var $btn = $(this).find(".tab-btn").children(),
			$panel = $(this).find(".tab-panel").children();
		/*
		$btn.on("click", function () {
			$btn.removeClass("selectd");
			$(this).addClass("selectd");
			$panel.removeClass("selectd");
			$panel.eq($(this).index()).addClass("selectd");
		});
		*/
	});
}

// tab
function innerTab(target) {
	$(target).each(function () {
		var $btn = $(this).find(".tab-btn2").children(),
			$panel = $(this).find(".tab-panel2").children();
		/*
		$btn.on("click", function () {
			$btn.removeClass("selectd");
			$(this).addClass("selectd");
			$panel.removeClass("selectd");
			$panel.eq($(this).index()).addClass("selectd");
		});
		*/
	});
}

// 설정 높이값
var settingHeight = function () {
	var setH = $(".setting_detail-cont").height() - 20;
	var listH = $(".setting_list .inner_box");
	listH.css("height", setH);
};
var settingHeightM = function () {
	var setH = $(window).height() - 350;
	var listH = $(".setting_list .inner_box");
	listH.css("height", setH);
};

// 설정추가 버튼
var settaddBtn = function () {
	$(".wOpenSetting").on("click", function () {
		$(".setting_detail").show();
		$(".info_pannel").hide();
		$(".add_pannel").show();
	});
};
var settdetailBtn = function () {
	$(".wOpenDetail").on("click", function () {
		$(".setting_detail").show();
		$(".info_pannel").show();
		$(".add_pannel").hide();
	});
};
var settaddBtnM = function () {
	$(".mOpenSetting").on("click", function () {
		$(".setting_detail").show();
		$(".info_pannel").hide();
		$(".add_pannel").show();
		$("html").addClass("ovh");
	});
};
var settdetailBtnM = function () {
	$(".mOpenDetail").on("click", function () {
		$(".setting_detail").show();
		$(".info_pannel").show();
		$(".add_pannel").hide();
		$("html").addClass("ovh");
	});
};
var setClosedBtn = function () {
	$(".setting_detail-header .btn_dtdel").on("click", function () {
		$(this).parents(".setting_detail").hide();
		$(".info_pannel").hide();
		$(".add_pannel").hide();
		$("html").removeClass("ovh");
	});
};

// 바닥화면 클릭하면 팝업레이어 닫힘
var closeLayer = function () {
	$("html").click(function (e) {
		if ($(e.target).parents(".line").length < 1) {
			//console.log("팝업 외 부분이 맞습니다");
			$(".line .menu_box").hide();
			$("body").removeClass("ovh");
		}
	});
};

// 프로필이미지 선택
var prSelcted = function () {
	$(".primg_list .pr_img").click(function (e) {
		$(".primg_list .pr_img").removeClass("selectd");
		$(this).addClass("selectd");
	});
};

$(function () {
	limitCharCount("count_text", 120);
	btnTgShow();
	navigation();
	toggleClass('[data-js="toggle-class"]');
	commonTab(".common-tab");
	innerTab(".inner-tab");
	layerPopup();
	closeLayer();
	prSelcted();
});
$(window).on("resize", function (e) {
	var delay = 300;
	var timer = null;
	var WinW = $(window).width();
	clearTimeout(timer);
	timer = setTimeout(function () {}, delay);
	if (WinW < 672) {
		$(".setting_detail").hide();
		$(".info_pannel").hide();
		$(".add_pannel").hide();
		//settingHeightM();
		settdetailBtnM();
		settaddBtnM();
		setClosedBtn();
	} else {
		$(".setting_detail").show();
		$(".info_pannel").show();
		$("html").removeClass("ovh");
		//settingHeight();
		settaddBtn();
		settdetailBtn();
	}
});
