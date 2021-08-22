﻿@echo off

::提前清理用于判断PA安装程序是否结束的文件防止程序提前退出
if exist ".\GoogleChromePortableBeta\Data\PortableApps.comInstaller\license.ini" del /f /q ".\GoogleChromePortableBeta\Data\PortableApps.comInstaller\license.ini"

::重命名，否则PA安装程序无法运行，顺便移动程序
move target.exe .\build\Chromebeta_online.paf.exe

::启动pecmd实现按键模拟
start .\utils\pecmd.exe .\utils\press.wcs

::启动安装程序
cd build
start Chromebeta_online.paf.exe

::循环判断PA安装是否结束
:loop
ping 127.0.0.1 -n 1 >nul
if not exist ".\GoogleChromePortableBeta\Data\PortableApps.comInstaller\license.ini" goto loop
echo Finish
cd ..

::延迟结束进程
ping 127.0.0.1 -n 5 >nul
cmd /c "taskkill /f /im Chromebeta_online.paf.exe"
ping 127.0.0.1 -n 3 >nul

::删除安装包
del /f /q .\build\Chromebeta_online.paf.exe

::拷贝程序文件，不使用move的原因是此时可能文件锁未被释放导致move可能执行失败
::xcopy /s /r /y .\GoogleChromePortableBeta\ .\build\google_chromebeta_bot\

::生成外置批处理
echo LINK X:\Users\Default\Desktop\ChromeBeta,X:\Program Files\Edgeless\GoogleChromePortableBeta\GoogleChromePortable.exe,https://www.baidu.com >./build/google_chromebeta_bot.wcs