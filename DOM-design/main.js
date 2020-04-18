window.dom = {
  //创建一个节点
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  //在node1节点之后插入一个新的节点node2
  after(node1, node2) {
    node1.parentNode.insertBefore(node2, node1.nextSibling);
  },
  //在node1节点之前插入一个新的节点node2
  before(node1, node2) {
    node1.parentNode.insertBefore(node2, node1);
  },
  //将子节点child加入到父节点parent里面
  append(parent, child) {
    parent.appendChild(child);
  },
  //为元素添加父节点
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  },
  //删除一个节点
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  //将一个节点的子元素置空，并且返回一个这个元素的子元素的数组
  empty(node) {
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(x));
      x = node.firstChild;
    }
  },
  //读取或修改node的一个属性
  attr(node, name, value) {
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  //获取或修改一个节点内的文本
  text(node, string) {
    if (arguments.length == 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  //修改标签内的HTML内容
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  //修改和查看style里的样式
  style(node, name, value) {
    if (arguments.length === 3) {
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        return node.style[name];
      } else if (name instanceof Object) {
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  //修改元素的类名
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  //绑定事件
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  //取消绑定事件
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  //获取标签和标签们
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  //查找节点的父节点
  parent(node) {
    return node.parentNode;
  },
  //查找节点的子节点
  children(node) {
    return node.children;
  },
  //查找兄弟元素
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  //查找之前的元素
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  //遍历所有节点
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },

  //获取排行老几
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
