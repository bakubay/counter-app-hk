import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

//   create: publicProcedure
//     .input(z.object({ id: z.string().min(1), value: z.string().min(1) }))
//     .mutation(async ({ ctx, input }) => {
//       return ctx.db.count.upsert({
//         create: {
//           id: input.id,
//           value: input.value
//         },
//       });
//     }),

//   getLatest: publicProcedure.query(({ ctx }) => {
//     return ctx.db.counter.findFirst({
//       orderBy: { name: "asc" },
//     });
//   }),
});
