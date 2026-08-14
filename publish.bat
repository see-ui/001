@echo off
echo 当前目录: %cd%
git status
git add .
git commit -m "更新商品数据"
git push origin main
echo 发布完成！
pause