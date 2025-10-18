#!/bin/bash
cd src/components

read -p "Component Name: " rawName
componentName="$(tr '[:lower:]' '[:upper:]' <<< ${rawName:0:1})${rawName:1}"

mkdir $componentName
cd $componentName

touch $componentName.module.css
touch index.js



echo "
import React from 'react';
import styles from './$componentName.module.css';

export default function $componentName({ children}) {
    
    return (
        <div>
            {children}
        </div>
    );
}
" >> index.js

cd ..
cd ..
cd theme

IMPORT_LINE="import $componentName from '@site/src/components/$componentName';"
EXPORT_LINE="  $componentName,"


awk -v import="$IMPORT_LINE" '
/import .* from '\''@site\/src\/components\/.*'\'';/ { last_import=NR }
{ lines[NR] = $0 }
END {
    for (i = 1; i <= NR; i++) {
    print lines[i]
    if (i == last_import) print import
    }
}
' "MDXComponents.js" > temp && mv temp "MDXComponents.js"
echo "Import added."


sed -i '' "/};/i\\
$EXPORT_LINE
" "MDXComponents.js"

echo "Export updated."