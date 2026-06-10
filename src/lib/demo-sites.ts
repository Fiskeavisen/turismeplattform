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
    slug: "nordskjaer-feriesenter",
    name: "Nordskjær Feriesenter",
    description: "Feriesenter med hytter, båt, havfiske og fjellturer ved norskekysten.",
    publicPath: "/demo/storhavet",
    adminPath: "/admin",
    template: "Storhavet",
    status: "live",
  },
];
