#!/bin/sh
set -e

echo "Esperando que MySQL esté listo..."
# Esperar a que MySQL esté realmente disponible
until pnpm db:push 2>/dev/null; do
  echo "Base de datos no lista, reintentando en 2 segundos..."
  sleep 2
done

echo "Migraciones aplicadas exitosamente"

# Ejecutar el comando principal
exec "$@"
