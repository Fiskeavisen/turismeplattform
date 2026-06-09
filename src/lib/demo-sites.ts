export type DemoSite = {
  slug: string;
  name: string;
  description: string;
  publicPath: string;
  adminPath: string;
  template: string;
  status: "live" | "draft";
};

export const demoSites: DemoSite[] = [
  {
    slug: "flo-feriesenter",
    name: "Flø Feriesenter",
    description: "Feriesenter med hytter, båt, havfiske og fjellturer på Sunnmøre.",
    publicPath: "/",
    adminPath: "/admin",
    template: "Kyst & eventyr",
    status: "live",
  },
];
