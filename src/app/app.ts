
///<reference path="./html.d.ts" />
import * as declare from "dojo/_base/declare"
import * as _WidgetBase from "dijit/_WidgetBase"
import * as _TemplatedMixin from "dijit/_TemplatedMixin"
import * as template from "dojo/text!./app.html"

interface App extends _WidgetBase, _TemplatedMixin { }

const App = declare([_WidgetBase, _TemplatedMixin], {
  templateString: template,
  postCreate() {
    console.log("App created")
  }
})

export default App
