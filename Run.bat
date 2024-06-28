
color c
@ECHO OFF
SET BINDIR=%~dp0
CD /D "%BINDIR%"
java -Dfile.encoding=UTF-8 -Xmx1024M -Xms1024M -jar Prison.jar
PAUSE