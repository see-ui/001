@echo off
setlocal EnableExtensions
chcp 65001 >nul
title Xuqiec 管理控制台

:menu
cls
echo ==========================================
echo        Xuqiec 后台管理控制台
echo ==========================================
echo   1. 发布更新
echo   2. 运行 API 服务
echo   3. 停止 API 服务
echo   4. 退出脚本
echo ==========================================
set "choice="
set /p "choice=请输入选项数字 (1-4): "

if "%choice%"=="1" goto publish
if "%choice%"=="2" goto start_server
if "%choice%"=="3" goto stop_server
if "%choice%"=="4" goto end
echo 无效选项，请重新输入。
timeout /t 1 /nobreak >nul
goto menu

:publish
echo.
echo ==========================================
echo           发布更新
echo ==========================================

:commit_input_loop
set "commit_msg="
set /p "commit_msg=请输入本次更新说明（不能为空）: "
if "%commit_msg%"=="" (
    echo 更新说明不能为空，请重新输入。
    goto commit_input_loop
)

echo.
echo 检查文件变更...
git status --porcelain >nul 2>&1
if errorlevel 1 (
    echo [错误] 当前目录不是 Git 仓库或 Git 不可用。
    goto publish_done
)

set "has_changes="
for /f "delims=" %%i in ('git status --porcelain') do set "has_changes=yes"
if not defined has_changes (
    echo 没有检测到文件变更，无需发布。
    goto publish_done
)

echo 正在提交变更...
git add .
git commit -m "%commit_msg%"
if errorlevel 1 (
    echo [错误] 提交失败，请检查上方错误信息。
    goto publish_done
)

echo.
echo 正在推送到 GitHub...
git push origin main
if errorlevel 1 (
    echo 普通推送失败，正在尝试强制推送...
    git push -f origin main
    if errorlevel 1 (
        echo [错误] 强制推送也失败，请检查上方错误信息。
    ) else (
        echo 强制推送成功！
    )
) else (
    echo 推送成功！
)

:publish_done
echo.
echo 操作结束，请按任意键返回菜单...
pause >nul
goto menu

:start_server
echo.
echo ==========================================
echo           运行 API 服务
echo ==========================================
netstat -ano | findstr ":3000" | findstr "LISTENING" >nul 2>&1
if %errorlevel%==0 (
    echo 服务器已在运行，无需重复启动。
) else (
    echo 正在启动服务器...
    start "Xuqiec Admin Server" /min cmd /k "cd /d "%~dp0" && node server.js"
    echo 等待服务器启动...
    timeout /t 3 /nobreak >nul
    echo 服务器已启动，请访问 http://localhost:3000/admin.html
)
echo.
echo 操作结束，请按任意键返回菜单...
pause >nul
goto menu

:stop_server
echo.
echo ==========================================
echo           停止 API 服务
echo ==========================================
for /f "tokens=5" %%i in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do (
    echo 找到进程 PID: %%i
    taskkill /f /pid %%i >nul 2>&1
    if errorlevel 1 (
        echo 无法结束进程 %%i，可能需要管理员权限。
    ) else (
        echo 进程 %%i 已结束。
    )
    goto stop_done
)
echo 没有检测到正在运行的服务。

:stop_done
echo.
echo 操作结束，请按任意键返回菜单...
pause >nul
goto menu

:end
echo.
echo 感谢使用，再见！
timeout /t 1 /nobreak >nul
endlocal
exit /b 0