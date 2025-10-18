#!/usr/bin/env bash

configFile="docusaurus.config.js"

echo "Available manuals:"
select docName in $(ls manuals); do
    if [ -n "$docName" ]; then
        break
    fi
done

read -p "New Version. Name: " versionName
echo "Creating version: $versionName for $docName"

sed -i '' '1s/^import .dotenv\/config.;/\/\/ &/' "$configFile"

# Create new version
npm run docusaurus docs:version:${docName#docs-} "$versionName"

# Reactivate .env Import
sed -i '' '1s/^\/\/ import .dotenv\/config.;/import '\''dotenv\/config'\'';/' "$configFile"

# Ensure versions attribute exists in plugin block
pluginId="${docName#docs-}"

if grep -A5 "routeBasePath: '${pluginId}'" "$configFile" | grep -q "versions:"; then
    # Append new version inside existing versions block
    sed -i '' "/routeBasePath: '${pluginId}'/,/},/{
        /versions: {/,/},/{
            /},/i\\
                '${versionName}': { label: 'Version ${versionName}' },
        }
    }" "$configFile"
else
    # Insert new versions block
    sed -i '' "/routeBasePath: '${pluginId}'/a\\
            lastVersion: 'current',\\
            versions: {\\
                current: { label: 'Current', path: '' }, \\
                '${versionName}': { label: 'Version ${versionName}' }, \\
            },  \\
    " "$configFile"
fi

# Ensure docsVersionDropdown exists in navbar
# check by pluginId (works even if the object is multiline)
if grep -Fq "docsPluginId: '${pluginId}'" "$configFile"; then
    echo "docsVersionDropdown for $pluginId already exists – skipping."
else
    echo "Adding docsVersionDropdown for $pluginId"
    sed -i '' "/navbar: {/,/items: \[/{
        /items: \[/a\\
        \ \ \ \ \ \ \ \ \ \ \ \ \ {\\
        \ \ \ \ \ \ \ \ \ \ \ \ \ type: 'docsVersionDropdown',\\
        \ \ \ \ \ \ \ \ \ \ \ \ \ docsPluginId: '${pluginId}',\\
        \ \ \ \ \ \ \ \ \ \ \ \ \ position: 'right'\\
        \ \ \ \ \ \ \ \ \ \ \ \ },
    }" "$configFile"
fi


