#!/usr/bin/env bash

read -p "What doc do you want to create? (one word) " docName
docName=$(echo "$docName" | awk '{print $1}')
docName=$(echo "$docName" | tr '[:upper:]' '[:lower:]')

dirname="docs-$docName"
cd manuals
mkdir $dirname

cd $dirname


touch 00_$docName.mdx
cat <<EOF > 00_$docName.mdx
---
id: 'home_$docName'
sidebar_label: '$docName'
sidebar_position: 0
slug: '/'
description: ''
---

# $docName
EOF


touch _category_.json
cat <<EOF > _category_.json
{
  "label": "$docName",
  "position": 1,
  "link": {
    "type": "doc",
    "id": "$docName"
  }
}
EOF

cd ../..
configFile="docusaurus.config.js"
insertLine=$(grep -n 'items: \[' "$configFile" | cut -d: -f1)
endLine=$(awk "NR>$insertLine {if(/]/){print NR; exit}}" "$configFile")
sed -i '' "${endLine}i\\
                    {\\
                        to: \"/$docName/\",\\
                        label: \"$docName\",\\
                    },
" "$configFile"

sed -i '' "/plugins: \[/a\\
        [\\
            '@docusaurus/plugin-content-docs',\\
            {\\
                id: '$docName',\\
                path: 'manuals/docs-$docName',\\
                routeBasePath: '$docName',\\
            },\\
        ],
" "$configFile"

