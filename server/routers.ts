import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Kafala Dashboard Routers
  kafala: router({
    // سحب البيانات من جوجل شيت
    getProjects: publicProcedure.query(async () => {
      try {
        const { fetchGoogleSheetData, calculateStats, groupByMarketer, groupByTeam } = await import('./googleSheets');
        const projects = await fetchGoogleSheetData();
        const stats = calculateStats(projects);
        const marketers = groupByMarketer(projects);
        const teams = groupByTeam(projects);

        return {
          projects: projects.map((p, idx) => ({
            id: `${idx}`,
            name: p.name,
            collected: p.collected,
            target: p.target,
            donors: p.donors,
            transactions: p.transactions,
            marketer: p.marketer,
            team: p.team,
            status: (p.collected === 0 ? 'zero' : p.collected >= p.target ? 'complete' : 'partial') as 'zero' | 'partial' | 'complete'
          })),
          stats,
          marketers,
          teams
        };
      } catch (error) {
        console.error('Error fetching projects:', error);
        throw new Error('Failed to fetch projects from Google Sheet');
      }
    }),
  })
});

export type AppRouter = typeof appRouter;
