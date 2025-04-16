#!/bin/sh

echo "Aguardando banco de dados subir..."

while ! nc -z db 5432; do
  sleep 1
done

echo "Banco disponível! Iniciando servidor..."

node src/server.js

