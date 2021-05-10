import { log, rd } from "./utils"
import { DIR_WORKSHOP, DIR_BUILDS, DIR_TASKS, IGNORE_REMOTE } from "./const"
import { Interface } from "./class"
import { Status } from "./enum"
import fs from "fs"
import cp from "child_process"

interface RunChecker {
    cmd: string;
    hint: string;
    onerror: (displayError: () => boolean) => boolean | void;
}
//init
function beforeRunCheck(): boolean {
    //预设严重错误函数
    let l = function (text: string): boolean {
        log("Error:Check failure, " + text);
        return false;
    };

    //检查是否在Windows中
    if (!fs.existsSync("C:\\Windows\\System32")) {
        return l("Please run inside Windows");
    }
    //检查目录中文件夹是否到位
    let dirList: Array<string> = [DIR_BUILDS, DIR_TASKS];
    dirList.forEach((path) => {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
            if (!fs.existsSync(path)) {
                return l("Can't create folder " + path);
            }
        }
    });
    //检查命令可用性
    let cmdList: Array<RunChecker> = [
        {
            cmd: "rclone",
            hint: "rclone",
            onerror: (d) => {
                if (!IGNORE_REMOTE) {
                    d();
                    log("Warning:Command `rclone` not found, remote disabled");
                }
                return true;
            },
        },
    ];
    cmdList.forEach((item) => {
        try {
            cp.execSync("where " + item.cmd, {
                stdio: "ignore",
            });
        } catch (err) {
            console.log(err.output.toString())
            return (
                item.onerror(() =>
                    l(
                        "Command `" +
                        item.cmd +
                        "` not found" +
                        ", please install " +
                        item.hint +
                        "\nTry `scoop install " +
                        item.hint +
                        "` if you have scoop installed"
                    )
                ) ?? false
            );
        }
    });

    return true;
}

function cleanWorkshop(): boolean {
    let dst = DIR_WORKSHOP.substring(2);
    if (!rd(dst)) {
        log("Error:Can't remove workshop,kill running processes and retry");
        return false;
    }
    fs.mkdirSync(dst);
    return fs.existsSync(dst);
}

function find7zip(): Interface {
    let possiblePath = [
        "C:\\Program Files\\7-Zip\\7z.exe",
        "C:\\Program Files (x86)\\7-Zip\\7z.exe",
        process.env.WINDIR + "\\system32\\7z.exe",
        process.env.PROGRAMFILESW6432 + "\\7-Zip\\7z.exe",
        ...(process.env["ProgramFiles(x86)"] != undefined
            ? [process.env["ProgramFiles(x86)"] + "\\7-Zip\\7z.exe"]
            : []),
        "7z.exe",
        "7za.exe",
    ];
    let result = null;
    for (let i in possiblePath) {
        if (fs.existsSync(possiblePath[i])) {
            result = possiblePath[i];
            break;
        }
    }
    if (!result) {
        return new Interface({
            status: Status.ERROR,
            payload:
                "Error:7-Zip not found,please install 7-Zip from https://www.7-zip.org",
        });
    } else {
        return new Interface({
            status: Status.SUCCESS,
            payload: result,
        });
    }
} //Interface:string

export {
    beforeRunCheck,
    cleanWorkshop,
    find7zip
}