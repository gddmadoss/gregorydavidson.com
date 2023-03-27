import { serve, serveDir } from "./deps.ts";

enum Version {
  Y2001 = "/2001",
  Y2019 = "/2019",
}

const VERSION_PATHS = {
  [Version.Y2001]: "2001/",
  [Version.Y2019]: "2019/",
};

const DEFAULT_VERSION = Version.Y2019;

serve((r: Request) => {
  const u = new URL(r.url);
  // TODO: Fix 404 on /2001/
  if (u.pathname.startsWith(Version.Y2001)) {
    return serveVersion(r, Version.Y2001);
  }

  // TODO: Fix 404 on /2019/
  if (u.pathname.startsWith(Version.Y2019)) {
    return serveVersion(r, Version.Y2019);
  }

  return Response.redirect(new URL(DEFAULT_VERSION, u).href, 301);
});

function serveVersion(r: Request, v: Version) {
  return serveDir(r, {
    fsRoot: VERSION_PATHS[v],
    urlRoot: v,
  });
}
