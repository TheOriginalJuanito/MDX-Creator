import React from "react";
import Layout from "@theme-original/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function LayoutWrapper(props) {
    const { siteConfig } = useDocusaurusContext();
    React.useEffect(() => {
        window.siteConfig = siteConfig;
    }, [siteConfig]);

    return (
        <>
            <Layout {...props} />
        </>
    );
}
