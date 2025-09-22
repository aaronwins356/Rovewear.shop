import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

export default function StudioPage(): JSX.Element {
  return <NextStudio config={config} />;
}
