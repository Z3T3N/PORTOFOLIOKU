import { fail } from '@sveltejs/kit';
import { RESEND_API_KEY, RESEND_TO } from '$app/env/private';
import type { Actions } from './$types';

export const actions: Actions = {
	kirim: async ({ request }) => {
		const data = await request.formData();
		const nama = String(data.get('nama') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const pesan = String(data.get('pesan') ?? '').trim();

		if (!nama || !email || !pesan) {
			return fail(400, { message: 'Semua kolom wajib diisi.' });
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { message: 'Format email tidak valid.' });
		}

		if (!RESEND_API_KEY || !RESEND_TO) {
			console.error('Email form is missing RESEND_API_KEY or RESEND_TO.');
			return fail(503, { message: 'Layanan email belum dikonfigurasi.' });
		}

		let response: Response;
		try {
			response = await fetch('https://api.resend.com/emails', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${RESEND_API_KEY}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					from: 'Portofolio <onboarding@resend.dev>',
					to: [RESEND_TO],
					reply_to: email,
					subject: `Pesan dari ${nama}`,
					text: `${pesan}\n\n— ${nama} <${email}>`
				})
			});
		} catch (error) {
			console.error('Gagal menghubungi Resend.', error);
			return fail(502, { message: 'Gagal menghubungi layanan email. Coba lagi nanti.' });
		}

		if (!response.ok) {
			console.error('Resend menolak pengiriman:', response.status, await response.text());
			return fail(502, { message: 'Email gagal dikirim. Coba lagi nanti.' });
		}

		return { success: true };
	}
};
