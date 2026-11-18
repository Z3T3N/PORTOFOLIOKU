<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Zidni Hadi Ramadhan — Portofolio PPLG 2026</title>
	<meta
		name="description"
		content="Portofolio Zidni Hadi Ramadhan, siswa jurusan Pengembangan Perangkat Lunak dan Gim (PPLG) SMKN 8 Semarang."
	/>
</svelte:head>

{@render children()}