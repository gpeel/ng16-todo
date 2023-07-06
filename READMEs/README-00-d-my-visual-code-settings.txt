https://code.visualstudio.com/download

To reset everything remove c:/users/<username>/.vscode folder if you already have it
And also remove  %APPDATA%\Code\ folder
For me its C:\Users\gauth\AppData\Roaming\Code ...
- install exe
- disable telemetry (waste of time)
From File > Preferences > Settings (macOS: Code > Preferences > Settings), search for telemetry,
and uncheck the Telemetry: Enable Telemetry setting. This will silence all telemetry events from VS Code going forward.


VC PLUGINs
==========
        npm install -g typescript

- Read the official doc !
https://code.visualstudio.com/docs/typescript/typescript-tutorial

- ESLint plugin
- Code Runner
    npm i -g ts-node
- Angular Language Service (allows inline template and inline css intellisense (non need for angular2-inline anymore))
- Angular Schematics (allows component skeleton generation)
- Angular 2 Typescript Emmet


SHORTCUTs and custo
===================

IDE zoom
For Laptop
on french keyboard => redefine Zoom out / and Zoom and reset Zoom
Preferences > Keyboard Shortcuts , search 'zoom'
Define Global Zoom in: CTRL+ +
Define Global Zoom out: CTRL+Shift+ +
Zoom reset CTRL+à (and remove original View:Focus into Side Bar which has the same shortcut)
Define Editor Zoom in : CTRL+Shift+i  (remove original: toggle dev tools not at all used, only for vc-plugin-developpment )
Define Editor Zoom out : CTRL+Alt+i

Mandatory Shorcuts
===================
GO to next PB in editor: ALT+F8
"Quick Fix" popup: CTRL + ;


Singles Quotes => edit Settings => search quote and choose Typescript items => choose 2 select value as 'single'
So imports are now done with single quotes
autofix on eslint => add folowwing on settings.json by hand=> When in the Preferences ui,
click on the upper right icon to open settings.json file
Add:
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      },

For info, my Complete settings.json file is
{
  "telemetry.enableTelemetry": false,
  "telemetry.enableCrashReporter": false,
  "workbench.colorTheme": "Default Dark+",
  "javascript.preferences.quoteStyle": "single",
  "typescript.preferences.quoteStyle": "single",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "editor.suggest.showWords": false,
  "files.autoSave": "onWindowChange",
  "html.format.wrapAttributes": "preserve",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.suggest.localityBonus": true,
  "editor.fontSize": 15,
}

Turn Autosave on => File -> Autosave
will save after a delay (not good enough though)
Go to settings - search autosave - choose onWindowChange.
With VC unhopefully you can't have both the onWindowChange and the delay.


Useful Shortcuts
================
Nav between Editor Tabs Ctrl + tab + tab +....  (choose in the list)
Toggle Terminal: Ctrl+ù   (CTrl+ Shift + ù => new Terminal)
Toggle PB : Ctrl + Shift + m
Toggle Output Ctrl + Shift + U
Move your selected code : alt + arrow up or down
Format Shift + Alt + F
Format on Save (in Settings =>   seach format and check the box)
Define Focus on SideBar Ctrl+F1 (changed from Ctrl + à originally) (in my case Ctrl+à is attributed to reset Zoom)
Close all files : Ctrl+shift+F4 (added (like in eclipse))
Toggle SideBar Ctrl+B
Toggle Line Comment Ctrl+:   (Ctrl+key/)
ACTION => SHIFT + CTRL + P
    >

User Snippets
// @ts-ignore
    "Add // @ts-ignore" for a line: {
        "prefix": "tsi",
        "body": [
            "// @ts-ignore"
        ],
        "description": "Active for the next line adds:// @ts-ignore"
    }

Split editor CTRL+*
Hover code overview CTRL + hover
Only if on the same file
    Hover sticky code overview CTRL + hover + click (toggle)
Otherwise CTRL+click on a class.method open the class file

Remove CTRL+Q on View: Quick Open View (Explorer, Source Control .. Problem, Output, Terminal)
to give that shortcut lo : Last Edit location


Multi Selecting text
CTRL + D  select next occurence of the same highlighted text
CTRL + SHIFT + L select ALL occurences

Clean typescript imports
Alt+Shift + O

VC intellisense
Settings -> seach ditor.suggest.localityBonus => and check (otherwise the method parameters do not appear in options)
And to make it work, restart VC !

Usage reference of a method : Shift + Alt + F12 or ADDED Shift + Alt + F7
Peek usage  (added shortcut) Alt + F7

Edit Selection
MULTI LINE Shif+Alt+ click  abd drag
Add a new Cursor Alt+click


