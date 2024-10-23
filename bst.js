const Node = (data, left = null, right = null) => {
    return { data, left, right };
};

const Tree = (array) => {

    const buildTree = (array) => {
        let sortedArray = [...new Set(array)].sort((a, b) => a - b);
        const buildBST = (sortedArray) => {
            if (sortedArray.length === 0) return null;
            
            const mid = Math.floor(sortedArray.length / 2);
            const node = Node(sortedArray[mid]);
            
            node.left = buildBST(sortedArray.slice(0, mid));
            node.right = buildBST(sortedArray.slice(mid + 1));
            
            return node;
        }
        return buildBST(sortedArray);
    };

    const insert = (root, key) => {
        if (root === null) return Node(key);

        if (key === root.data) return root;

        if (key < root.data) root.left = insert(root.left, key);
        else root.right = insert(root.right, key);

        return root;
    };

    const inOrder = (root, callback) => {
        if (!callback) throw new Error("Callback is required for inOrder traversal.");
        if (root !== null) {
            inOrder(root.left, callback);
            callback(root);
            inOrder(root.right, callback);
        }
    };

    const preOrder = (root, callback) => {
        if (!callback) throw new Error("Callback is required for preOrder traversal.");
        if (root !== null) {
            callback(root);
            preOrder(root.left, callback);
            preOrder(root.right, callback);
        }
    };

    const postOrder = (root, callback) => {
        if (!callback) throw new Error("Callback is required for postOrder traversal.");
        if (root !== null) {
            postOrder(root.left, callback);
            postOrder(root.right, callback);
            callback(root);
        }
    };

    const getCurrent = (curr) => {
        curr = curr.right;
        while (curr !== null && curr.left !== null) {
            curr = curr.left;
        }
        return curr;
    };

    const delNode = (root, key) => {
        if (root === null) return root;

        if (key < root.data) {
            root.left = delNode(root.left, key);
        } else if (key > root.data) {
            root.right = delNode(root.right, key);
        } else {
            if (root.left === null) return root.right;
            if (root.right === null) return root.left;

            let next = getCurrent(root);
            root.data = next.data;
            root.right = delNode(root.right, next.data);
        }
        return root;
    };

    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) return;

        if (node.right !== null) {
            prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    const find = (root, value) => {
        if (!root || root.data === value) return root;

        if (value < root.data) {
            return find(root.left, value);
        } else {
            return find(root.right, value);
        }
    };

    const levelOrder = (root, callback) => {
        if (!callback) throw new Error("Callback is required for levelOrder traversal.");

        const queue = [root];
        while (queue.length) {
            const node = queue.shift();
            callback(node);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    };

    const height = (node) => {
        if (!node) return -1;

        const leftHeight = height(node.left);
        const rightHeight = height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    };

    const depth = (node, root, level = 0) => {
        if (!root) return -1;
        if (root === node) return level;

        if (node.data < root.data) {
            return depth(node, root.left, level + 1);
        } else {
            return depth(node, root.right, level + 1);
        }
    };

    const isBalanced = (root) => {
        if (!root) return true;

        const leftHeight = height(root.left);
        const rightHeight = height(root.right);

        return Math.abs(leftHeight - rightHeight) <= 1 && isBalanced(root.left) && isBalanced(root.right);
    };

    const rebalance = () => {
        const nodes = [];
        inOrder(root, (node) => nodes.push(node.data));
        root = buildTree(nodes);
    };

    let root = buildTree(array);
    return { prettyPrint, root, levelOrder, inOrder, preOrder, insert, postOrder, rebalance, isBalanced, find, delNode };
};

export { Tree };
