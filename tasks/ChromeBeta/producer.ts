import { ProducerParameters, ProducerReturned } from "../../src/class";
import { Ok, Result } from "ts-results";
import { log, pressEnter, sleep } from "../../src/utils";
import path from "path";
import fs from "fs";
import cp from "child_process";

import shell from "shelljs";

export default async function (
  p: ProducerParameters,
): Promise<Result<ProducerReturned, string>> {
  const { downloadedFile, workshop } = p;

  // Create ready directory
  const readyDir = path.join(workshop, "_ready");
  shell.mkdir("-p", readyDir);

  // 移动安装程序
  shell.mv(path.join(workshop, downloadedFile), readyDir);
  // 启动安装程序
  const installer = cp.exec(downloadedFile, { cwd: readyDir }, () => {
    log("Info:Installer exit");
  });

  // 发送回车
  await pressEnter([5, 5, 2, 2]);

  // 循环判断安装完成
  const finishFilePath = path.join(
    readyDir,
    "GoogleChromePortableBeta/Data/PortableApps.comInstaller/license.ini",
  );
  while (!fs.existsSync(finishFilePath)) {
    await sleep(3000);
  }

  // 退出安装进程
  await pressEnter([3]);
  await sleep(1000);
  installer.kill();

  // 删除安装包
  shell.rm(path.join(readyDir, downloadedFile));

  // 清理
  const deleteList = [
    "Other",
    "help.html",
    "App/readme.txt",
    "App/AppInfo/*.ico",
    "App/AppInfo/*.png",
  ];
  for (const f of deleteList) {
    shell.rm("-rf", path.join(readyDir, "GoogleChromePortableBeta", f));
  }

  // Return ready directory
  return new Ok({
    readyRelativePath: "_ready",
  });
}
