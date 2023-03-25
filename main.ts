import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.181.0/http/file_server.ts";

serve((r: Request) => {
  return serveDir(r, {
      fsRoot: "site/",
    });
});
