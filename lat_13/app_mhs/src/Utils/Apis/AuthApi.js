import axios from "@/Utils/AxiosInstance";

export const login = async ( email, password ) => {
    const res = await axios.get("/user", { params: { email } });
    const user = res.data[0];

    if (!user) throw new Error("Email tidak ditemukan");
    if (user.password !== password) throw new Error("Password salah");

    return user;
};

export const register = async (data) => {
  // 1. Cek apakah email sudah terdaftar (Opsional tapi disarankan)
  const checkUser = await axios.get("/user", { params: { email: data.email } });
  if (checkUser.data.length > 0) {
    throw new Error("Email sudah terdaftar!");
  }

  // 2. Kirim data user baru
  // Kita set default role 'mahasiswa' dan permission minimal jika tidak diisi
  const newUser = {
    ...data,
    role: "mahasiswa", 
    permission: ["dashboard.page"] 
  };
  
  const res = await axios.post("/user", newUser);
  return res.data;
};