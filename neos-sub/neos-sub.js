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
        } else if ((linkPath === '/index.asp' || linkPath === '/index.html') &&
                   (currentPath === '/' || currentPath === '/index.asp' || currentPath === '/index.html')) {
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

    /* === PAGINE DINAMICHE === */
    function renderCatalog() {
        if (!window.DB || !Array.isArray(DB.reparti) || !$catalogList.length) return;

        var parents = DB.reparti.filter(function (item) {
            return item.id_padre === 0;
        });

        parents.forEach(function (parent) {
            var children = DB.reparti.filter(function (item) {
                return item.id_padre === parent.id;
            });

            if (children.length) {
                var $submenu = $('<ul class="submenu"></ul>');
                children.forEach(function (child) {
                    $submenu.append('<li><a href="pagina.html?pg=' + child.id + '">' + child.reparto + '</a></li>');
                });

                var $item = $('<li class="has-submenu"></li>');
                $item.append('<a href="#">' + parent.reparto + ' <span class="arrow">▸</span></a>');
                $item.append($submenu);
                $catalogList.append($item);
            } else {
                $catalogList.append('<li><a href="pagina.html?pg=' + parent.id + '">' + parent.reparto + '</a></li>');
            }
        });
    }

    function renderNews() {
        if (!window.DB || !Array.isArray(DB.news)) return;
        var $news = $('#newsList');
        if (!$news.length) return;

        DB.news.forEach(function (item) {
            $news.append(
                '<article class="news-item">' +
                '<h3>' + item.titolo + '</h3>' +
                '</article>'
            );
        });
    }

    function renderFeaturedProducts() {
        if (!window.DB || !Array.isArray(DB.prodotti)) return;
        var $grid = $('#productsGrid');
        if (!$grid.length) return;

        DB.prodotti.filter(function (item) {
            return item.vetrina === 1 && item.attivo === 1;
        }).forEach(function (item) {
            $grid.append(
                '<article class="product-card">' +
                '<a href="prodotto.html?id=' + item.id + '">' +
                '<img src="public/catalogo/' + item.foto + '" alt="' + item.nome + '">' +
                '<h3>' + item.nome + '</h3>' +
                '<p>' + item.descr + '</p>' +
                '</a>' +
                '</article>'
            );
        });
    }

    renderCatalog();
    renderNews();
    renderFeaturedProducts();

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