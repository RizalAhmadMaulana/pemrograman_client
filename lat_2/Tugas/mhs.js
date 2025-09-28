// Data Mahasiswa
const dataMahasiswa = [
  {
    id: 1,
    nama: "Budi Santoso",
    tanggalLahir: "2000-01-15",
    fakultas: "Fakultas Teknik",
    programStudi: "Teknik Informatika",
    semester: 6,
    nilai: {
      algoritma: 85,
      basisData: 88,
      pemrogramanWeb: 90,
    },
    aktif: true,
    organisasi: ["Himpunan Mahasiswa Teknik", "Komunitas Pemrograman"],
  },
  {
    id: 2,
    nama: "Siti Aminah",
    tanggalLahir: "1999-05-10",
    fakultas: "Fakultas Ekonomi",
    programStudi: "Manajemen",
    semester: 4,
    nilai: {
      manajemenKeuangan: 78,
      akuntansi: 82,
      pemasaran: 75,
    },
    aktif: true,
    organisasi: ["Koperasi Mahasiswa"],
  },
  {
    id: 3,
    nama: "Rudi Hartono",
    tanggalLahir: "1998-12-01",
    fakultas: "Fakultas Teknik",
    programStudi: "Teknik Sipil",
    semester: 8,
    nilai: {
      mekanikaTanah: 85,
      strukturBangunan: 89,
    },
    aktif: false,
    organisasi: ["Himpunan Mahasiswa Teknik Sipil"],
  },
];

// Example of destructuring the first mahasiswa data
const mahasiswa = dataMahasiswa[0];

// // Destructuring the fields of mahasiswa
const { nama, fakultas, programStudi, semester, nilai, organisasi, aktif } = mahasiswa;
console.log(nama, fakultas, programStudi);

// // Destructuring nilai
const { algoritma, basisData, pemrogramanWeb } = nilai;
console.log(`Nilai Algoritma: ${algoritma}, Basis Data: ${basisData}, Pemrograman Web: ${pemrogramanWeb}`);

// Destructuring organisasi array
const [primaryOrg, secondaryOrg, ...otherOrgs] = organisasi;
console.log(primaryOrg, secondaryOrg, otherOrgs);

// // Modifying the data with spread operator
const newOrganisasi = ["Pengembangan AI", ...organisasi];
console.log(newOrganisasi);

const updatedMahasiswa = {
  ...mahasiswa,
   fakultas: "Fakultas Teknologi Informasi",
   semester: 7,
 };
 console.log(updatedMahasiswa);

// Function to extract year from tanggalLahir
 const getYear = (str) => str.split("-")[0];
 console.log(getYear(mahasiswa.tanggalLahir));

// Creating a summary
 const summary = `${nama}, seorang mahasiswa ${programStudi} di ${fakultas}, lahir pada ${getYear(mahasiswa.tanggalLahir)} dan saat ini berada di semester ${semester}.`;
 console.log(summary);

// Example conditional operation
const statusAktif = aktif ? "masih aktif" : "sudah tidak aktif";
console.log(`${nama} ${statusAktif} sebagai mahasiswa.`);

// Logical operations
console.log(true && "Mahasiswa terdaftar");
console.log(false && "Mahasiswa tidak terdaftar");
console.log(aktif && "Mahasiswa ini aktif");

// Falsy values in JavaScript
console.log("Budi" && "Mahasiswa aktif");
console.log(0 && "Mahasiswa tidak aktif");

console.log(true || "Mahasiswa terdaftar");
console.log(false || "Mahasiswa tidak terdaftar");

// Default value if organisasi doesn't exist
const primaryOrgChecked = organisasi[0] || "Tidak ada organisasi";
console.log(primaryOrgChecked);

// Function to get total nilai from mahasiswa
function getTotalNilai(mahasiswa) {
    const { algoritma, basisData, pemrogramanWeb } = mahasiswa.nilai || {};
    return algoritma + basisData + pemrogramanWeb;
}

console.log(getTotalNilai(mahasiswa));

// Map example: Get all names of mahasiswa
const namaMahasiswa = dataMahasiswa.map((mhs) => mhs.nama);
console.log(namaMahasiswa);

// Filtering data: Find all mahasiswa yang aktif
const mahasiswaAktif = dataMahasiswa.filter((mhs) => mhs.aktif);
console.log(mahasiswaAktif);

// Filtering mahasiswa yang berada di Fakultas Teknik
const mahasiswaTeknik = dataMahasiswa.filter((mhs) => mhs.fakultas === "Fakultas Teknik");
console.log(mahasiswaTeknik);

// Calculate the total nilai of all mahasiswa
const totalNilaiSemuaMahasiswa = dataMahasiswa.reduce((sum, mhs) => {
    const totalNilai = Object.values(mhs.nilai).reduce((acc, nilai) => acc + nilai, 0);
    return sum + totalNilai;
}, 0);
console.log(`Total nilai semua mahasiswa: ${totalNilaiSemuaMahasiswa}`);

// Sort mahasiswa by semester
const sortedBySemester = dataMahasiswa.slice().sort((a, b) => a.semester - b.semester);
console.log(sortedBySemester);

// Add a new mahasiswa object to the array
const newMahasiswa = {
    id: 4,
    nama: "Andi Setiawan",
    tanggalLahir: "2001-04-12",
    fakultas: "Fakultas Ilmu Komputer",
    programStudi: "Sistem Informasi",
    semester: 2,
    nilai: {
        algoritma: 80,
        basisData: 82,
        pemrogramanWeb: 85,
    },
    aktif: true,
    organisasi: ["Himpunan Mahasiswa SI"],
};
const dataMahasiswaUpdated = [...dataMahasiswa, newMahasiswa];
console.log(dataMahasiswaUpdated);

// Delete a mahasiswa by id
const dataMahasiswaAfterDelete = dataMahasiswaUpdated.filter((mhs) => mhs.id !== 2);
console.log(dataMahasiswaAfterDelete);

// Update a mahasiswa's data (ubah nilai mahasiswa dengan id 1)
const dataMahasiswaAfterUpdate = dataMahasiswaAfterDelete.map((mhs) =>
    mhs.id === 1 ? { ...mhs, semester: 7 } : mhs
);
console.log(dataMahasiswaAfterUpdate);

fetch("https://jsonplaceholder.typicode.com/todos")
.then((res) => res.json())
.then((data) => console.log(data));