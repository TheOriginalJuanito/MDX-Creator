import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import Heading from "@theme/Heading";
import MDXContent from "@theme/MDXContent";
import EditLink from "@theme/DocItem/Content/EditLink";


function useSyntheticTitle() {
	const { metadata, frontMatter, contentTitle } = useDoc();
	const shouldRender =
		!frontMatter.hide_title && typeof contentTitle === "undefined";
	if (!shouldRender) {
		return null;
	}
	return metadata.title;
}
export default function DocItemContent({ children }) {
    const syntheticTitle = useSyntheticTitle();
    return (
		<div className={clsx(ThemeClassNames.docs.docMarkdown, "markdown")}>
			{syntheticTitle && (
				<header>
					<Heading as="h1">{syntheticTitle}</Heading>
				</header>
			)}
			<MDXContent>
				{children}
				<EditLink />
			</MDXContent>
		</div>
	);
}
