import { Tree } from './bst.js';

// Generate a random array of 15 numbers between 0 and 100
const randomArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));

// Create a tree from the random array
const tree = Tree(randomArray);

// Print the tree structure
tree.prettyPrint(tree.root);

// Check if the tree is balanced
console.log("Is tree balanced?", tree.isBalanced(tree.root));

// Callback function to print node data
const callback = (node) => { console.log(node.data); }

// Print elements in different orders
console.log("Level Order:");
tree.levelOrder(tree.root, callback);

console.log("Pre Order:");
tree.preOrder(tree.root, callback);

console.log("In Order:");
tree.inOrder(tree.root, callback);

console.log("Post Order:");
tree.postOrder(tree.root, callback);

// Unbalance the tree by adding numbers > 100
tree.insert(tree.root, 150);
tree.insert(tree.root, 200);
tree.insert(tree.root, 250);
tree.insert(tree.root, 300);

// Confirm that the tree is unbalanced
console.log("Is tree unbalanced?", !tree.isBalanced(tree.root));
tree.prettyPrint(tree.root);

// Rebalance the tree
tree.rebalance();

// Confirm that the tree is balanced again
console.log("Is tree balanced?", tree.isBalanced(tree.root));
tree.prettyPrint(tree.root);
