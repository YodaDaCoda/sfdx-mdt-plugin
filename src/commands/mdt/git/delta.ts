import { flags, SfdxCommand } from "@salesforce/command";
import { AnyJson } from "@salesforce/ts-types";
import { execSync } from "child_process";
import * as chalk from "chalk";
import * as fs from "fs";

import {
  substringBeforeLast,
  substringBeforeNthChar,
  substringAfterLast,
  substringBefore,
  mkdirRecursive,
  writeFile,
} from "../../../utils/utilities";
import { gitShow, copyDiffOfComplexMetadata } from "../../../utils/delta";

const FMD_FOLDER = "force-app/main/default";

export default class Differ extends SfdxCommand {
  public static examples = [
    `$ sfdx mdt:git:diff -f {fromCommit} [-t {toCommit}] -p {packagedirectory} [-d destructivedirectory]
  Generate a delta package based on a git diff
  `,
  ];

  protected static flagsConfig = {
    from: flags.string({
      char: "f",
      required: true,
      description: "Branch or commit from",
    }),
    to: flags.string({
      char: "t",
      default: "",
      description: "Branch or commit to",
    }),
    packagedir: flags.string({
      char: "p",
      required: true,
      description: "The output directory where to generate the package",
    }),
    descructivedir: flags.string({
      char: "d",
      description:
        "The output directory where to generate the destructive package",
    }),
  };

  public async run(): Promise<AnyJson> {
    this.ux.startSpinner(chalk.yellowBright("Generating delta"));
    try {
      await this.delta(
        this.flags.from,
        this.flags.to,
        this.flags.packagedir,
        this.flags.descructivedir
      );
    } catch (e) {
      // output error
      this.ux.stopSpinner("❌");
      this.ux.error(chalk.redBright(e));
    }
    this.ux.stopSpinner("✔️");
    // Return an object to be displayed with --json
    return { success: true };
  }

  /**
   * generate a delta package
   * @param from
   * @param to
   * @param packagedir
   * @param destructivedir
   */
  public async delta(from, to, packagedir, destructivedir) {
    const gitDiffList = execSync(
      `git diff --name-status ${from} ${to}`
    ).toString();
    const changedMetadataFilePathList = [];
    const deletedMetadataFilePathList = [];
    gitDiffList.split("\n").forEach((diffFileLine) => {
      const diffFileParts = diffFileLine.split(/\t/);
      if (diffFileParts.length > 1 && diffFileParts[1].startsWith(FMD_FOLDER)) {
        switch (diffFileParts[0].charAt(0)) {
          case "D":
            console.log(
              chalk.green(diffFileParts[1]) + " " + chalk.redBright("DELETED")
            );
            deletedMetadataFilePathList.push(diffFileParts[1]);
            break;
          case "R":
            console.log(
              chalk.green(diffFileParts[1]) +
                " " +
                chalk.whiteBright("RENAMED TO") +
                " " +
                chalk.green(diffFileParts[2])
            );
            deletedMetadataFilePathList.push(diffFileParts[1]);
            changedMetadataFilePathList.push(diffFileParts[2]);
            break;
          default:
            console.log(
              chalk.green(diffFileParts[1]) +
                " " +
                chalk.yellowBright("MODIFIED")
            );
            changedMetadataFilePathList.push(diffFileParts[1]);
            break;
        }
      }
    });
    if (destructivedir) {
      for (const metadataFilePath of deletedMetadataFilePathList) {
        await mkdirRecursive(
          `${destructivedir}/${substringBeforeLast(metadataFilePath, "/")}`
        );
        const fileContent = await gitShow(from, metadataFilePath);
        await writeFile(`${destructivedir}/${metadataFilePath}`, fileContent);
      }
    }
    for (const metadataFilePath of changedMetadataFilePathList) {
      await mkdirRecursive(
        `${packagedir}/${substringBeforeLast(metadataFilePath, "/")}`
      );
      if (destructivedir) {
        await mkdirRecursive(
          `${destructivedir}/${substringBeforeLast(metadataFilePath, "/")}`
        );
      }

      const folderPath = substringBeforeLast(metadataFilePath, "/");
      const metadataFolderPath = substringBeforeNthChar(
        metadataFilePath,
        "/",
        4
      );
      switch (metadataFolderPath) {
        /** handle aura components */
        case `${FMD_FOLDER}/aura`:
          const auraFileNames = fs.readdirSync(`${folderPath}`);
          for (const auraFileName of auraFileNames) {
            await fs.copyFileSync(
              `${folderPath}/${auraFileName}`,
              `${packagedir}/${folderPath}/${auraFileName}`
            );
          }
          break;
        /** handle objects */
        case `${FMD_FOLDER}/objects`:
          const isRecordTypePatern = new RegExp(
            `${FMD_FOLDER}/objects/[^/]+/recordTypes`
          );
          // handle record types
          if (isRecordTypePatern.test(`${folderPath}`)) {
            await copyDiffOfComplexMetadata(
              from,
              `${metadataFilePath}`,
              {
                rootTagName: "RecordType",
                requiredTagNames: ["fullName", "active", "label"],
              },
              `${packagedir}`
            );
          } else {
            await fs.copyFileSync(
              `${metadataFilePath}`,
              `${packagedir}/${metadataFilePath}`
            );
          }
          break;
        /** handle object translations */
        case `${FMD_FOLDER}/objectTranslations`:
          const objTraFolderName = substringAfterLast(folderPath, "/");
          await fs.copyFileSync(
            `${folderPath}/${objTraFolderName}.objectTranslation-meta.xml`,
            `${packagedir}/${folderPath}/${objTraFolderName}.objectTranslation-meta.xml`
          );
          await fs.copyFileSync(
            `${metadataFilePath}`,
            `${packagedir}/${metadataFilePath}`
          );
          break;
        /** handle static resources */
        case `${FMD_FOLDER}/staticresources`:
          const staticResourceFolder = `${FMD_FOLDER}/staticresources`;
          if (folderPath !== staticResourceFolder) {
            const subFolderPath = folderPath.replace(
              staticResourceFolder + "/",
              ""
            );
            const resourceFolderName = substringBefore(
              subFolderPath + "/",
              "/"
            );
            await fs.copyFileSync(
              `${staticResourceFolder}/${resourceFolderName}.resource-meta.xml`,
              `${packagedir}/${staticResourceFolder}/${resourceFolderName}.resource-meta.xml`
            );
          } else {
            if (!metadataFilePath.endsWith(".resource-meta.xml")) {
              const resourceName = substringBeforeLast(
                substringAfterLast(metadataFilePath, "/"),
                "."
              );
              await fs.copyFileSync(
                `${folderPath}/${resourceName}.resource-meta.xml`,
                `${packagedir}/${folderPath}/${resourceName}.resource-meta.xml`
              );
            }
          }
          await fs.copyFileSync(
            `${metadataFilePath}`,
            `${packagedir}/${metadataFilePath}`
          );
          break;
        /** handle custom labels */
        case `${FMD_FOLDER}/labels`:
          await copyDiffOfComplexMetadata(
            from,
            `${metadataFilePath}`,
            { rootTagName: "CustomLabels", requiredTagNames: [] },
            `${packagedir}`,
            destructivedir
          );
          break;
        /** handle profiles */
        case `${FMD_FOLDER}/profiles`:
          await copyDiffOfComplexMetadata(
            from,
            `${metadataFilePath}`,
            { rootTagName: "Profile", requiredTagNames: [] },
            `${packagedir}`
          );
          break;
        /** handle permission sets */
        case `${FMD_FOLDER}/permissionsets`:
          await copyDiffOfComplexMetadata(
            from,
            `${metadataFilePath}`,
            { rootTagName: "PermissionSet", requiredTagNames: [] },
            `${packagedir}`
          );
          break;
        /** handle sharing rules */
        case `${FMD_FOLDER}/sharingRules`:
          await copyDiffOfComplexMetadata(
            from,
            `${metadataFilePath}`,
            { rootTagName: "SharingRules", requiredTagNames: [] },
            `${packagedir}`,
            destructivedir
          );
          break;
        /** handle assignment rules */
        case `${FMD_FOLDER}/assignmentRules`:
          await copyDiffOfComplexMetadata(
            from,
            `${metadataFilePath}`,
            { rootTagName: "AssignmentRules", requiredTagNames: [] },
            `${packagedir}`,
            destructivedir
          );
          break;
        /** handle auto response rules */
        case `${FMD_FOLDER}/autoResponseRules`:
          await copyDiffOfComplexMetadata(
            from,
            `${metadataFilePath}`,
            { rootTagName: "AutoResponseRules", requiredTagNames: [] },
            `${packagedir}`,
            destructivedir
          );
          break;
        /** handle matching rules */
        case `${FMD_FOLDER}/matchingRules`:
          await copyDiffOfComplexMetadata(
            from,
            `${metadataFilePath}`,
            { rootTagName: "MatchingRules", requiredTagNames: [] },
            `${packagedir}`,
            destructivedir
          );
          break;
        /** handle translations */
        case `${FMD_FOLDER}/translations`:
          await copyDiffOfComplexMetadata(
            from,
            `${metadataFilePath}`,
            { rootTagName: "Translations", requiredTagNames: [] },
            `${packagedir}`
          );
          break;
        /** handle workflow rules */
        case `${FMD_FOLDER}/workflows`:
          await copyDiffOfComplexMetadata(
            from,
            `${metadataFilePath}`,
            { rootTagName: "Workflow", requiredTagNames: [] },
            `${packagedir}`,
            destructivedir
          );
          break;
        /** handle all other metadata */
        default:
          await fs.copyFileSync(
            `${metadataFilePath}`,
            `${packagedir}/${metadataFilePath}`
          );
          break;
      }

      /** copy meta file if exists */
      const metaFileName = `${metadataFilePath}-meta.xml`;
      if (await fs.existsSync(`${metaFileName}`)) {
        await fs.copyFileSync(
          `${metaFileName}`,
          `${packagedir}/${metaFileName}`
        );
      }
    }
  }
}
