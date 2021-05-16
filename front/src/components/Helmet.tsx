import React from "react";
import { Helmet } from "react-helmet";

interface Props {
  title: string;
  description: string;
}

const SEO: React.FC<Props> = (props: Props) => {
  return (
    <div className="app">
      <Helmet>
        <html lang="Fr" />
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </div>
  );
};

export default SEO;
