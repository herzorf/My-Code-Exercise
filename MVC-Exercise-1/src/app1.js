import "./app1.css";
import $ from "jquery";
const $number = $("#number");
const $add1 = $("#add1");
const $minus1 = $("#minus1");
const $multiply2 = $("#multiply2");
const $divide2 = $("#divide2");
const n = localStorage.getItem("n");
$number.text(n || 100);
$add1.on("click", () => {
  let n = parseInt($number.text());
  n++;
  localStorage.setItem("n", n);
  $number.text(n);
});
$minus1.on("click", () => {
  let n = parseInt($number.text());
  n--;
  localStorage.setItem("n", n);
  $number.text(n);
});
$multiply2.on("click", () => {
  let n = parseInt($number.text());
  n = n * 2;
  localStorage.setItem("n", n);
  $number.text(n);
});
$divide2.on("click", () => {
  let n = parseInt($number.text());
  n /= 2;
  localStorage.setItem("n", n);
  $number.text(n);
});
