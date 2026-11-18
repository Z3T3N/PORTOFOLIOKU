<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { projects, profile } from '$lib/data';
	import ProjectRow from '$lib/components/ProjectRow.svelte';

	type Theme = 'light' | 'dark';
	type Status = 'idle' | 'loading' | 'success' | 'error';

	let theme: Theme = $state('dark');
	let status: Status = $state('idle');
	let mobileMenuOpen: boolean = $state(false);
	let copied: boolean = $state(false);
	let errorMessage: string = $state('Gagal mengirim pesan.');

	// State untuk Filter Kategori Proyek
	let selectedCategory: string = $state('Semua');
	
	// Ekstrak kategori unik dari data proyek (atau default)
	const categories = ['Semua', 'Web', 'Mobile', 'Gim'];

	// Filter proyek berdasarkan kategori
	let filteredProjects = $derived(
		selectedCategory === 'Semua'
			? projects
			: projects.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase() || true) // Sesuaikan dengan struktur data proyek Anda
	);

	onMount(() => {
		const savedTheme = localStorage.getItem('portfolio-theme') as Theme | null;
		if (savedTheme) theme = savedTheme;
	});

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		localStorage.setItem('portfolio-theme', theme);
	}

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText('zhadiramadhan@gmail.com');
			copied = true;
			setTimeout(() => (copied = false), 2500);
		} catch (err) {
			console.error('Gagal menyalin email', err);
		}
	}
</script>

<div class="min-h-dvh bg-bg text-ink transition-colors duration-300 {theme === 'dark' ? 'dark' : ''}">
	<!-- Garis Aksen Gradasi Mewah di Paling Atas -->
	<div class="h-1.5 w-full bg-gradient-gold-sky"></div>

	<!-- HEADER / NAVBAR -->
	<header class="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
		<div class="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between px-6 lg:h-[76px] lg:px-24">
			<a href="/" class="flex items-center gap-2.5 text-[16px] font-bold tracking-tight">
				<span class="h-3 w-3 rounded-full bg-gradient-btn shadow-sm"></span>
				<span>zidni<span class="text-gold">.</span><span class="text-sky">hr</span></span>
			</a>

			<div class="flex items-center gap-3 lg:gap-8">
				<nav class="hidden items-center gap-8 lg:flex">
					<a href="#proyek" class="text-sm font-medium text-muted transition-colors hover:text-gold">Proyek</a>
					<a href="#tentang" class="text-sm font-medium text-muted transition-colors hover:text-sky">Tentang</a>
					<a href="#keahlian" class="text-sm font-medium text-muted transition-colors hover:text-gold">Keahlian</a>
					<a href="#kontak" class="text-sm font-medium text-muted transition-colors hover:text-sky">Kontak</a>
				</nav>

				<!-- Tombol Ubah Tema -->
				<button
					type="button"
					aria-label="Ganti tema"
					onclick={toggleTheme}
					class="flex h-11 w-11 cursor-pointer items-center justify-center border border-line bg-surface transition-colors hover:border-gold"
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="dark:hidden">
						<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
					</svg>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="hidden text-gold dark:block">
						<circle cx="12" cy="12" r="4" />
						<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
					</svg>
				</button>

				<!-- Tombol Menu Mobile -->
				<button
					type="button"
					aria-label="Menu"
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					class="flex h-11 w-11 cursor-pointer items-center justify-center border border-line bg-surface lg:hidden"
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						{#if mobileMenuOpen}
							<path d="M6 6l12 12M6 18L18 6" />
						{:else}
							<path d="M4 7h16M4 12h16M4 17h16" />
						{/if}
					</svg>
				</button>
			</div>
		</div>

		<!-- Dropdown Menu Mobile -->
		{#if mobileMenuOpen}
			<nav class="flex flex-col border-t border-line bg-bg px-6 py-5 lg:hidden shadow-xl">
				<a href="#proyek" onclick={() => mobileMenuOpen = false} class="py-3 text-base font-medium border-b border-line/50 hover:text-gold">Proyek</a>
				<a href="#tentang" onclick={() => mobileMenuOpen = false} class="py-3 text-base font-medium border-b border-line/50 hover:text-sky">Tentang</a>
				<a href="#keahlian" onclick={() => mobileMenuOpen = false} class="py-3 text-base font-medium border-b border-line/50 hover:text-gold">Keahlian</a>
				<a href="#kontak" onclick={() => mobileMenuOpen = false} class="py-3 text-base font-medium hover:text-sky">Kontak</a>
			</nav>
		{/if}
	</header>

	<!-- HERO SECTION -->
	<section class="relative overflow-hidden">
		<!-- Efek Cahaya Ambiens di Latar Belakang -->
		<div class="pointer-events-none absolute top-10 left-1/4 h-[380px] w-[380px] rounded-full opacity-15 blur-[120px]" style="background: linear-gradient(135deg, #facc15, #38bdf8);"></div>

		<div class="mx-auto max-w-[1440px] px-6 pt-16 pb-14 lg:px-24 lg:pt-[130px]">
			<div class="mb-6 inline-flex items-center gap-2.5 border border-line bg-surface px-3.5 py-1.5 shadow-sm">
				<span class="h-2 w-2 rounded-full bg-gold animate-ping"></span>
				<span class="font-mono text-[11px] tracking-[1.2px] text-muted font-medium">
					PPLG SMKN 8 SEMARANG · 2026
				</span>
			</div>

			<h1 class="text-gradient-gold-sky pb-2 text-[42px] leading-[0.98] font-bold tracking-tight lg:text-[130px] lg:tracking-[-4px]">
				Zidni Hadi Ramadhan
			</h1>

			<div class="mt-8 flex flex-col gap-6">
				<p class="max-w-[600px] text-[17px] leading-[1.7] text-muted lg:text-xl">
					Developer muda berfokus pada rekayasa perangkat lunak, antarmuka web interaktif, dan performa aplikasi yang optimal.
				</p>

				<div class="flex flex-wrap items-center gap-4">
					<a
						href="#proyek"
						class="bg-gradient-btn flex h-13 items-center px-7 text-[15px] font-bold shadow-md transition-transform hover:scale-105 active:scale-95"
					>
						Eksplorasi Proyek
					</a>
					<button
						type="button"
						onclick={copyEmail}
						class="flex h-13 items-center gap-2.5 border border-line bg-surface px-6 text-[15px] font-medium text-ink transition-colors hover:border-gold"
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
							<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
						</svg>
						{copied ? 'Email Berhasil Disalin!' : 'Salin Email'}
					</button>
				</div>

				<div class="flex items-center gap-3 pt-2 font-mono text-[11px] tracking-[1.1px] text-sky">
					<span class="inline-block h-2 w-2 rounded-full bg-success"></span>
					<span>TERSEDIA UNTUK MAGANG & KOLABORASI PROYEK</span>
				</div>
			</div>
		</div>
	</section>

	<!-- BANNER / LAB PPLG -->
	<div class="border-t border-line bg-surface/50">
		<div class="relative overflow-hidden">
			<img
				src="/images/VON.png"
				alt="Lab PPLG SMKN 8 Semarang"
				class="h-[240px] w-full object-cover lg:h-[440px]"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80"></div>
		</div>
		<div class="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-24">
			<p class="font-mono text-[11px] tracking-[1.1px] text-muted">
				LABORATORIUM PPLG — SMK NEGERI 8 SEMARANG
			</p>
			<p class="font-mono text-[11px] tracking-[1.1px] text-gold">
				SEMARANG, INDONESIA
			</p>
		</div>
	</div>

	<!-- BAGIAN PROYEK DENGAN FILTER -->
	<section id="proyek" class="border-t border-line">
		<div class="mx-auto max-w-[1440px] px-6 pt-10 pb-16 lg:px-24 lg:pt-16 lg:pb-24">
			<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
				<div>
					<div class="flex items-center gap-2.5 mb-2">
						<span class="h-2 w-2 bg-gold"></span>
						<p class="font-mono text-[11px] tracking-[1.2px] text-gold font-bold">PORTOFOLIO KARYA</p>
					</div>
					<h2 class="text-3xl font-bold tracking-tight lg:text-4xl">Proyek Pilihan</h2>
				</div>

				<!-- Tombol Filter Kategori (Fitur Baru) -->
				<div class="flex flex-wrap gap-2">
					{#each categories as cat}
						<button
							type="button"
							onclick={() => selectedCategory = cat}
							class="cursor-pointer border px-4 py-2 font-mono text-[11px] tracking-wider transition-all {selectedCategory === cat ? 'border-gold bg-gold/10 text-gold font-bold' : 'border-line bg-surface text-muted hover:border-sky'}"
						>
							{cat.toUpperCase()}
						</button>
					{/each}
				</div>
			</div>

			<div class="mt-8 flex flex-col divide-y divide-line lg:mt-12">
				{#each filteredProjects as project, i (project.title)}
					<div class="transition-all hover:bg-surface/40">
						<ProjectRow {project} index={i} />
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- BAGIAN TENTANG & VIDEO PROFIL -->
	<section id="tentang" class="border-t border-line bg-surface/30">
		<div class="mx-auto max-w-[1440px] px-6 pt-10 pb-16 lg:px-24 lg:pt-16 lg:pb-24">
			<div class="flex items-center gap-2.5 mb-2">
				<span class="h-2 w-2 bg-sky"></span>
				<p class="font-mono text-[11px] tracking-[1.2px] text-sky font-bold">MENGENAL LEBIH DEKAT</p>
			</div>
			<h2 class="text-3xl font-bold tracking-tight lg:text-4xl mb-10">Tentang Saya</h2>

			<div class="flex flex-col items-start gap-10 lg:flex-row lg:gap-20">
				<!-- Bingkai Video Profil -->
				<div class="w-full bg-gradient-gold-sky p-[2px] shadow-lg lg:w-[424px] lg:shrink-0">
					<!-- svelte-ignore a11y_media_has_caption -->
					<video
						autoplay
						muted
						playsinline
						loop
						src="/images/zzz.mp4"
						class="h-[430px] w-full bg-bg object-cover lg:h-[520px]"
					></video>
				</div>

				<div class="flex w-full flex-col gap-8">
					<p class="max-w-[560px] text-[18px] leading-[1.7] text-ink/90">
						{profile.bio}
					</p>

					<div class="flex flex-col divide-y divide-line border-y border-line">
						{#each profile.facts as fact}
							<div class="flex items-center justify-between gap-8 py-4">
								<span class="font-mono text-[11px] tracking-[1.1px] text-muted">
									{fact.label}
								</span>
								<span class="text-right text-[15px] font-semibold">{fact.value}</span>
							</div>
						{/each}
					</div>

					<div id="keahlian" class="flex flex-col gap-3">
						<span class="font-mono text-[11px] tracking-[1.2px] text-gold font-bold">KEAHLIAN & TEKNOLOGI UTAMA</span>
						<div class="flex flex-wrap gap-2.5">
							{#each profile.skills as skill}
								<span class="border border-line bg-bg px-3.5 py-2 font-mono text-[11px] tracking-[1.1px] text-ink transition-colors hover:border-gold hover:text-gold shadow-xs">
									{skill}
								</span>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- BAGIAN KONTAK & FORMULIR -->
	<section id="kontak" class="border-t border-line">
		<div class="mx-auto max-w-[1440px] px-6 pt-10 pb-16 lg:px-24 lg:pt-16 lg:pb-24">
			<div class="flex items-center gap-2.5 mb-2">
				<span class="h-2 w-2 bg-gold"></span>
				<p class="font-mono text-[11px] tracking-[1.2px] text-gold font-bold">MARI TERHUBUNG</p>
			</div>

			<div class="mt-8 flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-24">
				<div class="flex flex-col gap-5 max-w-[480px]">
					<h2 class="text-3xl font-bold tracking-tight lg:text-4xl">
						Punya proyek menarik atau ingin berdiskusi?
					</h2>
					<p class="text-[17px] leading-[1.7] text-muted">
						Kirimkan pesan melalui formulir di samping, atau hubungi langsung via email institusi dan pribadi. Saya akan merespon secepatnya.
					</p>
					<div class="pt-4 flex flex-col gap-2 font-mono text-xs text-sky">
						<p>📧 zhadiramadhan@gmail.com</p>
						<p>📍 Semarang, Jawa Tengah, Indonesia</p>
					</div>
				</div>

				<form
					method="POST"
					action="?/kirim"
					use:enhance={() => {
						status = 'loading';
						return async ({ result, update }) => {
							await update({ reset: result.type === 'success' });
							if (result.type === 'success') {
								status = 'success';
							} else {
								status = 'error';
								errorMessage = (result.type === 'failure' && (result.data?.message as string)) || 'Gagal mengirim pesan.';
							}
						};
					}}
					class="flex w-full flex-col gap-5 border border-line bg-surface/50 p-6 lg:w-[480px] lg:shrink-0 shadow-lg"
				>
					<label class="flex flex-col gap-2">
						<span class="font-mono text-[11px] tracking-[1.1px] text-muted font-bold">NAMA LENGKAP</span>
						<input
							name="nama"
							required
							autocomplete="name"
							placeholder="Masukkan nama Anda"
							class="h-12 w-full border border-line bg-bg px-4 text-[15px] outline-none transition-colors placeholder:text-muted focus:border-gold"
						/>
					</label>

					<label class="flex flex-col gap-2">
						<span class="font-mono text-[11px] tracking-[1.1px] text-muted font-bold">ALAMAT EMAIL</span>
						<input
							name="email"
							type="email"
							required
							autocomplete="email"
							placeholder="nama@domain.com"
							class="h-12 w-full border border-line bg-bg px-4 text-[15px] outline-none transition-colors placeholder:text-muted focus:border-sky"
						/>
					</label>

					<label class="flex flex-col gap-2">
						<span class="font-mono text-[11px] tracking-[1.1px] text-muted font-bold">PESAN ANDA</span>
						<textarea
							name="pesan"
							required
							rows="4"
							placeholder="Tuliskan detail pesan atau kolaborasi..."
							class="min-h-[130px] w-full border border-line bg-bg px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-muted focus:border-gold"
						></textarea>
					</label>

					<button
						type="submit"
						disabled={status === 'loading'}
						class="flex h-13 cursor-pointer items-center justify-center gap-2 px-6 text-[15px] font-bold transition-all {status === 'loading' ? 'border border-line bg-surface text-muted' : 'bg-gradient-btn shadow-md'}"
					>
						{#if status === 'loading'}
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
								<path d="M12 3a9 9 0 1 0 9 9" />
							</svg>
							Mengirim Pesan...
						{:else}
							Kirim Pesan Sekarang
						{/if}
					</button>

					{#if status !== 'idle'}
						<div class="flex items-center gap-3 border border-line bg-bg px-4 py-3" role="status" aria-live="polite">
							{#if status === 'success'}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-success">
									<path d="M20 6 9 17l-5-5" />
								</svg>
								<span class="text-sm font-medium text-success">Pesan berhasil terkirim! Terima kasih.</span>
							{:else if status === 'error'}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-danger">
									<circle cx="12" cy="12" r="9" />
									<path d="M12 8v5M12 16.5v.01" />
								</svg>
								<span class="text-sm font-medium text-danger">{errorMessage}</span>
							{/if}
						</div>
					{/if}
				</form>
			</div>
		</div>
	</section>

	<!-- FOOTER -->
	<footer class="border-t border-line bg-surface/50">
		<div class="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 py-14 lg:px-24">
			<div class="flex flex-col gap-4">
				<p class="text-gradient-gold-sky max-w-[640px] text-[34px] leading-[1.08] font-bold tracking-tight lg:text-[52px]">
					Mari membangun solusi digital bersama.
				</p>
			</div>

			<div class="flex flex-col items-start gap-6 border-t border-line pt-8 lg:flex-row lg:items-center lg:justify-between">
				<a href="mailto:zhadiramadhan@gmail.com" class="font-mono text-xs tracking-[1.2px] text-sky hover:text-gold transition-colors">
					zhadiramadhan@gmail.com
				</a>
				<div class="flex items-center gap-8">
					<a href="#proyek" class="font-mono text-[11px] tracking-[1.2px] text-muted hover:text-ink">PROYEK</a>
					<a href="https://github.com/zidnihr" target="_blank" rel="noopener noreferrer" class="font-mono text-[11px] tracking-[1.2px] text-muted hover:text-ink">GITHUB</a>
					<a href="#kontak" class="font-mono text-[11px] tracking-[1.2px] text-muted hover:text-ink">KONTAK</a>
				</div>
			</div>
		</div>
	</footer>
</div>