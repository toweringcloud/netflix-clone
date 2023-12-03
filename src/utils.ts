export function makeImagePath(id: string, format?: string) {
	return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function checkImagePath(id: string, format?: string): Promise<number> {
	return fetch(
		`https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`
	).then((response) => response.status);
}
