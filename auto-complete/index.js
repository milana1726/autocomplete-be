class TrieNode {
    constructor() {
        this.children = new Map(),
        this.strings = [];
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(str) {
        let node = this.root;
        const lowerCaseStr = str.toLowerCase();
        for (const char of lowerCaseStr) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
            node.strings.push(str);
        }
    }

    search(prefix) {
        if (!prefix) {
            return [];
        }
        let node = this.root;
        const lowerCasePrefix = prefix.toLowerCase();
        for (const char of lowerCasePrefix) {
            if (!node.children.has(char)) {
                return [];
            }
            node = node.children.get(char);
        }
        return node.strings;
    }
}

function createAutoComplete(arr) {
    const trie = new Trie();
    arr.forEach(str => trie.insert(str));
    return function(prefix) {
        return trie.search(prefix);
    }
}

module.exports = { createAutoComplete };
