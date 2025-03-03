const fs = require("fs"); // Tambahkan ini
const path = require("path");

class BarangHandler {
  constructor(service) {
    this._service = service;

    this.addBarangHandler = this.addBarangHandler.bind(this);
    this.getBarangHandler = this.getBarangHandler.bind(this);
    this.updateBarangHandler = this.updateBarangHandler.bind(this);
    this.deleteBarangHandler = this.deleteBarangHandler.bind(this);
  }

  addBarangHandler = async (request, h) => {
    try {
      const { role } = request.auth.credentials;
      if (role !== "Admin") {
        return h
          .response({
            status: "fail",
            message: "Anda tidak memiliki akses",
          })
          .code(401);
      }

      const { foto, nama_barang, tanggal, harga_awal, deskripsi_barang } =
        request.payload;

      const uploadDir = path.join(__dirname, "../../uploads");

      // Pastikan direktori ada
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const ext = foto.hapi.filename.split(".")[1];

      const filename = `${Date.now()}.${ext}`;
      const imgPath = path.join("src/uploads", filename);
      const fileStream = fs.createWriteStream(imgPath);

      await new Promise((resolve, reject) => {
        foto.pipe(fileStream);
        foto.on("end", resolve);
        foto.on("error", reject);
      });

      await this._service.addBarang({
        foto: filename,
        nama_barang,
        tanggal,
        harga_awal,
        deskripsi_barang,
      });

      return h
        .response({
          status: "success",
          message: "Barang berhasil ditambahkan",
        })
        .code(201);
    } catch (err) {
      console.error(err);
      return h
        .response({
          status: "fail",
          message: err.message,
        })
        .code(400);
    }
  };

  getBarangHandler = async (request, h) => {
    // const {role} = request.auth.credentials

    // if(role !== "User" && role !== "Admin"){
    //     return h.response({
    //         status: 'fail',
    //         message: 'Anda tidak memiliki akses'
    //     }).code(401);
    // }

    const barang = await this._service.getBarang();

    return h
      .response({
        status: "success",
        data: { barang },
      })
      .code(200);
  };

  async updateBarangHandler(request, h) {
    try {
      const { role } = request.auth.credentials;
      if (role !== "Admin") {
        return h
          .response({
            status: "fail",
            message: "Anda tidak memiliki akses",
          })
          .code(401);
      }

      const { id } = request.params;
      const { foto, nama_barang, tanggal, harga_awal, deskripsi_barang } =
        request.payload;
      const cekBarang = await this._service.getBarangById(id);

      if (cekBarang.length === 0) {
        return h
          .response({
            status: "fail",
            message: "Data barang tidak ditemukan",
          })
          .code(404);
      }

      let imgPath = cekBarang[0].foto; // Default pakai foto lama

      // Jika ada file gambar baru diunggah
      if (foto && foto.hapi && foto.hapi.filename) {
        const uploadDir = path.join(__dirname, "../../uploads");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const ext = foto.hapi.filename.split(".")[1];

        const filename = `${Date.now()}.${ext}`.trim();
        imgPath = path.join("src/uploads", filename);
        const fileStream = fs.createWriteStream(imgPath);

        await new Promise((resolve, reject) => {
          foto.pipe(fileStream);
          foto.on("end", resolve);
          foto.on("error", reject);
        });

        // Hapus gambar lama jika ada
        if (fs.existsSync("src/uploads", cekBarang[0].foto)) {
          fs.unlinkSync(path.join("src/uploads", cekBarang[0].foto));
        }
      }

      await this._service.editBarangById(id, {
        foto: imgPath.split("/")[2],
        nama_barang,
        tanggal,
        harga_awal,
        deskripsi_barang,
      });

      return h
        .response({
          status: "success",
          message: "Data barang berhasil diubah",
        })
        .code(200);
    } catch (err) {
      return h
        .response({
          status: "fail",
          message: err.message,
        })
        .code(500);
    }
  }

  async deleteBarangHandler(request, h) {
    try {
      const { role } = request.auth.credentials;
      if (role !== "Admin") {
        return h
          .response({
            status: "fail",
            message: "Anda tidak memiliki akses",
          })
          .code(401);
      }

      const { id } = request.params;
      const cekBarang = await this._service.getBarangById(id);

      if (cekBarang.length === 0) {
        return h
          .response({
            status: "fail",
            message: "Data barang tidak ditemukan",
          })
          .code(404);
      }

      // Cek apakah barang memiliki foto
      const fotoPath = cekBarang[0].foto;
      if (fotoPath) {
        try {
          if (fs.existsSync(fotoPath)) {
            fs.unlinkSync(fotoPath);
          }
        } catch (err) {
          console.error("Gagal menghapus foto:", err);
        }
      }

      await this._service.deleteBarangById(id);

      return h
        .response({
          status: "success",
          message: "Data barang berhasil dihapus",
        })
        .code(200);
    } catch (err) {
      return h
        .response({
          status: "fail",
          message: err.message,
        })
        .code(500);
    }
  }
}

module.exports = BarangHandler;
