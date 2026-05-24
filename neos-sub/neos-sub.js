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
        if ($ham.length && $nav.length && !$ham[0].contains(e.target) && !$nav[0].contains(e.target)) {
            $ham.removeClass('open');
            $nav.removeClass('open');
        }
    });

    /* === ACTIVE LINK === */
    var currentUrl = new URL(window.location.href, window.location.origin);

    function normalizePath(path) {
        var normalized = (path || '/').replace(/\/+$/, '');
        return normalized === '' ? '/' : normalized;
    }

    $('.nav-list a').each(function () {
        var href = $(this).attr('href') || '';
        var linkUrl = new URL(href, window.location.origin);
        var linkPath = normalizePath(linkUrl.pathname);
        var currentPath = normalizePath(currentUrl.pathname);

        if (linkPath === currentPath && linkUrl.search === currentUrl.search) {
            $(this).addClass('active');
        } else if (linkPath === '/index.asp' && currentPath === '/') {
            $(this).addClass('active');
        }
    });

    // Chiudi il menu mobile quando si seleziona una voce
    $nav.find('a').on('click', function () {
        $ham.removeClass('open');
        $nav.removeClass('open');
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