import { z } from "zod";

export const GenreSchema = z.lazy(() =>
	z.object({
		id: z.number().optional(),
		name: z.string(),
	})
);
export type Genre = z.infer<typeof GenreSchema>;
