window.jQuery = function (selectOrOrArray) {
  let elements;
  if (typeof selectOrOrArray === "string") {
    elements = document.querySelectorAll(selectOrOrArray);
  } else if (selectOrOrArray instanceof Array) {
    elements = selectOrOrArray;
  }
  const api = Object.create(jQuery.prototype);
  Object.assign(api, {
    elements: elements,
  });
  return api;
};

jQuery.prototype = {
  addClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.add(className);
    }
    return this;
  },
  find(selector) {
    let array = [];
    for (let i = 0; i < this.elements.length; i++) {
      array = array.concat(
        Array.from(this.elements[i].querySelectorAll(selector))
      );
    }
    array.oldApi = this;
    return jQuery(array);
  },
  end() {
    return selectOrOrArray.oldApi;
  },
  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i);
    }
    return this;
  },
  parent() {
    const array = [];
    this.each((node) => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode);
      }
    });
    return jQuery(array);
  },
  print() {
    console.log(this.elements);
  },
  children() {
    const array = [];
    this.each((node) => {
      array.push(...node.children);
    });
    return jQuery(array);
  },
};

window.$ = window.jQuery;
