import { Command } from "https://deno.land/x/cliffy@v0.25.2/command/command.ts";

import { version } from "./version.ts";

import { upgradeCommand } from "./cmd/upgrade.ts";
import { versionCommand } from "./cmd/version.ts";
import { fixCommand } from "./cmd/fix.ts";
import { serveCommand } from "./cmd/server.ts";
import { plugCompileCommand } from "./cmd/plug_compile.ts";
import { publishCommand } from "./cmd/publish.ts";

await new Command()
  .name("silverbullet")
  .description("Markdown as a platform")
  .version(version)
  .help({
    colors: false,
  })
  .usage("<options> <folder> | <command> (see below)")
  // Main command
  .arguments("<folder:string>")
  .option("-p, --port <port:number>", "Port to listen on")
  .option("--password <password:string>", "Password for basic authentication")
  .action(serveCommand)
  // fix
  .command("fix", "Fix a broken space")
  .arguments("<folder:string>")
  .action(fixCommand)
  // plug:compile
  .command("plug:compile", "Bundle (compile) one or more plug manifests")
  .arguments("<...name.plug.yaml:string>")
  .option("--debug [type:boolean]", "Do not minifiy code", { default: false })
  .option("--info [type:boolean]", "Print out size info per function", {
    default: false,
  })
  .option("--watch, -w [type:boolean]", "Watch for changes and rebuild", {
    default: false,
  })
  .option(
    "--dist <path:string>",
    "Folder to put the resulting .plug.json file into",
    { default: "." },
  )
  .option("--importmap <path:string>", "Path to import map file to use")
  .action(plugCompileCommand)
  // publish
  .command("publish")
  .description("Publish a SilverBullet site")
  .arguments("<folder:string>")
  .option("--index [type:boolean]", "Index space first", { default: false })
  .option("--watch, -w [type:boolean]", "Watch for changes", { default: false })
  .option("--output, -o <path:string>", "Output directory", { default: "web" })
  .action(publishCommand)
  // upgrade
  .command("upgrade", "Upgrade Silver Bullet")
  .action(upgradeCommand)
  // version
  .command("version", "Get current version")
  .action(versionCommand)
  .parse(Deno.args);
