export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
};

export const isEmpty = (obj) => {
  if (obj === undefined || obj === null) {
      return true
  }
  return Object.keys(obj).length === 0;
}

export function complieFlatState(menuTree) {
  // 当菜单为空的情况下不作判断，权限
  if (isEmpty(menuTree)) {
      return {};
  }

  const flatTree = {};

  function flattenChildren(node, parent) {
      flatTree[node.code] = {
          node: node,
          code: node.code,
          action: node.actions.map(obj => obj.action)
      };
      if (typeof parent != "undefined") {
          flatTree[node.code].parent = parent.code;
          flatTree[parent.code]['child'].push(node.code);
      }
      if (node['child']) {
          flatTree[node.code]['child'] = [];
          node['child'].forEach(child => flattenChildren(child, node));
      }
  }
  menuTree.forEach(rootNode => {
      flattenChildren(rootNode);
  });
  return flatTree;
}