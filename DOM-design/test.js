dom.append(test1, dom.create("<div>hhhh</div>"));

dom.after(test1, dom.create("<div>hhh1</div>"));

dom.before(test1, dom.create("<div>hhh2</div>"));

hhh.remove();

dom.empty(test3);

// console.log(dom.attr(test1, "color"));

// console.log(dom.attr(test1, "color", "red"));

// console.log(dom.attr(test1, "color"));

dom.text(test4, "bbb");
console.log(dom.text(test4));

console.log(dom.html(test5));
dom.html(test5, "哈哈哈哈");

console.log(dom.style(test1, "color", "green"));

dom.class.add(test6, "hhh");
//dom.class.remove(test6, "hhh");
console.log(dom.class.has(test6, "hhh"));
fn = () => {
  console.log("被点了");
};
dom.on(test6, "click", fn);
dom.off(test6, "click", fn);

console.log(dom.find("#test6")[0]);
