Set WshShell = CreateObject("Wscript.Shell")
cmd = "cmd /c """"" & WScript.ScriptFullName & "\..\start.bat"""""
WshShell.Run cmd, 0, False