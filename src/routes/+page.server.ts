import { fail } from '@sveltejs/kit';
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

		if (!email.includes('@')) {
			return fail(400, { message: 'Format email tidak valid.' });
		}

		// Simulasi proses pengiriman pesan (bisa dihubungkan ke Resend / EmailJS / Database)
		console.log('Pesan baru diterima:', { nama, email, pesan });

		return { success: true };
	}
};