import { Card } from "@ui";
import { Content, Header } from "./components";

export const Article = () => (
  <main>
    <Card>
      <article className="flex flex-col gap-4 pb-7">
        <Header />
        <Content />
      </article>
    </Card>
  </main>
);
