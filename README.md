# Close Other Tabs & Tab Groups for VSCode

_Close all tabs and/or tab groups except for the currently active one(s), inspired by the [CloseOtherWindows](https://packagecontrol.io/packages/CloseOtherWindows) Sublime Text extension_

This VSCode extension helps you manage your open tabs and tab groups more efficiently. It provides three commands with customizable keybindings to close all non-active tabs within the same tab group, close all non-active tab groups, and close all non-active tabs in all tab groups.

<h4>Table of Contents</h4>
<ul>
  <li><a href="#features--usage">Features &amp; Usage</a></li>
  <li><a href="#examples">Examples</a></li>
  <li><a href="#installation">Installation</a></li>
  <li><a href="#contributing">Contributing</a></li>
</ul>


## Features & Usage

You can access the commands via the Command Palette (Ctrl+Shift+P (Windows) or Cmd+Shift+P (macOS)) by searching for the following commands orby using their keybinding equivalents:

1. **Close other (non-active) tab groups**

    Command: `Close other (non-active) tab groups`
    
    Keybindings:
    * macOS: `Option ⌥`+`Cmd ⌘`+`Shift ⇧`+`W`
    * Other: `Alt ⎇`+`Super ❖`+`Shift ⇧`+`W`

2. **Close other (non-active) tabs in current tab group**

    Command: `Close other (non-active) tabs in current tab group`
    
    Keybindings:
    * macOS: `Ctrl ^`+`Cmd ⌘`+`Shift ⇧`+`W`
    * Other: `Ctrl ^`+`Super ❖`+`Shift ⇧`+`W`

3. **Close other (non-active) tabs in each tab group**

    Command: `Close other (non-active) tabs in each tab group`
    
    Keybindings:
    * macOS: `Ctrl ^`+`Option ⌥`+`Shift ⇧`+`W`
    * Other: `Ctrl ^`+`Alt ⎇`+`Shift ⇧`+`W`

4. **Close other (non-active) tabs and tab groups everywhere**

    Command: `Close other (non-active) tabs and tab groups everywhere`
    
    Keybindings:
    * macOS: `Option ⌥`+`Shift ⇧`+`W`
    * Other: `Alt ⎇`+`Shift ⇧`+`W`

## Examples

Assume for all examples below that this filled circle symbol `●` denotes an active tab or tab group, and that the unfilled circle symbol `○` denotes a non-active tab or tab group.

#### Initial setup used for all examples

```
● Group 1 │ ○ a.txt ○ b.txt ● c.txt
○ Group 2 │ ○ d.txt ● e.txt
○ Group 3 │ ● f.txt ○ g.txt
```

<details><summary><strong>Close other (non-active) tab groups</strong></summary>
&nbsp;

**Command:** `Close other (non-active) tab groups`

**Keybindings:**
* macOS: `Option ⌥`+`Cmd ⌘`+`Shift ⇧`+`W`
* Other: `Alt ⎇`+`Super ❖`+`Shift ⇧`+`W`

**Result:**
```
● Group 1 │ ○ a.txt ○ b.txt ● c.txt
```

</details><details><summary><strong>Close other (non-active) tabs in current tab group</strong></summary>
&nbsp;

**Command:** `Close other (non-active) tabs in current tab **group`**

**Keybindings:**
* macOS: `Ctrl ^`+`Cmd ⌘`+`Shift ⇧`+`W`
* Other: `Ctrl ^`+`Super ❖`+`Shift ⇧`+`W`

**Result:**
```
● Group 1 │ ● c.txt
○ Group 2 │ ○ d.txt ● e.txt
○ Group 3 │ ● f.txt ○ g.txt
```

</details><details><summary><strong>Close other (non-active) tabs in each tab group</strong></summary>
&nbsp;

**Command:** `Close other (non-active) tabs in each tab group`

**Keybindings:**
* macOS: `Ctrl ^`+`Option ⌥`+`Shift ⇧`+`W`
* Other: `Ctrl ^`+`Alt ⎇`+`Shift ⇧`+`W`

**Result:**
```
● Group 1 │ ● c.txt
○ Group 2 │ ● e.txt
○ Group 3 │ ● f.txt
```

</details><details><summary><strong>Close other (non-active) tabs and tab groups </strong>erywhere

</summary>
&nbsp;

**Command:** `Close other (non-active) tabs and tab groups **everywhere`**

**Keybindings:**
* macOS: `Option ⌥`+`Shift ⇧`+`W`
* Other: `Alt ⎇`+`Shift ⇧`+`W`

**Result:**
```
● Group 1 │ ● c.txt
```

</details>

## Installation

You can install this extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=dreamthinkbuild.close-other-tabs).

## Contributing

Feel free to submit issues, feature requests, or pull requests for this extension on the official [GitHub repository](https://github.com/brandonmcconnell/vscode-close-other-tabs).