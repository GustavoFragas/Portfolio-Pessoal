# Script para iniciar Backend e Frontend simultaneamente

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Iniciando Gustavo Portfolio - Fullstack App    " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Iniciar Backend
Write-Host "[BACKEND] Iniciando API .NET..." -ForegroundColor Green
$backendJob = Start-Job -ScriptBlock {
    Set-Location "C:\gustavodocuments\PortfolioPessoal\GustavoPortfolio.API"
    dotnet run
}

Start-Sleep -Seconds 3

# Iniciar Frontend
Write-Host "[FRONTEND] Iniciando React App..." -ForegroundColor Blue
$frontendJob = Start-Job -ScriptBlock {
    Set-Location "C:\gustavodocuments\PortfolioPessoal\client"
    npm run dev
}

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Aplicação iniciada com sucesso!                " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend (API):  http://localhost:5000" -ForegroundColor Green
Write-Host "Swagger:        http://localhost:5000/swagger" -ForegroundColor Green
Write-Host "Frontend:       http://localhost:5173" -ForegroundColor Blue
Write-Host ""
Write-Host "Pressione Ctrl+C para parar ambos os servidores" -ForegroundColor Yellow
Write-Host ""

# Aguardar até que o usuário pressione Ctrl+C
try {
    Wait-Job $backendJob, $frontendJob
}
finally {
    Write-Host ""
    Write-Host "Parando servidores..." -ForegroundColor Yellow
    Stop-Job $backendJob, $frontendJob
    Remove-Job $backendJob, $frontendJob
    Write-Host "Servidores parados." -ForegroundColor Red
}
