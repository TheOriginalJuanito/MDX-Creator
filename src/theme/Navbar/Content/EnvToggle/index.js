import React, { useEffect, useState } from 'react';
import styles from './EnvToggle.module.css';

function getEnvVariable() {
	let customFields = window?.siteConfig?.customFields;
	let env = customFields?.APP_ENV;

	if (env == "dev") {
		return env;
	} else {
		return "prod";
	}
}

export default function EnvToggle() {
    const [env, setEnv] = useState(null);

	useEffect(() => {
		const scrollPos = sessionStorage.getItem("scrollPosition");
		if (scrollPos !== null) {
		window.scrollTo(0, parseInt(scrollPos, 10));
		sessionStorage.removeItem("scrollPosition");
		}
	}, []);

    useEffect(() => {
        setEnv(window.location.hostname);
    }, []);
    if (!env) return null;


    const handleEnvBtnClick = () => {
		let envToggle = document.getElementById("env-toggle");

		function Reload() {
			sessionStorage.setItem("scrollPosition", window.scrollY);
			location.reload();
		}

		if (envToggle.value === "DEV") {
			envToggle.value = "PROD";
			localStorage.setItem("APP_ENV", "prod");

		} else {
			envToggle.value = "DEV";
			localStorage.setItem("APP_ENV", "dev");
		}
		Reload();
	};

	if (getEnvVariable() === "dev") {
		let env = localStorage.getItem("APP_ENV") || "dev";
		return (
			<input
				type="button"
				className={styles.envToggle}
				id="env-toggle"
				value={env === "dev" ? "DEV" : "PROD"}
				onClick={handleEnvBtnClick}
			/>
		);
	} else {
		return null;
	}
}
