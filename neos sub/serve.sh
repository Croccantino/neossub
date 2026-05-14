#!/bin/bash
# Avvia un server HTTP locale per mostrare l'HTML in un browser.
# Esegui questo script dalla cartella "neos sub".
cd "$(dirname "$0")"
python3 -m http.server 8000
