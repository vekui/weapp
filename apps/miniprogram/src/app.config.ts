import { demoAppPages, demoSubpackages } from "./demo/catalog"

export default defineAppConfig({
  pages: demoAppPages,
  subpackages: demoSubpackages,
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#ffffff",
    navigationBarTitleText: "VekUI",
    navigationBarTextStyle: "black"
  }
})
