import App from "app/app"

interface CustomWindow extends Window {
    app?: any;
}

const w: CustomWindow = window

w.app = new App({}, "app")
w.app.startup()
