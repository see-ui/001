@echo off
set /p msg=请输入本次更新说明: 
git add .
git commit -m "%msg%"
git push origin main
echo 发布完成！
pause