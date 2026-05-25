<%@ Language="VBScript" %>
<%
' ============================================================
' CONNESSIONE AL DATABASE
' Modifica il percorso del .mdb se necessario
' ============================================================
Dim conn, connStr
Set conn = Server.CreateObject("ADODB.Connection")
connStr = "SERVER=89.46.111.16;DATABASE=Sql963192_2;UID=Sql963192;PWD=4m3623z120;"
conn.Open connStr
%>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Neos Sub - Shopping subacquea e Articoli per la pesca in apnea</title>
    <meta name="description" content="Neos Sub - Arbalete Artigianali in legno e accessori - Shopping subacquea e Articoli per la pesca in apnea">
    <meta name="keywords" content="arbalete, pesca sub, arbalete in legno, accessori, articoli, pesca, subacquea, shopping, negozio, e-commerce">
    <meta name="robots" content="index, follow">
    <link rel="stylesheet" href="neos-sub-styles.css">
    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
</head>
<body>

<!-- ===== TOP UTILITY BAR ===== -->
<div class="utility-bar">
    <div class="utility-inner">
        <div id="google_translate_element"></div>
        <div class="utility-actions">
            <a href="/carrello.asp" class="util-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                <span>Carrello</span>
            </a>
            <a href="/personale.asp" class="util-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Login</span>
            </a>
        </div>
    </div>
</div>

<!-- ===== HEADER ===== -->
<header class="main-header" id="mainHeader">
    <div class="header-inner">
        <a href="/index.asp" class="logo-link">
            <img src="img_home/logo_neos.png" height="64" alt="Neos Sub - Arbalete e Accessori Subacquei">
        </a>
        <button class="nav-hamburger" id="navHamburger" aria-label="Apri menu">
            <span></span><span></span><span></span>
        </button>
    </div>

    <!-- ===== NAV PRINCIPALE ===== -->
    <nav class="main-nav" aria-label="Menu principale">
        <ul class="nav-list" id="mainNavList">
            <li><a href="/index.asp">Home</a></li>
            <li><a href="/pagina.asp?pg=1">Chi Siamo</a></li>
            <li><a href="/pagina.asp?pg=3">Come Comprare</a></li>
            <li><a href="/pagina.asp?pg=4">Contatti</a></li>
            <li><a href="/pagina.asp?pg=5">Foto Clienti</a></li>
            <li><a href="/pagina.asp?pg=9">Modulo Misure</a></li>
            <li><a href="/pagina.asp?pg=10">Listino</a></li>
            <li><a href="/pagina.asp?pg=11">Gallery</a></li>
            <li><a href="/pagina.asp?pg=12">Condizioni Vendita</a></li>
            <li><a href="/pagina.asp?pg=14">Eventi</a></li>
            <li><a href="/pagina.asp?pg=15">Links Utili</a></li>
        </ul>
    </nav>
</header>

<!-- ===== LAYOUT PRINCIPALE ===== -->
<div class="page-wrapper">

    <!-- SIDEBAR -->
    <aside class="sidebar">
        <div class="catalog-section">
            <h2 class="tit_catalogo">Catalogo Neos</h2>
            <form action="catalogo.asp" method="post" class="search-form">
                <input type="text" placeholder="Ricerca prodotto" name="cercap" id="cercap">
                <input type="submit" value="Cerca">
                <input type="hidden" name="act" value="33">
            </form>

            <!-- Navigazione Catalogo DINAMICA dal DB -->
            <nav class="catalog-nav" aria-label="Categorie prodotto">
                <ul id="catalogList" class="catalog-list">
                <%
                ' -----------------------------------------------
                ' CATEGORIE PRINCIPALI (senza padre)
                ' -----------------------------------------------
                Dim rsCat, rsSub
                Set rsCat = conn.Execute("SELECT id, reparto FROM reparti WHERE id_padre=0 OR id_padre IS NULL ORDER BY reparto")
                Do While Not rsCat.EOF
                    Dim catId, catNome
                    catId   = rsCat("id")
                    catNome = rsCat("reparto")

                    ' Controlla se ha sottocategorie
                    Set rsSub = conn.Execute("SELECT id, reparto FROM reparti WHERE id_padre=" & catId & " ORDER BY reparto")
                    If Not rsSub.EOF Then
                %>
                    <li class="catalog-item has-submenu">
                        <a href="/catalogo.asp?id=<%=catId%>&reparto=<%=Server.URLEncode(catNome)%>">
                            <%=catNome%> <span class="arrow">›</span>
                        </a>
                        <ul class="submenu">
                        <%
                        Do While Not rsSub.EOF
                        %>
                            <li><a href="/catalogo.asp?id=<%=rsSub("id")%>&reparto=<%=Server.URLEncode(rsSub("reparto"))%>"><%=rsSub("reparto")%></a></li>
                        <%
                            rsSub.MoveNext
                        Loop
                        %>
                        </ul>
                    </li>
                <%
                    Else
                %>
                    <li class="catalog-item">
                        <a href="/catalogo.asp?id=<%=catId%>&reparto=<%=Server.URLEncode(catNome)%>"><%=catNome%></a>
                    </li>
                <%
                    End If
                    rsSub.Close
                    rsCat.MoveNext
                Loop
                rsCat.Close
                %>
                </ul>
            </nav>
        </div>
    </aside>

    <!-- CONTENUTO PRINCIPALE -->
    <main class="main-content">

        <!-- Banner -->
        <div class="banner-container">
            <img src="img_home/banner.jpg" alt="Neos Sub Banner">
        </div>

        <!-- Video -->
        <div class="video-container">
            <iframe 
                src="https://www.youtube.com/embed/-4Y_6Q9t76E?autoplay=1&mute=1&loop=1&playlist=-4Y_6Q9t76E&controls=0&rel=0" 
                frameborder="0" 
                allowfullscreen
                allow="autoplay"
                title="Video Presentazione Neos Sub">
            </iframe>
        </div>

        <!-- News DINAMICHE dal DB -->
        <section class="news-section">
            <h2 class="section-title">News ed Eventi Neos Sub</h2>
            <div class="news-list">
            <%
            Dim rsNews
            Set rsNews = conn.Execute("SELECT TOP 5 id, titolo FROM news ORDER BY id DESC")
            Do While Not rsNews.EOF
            %>
                <article class="news-item">
                    <span class="news-arrow">›</span>
                    <a href="news.asp?id=<%=rsNews("id")%>" rel="zoom"><%=rsNews("titolo")%></a>
                </article>
            <%
                rsNews.MoveNext
            Loop
            rsNews.Close
            %>
            </div>
        </section>

        <!-- Prodotti in Vetrina DINAMICI dal DB -->
        <section class="featured-section">
            <h2 class="section-title">Prodotti in Vetrina</h2>
            <div class="products-grid">
            <%
            ' -----------------------------------------------
            ' Prende 18 prodotti casuali con foto e vetrina=1
            ' Adatta il nome tabella/colonne se necessario
            ' -----------------------------------------------
            Dim rsProd
            Set rsProd = conn.Execute("SELECT TOP 18 id, nome, descr, foto FROM prodotti WHERE vetrina=1 AND attivo=1 ORDER BY Rnd(id)")
            Do While Not rsProd.EOF
                Dim pId, pNome, pDesc, pFoto
                pId   = rsProd("id")
                pNome = rsProd("nome")
                pDesc = Left(rsProd("descr"), 80) & "..."
                pFoto = rsProd("foto")
            %>
                <article class="product-card">
                    <a href="/prodotto.asp?id=<%=pId%>" class="product-img-wrap">
                        <img src="public/catalogo/<%=pFoto%>" alt="<%=pNome%>" class="product-img">
                    </a>
                    <div class="product-info">
                        <h3 class="product-name"><a href="/prodotto.asp?id=<%=pId%>"><%=pNome%></a></h3>
                        <p class="product-desc"><%=pDesc%></p>
                    </div>
                </article>
            <%
                rsProd.MoveNext
            Loop
            rsProd.Close
            %>
            </div>
        </section>

    </main>
</div>

<!-- ===== FOOTER ===== -->
<footer class="main-footer">
    <div class="footer-inner">
        <p>Neos Sub — Mute su Misura / Accessori in Neoprene / Articoli Subacquea</p>
        <span class="footer-loc">Collepasso (LE)</span>
    </div>
</footer>

<!-- ===== POPUP ===== -->
<div id="popup-container">
    <div id="popup-window">
        <button type="button" class="close" id="closePopup" aria-label="Chiudi">✕</button>
        <div class="splash-bg">
            <h2>Orario di Apertura</h2>
            <p>Chiamare per accertarsi che sia aperto.<br>
               <strong>Lun–Ven:</strong> 08:00–13:00 / 15:00–19:00<br>
               Altri giorni su appuntamento.</p>
            <img src="public/catalogo/Immagine1.jpg" alt="Neos Sub" id="foto1">
        </div>
    </div>
</div>

<!-- Google Translate -->
<script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
<script src="neos-sub.js"></script>

<%
' Chiudi connessione DB
conn.Close
Set conn = Nothing
%>

</body>
</html>
