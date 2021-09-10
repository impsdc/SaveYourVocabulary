import React from "react";
import { Helmet, HelmetProvider} from "react-helmet-async";

interface Props {
  title: string;
  description: string;
}

const SEO: React.FC<Props> = (props: Props) => {
  return (
    <HelmetProvider>
      <Helmet>
        <html lang="en" />
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </HelmetProvider>
  );
};

export default SEO;
