import * as assert from 'assert';
import * as vscode from 'vscode';

const stringifyJSON = (obj: any, space?: string | number) => {
  const seen = new WeakSet();
  return JSON.stringify(obj, (k, v) => {
    if (v !== null && typeof v === 'object') {
      if (seen.has(v)) {
				return;
			}
      seen.add(v);
    }
    return v;
  }, space);
};

const isOpenClosed = (openDocs: vscode.TextDocument[], closedDocs: vscode.TextDocument[]) => {
	return openDocs.every(doc => doc.isClosed === false) && closedDocs.every(doc => doc.isClosed === true);
};

const docIsStatus = (doc: vscode.TextDocument, status: 'open' | 'closed') => {
	return status === 'open' && !doc.isClosed || status === 'closed' && doc.isClosed;
}

const getDocsByStatus = (docs: Record<string, vscode.TextDocument>, status: 'open' | 'closed') => {
	return Object.entries(docs).reduce((accu: string[], [name, doc]) => {
		if (docIsStatus(doc, status)) {
			accu.push(name);
		}
		return accu;
	}, []);
};

const getOpenDocs = (docs: Record<string, vscode.TextDocument>) => getDocsByStatus(docs, 'open');
const getClosedDocs = (docs: Record<string, vscode.TextDocument>) => getDocsByStatus(docs, 'closed');

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('Close other (non-active) tab groups', async () => {
    // Activate the extension
    const extension = vscode.extensions.getExtension('dreamthinkbuild.close-other-tabs');
    if (!extension) {
      throw new Error('Extension not found');
    }
    await extension.activate();

		// Open several documents
		const doc1 = await vscode.workspace.openTextDocument({ content: 'Document 1' });
		const doc2 = await vscode.workspace.openTextDocument({ content: 'Document 2' });
		const doc3 = await vscode.workspace.openTextDocument({ content: 'Document 3' });
		const doc4 = await vscode.workspace.openTextDocument({ content: 'Document 4' });
		const doc5 = await vscode.workspace.openTextDocument({ content: 'Document 5' });
		const doc6 = await vscode.workspace.openTextDocument({ content: 'Document 6' });
		const allDocs = { doc1, doc2, doc3, doc4, doc5, doc6 };

		// Show the documents in the editor
		await vscode.window.showTextDocument(doc1, { viewColumn: vscode.ViewColumn.One });
		await vscode.window.showTextDocument(doc2, { viewColumn: vscode.ViewColumn.One });
		await vscode.window.showTextDocument(doc3, { viewColumn: vscode.ViewColumn.Two });
		await vscode.window.showTextDocument(doc4, { viewColumn: vscode.ViewColumn.Two });
		await vscode.window.showTextDocument(doc5, { viewColumn: vscode.ViewColumn.Three });
		await vscode.window.showTextDocument(doc6, { viewColumn: vscode.ViewColumn.Three });

    // Execute the command
    await vscode.commands.executeCommand('extension.closeNonActiveTabGroups');

    // Check to ensure the active tab group is still open and unaffected and all other tab groups are closed
    assert.strictEqual(vscode.window.tabGroups.all.length, 1, 'There should be 1 tab group');
		assert.strictEqual(vscode.window.tabGroups.activeTabGroup.tabs.length, 2, 'There should be 2 tabs in the active tab group');
    assert.strictEqual(isOpenClosed([doc5, doc6], [doc1, doc2, doc3, doc4]), true, `Only doc5 and doc6 should remain open, but the open docs are ${getOpenDocs(allDocs).join(', ')}`);
  });

	test('Close other (non-active) tabs in current tab group', async () => {
		// Activate the extension
		const extension = vscode.extensions.getExtension('dreamthinkbuild.close-other-tabs');
		if (!extension) {
			throw new Error('Extension not found');
		}
		await extension.activate();

		// Open several documents
		const doc1 = await vscode.workspace.openTextDocument({ content: 'Document 1' });
		const doc2 = await vscode.workspace.openTextDocument({ content: 'Document 2' });
		const doc3 = await vscode.workspace.openTextDocument({ content: 'Document 3' });
		const doc4 = await vscode.workspace.openTextDocument({ content: 'Document 4' });
		const doc5 = await vscode.workspace.openTextDocument({ content: 'Document 5' });
		const doc6 = await vscode.workspace.openTextDocument({ content: 'Document 6' });
		const allDocs = { doc1, doc2, doc3, doc4, doc5, doc6 };

		// Show the documents in the editor
		await vscode.window.showTextDocument(doc1, { viewColumn: vscode.ViewColumn.One });
		await vscode.window.showTextDocument(doc2, { viewColumn: vscode.ViewColumn.One });
		await vscode.window.showTextDocument(doc3, { viewColumn: vscode.ViewColumn.Two });
		await vscode.window.showTextDocument(doc4, { viewColumn: vscode.ViewColumn.Two });
		await vscode.window.showTextDocument(doc5, { viewColumn: vscode.ViewColumn.Three });
		await vscode.window.showTextDocument(doc6, { viewColumn: vscode.ViewColumn.Three });

		// Execute the command
		await vscode.commands.executeCommand('extension.closeNonActiveTabsInCurrentGroup');

		// Check to ensure non-active tabs were closed in the current tab group and not in other tab groups
		assert.strictEqual(vscode.window.tabGroups.all.length, 3, 'There should be 3 tab groups');
    	assert.strictEqual(vscode.window.tabGroups.activeTabGroup.tabs.length, 1, 'There should be 1 tab in the active group');
    	assert.strictEqual(vscode.window.tabGroups.all.filter(group => !group.activeTab).every(group => group.tabs.length === 2), true, 'Every non-active tab group should still have 2 tabs');
	});
	
	test('Close other (non-active) tabs from left in current tab group', async () => {
		// Activate the extension
		const extension = vscode.extensions.getExtension('dreamthinkbuild.close-other-tabs');
		if (!extension) {
			throw new Error('Extension not found');
		}
		await extension.activate();

		// Open several documents
		const doc1 = await vscode.workspace.openTextDocument({ content: 'Document 1' });
		const doc2 = await vscode.workspace.openTextDocument({ content: 'Document 2' });
		const doc3 = await vscode.workspace.openTextDocument({ content: 'Document 3' });
		const doc4 = await vscode.workspace.openTextDocument({ content: 'Document 4' });
		const doc5 = await vscode.workspace.openTextDocument({ content: 'Document 5' });
		const doc6 = await vscode.workspace.openTextDocument({ content: 'Document 6' });
		const allDocs = { doc1, doc2, doc3, doc4, doc5, doc6 };

		// Show the documents in the editor
		await vscode.window.showTextDocument(doc1, { viewColumn: vscode.ViewColumn.One });
		await vscode.window.showTextDocument(doc2, { viewColumn: vscode.ViewColumn.One });
		await vscode.window.showTextDocument(doc3, { viewColumn: vscode.ViewColumn.One });
		await vscode.window.showTextDocument(doc4, { viewColumn: vscode.ViewColumn.Two });
		await vscode.window.showTextDocument(doc5, { viewColumn: vscode.ViewColumn.Two });
		await vscode.window.showTextDocument(doc6, { viewColumn: vscode.ViewColumn.Two });

		// Set doc5 as the active document in the current tab group
		await vscode.window.showTextDocument(doc5, { viewColumn: vscode.ViewColumn.Two });

		// Execute the command
		await vscode.commands.executeCommand('extension.closeNonActiveTabsFromLeftInCurrentGroup');

		// Check to ensure non-active tabs were closed in the current tab group and not in other tab groups
		assert.strictEqual(vscode.window.tabGroups.all.length, 3, 'There should be 3 tab groups');
    	assert.strictEqual(vscode.window.tabGroups.activeTabGroup.tabs.length, 2, 'There should be 2 tabs in the active group');
    	assert.strictEqual(vscode.window.tabGroups.all.filter(group => !group.activeTab).every(group => group.tabs.length === 3), true, 'Every non-active tab group should still have 3 tabs');
	});
	
	test('Close other (non-active) tabs from right in current tab group', async () => {
		// Activate the extension
		const extension = vscode.extensions.getExtension('dreamthinkbuild.close-other-tabs');
		if (!extension) {
			throw new Error('Extension not found');
		}
		await extension.activate();

		// Open several documents
		const doc1 = await vscode.workspace.openTextDocument({ content: 'Document 1' });
		const doc2 = await vscode.workspace.openTextDocument({ content: 'Document 2' });
		const doc3 = await vscode.workspace.openTextDocument({ content: 'Document 3' });
		const doc4 = await vscode.workspace.openTextDocument({ content: 'Document 4' });
		const doc5 = await vscode.workspace.openTextDocument({ content: 'Document 5' });
		const doc6 = await vscode.workspace.openTextDocument({ content: 'Document 6' });
		const allDocs = { doc1, doc2, doc3, doc4, doc5, doc6 };

		// Show the documents in the editor
		await vscode.window.showTextDocument(doc1, { viewColumn: vscode.ViewColumn.One });
		await vscode.window.showTextDocument(doc2, { viewColumn: vscode.ViewColumn.One });
		await vscode.window.showTextDocument(doc3, { viewColumn: vscode.ViewColumn.One });
		await vscode.window.showTextDocument(doc4, { viewColumn: vscode.ViewColumn.Two });
		await vscode.window.showTextDocument(doc5, { viewColumn: vscode.ViewColumn.Two });
		await vscode.window.showTextDocument(doc6, { viewColumn: vscode.ViewColumn.Two });

		// Set doc5 as the active document in the current tab group
		await vscode.window.showTextDocument(doc5, { viewColumn: vscode.ViewColumn.Two });

		// Execute the command
		await vscode.commands.executeCommand('extension.closeNonActiveTabsFromRightInCurrentGroup');

		// Check to ensure non-active tabs were closed in the current tab group and not in other tab groups
		assert.strictEqual(vscode.window.tabGroups.all.length, 3, 'There should be 3 tab groups');
    	assert.strictEqual(vscode.window.tabGroups.activeTabGroup.tabs.length, 2, 'There should be 2 tabs in the active group');
    	assert.strictEqual(vscode.window.tabGroups.all.filter(group => !group.activeTab).every(group => group.tabs.length === 3), true, 'Every non-active tab group should still have 3 tabs');
	});

	test('Close other (non-active) tabs in each tab group', async () => {
		// Activate the extension
		const extension = vscode.extensions.getExtension('dreamthinkbuild.close-other-tabs');
		if (!extension) {
			throw new Error('Extension not found');
		}
		await extension.activate();

		// Open several documents
		const doc1 = await vscode.workspace.openTextDocument({ content: 'Document 1' });
		const doc2 = await vscode.workspace.openTextDocument({ content: 'Document 2' });
		const doc3 = await vscode.workspace.openTextDocument({ content: 'Document 3' });
		const doc4 = await vscode.workspace.openTextDocument({ content: 'Document 4' });
		const doc5 = await vscode.workspace.openTextDocument({ content: 'Document 5' });
		const doc6 = await vscode.workspace.openTextDocument({ content: 'Document 6' });
		const allDocs = { doc1, doc2, doc3, doc4, doc5, doc6 };

		// Show the documents in the editor
		await vscode.window.showTextDocument(doc1, { viewColumn: vscode.ViewColumn.One });
		await vscode.window.showTextDocument(doc2, { viewColumn: vscode.ViewColumn.One });
		await vscode.window.showTextDocument(doc3, { viewColumn: vscode.ViewColumn.Two });
		await vscode.window.showTextDocument(doc4, { viewColumn: vscode.ViewColumn.Two });
		await vscode.window.showTextDocument(doc5, { viewColumn: vscode.ViewColumn.Three });
		await vscode.window.showTextDocument(doc6, { viewColumn: vscode.ViewColumn.Three });

		// Execute the command
		await vscode.commands.executeCommand('extension.closeNonActiveTabsInEachGroup');

		// Check to ensure only the active tab in each tab group is open
    assert.strictEqual(vscode.window.tabGroups.all.length, 3, 'There should be 3 tab groups');
    assert.strictEqual(vscode.window.tabGroups.all.every(group => group.tabs.length === 1), true, 'Every tab group should have 1 tab remaining');
	});

  test('Close other (non-active) tabs and tab groups everywhere', async () => {
    // Activate the extension
    const extension = vscode.extensions.getExtension('dreamthinkbuild.close-other-tabs');
    if (!extension) {
      throw new Error('Extension not found');
    }
    await extension.activate();

		// Open several documents
		const doc1 = await vscode.workspace.openTextDocument({ content: 'Document 1' });
		const doc2 = await vscode.workspace.openTextDocument({ content: 'Document 2' });
		const doc3 = await vscode.workspace.openTextDocument({ content: 'Document 3' });
		const doc4 = await vscode.workspace.openTextDocument({ content: 'Document 4' });
		const doc5 = await vscode.workspace.openTextDocument({ content: 'Document 5' });
		const doc6 = await vscode.workspace.openTextDocument({ content: 'Document 6' });
		const allDocs = { doc1, doc2, doc3, doc4, doc5, doc6 };

		// Show the documents in the editor
		await vscode.window.showTextDocument(doc1, { viewColumn: vscode.ViewColumn.One });
		await vscode.window.showTextDocument(doc2, { viewColumn: vscode.ViewColumn.One });
		await vscode.window.showTextDocument(doc3, { viewColumn: vscode.ViewColumn.Two });
		await vscode.window.showTextDocument(doc4, { viewColumn: vscode.ViewColumn.Two });
		await vscode.window.showTextDocument(doc5, { viewColumn: vscode.ViewColumn.Three });
		await vscode.window.showTextDocument(doc6, { viewColumn: vscode.ViewColumn.Three });

    // Execute the command
    await vscode.commands.executeCommand('extension.closeNonActiveTabsInAllGroups');

    // Check if only the active tab in the active group remains open
    assert.strictEqual(vscode.window.tabGroups.all.length, 1, 'There should be 1 tab group');
		assert.strictEqual(vscode.window.tabGroups.activeTabGroup.tabs.length, 1, 'There should be 1 tab in the active tab group');
		assert.strictEqual(isOpenClosed([doc6], [doc1, doc2, doc3, doc4, doc5]), true, `Only doc5 should remain open, but the open docs are ${getOpenDocs(allDocs).join(', ')}`);
  });
});