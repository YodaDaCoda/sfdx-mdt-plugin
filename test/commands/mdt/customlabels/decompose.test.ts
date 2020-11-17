import * as fs from "fs";
import { expect } from "chai";
import * as x2jParser from "fast-xml-parser";
import * as rimraf from "rimraf";
import Decomposer from "../../../../src/commands/mdt/customlabels/decompose";
import * as x2jOptions from "../../../../src/config/x2jOptions.json";

const testdatapath = "test/commands/mdt/customlabels/data";

describe("cmd:customlabels:decompose", () => {
  it("decompose custom labels", async () => {
    let decomposer = new Decomposer([], null);
    if (!fs.existsSync(`${testdatapath}/decompose/test1/decomposed`)) {
      await fs.mkdirSync(`${testdatapath}/decompose/test1/decomposed`);
    }

    await decomposer.decompose(
      `${testdatapath}/decompose/test1/CustomLabels.labels-meta.xml`,
      `${testdatapath}/decompose/test1/decomposed`
    );
    const label1xmldata = await fs.readFileSync(
      `${testdatapath}/decompose/test1/decomposed/label1.xml`,
      {
        encoding: "utf8",
      }
    );
    const label1json = x2jParser.parse(label1xmldata, x2jOptions);
    expect(label1json.label.fullName).to.equal("label1");
    rimraf(`${testdatapath}/decompose/test1/decomposed/*`, () => {});
  });
});