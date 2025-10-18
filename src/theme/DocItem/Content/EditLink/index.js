import React, { useState, useEffect } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import styles from './EditLink.modules.css';
import Icon from './Icon';

const LOCALSTORAGE_KEY = 'UserDir';
// localStorage.clear();

function getEnvVariable() {
	if (typeof window === "undefined") {
		return "prod";
	}
	let customFields = window?.siteConfig?.customFields;
	let env = customFields?.APP_ENV;

	if (env == "dev") {
		return env;
	} else {
		return "prod";
	}
}
    const EditLink = () => {
	    const doc = useDoc();
	    let relativePath = doc?.metadata?.source ?? '';
	    relativePath = relativePath.slice(6);

        const [userDir, setUserDir] = useState('');
        const [inputValue, setInputValue] = useState('');

        useEffect(() => {
            if (typeof window !== "undefined") {
                const storedDir = localStorage.getItem(LOCALSTORAGE_KEY);
                if (storedDir) {
                    setUserDir(storedDir);
                }
            }
        }, []);

        const handleSave = () => {
            if (typeof window !== "undefined") {
                localStorage.setItem(LOCALSTORAGE_KEY, inputValue);
                setUserDir(inputValue);
            }
        };

        if (typeof window === "undefined" || getEnvVariable() !== "dev") {
            return null;
        } else if (localStorage.getItem("APP_ENV")  == "dev"){
        if (getEnvVariable() !== "dev") {
            return null;
        } else if (localStorage.getItem("APP_ENV")  == "dev"){




            function OpenURL() {
                if (!userDir) {
                    const dir = prompt("Please enter your local directory path (e.g., /Users/Name/Website/Docker-Base/docker-base-docusaurus/):", "");
                    if (dir != null && dir != "") {
                        localStorage.setItem(LOCALSTORAGE_KEY, dir);
                        setUserDir(dir);
                    } else {
                        alert("Directory path is required to edit the page.");
                    }
                }

                const editUrl = `vscode://file/${userDir}${relativePath}`;

                window.location.href = editUrl;
            }

            return (
                <div
                    target="_parent"
                    rel="noopener noreferrer"
                    onClick={() => { OpenURL(); }}
                    className={styles['edit-link']}
                >
                    <span>
                     <Icon name="pen" />   Edit this page
                    </span>
                </div>
            );
        }
	}

};

export default EditLink;
