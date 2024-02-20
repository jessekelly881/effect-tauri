import { mockIPC } from "@tauri-apps/api/mocks";
import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";
import { invoke } from "../src";

describe("tauri", () => {
	it("invoke", async () => {
		const called = vi.fn();

		// @ts-expect-error Error
		mockIPC((cmd, args) => {
		if(cmd === "called") {
			called(args)
			}
		})

		await Effect.runPromise(invoke("called", { a: "a" }));
		expect(called).toHaveBeenCalledOnce();
		expect(called).toHaveBeenLastCalledWith({ a: "a" });
	});
});
