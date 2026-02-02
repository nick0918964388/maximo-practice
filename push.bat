@echo off
echo [Maximo 實戰] 正在準備上傳到 GitHub...
cd maximo-practice
git init
git add .
git commit -m "Initial commit with first two articles"
git branch -M main
git remote add origin https://github.com/nick0918964388/maximo-practice.git
echo.
echo === 準備就緒 ===
echo 請執行以下指令完成最後上傳 (可能需要輸入 GitHub 帳密或 Token):
echo git push -u origin main
pause
