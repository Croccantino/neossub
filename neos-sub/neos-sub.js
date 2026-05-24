/**
 * Neos Sub — Script principale
 */

$(document).ready(function () {

    /* === POPUP === */
    var $popup = $('#popup-container');
    if ($popup.length) {
        $('#closePopup, .close').on('click', function () {
            $popup.fadeOut(250);
        });
        $popup.on('click', function (e) {
            if ($(e.target).is('#popup-container')) {
                $popup.fadeOut(250);
            }
        });
        $(document).on('keydown', function (e) {
            if (e.key === 'Escape') $popup.fadeOut(250);
        });
    }

    /* === HAMBURGER NAV === */
    var $ham  = $('#navHamburger');
    var $nav  = $('#mainNavList');

    $ham.on('click', function () {
        $ham.toggleClass('open');
        $nav.toggleClass('open');
    });

    $(document).on('click', function (e) {
        if ($ham.length && !$ham[0].contains(e.target) && !$nav[0].contains(e.target)) {
            $ham.removeClass('open');
            $nav.removeClass('open');
        }
    });

    /* === ACTIVE LINK === */
    var path = window.location.pathname + window.location.search;
    $('.nav-list a').each(function () {
        if ($(this).attr('href') === path) {
            $(this).addClass('active');
        }
    });

    /* === SUBMENU TOUCH-FRIENDLY (accordion su mobile) === */
    var $catalogList = $('#catalogList');
    if (!$catalogList.length) {
        $catalogList = $('.catalog-list');
    }

    function setupMobileBehavior() {
        if (window.innerWidth <= 768) {
            $('.has-submenu > a')
                .off('click.neosMobile')
                .on('click.neosMobile', function (e) {
                    e.preventDefault();
                    var $parent = $(this).parent();
                    var isOpen = $parent.hasClass('active');
                    $('.has-submenu').removeClass('active');
                    if (!isOpen) $parent.addClass('active');
                });

            $('.tit_catalogo')
                .css('cursor', 'pointer')
                .off('click.neosMobile')
                .on('click.neosMobile', function () {
                    $catalogList.toggleClass('open');
                });
        } else {
            $('.has-submenu > a').off('click.neosMobile');
            $('.tit_catalogo').off('click.neosMobile').css('cursor', 'default');
            $catalogList.removeClass('open');
            $('.has-submenu').removeClass('active');
        }
    }

    setupMobileBehavior();
    $(window).on('resize.neosMobile', setupMobileBehavior);

    /* === FANCYBOX === */
    if (typeof $.fn.fancybox === 'function') {
        $('a[rel=zoom]').fancybox();
    }

});

/* Google Translate callback */
function googleTranslateElementInit() {
    if (typeof google !== 'undefined' && google.translate) {
        new google.translate.TranslateElement({ pageLanguage: 'it' }, 'google_translate_element');
    }
}