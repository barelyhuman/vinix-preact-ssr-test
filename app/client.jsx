import { App } from "./App";
import { h, hydrate } from "preact";
import "vinxi/client";
import "./lib/tw.js";

hydrate(h(App), document.getElementById("_mount"));

export default function () {}
