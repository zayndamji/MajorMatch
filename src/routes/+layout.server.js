import universities from '$lib/data/universities.json';
import fs from 'fs';
import path from 'path';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ url }) {
	const segments = url.pathname.split('/').filter(Boolean);
	const universityId = segments[1] ?? null;
	const majorId = segments[3] ?? null;

	let pageTitle = 'Major Match';

	if (url.pathname === '/') {
		pageTitle = 'Major Match';
	} else if (url.pathname === '/universities') {
		pageTitle = 'Major Match – All Universities';
	} else if (segments.length === 2 && universityId) {
		const university = universities.find((u) => u.id === universityId);
		if (university) pageTitle = `Major Match – ${university.name}`;
	} else if (segments.length === 4 && universityId && majorId) {
		const university = universities.find((u) => u.id === universityId);
		if (university) {
			try {
				const majorsPath = path.resolve(`./src/lib/data/${universityId}/majors.json`);
				if (fs.existsSync(majorsPath)) {
					const majors = JSON.parse(fs.readFileSync(majorsPath, 'utf-8'));
					const major = majors.find((m) => m.id === majorId);
					if (major) {
						pageTitle = `Major Match – ${major.name} at ${university.name}`;
					} else {
						pageTitle = `Major Match – ${university.name}`;
					}
				}
			} catch (e) {
				console.error('Failed to load major data:', e);
				pageTitle = `Major Match – ${university.name}`;
			}
		}
	}

	return {
		pageTitle
	};
}
