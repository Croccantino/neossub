// data.js - sostituisce il database neossub.mdb
// modifica qui i dati direttamente

const DB = {

    // categorie del catalogo, id_padre: 0 = categoria principale
    reparti: [
        { id: 1, reparto: "Arbalete",        id_padre: 0 },
        { id: 2, reparto: "In Legno",        id_padre: 1 },
        { id: 3, reparto: "In Alluminio",    id_padre: 1 },
        { id: 4, reparto: "Mute",            id_padre: 0 },
        { id: 5, reparto: "Mute Monopezzo",  id_padre: 4 },
        { id: 6, reparto: "Mute Bizip",      id_padre: 4 },
        { id: 7, reparto: "Accessori",       id_padre: 0 },
        { id: 8, reparto: "Pinne",           id_padre: 7 },
        { id: 9, reparto: "Maschere",        id_padre: 7 },
    ],

    // ultime news mostrate in home
    news: [
        { id: 5, titolo: "Nuovi modelli di arbalete in legno disponibili" },
        { id: 4, titolo: "Stagione 2024: apertura ordini mute su misura" },
        { id: 3, titolo: "Partecipazione alla fiera di Rimini 2024" },
        { id: 2, titolo: "Aggiornamento listino prezzi primavera" },
        { id: 1, titolo: "Benvenuti nel nuovo sito Neos Sub" },
    ],

    // prodotti in vetrina, vetrina: 1 = mostrato in home, attivo: 1 = visibile
    prodotti: [
        { id: 1, nome: "Arbalete Elite 100",  descr: "Arbalete artigianale in legno pregiato, lunghezza 100cm, ideale per acque mediterranee.", foto: "arbalete_elite_100.jpg", vetrina: 1, attivo: 1 },
        { id: 2, nome: "Arbalete Sport 80",   descr: "Modello compatto in legno di teak, ottimo per la pesca in acque basse e scogliere.",       foto: "arbalete_sport_80.jpg",  vetrina: 1, attivo: 1 },
        { id: 3, nome: "Muta Monopezzo 5mm",  descr: "Muta su misura in neoprene 5mm, elastica e confortevole per lunghe sessioni di apnea.",   foto: "muta_mono_5mm.jpg",      vetrina: 1, attivo: 1 },
        { id: 4, nome: "Muta Bizip 7mm",      descr: "Muta bizip su misura in neoprene 7mm, ideale per temperature più basse.",                 foto: "muta_bizip_7mm.jpg",     vetrina: 1, attivo: 1 },
        { id: 5, nome: "Pinna Carbon Pro",    descr: "Pinna in fibra di carbonio ad alto rendimento, per nuotatori esperti.",                   foto: "pinna_carbon_pro.jpg",   vetrina: 1, attivo: 1 },
        { id: 6, nome: "Maschera Vision HD",  descr: "Maschera a basso volume con vetro temperato HD, campo visivo ampio.",                     foto: "maschera_vision_hd.jpg", vetrina: 1, attivo: 1 },
    ],
};
