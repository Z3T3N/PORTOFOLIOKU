import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions } from './$types';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

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

		try {
			const { error } = await resend.emails.send({
				from: 'Portofolio Zidni <onboarding@resend.dev>',
				to: ['zhadiramadhan@gmail.com'],
				subject: `Pesan Baru dari Portofolio: ${nama}`,
				replyTo: email,
				html: `
					<div style="font-family: sans-serif; padding: 20px; color: #111;">
						<h2 style="color: #d97706;">Pesan Baru dari Website Portofolio</h2>
						<p><strong>Nama:</strong> ${nama}</p>
						<p><strong>Email Pengirim:</strong> ${email}</p>
						<hr style="border: 1px solid #eee; margin: 20px 0;" />
						<p><strong>Pesan:</strong></p>
						<p style="background: #f8fafc; padding: 15px; border-radius: 6px; line-height: 1.6;">${pesan}</p>
					</div>
				`
			});

			if (error) {
				console.error('Resend Error:', error);
				return fail(500, { message: 'Gagal mengirim email melalui Resend.' });
			}

			return { success: true };
		} catch (err) {
			console.error('Server Error:', err);
			return fail(500, { message: 'Terjadi kesalahan pada server.' });
		}
	}
};
