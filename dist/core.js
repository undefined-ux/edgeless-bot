(()=>{"use strict";var e={147:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.barometer=void 0;const n=o(a(242)),r=a(593);var s;function l(e,t,a,o){const r=t+"   ("+a+"/"+(a+o)+")";switch(e){case s.Sunny:console.log("🌞  "+n.default.bold.green(r));break;case s.Cloudy:console.log("⛅  "+n.default.blue(r));break;case s.Overcast:console.log("☁   "+n.default.yellow(r));break;case s.Rainy:console.log("🌧  "+n.default.keyword("orange")(r));break;case s.Thunderstorm:console.log("🌩  "+n.default.red(r));break;default:console.log(n.default.yellow("Warning")+" Illegal print detected"),console.log(r)}}!function(e){e[e.Sunny=0]="Sunny",e[e.Cloudy=1]="Cloudy",e[e.Overcast=2]="Overcast",e[e.Rainy=3]="Rainy",e[e.Thunderstorm=4]="Thunderstorm"}(s||(s={})),t.barometer=function(e){console.log("=================================================");for(const t in e){const a=e[t];if(0===a.recentStatus.length)return void r.log("Warning:Task "+t+" has no valid build records");let o=0;a.recentStatus.forEach((e=>{e.success||o++}));const n=a.recentStatus.length-o;if(0===o){l(s.Sunny,t,n,o);continue}if(0===n){l(s.Thunderstorm,t,n,o);continue}const i=10*n+o;switch(i){case 21:l(s.Cloudy,t,n,o);break;case 12:l(s.Rainy,t,n,o);break;case 11:l(s.Overcast,t,n,o);break;default:r.log("Warning:Unknown status code:"+i),l(s.Overcast,t,n,o)}}}},231:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DatabaseNode=t.Task=t.Interface=void 0;const o=a(397),n=a(593);t.Interface=class{constructor(e){this.status=e.status,this.payload=e.payload}unwarp(){if(this.status===o.Status.ERROR){const e=this.payload,t=e.split(":");if(t.length<2)throw n.log("Warning:Caught illegal ERROR tip by unwarp()"),n.log("Error:"+e),"EXIT";if("Error"!==t[0])throw n.log("Error:"+e.substring(t[0].length+1)),"EXIT";throw e}return this.payload}},t.Task=class{constructor(){this.name="Null",this.category="Null",this.author="Null",this.paUrl="Null",this.releaseRequirement=["Null"],this.buildRequirement=["Null"],this.preprocess=!0,this.autoMake=!0}},t.DatabaseNode=class{constructor(){this.latestVersion="0.0.0",this.builds=[],this.recentStatus=[]}}},913:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=o(a(284));t.default=class{constructor(e){this._source=e,this.resolved=JSON.parse(n.default(this._source))}}},970:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.REMOTE_ROOT=t.REMOTE_NAME=t.MAX_BUILDS=t.PATH_DATABASE=t.DIR_BUILDS=t.DIR_WORKSHOP=t.DIR_TASKS=t.IGNORE_REMOTE=t.ENABLE_REMOTE=t._userConfig=void 0;const n=o(a(747)),r=o(a(913)),s=o(a(996)).default(process.argv.slice(2));t._userConfig=new r.default(n.default.readFileSync("./config.jsonc","utf8")),t.ENABLE_REMOTE=!s.hasOwnProperty("d")&&t._userConfig.resolved.enableRemote,t.IGNORE_REMOTE=!s.hasOwnProperty("d")&&t._userConfig.resolved.ignoreRemote,t.DIR_TASKS=t._userConfig.resolved.dirTask,t.DIR_WORKSHOP=t._userConfig.resolved.dirWorkshop,t.DIR_BUILDS=t._userConfig.resolved.dirBuilds,t.PATH_DATABASE=t._userConfig.resolved.pathDatabase,t.MAX_BUILDS=Math.max(t._userConfig.resolved.maxBuildsNum,1),t.REMOTE_NAME=t._userConfig.resolved.remoteName,t.REMOTE_ROOT=t._userConfig.resolved.remoteRoot},471:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.saveDatabase=t.readDatabase=void 0;const n=o(a(747)),r=a(970);t.readDatabase=function(){const e=r.PATH_DATABASE;return n.default.existsSync(e)?JSON.parse(n.default.readFileSync(e).toString()):{}},t.saveDatabase=function(e){const t=r.PATH_DATABASE;n.default.existsSync(t)&&(n.default.existsSync(t+".bak")&&n.default.rmSync(t+".bak"),n.default.renameSync(t,t+".bak")),n.default.writeFileSync(t,JSON.stringify(e,null,2))}},397:(e,t)=>{var a,o;Object.defineProperty(t,"__esModule",{value:!0}),t.Cmp=t.Status=void 0,function(e){e[e.SUCCESS=0]="SUCCESS",e[e.ERROR=1]="ERROR"}(a||(a={})),t.Status=a,function(e){e[e.L=0]="L",e[e.E=1]="E",e[e.G=2]="G"}(o||(o={})),t.Cmp=o},949:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.removeExtraBuilds=t.preprocessPA=void 0;const n=o(a(747)),r=a(593),s=a(970),l=a(306),i=a(607),c=o(a(146));t.preprocessPA=function(e){const t=s.DIR_WORKSHOP+"/"+e+"/release";if(!n.default.existsSync(t+"/$PLUGINSDIR")||!r.rd(t+"/$PLUGINSDIR"))return r.log("Error:Can't preprocess "+e+":remove $PLUGINSDIR failed"),!1;if(n.default.existsSync(t+"/Other")&&r.rd(t+"/Other")||r.log("Warning::Remove Other failed for "+e),n.default.existsSync(t+"/help.html"))try{n.default.unlinkSync(t+"/help.html")}catch{r.log("Warning::Remove help.html failed for "+e)}if(n.default.existsSync(t+"/App/readme.txt"))try{n.default.unlinkSync(t+"/App/readme.txt")}catch{r.log("Warning::Remove App/readme.txt failed for "+e)}const a=t+"/App/AppInfo/pac_installer_log.ini";if(!n.default.existsSync(a))return r.log("Warning:pac_installer_log.ini not found,skipping modification for "+e),!0;const o=c.default.parse(n.default.readFileSync(a).toString()).PortableApps.comInstaller;if(!o)return r.log("Error:Can't preprocess "+e+":[PortableApps.comInstaller] not found in pac_installer_log.ini"),!1;try{o.Info2="This file was generated by the PortableApps.com Installer wizard and modified by the official PortableApps.com Installer TM Rare Ideas, LLC as the app was installed.",o.Run="true",o.InstallerVersion=o.WizardVersion,o.InstallDate=o.PackagingDate,o.InstallTime=o.PackagingTime;const e="[PortableApps.comInstaller]\n"+c.default.stringify(o);n.default.writeFileSync(a,e)}catch(t){return console.log(JSON.stringify(t)),r.log("Error:Can't preprocess "+e+":can't modify pac_installer_log.ini"),!1}return r.log("Info:Preprocessed "+e+" successfully"),!0},t.removeExtraBuilds=function(e,t,a){r.log("Info:Trying to remove extra builds");const o={},c=[];for(const t in e.builds){const a=e.builds[t];o.hasOwnProperty(a.version.toString())||(o[a.version.toString()]=!0,c.push(a))}if(e.builds=c,c.length<s.MAX_BUILDS)return r.log("Info:No needy for removal after de-weight"),e;e.builds.sort(((e,t)=>1-r.versionCmp(e.version,t.version)));const u=[];for(let o=0;o<e.builds.length-s.MAX_BUILDS+1;o++){const o=e.builds.pop();if(void 0!==o){r.log("Info:Remove extra build "+t+"/"+o.name);try{n.default.unlinkSync(t+"/"+o.name)}catch{i.args.hasOwnProperty("g")||r.log("Warning:Fail to delete local extra build "+o.name)}l.deleteFromRemote(o.name,a)||(r.log("Warning:Fail to delete remote extra build "+o.name),u.push(o))}}return e.builds=e.builds.concat(u),e}},607:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.args=void 0;const n=o(a(996)),r=o(a(622)),s=o(a(747)),l=o(a(242)),i=a(397),c=a(593),u=a(231),d=a(471),f=a(178),g=a(25),p=a(970),S=a(147);t.args=n.default(process.argv.slice(2)),async function(){console.clear();const e=[];s.default.existsSync("./actions_failed")&&s.default.unlinkSync("./actions_failed");let a="0.0.0";if(s.default.existsSync(r.default.resolve(__dirname,"..","package.json"))&&(a=JSON.parse(s.default.readFileSync(r.default.resolve(__dirname,"..","package.json")).toString()).version),console.log(l.default.cyan.bold("Edgeless Bot ver."+a)),t.args.hasOwnProperty("d")&&c.log("Warning:Running at debug mode, remote operations and database update will be disabled"),t.args.hasOwnProperty("g")&&console.log("::group::Init"),c.log("Info:Launching,please hold a second..."),!f.beforeRunCheck(t.args.hasOwnProperty("g")))throw"Initialization failed";if(!f.cleanWorkshop())throw"Cleaning workshop failed";if(!await g.spawnAria2())throw"Spawn Aria2 failed";const o=f.find7zip().unwarp(),n=d.readDatabase(),h=new u.DatabaseNode;for(const e in n){const t=n[e];for(const a in h)if(!t.hasOwnProperty(a))throw c.log("Error:Database check failure,"+e+"'s key "+a+" not defined"),"Database check failure"}if(t.args.hasOwnProperty("g")&&console.log("::endgroup::"),t.args.hasOwnProperty("t")){const e=t.args.t;if(null==e||""==e||!s.default.existsSync(p.DIR_TASKS+"/"+e))throw"Error:Task "+e+" not exist";{c.log("Info:Argument t caught,run task "+e);const t=g.readTaskConfig(e);if(t.status===i.Status.ERROR){c.log("Error:Can't read "+e+"'s config,exit");let a=n[e];return a||(a=new u.DatabaseNode),a.recentStatus.push({time:Date.now(),timeDescription:Date(),success:!1,errorMessage:"Error:Can't read "+e+"'s config:"+t.payload}),void(n[e]=a)}const a=t.payload;let r=n[e];r||(r=new u.DatabaseNode),r.recentStatus.length>2&&(r.recentStatus=c.cleanBuildStatus(r.recentStatus));const s=await g.processTask(a,r,o);if(s.status===i.Status.ERROR)c.log(s.payload),r.recentStatus.push({time:Date.now(),timeDescription:Date(),success:!1,errorMessage:s.payload}),n[e]=r;else{c.log("Success:Task "+e+" executed successfully");const t=s.payload;t.recentStatus.push({time:Date.now(),timeDescription:Date(),success:!0,errorMessage:"Success"}),n[e]=t}}}else{const a=g.getTasks();c.log("Info:Got "+a.length+" tasks in queue");for(let r=0;r<a.length;r++){console.log("\nProgress:"+(r+1)+"/"+a.length);const s=a[r];t.args.hasOwnProperty("g")&&console.log("::group::"+s);const l=g.readTaskConfig(s);if(l.status===i.Status.ERROR){c.log("Error:Can't read "+s+"'s config,skipping...");let t=n[s];t||(t=new u.DatabaseNode),e.push(s),t.recentStatus.push({time:Date.now(),timeDescription:Date(),success:!1,errorMessage:"Error:Can't read "+s+"'s config:"+l.payload}),n[s]=t;continue}const d=l.payload;let f=n[s];f||(f=new u.DatabaseNode),f.recentStatus.length>2&&(f.recentStatus=c.cleanBuildStatus(f.recentStatus));const p=f.latestVersion,S=await g.processTask(d,f,o);if(S.status===i.Status.ERROR)c.log(S.payload),e.push(s),f.recentStatus.push({time:Date.now(),timeDescription:Date(),success:!1,errorMessage:S.payload}),n[s]=f;else{c.log("Success:Task "+s+" executed successfully");const e=S.payload;e.recentStatus.push({time:Date.now(),timeDescription:Date(),success:!0,errorMessage:"Success"}),n[s]=e}if(t.args.hasOwnProperty("g")){console.log("::endgroup::");const e=S.payload;S.status==i.Status.SUCCESS&&e.latestVersion!=p&&console.log("Updated from "+p+" to "+e.latestVersion)}}console.log("================================================="),0===e.length?c.log("Success:Everything is Okay"):c.log("Warning:"+e.length+" tasks failed as follow:"+e.toString())}S.barometer(n),console.log("================================================="),t.args.hasOwnProperty("d")?c.log("Warning:Database not updated"):d.saveDatabase(n),await g.aria2.forceShutdown(),c.log("Info:Aria2 assassinated,exit"),t.args.hasOwnProperty("g")&&!t.args.hasOwnProperty("t")&&e.length>0&&s.default.writeFileSync("./actions_failed",e.length.toString())}().catch((e=>{throw e}))},178:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.find7zip=t.cleanWorkshop=t.beforeRunCheck=void 0;const n=o(a(747)),r=o(a(129)),s=a(593),l=a(970),i=a(231),c=a(397);t.beforeRunCheck=function(e){const t=function(e){return s.log("Error:Check failure, "+e),!1};return n.default.existsSync("C:\\Windows\\System32")?([l.DIR_BUILDS,l.DIR_TASKS].forEach((e=>{if(!n.default.existsSync(e)&&(n.default.mkdirSync(e),!n.default.existsSync(e)))return t("Can't create folder "+e)})),[{cmd:"rclone",hint:"rclone",onerror:t=>l.IGNORE_REMOTE?!!e&&n.default.existsSync("./rclone.exe")&&n.default.existsSync("./rclone.conf"):(t(),s.log("Warning:Command `rclone` not found, remote disabled"),!0)}].forEach((e=>{try{r.default.execSync("where "+e.cmd,{stdio:"ignore"})}catch(a){return console.log(a.output.toString()),e.onerror((()=>t("Command `"+e.cmd+"` not found, please install "+e.hint+"\nTry `scoop install "+e.hint+"` if you have scoop installed")))??!1}})),!0):t("Please run inside Windows")},t.cleanWorkshop=function(){const e=l.DIR_WORKSHOP.substring(2);return s.rd(e)?(n.default.mkdirSync(e),n.default.existsSync(e)):(s.log("Error:Can't remove workshop,kill running processes and retry"),!1)},t.find7zip=function(){let e=null;const t=["C:\\Program Files\\7-Zip\\7z.exe","C:\\Program Files (x86)\\7-Zip\\7z.exe",process.env.WINDIR+"\\system32\\7z.exe",process.env.PROGRAMFILESW6432+"\\7-Zip\\7z.exe",...null!=process.env["ProgramFiles(x86)"]?[process.env["ProgramFiles(x86)"]+"\\7-Zip\\7z.exe"]:[]];for(const a in t)if(n.default.existsSync(t[a])){e=t[a];break}if(!e){const t=["7z","7zz","7za"];for(const a in t)try{r.default.execSync("where "+t[a]),e=t[a];break}catch(e){continue}}return e?new i.Interface({status:c.Status.SUCCESS,payload:e}):new i.Interface({status:c.Status.ERROR,payload:"Error:7-Zip not found,please install 7-Zip from https://www.7-zip.org"})}},306:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.deleteFromRemote=t.uploadToRemote=void 0;const n=o(a(129)),r=a(970),s=a(593);function l(e,t){if(r.ENABLE_REMOTE){const a=r.REMOTE_ROOT+"/"+t+"/"+e;try{s.log("Info:Removing "+a),n.default.execSync("rclone delete "+r.REMOTE_NAME+":"+a,{timeout:1e4})}catch(e){return console.log(e.output.toString()),!1}s.log("Info:Removed successfully")}else r.IGNORE_REMOTE||s.log("Warning:Remote disabled,skip delete from remote");return!0}t.uploadToRemote=function(e,t){if(r.ENABLE_REMOTE){const a=r.DIR_BUILDS+"/"+t+"/"+e,o=r.REMOTE_ROOT+"/"+t;try{s.log("Info:Uploading "+e),n.default.execSync('rclone copy "'+a+'" '+r.REMOTE_NAME+":"+o,{timeout:12e5})}catch(a){return console.log(a.output.toString()),l(e,t)||s.log("Warning:Fali to delete broken uploaded file"),!1}s.log("Info:Uploaded successfully")}else r.IGNORE_REMOTE||s.log("Warning:Remote disabled,skip upload to remote");return!0},t.deleteFromRemote=l},143:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.scrapePage=void 0;const n=o(a(376)),r=o(a(359)),s=o(a(747)),l=a(231),i=a(397),c=a(593),u=o(a(183));async function d(e){let t;c.log("Info:Start scraping page: "+e);try{t=await n.default.get(e)}catch(t){return console.log(JSON.stringify(t)),new l.Interface({status:i.Status.ERROR,payload:"Error:Http status code abnormal,can't scrape "+e+" ,message:"+t.message})}return new l.Interface({status:i.Status.SUCCESS,payload:t.data})}t.scrapePage=async function(e,t){const a={},o=[".download-link",".download-info"];let n="";if(!t){let t=new l.Interface({status:i.Status.ERROR,payload:"Error:Fetch page function not ran"});for(let a=0;a<3&&(t=await d(e),t.status!=i.Status.SUCCESS);a++)await u.default(1e4);if(t.status==i.Status.ERROR)return t;n=t.payload}const f=r.default.load(t?s.default.readFileSync("./1.html").toString():n),g=f(".download-box");if(!g)return new l.Interface({status:i.Status.ERROR,payload:"Error:DOM_DOWNLOAD_BOX not found,can't scrape "+e+",skipping..."});let p={};for(const e in o)if(p=g.children(o[e]),p.attr("class"))break;if(!p.attr("class"))return new l.Interface({status:i.Status.ERROR,payload:"Error:Valid dom node not found,can't scrape "+e+",skipping..."});c.log('Info:Get valid dom node whose class is "'+p.attr("class")+'"');const S=f("strong:contains('MD5')");if(0===S.length)c.log("Warning:No MD5 tag found in this page");else try{a.md5=S.parent("li").get(0).children[1].data.substring(2)}catch(e){console.log(JSON.stringify(e)),c.log("Warning:Fail to get MD5 value")}switch(p.attr("class")){case"download-link":c.log("Warning:You may provided a short term supported application,please check the paUrl"),a.text=p.text(),a.href=p.attr("href");break;case"download-info":const t=g.children("a");if(a.text=p.text(),a.href=t.attr("href"),null==a.text.match(/Multilingual/))if(a.text.match(/English/)){c.log("Info:English application detected,trying to match simplified chinese version");const e=f(".zebra.download-links");if(e.length>0){const t=e.find("td:contains('Simplified')").parent("tr");if(t.length>0){a.href=t.find("a").get(0).attribs.href;try{a.md5=t.children("td").get(3).children[0].data}catch(e){console.log(JSON.stringify(e)),c.log("Warning:Fail to got md5")}c.log("Info:Found simplified chinese version\nmd5:"+a.md5+"\ndownload link:"+a.href)}else c.log("Warning:Simplified chinese version not found,use English version")}else c.log("Warning:Localizations table not found,use English version")}else c.log("Warning:Detected minority language application,check the default language of "+e)}return a.text&&a.href?(null==a.md5&&(a.md5=""),""!==a.md5&&null==a.md5.match(/([a-f\d]{32}|[A-F\d]{32})/)&&(c.log("Warning:Fail to check md5,got "+a.md5),a.md5=""),a.href=c.parseDownloadUrl(a.href),c.log("Info:Scraped successfully,got\ntext: "+a.text+"\ndownload link: "+a.href),""!==a.md5&&console.log("md5: "+a.md5??"none"),new l.Interface({status:i.Status.SUCCESS,payload:a})):new l.Interface({status:i.Status.ERROR,payload:"Error:Null value caught in result,can't scrape "+e})}},183:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return new Promise((t=>setTimeout(t,e)))}},457:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=o(a(513)),r=o(a(765)),s=o(a(83));t.default=class{constructor(e){this._config=e,this.process=[]}all(){this.process.push(n.default(s.default?.[r.default.platform]?.[r.default.arch].aria2??"aria2c",this._config.resolved.aria2SpawnArgs,{cwd:r.default.cwd()}))}promise(){return Promise.all(this.process)}}},25:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.aria2=t.getTasks=t.readTaskConfig=t.spawnAria2=t.processTask=t.args=void 0;const n=o(a(996)),r=o(a(747)),s=o(a(129)),l=o(a(242)),i=o(a(457)),c=o(a(183)),u=o(a(990)),d=a(970),f=a(231),g=a(397),p=a(593),S=a(306),h=a(949),y=a(949),m=a(143),R=a(713);let w,_;t.args=n.default(process.argv.slice(2)),t.aria2=w,t.spawnAria2=async function(){d._userConfig.resolved.spawnAria2&&(_=new i.default(d._userConfig),_.all(),_.promise().catch((e=>{throw console.error(e),e})),await c.default(1500)),t.aria2=w=new R.WebSocket.Client({host:d._userConfig.resolved.aria2Host,port:d._userConfig.resolved.aria2Port,auth:{secret:d._userConfig.resolved.aria2Secret}});try{const e=await w.getVersion();return p.log("Info:Aria2 ready, ver = "+e.version),!0}catch(e){return console.log(e),!1}},t.getTasks=function(){const e=d.DIR_TASKS,t=r.default.readdirSync(e),a=[];return t.forEach((t=>{r.default.statSync(e+"/"+t).isDirectory()&&a.push(t)})),a},t.readTaskConfig=function(e){const t=d.DIR_TASKS+"/"+e;if(!r.default.existsSync(t+"/config.json"))return new f.Interface({status:g.Status.ERROR,payload:"Warning:Skipping illegal task directory "+e});const a=JSON.parse(r.default.readFileSync(t+"/config.json").toString());if(e!==a.name)return new f.Interface({status:g.Status.ERROR,payload:'Error:Value of config\'s key "name" is not '+e});let o=null;for(const e in new f.Task)if(!a.hasOwnProperty(e)){o=e;break}return o?new f.Interface({status:g.Status.ERROR,payload:"Warning:Skipping illegal task config "+e+',missing "'+o+'"'}):["实用工具","开发辅助","配置检测","资源管理","办公编辑","输入法","录屏看图","磁盘数据","安全急救","即时通讯","安装备份","游戏娱乐","运行环境","压缩镜像","美化增强","驱动管理","下载上传","浏览器","影音播放","远程连接"].includes(a.category)?new f.Interface({status:g.Status.SUCCESS,payload:a}):new f.Interface({status:g.Status.ERROR,payload:"Warning:Skipping illegal task config "+e+',category "'+a.category+'" not exist'})},t.processTask=async function(e,a,o){p.log("Info:Start processing "+e.name);const n=await m.scrapePage(e.paUrl,!1);if(n.status===g.Status.ERROR)return p.log(n.payload),new f.Interface({status:g.Status.ERROR,payload:"Error:Can't scrape "+e.name+" 's page,skipping..."});const i=n.payload,R=p.matchVersion(i.text);if(R.status===g.Status.ERROR)return p.log(R.payload),new f.Interface({status:g.Status.ERROR,payload:"Error:Can't match "+e.name+" 's version from page,skipping..."});const _=p.formatVersion(R.payload);let E,O=p.versionCmp(a.latestVersion,_);switch(t.args.hasOwnProperty("f")&&(O=g.Cmp.L),O){case g.Cmp.L:const t=await async function(e,t,a){const{name:o}=e,n=e.releaseRequirement,i=t.href,{md5:S}=t,h=d.DIR_WORKSHOP+"/"+o;r.default.mkdirSync(h),r.default.mkdirSync(h+"/build"),p.log("Info:Start downloading "+o);try{const e=await w.addUri(i,{dir:h,out:"target.exe"},0);let t=!1;const a=u.default({text:"Downloading "+o+", waiting...",prefixText:l.default.blue("Info")});for(a.start();!t;){await c.default(500);const o=await w.tellStatus(e);if("error"==o.status)throw o;"complete"==o.status&&(t=!0),"waiting"==o.status&&await c.default(1e3),a.text="Download progress: "+(Number(o.completedLength)/1024/1024).toPrecision(3)+" / "+(Number(o.totalLength)/1024/1024).toPrecision(3)+" MiB, Speed: "+(Number(o.downloadSpeed)/1024/1024).toPrecision(3)+" MiB/s"}a.succeed(o+" downloaded.")}catch(e){return console.log(e.output.toString()),new f.Interface({status:g.Status.ERROR,payload:"Error:Downloading "+o+" failed,skipping..."})}if(!r.default.existsSync(h+"/target.exe"))return new f.Interface({status:g.Status.ERROR,payload:"Error:Downloading "+o+" failed,skipping..."});if(S&&""!==S){const e=await p.getMD5(h+"/target.exe");if(S.toLowerCase()!==e.toLowerCase())return new f.Interface({status:g.Status.ERROR,payload:"Error:Task "+o+" 's MD5 checking failed,expected "+S+",got "+e+",skipping..."})}p.log("Info:Start extracting "+o),s.default.execSync('"'+a+'" x target.exe -orelease -y',{cwd:h});let y=null;for(const e in n){const t=n[e];if(!r.default.existsSync(h+"/release/"+t)){y=t;break}}if(y)return new f.Interface({status:g.Status.ERROR,payload:"Error:Miss "+y+" in "+o+"'s workshop,skipping..."});if(r.default.existsSync(d.DIR_TASKS+"/"+o+"/make.cmd"))try{r.default.copyFileSync(d.DIR_TASKS+"/"+o+"/make.cmd",h+"/make.cmd")}catch{return new f.Interface({status:g.Status.ERROR,payload:"Error:Can't copy make.cmd for task "+o})}return r.default.existsSync(d.DIR_TASKS+"/"+o+"/utils")&&!p.xcopy(d.DIR_TASKS+"/"+o+"/utils",h+"/utils/")?new f.Interface({status:g.Status.ERROR,payload:"Error:Can't copy utils for task "+o}):(p.log("Info:Workshop for "+o+" is ready"),new f.Interface({status:g.Status.SUCCESS,payload:"Success"}))}(e,i,o);if(t.status===g.Status.ERROR){E=t;break}if(e.preprocess&&!y.preprocessPA(e.name)){E=new f.Interface({status:g.Status.ERROR,payload:"Error:Can't preprocess "+e.name+",skipping..."});break}if(e.autoMake){if(!function(e){p.log("Info:Start auto make "+e);const t=d.DIR_WORKSHOP+"/"+e+"/release",a=r.default.readdirSync(t);let o="";if(a.forEach((e=>{e.includes(".exe")&&(p.log("Info:Got exe file:"+e),o=e)})),""!==o){o.includes("Portable")||p.log("Warning:Exe file may be wrong:"+o);const t="FILE X:\\Program Files\\Edgeless\\"+e+"_bot->X:\\Users\\PortableApps\\"+e+"_bot\nLINK X:\\Users\\Default\\Desktop\\"+e+",X:\\Users\\PortableApps\\"+e+"_bot\\"+o;return r.default.writeFileSync(d.DIR_WORKSHOP+"/"+e+"/build/"+e+"_bot.wcs",t),p.log("Info:Save batch with command:\n"+t),!!p.mv(d.DIR_WORKSHOP+"/"+e+"/release",d.DIR_WORKSHOP+"/"+e+"/build/"+e+"_bot")&&(p.log("Info:Auto make executed successfully"),!0)}return p.log("Error:Can't find exe file,auto make failed"),!1}(e.name)){E=new f.Interface({status:g.Status.ERROR,payload:"Error:Can't make "+e.name+" automatically,skipping..."});break}}else{const t=await async function(e){return new Promise((t=>{r.default.existsSync(d.DIR_WORKSHOP+"/"+e+"/make.cmd")||t(new f.Interface({status:g.Status.ERROR,payload:"Error:make.cmd not found for task "+e})),p.log("Info:Start making "+e);try{s.default.execSync("make.cmd>make.log",{cwd:d.DIR_WORKSHOP+"/"+e,timeout:6e5})}catch{r.default.existsSync(d.DIR_WORKSHOP+"/"+e+"/make.log")?(console.log("console output======================="),console.log(p.gbk(r.default.readFileSync(d.DIR_WORKSHOP+"/"+e+"/make.log"))),console.log("console output=======================")):p.log("Warning:make.cmd has no console output"),t(new f.Interface({status:g.Status.ERROR,payload:"Error:Make error for "+e+",skipping..."}))}r.default.existsSync(d.DIR_WORKSHOP+"/"+e+"/make.log")?(console.log("console output======================="),console.log(p.gbk(r.default.readFileSync(d.DIR_WORKSHOP+"/"+e+"/make.log"))),console.log("console output=======================")):p.log("Warning:make.cmd has no console output"),t(new f.Interface({status:g.Status.SUCCESS,payload:"Success"}))}))}(e.name);if(t.status===g.Status.ERROR){E=t;break}}if(!p.copyCover(e.name)){E=new f.Interface({status:g.Status.ERROR,payload:"Error:Can't copy cover for "+e.name+",skipping..."});break}let n;try{n=function(e,t,a,o){const{name:n}=e,{category:l}=e,{author:i}=e,c=e.buildRequirement,u=n+"_"+t+"_"+i+"（bot）.7z",y=d.DIR_WORKSHOP+"/"+n,m=d.DIR_BUILDS+"/"+l;let R=null;for(const e in c){const t=c[e];if(!r.default.existsSync(y+"/build/"+t)){R=t;break}}if(R)return new f.Interface({status:g.Status.ERROR,payload:"Error:Miss "+R+" in "+n+"'s final build,skipping..."});p.log("Info:Start compressing into "+u);try{s.default.execSync('"'+a+'" a "'+u+'" *',{cwd:y+"/build"})}catch(e){return console.log(e.output.toString()),new f.Interface({status:g.Status.ERROR,payload:"Error:Compress "+u+" failed,skipping..."})}if(!r.default.existsSync(y+"/build/"+u))return new f.Interface({status:g.Status.ERROR,payload:"Error:Compress "+u+" failed,skipping..."});p.log("Info:Compressed successfully"),r.default.existsSync(m)||r.default.mkdirSync(m);let w='move "'+y+"/build/"+u+'" "'+m+"/"+u+'"';w=w.replace(/\//g,"\\");try{s.default.execSync(w)}catch(e){return console.log(e.output.toString()),new f.Interface({status:g.Status.ERROR,payload:"Error:Can't move with command:"+w})}return r.default.existsSync(m+"/"+u)?(o.builds.length>=d.MAX_BUILDS&&(o=h.removeExtraBuilds(o,m,l)),S.uploadToRemote(u,l)?(o.latestVersion=t,o.builds.push({version:t,name:u}),new f.Interface({status:g.Status.SUCCESS,payload:o})):new f.Interface({status:g.Status.ERROR,payload:"Error:Can't upload file "+u})):new f.Interface({status:g.Status.ERROR,payload:"Error:Can't move with command:"+w})}(e,_,o,a).unwarp()}catch(e){E=new f.Interface({status:g.Status.ERROR,payload:e});break}E=new f.Interface({status:g.Status.SUCCESS,payload:n});break;case g.Cmp.G:p.log("Warning:"+e.name+"'s local version is greater than online version,local="+a.latestVersion+",online="+_),E=new f.Interface({status:g.Status.SUCCESS,payload:a});break;default:p.log("Info:"+e.name+" has been up to date,local="+a.latestVersion+",online="+_),E=new f.Interface({status:g.Status.SUCCESS,payload:a})}return E}},593:function(e,t,a){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.copyCover=t.gbk=t.cleanBuildStatus=t.xcopy=t.mv=t.rd=t.versionCmp=t.matchVersion=t.formatVersion=t.parseDownloadUrl=t.getMD5=t.log=void 0;const n=o(a(747)),r=o(a(129)),s=o(a(242)),l=o(a(417)),i=o(a(953)),c=a(397),u=a(231),d=a(970),f=a(607);function g(e){if("string"!=typeof e)return console.log(s.default.yellow("Warning ")+"Illegal type detected"),void console.log(JSON.stringify(e));const t=e.split(":");if(t.length<2)return console.log(s.default.yellow("Warning ")+"Illegal message detected"),void console.log(e);const a=e.substring(t[0].length+1);switch(t[0]){case"Info":f.args.hasOwnProperty("g")?console.log(s.default.blue("Info: ")+a):console.log(s.default.blue("Info ")+a);break;case"Success":f.args.hasOwnProperty("g")?console.log(s.default.greenBright("Success: ")+a):console.log(s.default.greenBright("Success ")+a);break;case"Warning":f.args.hasOwnProperty("g")?console.log("::warning::"+a):console.log(s.default.yellow("Warning ")+a);break;case"Error":f.args.hasOwnProperty("g")?console.log("::error::"+a):console.log(s.default.red("Error ")+a);break;default:f.args.hasOwnProperty("g")?console.log("::warning::Illegal message detected:"+a):(console.log(s.default.yellow("Warning ")+"Illegal message detected"),console.log(e))}}function p(e,t){e=e.replace(/\//g,"\\"),t=t.replace(/\//g,"\\");try{r.default.execSync('xcopy /s /r /y "'+e+'" "'+t+'"')}catch(a){return console.log(a.output.toString()),g("Error:Can't copy "+e+" to "+t),!1}return n.default.existsSync(t)}t.log=g,t.getMD5=async function(e){return new Promise((t=>{const a=n.default.createReadStream(e),o=l.default.createHash("md5");let r;a.on("data",o.update.bind(o)),a.on("end",(()=>{r=o.digest("hex"),g("Info:MD5 is "+r),t(r)}))}))},t.parseDownloadUrl=function(e){return"/"===e[0]&&(e="https://portableapps.com"+e),e=e.replace("downloading","redirect"),encodeURI(e)},t.formatVersion=function(e){const t=e.split(".");if(t.length>4)return g('Warning:Illegal version "'+e+',"length='+t.length),e;for(let a=0;a<4-t.length;a++)e+=".0";return e},t.matchVersion=function(e){const t=/\d+.\d+(.\d+)*/,a=e.match(t);return a&&0!==a.length?new u.Interface({status:c.Status.SUCCESS,payload:a[0]}):new u.Interface({status:c.Status.ERROR,payload:'Error:Matched nothing when looking into "'+e+'" with "'+t+'",skipping...'})},t.versionCmp=function(e,t){const a=e.split("."),o=t.split(".");let n=c.Cmp.E;for(let e=0;e<Math.min(a.length,o.length);e++){if(Number(a[e])<Number(o[e])){n=c.Cmp.L;break}if(Number(a[e])>Number(o[e])){n=c.Cmp.G;break}}if(n===c.Cmp.E&&a.length!==o.length){let e;e=a.length<o.length?o:a;for(let t=Math.min(a.length,o.length);t<Math.max(a.length,o.length);t++)if(0!==Number(e[t])){n=a.length<o.length?c.Cmp.L:c.Cmp.G;break}}return n},t.rd=function(e){if(n.default.existsSync(e))try{e=e.replace(/\//g,"\\"),r.default.execSync('del /f /s /q "'+e+'"'),r.default.execSync('rd /s /q "'+e+'"')}catch(t){console.log(t.output.toString()),g("Warning:Can't remove directory "+e)}return!n.default.existsSync(e)},t.mv=function(e,t){e=e.replace(/\//g,"\\"),t=t.replace(/\//g,"\\");try{r.default.execSync('move /y "'+e+'" "'+t+'"')}catch(a){return console.log(a.output.toString()),g("Error:Can't move "+e+" to "+t),!1}return n.default.existsSync(t)},t.xcopy=p,t.cleanBuildStatus=function(e){return e.sort(((e,t)=>t.time-e.time)),e.slice(0,2)},t.gbk=function(e){return i.default.decode(e,"GBK")},t.copyCover=function(e){return!(n.default.existsSync(d.DIR_TASKS+"/"+e+"/cover")&&!p(d.DIR_TASKS+"/"+e+"/cover",d.DIR_WORKSHOP+e+"/release/"))}},83:e=>{e.exports=require("@edge-less/bot-prebuilt")},376:e=>{e.exports=require("axios")},242:e=>{e.exports=require("chalk")},359:e=>{e.exports=require("cheerio")},129:e=>{e.exports=require("child_process")},417:e=>{e.exports=require("crypto")},513:e=>{e.exports=require("execa")},747:e=>{e.exports=require("fs")},953:e=>{e.exports=require("iconv-lite")},146:e=>{e.exports=require("ini")},713:e=>{e.exports=require("libaria2-ts")},996:e=>{e.exports=require("minimist")},990:e=>{e.exports=require("ora")},622:e=>{e.exports=require("path")},765:e=>{e.exports=require("process")},284:e=>{e.exports=require("strip-json-comments")}},t={},a=function a(o){var n=t[o];if(void 0!==n)return n.exports;var r=t[o]={exports:{}};return e[o].call(r.exports,r,r.exports,a),r.exports}(607),o=exports;for(var n in a)o[n]=a[n];a.__esModule&&Object.defineProperty(o,"__esModule",{value:!0})})();