import { getRequestConfig } from "next-intl/server";

import { getEnvVar } from "./utils/get-env-var";

type En = typeof import("../messages/en.json");

export default getRequestConfig(async () => {
	const locale = getEnvVar(process.env.NEXT_PUBLIC_LANGUAGE, "NEXT_PUBLIC_LANGUAGE");

	return {
		locale,
		messages: ((await import(`../messages/${locale}.json`)) as { default: En }).default,
	};
});
