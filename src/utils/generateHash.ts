import CryptoJS from 'crypto-js'

export default function generateHash(valor: string): string {
    const fecha = new Date().getTime();
    if (valor) {
      const dataToHash = valor.toString() + fecha.toString();
      const hash = CryptoJS.SHA256(dataToHash);
      const hashHex = hash.toString(CryptoJS.enc.Hex).slice(0, 6);
      return hashHex;
    } else {
      const dataToHash = fecha.toString() + fecha.toString();
      const hash = CryptoJS.SHA256(dataToHash);
      const hashHex = hash.toString(CryptoJS.enc.Hex).slice(0, 6);
      return hashHex;
    }
  }