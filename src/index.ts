/**
 * @since 1.0.0
 */
import * as Api from "@tauri-apps/api";
import * as Event from "@tauri-apps/api/event";

import { Chunk, Data, Effect, Scope, Stream, StreamEmit } from "effect";

/**
 * @since 1.0.0
 */
export class TauriError extends Data.TaggedError("TauriError")<{
	message: string;
}> {}

/**
 * @since 1.0.0
 */
export const listen = (name: string) =>
	Stream.asyncScoped(
		(
			emit: StreamEmit.Emit<never, TauriError, Event.Event<unknown>, void>
		) =>
			Effect.gen(function* (_) {
				const scope = yield* _(Scope.Scope);
				const res = yield* _(
					Effect.tryPromise({
						try: () =>
							Event.listen(name, (event) =>
								emit(
									Effect.succeed(
										Chunk.of(event as Event.Event<unknown>)
									)
								)
							),
						catch: () => new TauriError({ message: "" })
					})
				);

				yield* _(Scope.addFinalizer(scope, Effect.succeed(res)));
			})
	);

/**
 * @since 1.0.0
 */
export const invoke = (cmd: string) =>
	Effect.tryPromise({
		try: () => Api.invoke(cmd),
		catch: () => new TauriError({ message: "" })
	});

/**
 * @since 1.0.0
 */
export const emit = <T>(name: string, payload: T) =>
	Effect.tryPromise({
		try: () => Event.emit(name, payload),
		catch: () => new TauriError({ message: "" })
	});
