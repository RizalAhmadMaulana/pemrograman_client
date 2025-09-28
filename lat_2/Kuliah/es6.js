//ctrl + shift + p (ketik Quokka:Start on Current File)
// Object Mahasiswa
const mahasiswa = {
    nim: "A11.2023.14974",
    nama: "Rizal Ahmad M",
    umur: 20,
    status: true,
    matKul: [
        {
            matkulId: 4704,
            matkulNama: "Pemsik",
            tugas: 85,
            uts: 100,
            uas: 50
        },
        {
            matkulId: 4102,
            matkulNama: "Daspro",
            tugas: 60,
            uts: 100,
            uas: 77
        }
    ]
}

//array (banyak data, 1 tipe data)
const listMahasiswa = ["rizal", "ahmad", "maulana"]; //array string

//array dengan 2 objek
const listMahasiswa2 = [
    {
        nim: "A11.2023.1500",
        nama: "Wildan Apip",
        umur: 20,
        status: true,
        matKul: [
            {
                matkulId: 4704,
                matkulNama: "kalkulus",
                tugas: 85,
                uts: 100,
                uas: 50
            },
            {
                matkulId: 4102,
                matkulNama: "Jarkom",
                tugas: 60,
                uts: 100,
                uas: 77
            }
        ]
    },
    {
        nim: "A11.2023.14974",
        nama: "Rizal Ahmad M",
        umur: 20,
        status: true,
        matKul: [
            {
                matkulId: 4704,
                matkulNama: "Pemsik",
                tugas: 85,
                uts: 100,
                uas: 50
            },
            {
                matkulId: 4102,
                matkulNama: "Daspro",
                tugas: 60,
                uts: 100,
                uas: 77
            }
        ]
    },    
    {nim: "A11.2023.14976", nama: "Igdo Ragil", umur: 25, status: true},
]

//tampilkan isi object mahasiswa
console.log(mahasiswa);

// tampilan array
console.log(listMahasiswa);

//tampilan array index 0 dan 1
console.log(listMahasiswa2);

// array nama object mahasiswa
console.log(mahasiswa['nama']);
console.log(mahasiswa.nama);

// ES6 - DESTRUCTURING

// Destructuring Object
//const nama = mahasiswa.nama; //cara lama
//const nim = mahasiswa.nim; //cara lama

const {nama,nim} = mahasiswa; //cara baru
console.log(nama);
console.log(nim);

//dest array
const {dataRizal, dataWildan} = listMahasiswa2;

// destructuring array list mata kuliah milik variable mahasiswa
const [matkul1, matkul2] = mahasiswa.matKul;
console.log(matkul1);
console.log(matkul2);

// ES6 - SPREAD OPERATOR
const mhs2 = {
    nim: "A11.2023.14989",
    nama: "Suluh Yoga",
    umur: 23,
    status: true,
    matKul: [
        {
            matkulId: 4709,
            matkulNama: "Alpro",
            tugas: 85,
            uts: 100,
            uas: 50
        },
    ]
}
const listMhs = {...mahasiswa,mhs2};
console.log(listMhs);

// ES6 - TEMPLATE LITERAL
console.log("Nama saya "+ nama +", nim saya"+nim); //cara lama
console.log(`Nama saya ${nama} dan nim saya ${nim}`); //cara baru dengan es6 (pake petik satu miring ` )

// ES6 - FUNCTION
function sum(a,b){ // cara lama
    return a + b;
}

const jml = (a,b) => a+b; // cara baru dengan es6
console.log(`jumlah 10 + 8 = ${jml(10,8)}`)

// ES6 - METHOD MAP, FILTER, REDUCE
const listNamaMhs = listMahasiswa2.map((m) => m.nama);
console.log(listNamaMhs);

//Filter pake status true
const mahasiswaAktif = listMahasiswa2.filter((m) => m.status);
console.log(mahasiswaAktif);

//reduce
const totalNilaiTugasAllMatkul = mahasiswa.matKul.reduce((total,m) => total + m.tugas, 0);
console.log(totalNilaiTugasAllMatkul);