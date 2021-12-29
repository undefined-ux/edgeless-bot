import configGenerator from './config'
import {CONFIG} from "./class";
import External_Scraper from "./templates/scrapers/External_Scraper";
import chalk from "chalk/index";

export const config: CONFIG = configGenerator().unwrap()

async function main() {

}

async function test() {
    //console.log((await robustParseRedirect("https://github.com/EdgelessPE/wimiso/releases/download/v1.1/ventoy_wimboot.img")).unwrap())

    // let sRes = (await GitHub_Release_Scraper({
    //     url: "https://github.com/balena-io/etcher"
    // })).unwrap()
    // console.log(sRes.version)
    // let rRes = (await GitHub_Release_Resolver({
    //     downloadLink: sRes.downloadLink,
    //     fileMatchRegex: "balenaEtcher\\-Portable\\-.+\\.exe"
    // }))
    // console.log(rRes.unwrap())

    // (await Click2Install({
    //     taskName: "火绒安全",
    //     workshop: "D:\\Desktop\\Projects\\EdgelessPE\\edgeless-bot\\test",
    //     downloadedFile: "sysdiag-full-5.0.65.0-2021.12.28.1.exe",
    //     requiredObject: {
    //         shortcutName: "安装火绒"
    //     }
    // })).unwrap()

    // console.log(schemaValidator({
    //     shortcutName: "安装火绒"
    // }, "producer_templates/Click2Install").unwrap())

    console.log((await External_Scraper({
        taskName: "火绒安全",
        url: "external_scraper://www.huorong.cn/5.0.version.json",
    }, chalk.bgWhite("Worker 0"))).unwrap())

}

test().then(_ => {
})
