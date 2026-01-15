export const dummyUser = {
  email: "rizal@mail.com",
  password: "123",
  name: "Rizal Ahmad M",
  role: "Mahasiswa",
  streak: 5,
  points: 1250
};

export const modulList = [
  {
    id: "modul-1",
    judul: "Pengenalan React & Environment Setup",
    deskripsi: "Belajar sejarah React, keunggulannya, serta cara setup project menggunakan Vite dan struktur folder standar industri.",
    category: "Programming",
    selesai: true
  },
  {
    id: "modul-2",
    judul: "Komponen Dasar & Props",
    deskripsi: "Memahami konsep dasar komponen (Functional Component) dan cara mengirim data antar komponen menggunakan Props.",
    category: "Programming",
    selesai: true
  },
  {
    id: "modul-3",
    judul: "State Management dengan useState",
    deskripsi: "Mengelola data internal komponen yang dinamis menggunakan Hook useState dan memahami siklus re-render.",
    category: "Programming",
    selesai: true
  },
  {
    id: "modul-4",
    judul: "Handling Events & Controlled Components",
    deskripsi: "Cara menangani input user, klik tombol, dan mengelola form secara terpusat melalui state React.",
    category: "Programming",
    selesai: false
  },
  {
    id: "modul-5",
    judul: "Lifecycle & useEffect Hook",
    deskripsi: "Mempelajari efek samping (side effects) seperti sinkronisasi data dan timer menggunakan Hook useEffect.",
    category: "Programming",
    selesai: false
  },
  {
    id: "modul-6",
    judul: "List Rendering & Keys",
    deskripsi: "Cara merender data array secara dinamis menggunakan method map() dan pentingnya penggunaan unique keys.",
    category: "Programming",
    selesai: false
  },
  {
    id: "modul-7",
    judul: "React Router DOM & Navigation",
    deskripsi: "Membangun aplikasi Single Page Application (SPA) dengan sistem navigasi antar halaman tanpa reload.",
    category: "Network",
    selesai: false
  },
  {
    id: "modul-8",
    judul: "Fetching Data dengan Axios",
    deskripsi: "Integrasi frontend dengan API eksternal menggunakan library Axios untuk mengambil dan mengirim data.",
    category: "Network",
    selesai: false
  },
  {
    id: "modul-9",
    judul: "useReducer & Context API",
    deskripsi: "Mengelola state global yang kompleks tanpa perlu 'props drilling' menggunakan kombinasi Reducer dan Context.",
    category: "Database",
    selesai: false
  },
  {
    id: "modul-10",
    judul: "Optimasi Performa & Deployment",
    deskripsi: "Teknik optimasi dengan React.memo, useMemo, serta langkah-langkah melakukan deploy aplikasi ke Railway.",
    category: "Deployment",
    selesai: false
  }
];

export const studyProgressData = [
  { week: 'W1', progress: 20 },
  { week: 'W2', progress: 45 },
  { week: 'W3', progress: 70 },
  { week: 'W4', progress: 85 },
];

export const categoryData = [
  { name: 'Programming', hours: 40 },
  { name: 'Database', hours: 25 },
  { name: 'Network', hours: 15 },
];

export const skillData = [
  { subject: 'React', A: 120, fullMark: 150 },
  { subject: 'SQL', A: 98, fullMark: 150 },
  { subject: 'Router', A: 86, fullMark: 150 },
  { subject: 'Hooks', A: 99, fullMark: 150 },
  { subject: 'API', A: 85, fullMark: 150 },
];

export const quizData = [
  { id: 1, question: "Siapakah pencipta library React?", options: ["Google", "Facebook", "Microsoft", "Twitter"], answer: "Facebook" },
  { id: 2, question: "Ekstensi file apa yang digunakan untuk komponen React?", options: [".html", ".js", ".jsx", ".css"], answer: ".jsx" },
  { id: 3, question: "Hook apa yang digunakan untuk menyimpan state?", options: ["useEffect", "useContext", "useState", "useRef"], answer: "useState" },
  { id: 4, question: "Apa kegunaan dari props dalam React?", options: ["Mengirim data ke komponen anak", "Menyimpan data internal", "Menangani event", "Melakukan fetching data"], answer: "Mengirim data ke komponen anak" },
  { id: 5, question: "Kapan useEffect dijalankan secara default?", options: ["Hanya saat pertama render", "Setiap kali ada perubahan state/props", "Hanya saat unmount", "Saat error terjadi"], answer: "Setiap kali ada perubahan state/props" },
  { id: 6, question: "Apa itu Virtual DOM?", options: ["Copy dari DOM asli", "Browser asli", "Database server", "Bahasa pemrograman baru"], answer: "Copy dari DOM asli" },
  { id: 7, question: "Bagaimana cara merender list di React?", options: ["Gunakan for loop", "Gunakan map()", "Gunakan while", "Gunakan filter()"], answer: "map()" },
  { id: 8, question: "Apa fungsi dari 'key' dalam rendering list?", options: ["Menambah gaya CSS", "Membantu React mengidentifikasi item yang berubah", "Menyimpan data unik", "Menghubungkan ke API"], answer: "Membantu React mengidentifikasi item yang berubah" },
  { id: 9, question: "Hook mana yang digunakan untuk performa memoization nilai?", options: ["useMemo", "useCallback", "useReducer", "useRef"], answer: "useMemo" },
  { id: 10, question: "Apa kepanjangan dari JSX?", options: ["JavaScript XML", "JavaScript XSL", "Java Syntax Extension", "JSON XML"], answer: "JavaScript XML" },
  { id: 11, question: "Bagaimana cara navigasi antar halaman di React Router?", options: ["<a> tag", "window.location", "<Link> component", "navigator()"], answer: "<Link> component" },
  { id: 12, question: "Apa kegunaan dari useReducer?", options: ["Fetch data", "State management yang kompleks", "Mengarahkan URL", "Manipulasi DOM langsung"], answer: "State management yang kompleks" },
  { id: 13, question: "Fragment (<>...</>) digunakan untuk apa?", options: ["Membungkus banyak elemen tanpa menambah node baru di DOM", "Membuat animasi", "Menyimpan variabel", "Menghubungkan ke Database"], answer: "Membungkus banyak elemen tanpa menambah node baru di DOM" },
  { id: 14, question: "Apa itu Single Page Application (SPA)?", options: ["Web yang reload tiap klik menu", "Web yang tidak reload halaman sepenuhnya", "Aplikasi mobile", "Website satu baris"], answer: "Web yang tidak reload halaman sepenuhnya" },
  { id: 15, question: "Hook apa yang digunakan untuk mengakses context?", options: ["useState", "useContext", "useProvider", "useGlobal"], answer: "useContext" },
  { id: 16, question: "Apa kegunaan useRef?", options: ["Menyimpan state", "Referensi langsung ke elemen DOM", "Menghitung matematika", "Mengecek error"], answer: "Referensi langsung ke elemen DOM" },
  { id: 17, question: "Bagaimana cara menangani event klik di React?", options: ["onclick", "onClick", "on-click", "clicked"], answer: "onClick" },
  { id: 18, question: "Apa fungsi dari StrictMode?", options: ["Mempercepat website", "Mendeteksi potensi masalah pada aplikasi", "Menghapus cache", "Membatasi user"], answer: "Mendeteksi potensi masalah pada aplikasi" },
  { id: 19, question: "Library apa yang sering dipakai untuk AJAX di React?", options: ["Axios", "Bootstrap", "Tailwind", "Vite"], answer: "Axios" },
  { id: 20, question: "Apa itu 'Lift State Up'?", options: ["Menghapus state", "Memindahkan state ke parent terdekat", "Menyimpan state di database", "Mengubah state jadi props"], answer: "Memindahkan state ke parent terdekat" },
  { id: 21, question: "Default port untuk aplikasi Vite adalah?", options: ["3000", "8080", "5173", "5000"], answer: "5173" },
  { id: 22, question: "Apa kegunaan React.memo()?", options: ["Menyimpan data", "Mencegah re-render komponen yang tidak perlu", "Membuat modal", "Mengatur router"], answer: "Mencegah re-render komponen yang tidak perlu" },
  { id: 23, question: "Kategori materi 'Recharts' digunakan untuk?", options: ["Styling", "Visualisasi Data/Grafik", "Routing", "Form Validation"], answer: "Visualisasi Data/Grafik" },
  { id: 24, question: "Apa kegunaan kustom hooks?", options: ["Menyembunyikan kode", "Reusability logika stateful", "Mempercantik UI", "Mengecilkan ukuran file"], answer: "Reusability logika stateful" },
  { id: 25, question: "Pernyataan mana yang benar tentang state?", options: ["State bersifat immutable secara langsung", "State bisa diubah dengan variabel biasa", "State hanya ada di Class Component", "State tidak bisa dikirim ke child"], answer: "State bersifat immutable secara langsung" },
  { id: 26, question: "Apa itu props.children?", options: ["Nama anak dari user", "Konten yang berada di dalam tag komponen", "List dari props", "Fungsi untuk merender"], answer: "Konten yang berada di dalam tag komponen" },
  { id: 27, question: "Hook mana yang menangani efek samping asinkron?", options: ["useState", "useEffect", "useMemo", "useLayoutEffect"], answer: "useEffect" },
  { id: 28, question: "Bagaimana cara mengambil parameter URL di React Router?", options: ["useParams", "useQuery", "useRoute", "getUrl"], answer: "useParams" },
  { id: 29, question: "React Query digunakan untuk?", options: ["Database lokal", "Server state management", "Styling CSS", "Animasi"], answer: "Server state management" },
  { id: 30, question: "Apa yang dimaksud dengan Controlled Component?", options: ["Komponen yang dikontrol oleh state React", "Komponen yang dikontrol oleh CSS", "Komponen tanpa state", "Komponen luar"], answer: "Komponen yang dikontrol oleh state React" },
];

export const quizHistory = [
  { attempt: 'Kuis 1', score: 80, accuracy: 90, time: 45 },
  { attempt: 'Kuis 2', score: 75, accuracy: 85, time: 50 },
  { attempt: 'Kuis 3', score: 95, accuracy: 100, time: 30 },
];

export const forumData = [
  {
    id: 1,
    author: "Ahmad Fauzi",
    role: "Mahasiswa",
    title: "Bingung cara pakai useReducer di Project UAS",
    content: "Halo sepuh, mau tanya kapan kita harus pakai useReducer dibanding useState biasa ya? Saya sedang mengerjakan fitur Quiz.",
    category: "Programming",
    tags: ["React", "State"],
    votes: 12,
    replies: 5,
    isSolved: true,
    isPinned: true,
    createdAt: "2026-01-14T10:00:00Z"
  },
  {
    id: 2,
    author: "Siti Aminah",
    role: "Mahasiswa",
    title: "Error Axios saat hit API Railway",
    content: "Kenapa ya pas dideploy ke Railway, API saya kena CORS terus? Padahal di lokal aman jaya.",
    category: "Network",
    tags: ["Deployment", "API"],
    votes: 8,
    replies: 3,
    isSolved: false,
    isPinned: false,
    createdAt: "2026-01-15T08:00:00Z"
  },
  {
    id: 3,
    author: "Budi Santoso",
    role: "Mahasiswa",
    title: "Tips belajar Recharts buat pemula",
    content: "Ada yang punya referensi belajar Recharts yang gampang dipahami gak? Lagi dapet tugas bikin Dashboard nih.",
    category: "Programming",
    tags: ["React", "Charts"],
    votes: 15,
    replies: 7,
    isSolved: true,
    isPinned: false,
    createdAt: "2026-01-15T09:30:00Z"
  },
  {
    id: 4,
    author: "Dewi Lestari",
    role: "Mahasiswa",
    title: "Cara handle Form di React 19",
    content: "Apakah ada perubahan signifikan cara handle form di React 19? Saya baca-baca ada fitur action baru.",
    category: "Programming",
    tags: ["React", "Hooks"],
    votes: 5,
    replies: 2,
    isSolved: false,
    isPinned: false,
    createdAt: "2026-01-15T11:00:00Z"
  },
  {
    id: 5,
    author: "Rizal Ahmad M",
    role: "Mahasiswa",
    title: "Best practice struktur folder project besar",
    content: "Gimana cara kalian nyusun folder kalau komponennya udah ratusan? Pake Atomic Design atau per fitur?",
    category: "General",
    tags: ["Architecture"],
    votes: 20,
    replies: 12,
    isSolved: true,
    isPinned: true,
    createdAt: "2026-01-15T13:45:00Z"
  },
  {
    id: 6,
    author: "Ani Wijaya",
    role: "Mahasiswa",
    title: "Koneksi MongoDB ke Node.js lemot",
    content: "Ada yang ngerasa koneksi ke Atlas lemot banget gak hari ini? Padahal internet saya stabil.",
    category: "Database",
    tags: ["MongoDB", "Network"],
    votes: 4,
    replies: 6,
    isSolved: false,
    isPinned: false,
    createdAt: "2026-01-15T14:20:00Z"
  },
  {
    id: 7,
    author: "Fajar Pratama",
    role: "Mahasiswa",
    title: "Kenapa Tailwind CSS gak jalan di Vite?",
    content: "Udah install sesuai dokumentasi tapi stylenya gak muncul. Ada yang pernah ngalamin?",
    category: "Programming",
    tags: ["Tailwind", "Vite"],
    votes: 7,
    replies: 4,
    isSolved: true,
    isPinned: false,
    createdAt: "2026-01-15T15:10:00Z"
  },
  {
    id: 8,
    author: "Gita Permata",
    role: "Mahasiswa",
    title: "Materi tentang Context API",
    content: "Kapan saat yang tepat buat pindah dari Props ke Context API? Apakah untuk semua state global?",
    category: "Programming",
    tags: ["React", "State"],
    votes: 11,
    replies: 9,
    isSolved: false,
    isPinned: false,
    createdAt: "2026-01-15T16:00:00Z"
  },
  {
    id: 9,
    author: "Hendra Kurniawan",
    role: "Mahasiswa",
    title: "Query SQL Join 3 tabel",
    content: "Mohon bantuannya, saya kesulitan bikin query buat join tabel User, Pesanan, dan Produk.",
    category: "Database",
    tags: ["SQL", "Database"],
    votes: 9,
    replies: 3,
    isSolved: true,
    isPinned: false,
    createdAt: "2026-01-15T17:30:00Z"
  },
  {
    id: 10,
    author: "Indah Sari",
    role: "Mahasiswa",
    title: "Pemanfaatan React Query Devtools",
    content: "React Query Devtools itu wajib diinstall gak sih buat development? Manfaat utamanya apa?",
    category: "Programming",
    tags: ["React", "API"],
    votes: 6,
    replies: 2,
    isSolved: true,
    isPinned: false,
    createdAt: "2026-01-15T18:15:00Z"
  },
  {
    id: 11,
    author: "Joko Susilo",
    role: "Mahasiswa",
    title: "Cara deploy React ke Vercel",
    content: "Step by step deploy project Vite ke Vercel dong, saya gagal terus di build commandnya.",
    category: "Network",
    tags: ["Deployment", "Vercel"],
    votes: 13,
    replies: 8,
    isSolved: false,
    isPinned: false,
    createdAt: "2026-01-15T19:00:00Z"
  },
  {
    id: 12,
    author: "Kiki Amalia",
    role: "Mahasiswa",
    title: "Custom Hook buat Auth",
    content: "Boleh share contoh custom hook useAuth yang simple tapi aman? Makasih sebelumnya.",
    category: "Programming",
    tags: ["React", "Hooks"],
    votes: 18,
    replies: 10,
    isSolved: true,
    isPinned: false,
    createdAt: "2026-01-15T20:20:00Z"
  },
  {
    id: 13,
    author: "Luthfi Hakim",
    role: "Mahasiswa",
    title: "Optimasi gambar di Website",
    content: "Tips biar loading web cepet walaupun banyak gambarnya gimana ya? Pake format WebP cukup gak?",
    category: "General",
    tags: ["Performance"],
    votes: 10,
    replies: 5,
    isSolved: false,
    isPinned: false,
    createdAt: "2026-01-15T21:10:00Z"
  },
  {
    id: 14,
    author: "Maya Putri",
    role: "Mahasiswa",
    title: "Dark Mode di Tailwind v4",
    content: "Ada perubahan cara config dark mode di Tailwind v4 gak ya? Saya liat banyak yang beda.",
    category: "Programming",
    tags: ["Tailwind", "CSS"],
    votes: 7,
    replies: 4,
    isSolved: true,
    isPinned: false,
    createdAt: "2026-01-15T22:05:00Z"
  },
  {
    id: 15,
    author: "Naufal Zaki",
    role: "Mahasiswa",
    title: "Belajar Unit Testing di React",
    content: "Library apa yang paling recommended buat testing komponen React sekarang? Vitest atau Jest?",
    category: "Programming",
    tags: ["Testing", "React"],
    votes: 14,
    replies: 6,
    isSolved: false,
    isPinned: false,
    createdAt: "2026-01-15T23:00:00Z"
  }
];

export const forumCategories = ["Programming", "Database", "Network", "General"];
export const forumTags = ["React", "Hooks", "SQL", "Deployment", "Vite", "API", "State", "Charts", "Database", "Tailwind"];

export const achievementsList = [
  {
    id: "badge-1",
    title: "First Step",
    description: "Menyelesaikan modul pertama",
    icon: "🌱",
    rarity: "Common",
    requirement: 1
  },
  {
    id: "badge-2",
    title: "Fast Learner",
    description: "Menyelesaikan 5 modul",
    icon: "⚡",
    rarity: "Rare",
    requirement: 5
  },
  {
    id: "badge-3",
    title: "Quiz Master",
    description: "Mendapatkan nilai 100 di salah satu kuis",
    icon: "🏆",
    rarity: "Epic",
    requirement: 100
  },
  {
    id: "badge-4",
    title: "Top Contributor",
    description: "Memulai 5 diskusi di forum",
    icon: "🔥",
    rarity: "Legendary",
    requirement: 5
  }
];

export const learningPath = [
  { step: 1, title: "Dasar React", status: "completed" },
  { step: 2, title: "State Management", status: "completed" },
  { step: 3, title: "Advanced Hooks", status: "current" },
  { step: 4, title: "API Integration", status: "upcoming" },
  { step: 5, title: "Final Project", status: "upcoming" },
];

export const classPerformance = [
  { name: 'Rizal Ahmad', score: 95, progress: 100, status: 'Aman' },
  { name: 'Siti Aminah', score: 88, progress: 80, status: 'Aman' },
  { name: 'Ahmad Fauzi', score: 45, progress: 20, status: 'Butuh Bantuan' },
  { name: 'Budi Santoso', score: 70, progress: 60, status: 'Aman' },
  { name: 'Dewi Lestari', score: 30, progress: 15, status: 'Butuh Bantuan' },
];

export const contentEngagement = [
  { title: 'Video: Dasar React', views: 120, engagement: 95 },
  { title: 'PDF: Hooks CheatSheet', views: 85, engagement: 40 },
  { title: 'Video: Context API', views: 98, engagement: 88 },
];

export const studentFeedback = [
  { user: 'Rizal', comment: 'Materi sangat jelas!', rating: 5 },
  { user: 'Ahmad', comment: 'Video modul 4 suaranya kecil.', rating: 3 },
];