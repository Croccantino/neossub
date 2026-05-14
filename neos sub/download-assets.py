#!/usr/bin/env python3
import shutil
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

BASE_URL = 'https://neossub.it'
PROJECT_ROOT = Path(__file__).resolve().parent

raw_items = [
    ('img_home/banner.jpg', '/img_home/banner.jpg'),
    ('img_home/logo_neos.png', '/img_home/logo_neos.png'),
    ('public/catalogo/Immagine1.jpg', '/public/catalogo/Immagine1.jpg'),
]

thumbnail_names = [
    'SANY1906.jpg',
    'boa tasca.jpg',
    'orizzontale.jpg',
    'scarpette-mare-junior-mares.jpg',
    'termogiacca.jpg',
    'BERMUDA A TAGLIA.jpg',
    'images 1_1.jpg',
    'SANY0049.jpg',
    'SANY2399.jpg',
    'SANY2744.jpg',
    'corpetto.jpg',
    'SANY1477_1.jpg',
    'SANY0053.jpg',
    'mares-aquawalk-man.jpg',
    'SANY0016_1.jpg',
    'predathor.jpg',
    'richiamo.jpg',
    'ocean hunter.jpg',
    'kit sostituzione rapida parti in lattice.jpg',
]

for name in thumbnail_names:
    raw_items.append((f'public/catalogo/{name}', '/public/catalogo/anteprima.aspx?' + urlencode({'opx': 120, 'img': name})))


def download_item(dest_path, url):
    dest = PROJECT_ROOT / dest_path
    dest.parent.mkdir(parents=True, exist_ok=True)
    print(f'Downloading {url} -> {dest}')
    req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urlopen(req, timeout=30) as response:
        with open(dest, 'wb') as out_file:
            shutil.copyfileobj(response, out_file)


if __name__ == '__main__':
    for dest_path, url_path in raw_items:
        full_url = url_path if url_path.startswith('http') else BASE_URL + url_path
        try:
            download_item(dest_path, full_url)
        except Exception as exc:
            print(f'ERROR downloading {full_url}: {exc}')
            break
