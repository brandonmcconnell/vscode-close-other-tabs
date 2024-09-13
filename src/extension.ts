import * as vscode from 'vscode';


enum CloseDirection {
  left,
  right,
  both
}
export function activate(context: vscode.ExtensionContext) {
  let closeNonActiveTabGroupsDisposable = vscode.commands.registerCommand('extension.closeNonActiveTabGroups', async () => {
    await closeNonActiveTabGroups();
  });

  let closeNonActiveTabsInCurrentGroupDisposable = vscode.commands.registerCommand('extension.closeNonActiveTabsInCurrentGroup', async () => {
    await closeNonActiveTabsInCurrentGroup();
  });

  let closeNonActiveTabsFromLeftInCurrentGroupDisposable = vscode.commands.registerCommand('extension.closeNonActiveTabsFromLeftInCurrentGroup', async () => {
    await closeNonActiveTabsInCurrentGroup(CloseDirection.left);
  });

  let closeNonActiveTabsFromRightInCurrentGroupDisposable = vscode.commands.registerCommand('extension.closeNonActiveTabsFromRightInCurrentGroup', async () => {
    await closeNonActiveTabsInCurrentGroup(CloseDirection.right);
  });

  let closeNonActiveTabsInEachGroupDisposable = vscode.commands.registerCommand('extension.closeNonActiveTabsInEachGroup', async () => {
    await closeNonActiveTabsInEachGroup();
  });

  let closeNonActiveTabsInAllGroupsDisposable = vscode.commands.registerCommand('extension.closeNonActiveTabsInAllGroups', async () => {
    await closeNonActiveTabsInAllGroups();
  });

  context.subscriptions.push(closeNonActiveTabGroupsDisposable);
  context.subscriptions.push(closeNonActiveTabsFromLeftInCurrentGroupDisposable);
  context.subscriptions.push(closeNonActiveTabsFromRightInCurrentGroupDisposable);
  context.subscriptions.push(closeNonActiveTabsInCurrentGroupDisposable);
  context.subscriptions.push(closeNonActiveTabsInEachGroupDisposable);
  context.subscriptions.push(closeNonActiveTabsInAllGroupsDisposable);
}

async function closeTabsInGroup(tabGroup: vscode.TabGroup, direction: CloseDirection = CloseDirection.both) {
  const tabs = tabGroup.tabs;
  if (!tabs.length) {
    return;
  }

  const activeTab = tabGroup.activeTab;
  const activeTabIndex = tabs.findIndex(tab => tab === activeTab);
  if (!activeTab) {
    vscode.window.showWarningMessage('Skipping a tab group without an active tab.');
    return;
  }
  let tabsToClose: vscode.Tab[] = [];
  switch(direction) {
    case CloseDirection.both:
      tabsToClose = tabs.filter(tab => tab !== activeTab);
      break;
      case CloseDirection.left:
        tabsToClose = tabs.slice(0, activeTabIndex);
        break;
      case CloseDirection.right:
        tabsToClose = tabs.slice(activeTabIndex + 1);
        break;
  }
  await Promise.all(tabsToClose.map(tab => vscode.window.tabGroups.close(tab)));
}

async function closeNonActiveTabGroups() {
  const tabGroups = vscode.window.tabGroups;
  const allTabGroups = tabGroups.all;
  const activeTabGroup = tabGroups.activeTabGroup;
  const nonActiveTabGroups = allTabGroups.filter(tabGroup => tabGroup !== activeTabGroup);

  if (!allTabGroups.length) {
    vscode.window.showErrorMessage('No tab groups found.');
    return;
  }
  if (!activeTabGroup) {
    vscode.window.showErrorMessage('No active tab group found.');
    return;
  }
  if (!nonActiveTabGroups.length) {
    vscode.window.showErrorMessage('No non-active tab groups found.');
    return;
  }
  
  await Promise.all(nonActiveTabGroups.map(tabGroup => vscode.window.tabGroups.close(tabGroup)));
}

async function closeNonActiveTabsInCurrentGroup(direction: CloseDirection = CloseDirection.both) {
  const currentTabGroup = vscode.window.tabGroups.activeTabGroup;

  if (!currentTabGroup) {
    vscode.window.showErrorMessage('No active tab group found.');
    return;
  }

  await closeTabsInGroup(currentTabGroup, direction);
}

async function closeNonActiveTabsInEachGroup() {
  const tabGroups = vscode.window.tabGroups;
  const allTabGroups = tabGroups.all;

  if (!allTabGroups.length) {
    vscode.window.showErrorMessage('No tab groups found.');
    return;
  }

  await Promise.all(allTabGroups.map(closeTabsInGroup));
}

async function closeNonActiveTabsInAllGroups() {
  await Promise.all([closeNonActiveTabGroups(), closeNonActiveTabsInCurrentGroup()]);
}

export function deactivate() {}