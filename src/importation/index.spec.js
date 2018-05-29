jest.mock("./reader");

import Importation from ".";
import Status from "./status";
import fixture from "./__helpers__/fixture";

describe("importation", () => {
  describe("init", () => {
    it("is not configured", () => {
      expect(Importation.init()).toEqual({
        status: Status.UNCONFIGURED
      });
    });
  });

  describe("selectFile", () => {
    const importation = Importation.init();

    it("associates a file with no issue to the importation", () => {
      const file = fixture.validFile();
      expect(Importation.selectFile(file, importation)).toEqual({
        file,
        status: Status.READY
      });
    });

    it("associates a file with issue to the importation", () => {
      const file = fixture.invalidFile();
      expect(Importation.selectFile(file, importation)).toEqual({
        file,
        fileIssue: Importation.INVALID_FILE_TYPE,
        status: Status.FILE_ISSUE
      });
    });
  });

  describe("unselectFile", () => {
    it("dissociates the current file from the importation", () => {
      const importation = {
        file: fixture.validFile(),
        status: Status.READY
      };
      expect(Importation.unselectFile(importation)).toEqual({
        status: Status.UNCONFIGURED
      });
    });
  });

  describe("run", () => {
    it("returns a running importation + a finished importation promise", async () => {
      const file = fixture.validFile();
      const importation = { file, status: Status.READY };
      const {
        runningImportation,
        finishedImportationPromise
      } = Importation.run(importation);
      expect(runningImportation).toEqual({ file, status: Status.RUNNING });
      const finishedImportation = await finishedImportationPromise;
      expect(finishedImportation).toEqual({
        file,
        report: {
          imported: 1,
          skipped: [],
          total: 1,
          unsaved: 0
        },
        status: Status.COMPLETE_SUCCESS
      });
    });

    it("notifies of progress & saves contacts", async () => {
      const file = fixture.file("two-contacts.vcf");
      const importation = { file, status: Status.READY };
      const save = jest.fn().mockResolvedValue();
      const onProgress = jest.fn();
      await Importation.run(importation, { save, onProgress })
        .finishedImportationPromise;
      expect(save).toBeCalledWith(
        expect.objectContaining({ fullname: "Contact 1" })
      );
      expect(save).toBeCalledWith(
        expect.objectContaining({ fullname: "Contact 2" })
      );
      expect(onProgress.mock.calls).toEqual([
        [{ current: 0, total: 2 }],
        [{ current: 1, total: 2 }],
        [{ current: 2, total: 2 }]
      ]);
    });

    it("only notifies of progress when no contact", async () => {
      const file = fixture.file("broken/end-vcard-missing.vcf");
      const importation = { file, status: Status.READY };
      const save = jest.fn().mockResolvedValue();
      const onProgress = jest.fn();
      await Importation.run(importation, { save, onProgress })
        .finishedImportationPromise;
      expect(save).not.toBeCalled();
      expect(onProgress.mock.calls).toEqual([[{ current: 0, total: 0 }]]);
    });
  });

  describe("canRun", () => {
    const { canRun, init, run, selectFile } = Importation;
    const { validFile, invalidFile } = fixture;

    it("is false initially", () => {
      expect(canRun(init())).toBe(false);
    });

    it("is false when invalid file selected", () => {
      expect(canRun(selectFile(invalidFile(), init()))).toBe(false);
    });

    it("is true when valid file selected", () => {
      expect(canRun(selectFile(validFile(), init()))).toBe(true);
    });

    it("is false when running", async () => {
      const { runningImportation, finishedImportationPromise } = run(
        selectFile(validFile(), init())
      );
      expect(canRun(runningImportation)).toBe(false);
      await finishedImportationPromise;
    });

    describe("when already run", () => {
      it("is true when importation can be retried – see canRetry() below", async () => {
        const importation = await run(selectFile(validFile(), init()))
          .finishedImportationPromise;
        const expectCanRun = (bool, reportFields) => {
          const report = {
            ...importation.report,
            ...reportFields
          };
          const status = Status.fromReport(report);
          expect(canRun({ ...importation, report, status })).toBe(bool);
        };
        expectCanRun(false, { total: 0, imported: 0, unsaved: 0 });
        expectCanRun(false, { total: 1, imported: 0, unsaved: 0 });
        expectCanRun(true, { total: 1, imported: 0, unsaved: 1 });
        expectCanRun(false, { total: 1, imported: 1, unsaved: 0 });
        expectCanRun(false, { total: 2, imported: 0, unsaved: 0 });
        expectCanRun(true, { total: 2, imported: 0, unsaved: 1 });
        expectCanRun(true, { total: 2, imported: 0, unsaved: 2 });
        expectCanRun(false, { total: 2, imported: 1, unsaved: 0 });
        expectCanRun(true, { total: 2, imported: 1, unsaved: 1 });
        expectCanRun(false, { total: 2, imported: 2, unsaved: 0 });
      });
    });
  });

  describe("canRetry", () => {
    it("is false when not run", () => {
      expect(Importation.canRetry(Importation.init())).toBe(false);
    });

    it("is true when already run but some contacts could not be saved", async () => {
      const importation = await Importation.run(
        Importation.selectFile(fixture.validFile(), Importation.init())
      ).finishedImportationPromise;
      const expectCanRetry = (bool, reportFields) => {
        const report = {
          ...importation.report,
          ...reportFields
        };
        const status = Status.fromReport(report);
        expect(Importation.canRetry({ ...importation, report, status })).toBe(
          bool
        );
      };
      expectCanRetry(false, { total: 0, imported: 0, unsaved: 0 });
      expectCanRetry(false, { total: 1, imported: 0, unsaved: 0 });
      expectCanRetry(true, { total: 1, imported: 0, unsaved: 1 });
      expectCanRetry(false, { total: 1, imported: 1, unsaved: 0 });
      expectCanRetry(false, { total: 2, imported: 0, unsaved: 0 });
      expectCanRetry(true, { total: 2, imported: 0, unsaved: 1 });
      expectCanRetry(true, { total: 2, imported: 0, unsaved: 2 });
      expectCanRetry(false, { total: 2, imported: 1, unsaved: 0 });
      expectCanRetry(true, { total: 2, imported: 1, unsaved: 1 });
      expectCanRetry(false, { total: 2, imported: 2, unsaved: 0 });
    });
  });
});
