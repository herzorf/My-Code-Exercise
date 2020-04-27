import "./app2.css";
import $ from "jquery";
const $tabList = $("#app2 .tabList");
const $contentList = $("#app2 .contentList");

$tabList.on("click", "li", (e) => {
  const $li = $(e.currentTarget);
  const index = $li.index();
  $li.addClass("selector").siblings().removeClass("selector");
  $contentList
    .children()
    .eq(index)
    .addClass("active")
    .siblings()
    .removeClass("active");
});
$tabList.children().eq(0).trigger("click");
