exports.handler = async (event) => {
	const place = event.queryStringParameters.place || "";
	const API_ENDPOINT = `https://cafenomad.tw/api/v1.2/cafes${place ? `/${place}` : ""}`;

	try {
		const fetch = (await import("node-fetch")).default;
		const response = await fetch(API_ENDPOINT);
		if (!response.ok) {
			return { statusCode: response.status, body: response.statusText };
		}
		const data = await response.json();

		return {
			statusCode: 200,
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
		};
	} catch (error) {
		return { statusCode: 500, body: JSON.stringify({ msg: error.message }) };
	}
};
