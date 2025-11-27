#!/bin/bash
set -e

# Restaura e roda a API apontando para a porta do Railway
dotnet restore
dotnet run --project GustavoPortfolio.API/GustavoPortfolio.API.csproj --urls "http://0.0.0.0:${PORT}"