import crypto from 'crypto-js';

const clientAesKey = 'xxxxssssxxxxssss';

export function md5(str: string): string {
  return crypto.MD5(str).toString();
}

export function encrypt(text: string): string {
  return crypto.AES.encrypt(text, clientAesKey).toString();
}

export function decrypt(text: string): string {
  return crypto.AES.decrypt(text, clientAesKey).toString(crypto.enc.Utf8);
}
