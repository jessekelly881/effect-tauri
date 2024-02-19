import { mockIPC } from "@tauri-apps/api/mocks";
import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";
import { invoke } from "../src";

describe("tauri", () => {
	it("invoke", async () => {
		mockIPC(() => {});
		const spy = vi.spyOn(window, "__TAURI_IPC__");
		await Effect.runPromise(invoke("test"));
		expect(spy).toHaveBeenCalledOnce();
	});
});
