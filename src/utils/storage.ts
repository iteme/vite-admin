import { CacheEnum } from '@/enums/cache';
import { encrypt, decrypt } from '@/utils/crypto';

const PREFIX = 'app_';

export function getCache(key: CacheEnum): unknown {
  const stringData = localStorage.getItem(PREFIX + key);
  if (stringData) {
    const data = JSON.parse(decrypt(stringData));
    if (!data.expire || data.expire < new Date().getTime()) {
      return data.value;
    }
  }
}

export function setCache(key: CacheEnum, value: unknown, expire?: number): void {
  if (!value) {
    return;
  }
  const stringData = JSON.stringify({
    value,
    time: Date.now(),
    expire: expire ? new Date().getTime() + expire * 1000 : undefined,
  });
  localStorage.setItem(PREFIX + key, encrypt(stringData));
}

export function delCache(key: CacheEnum): void {
  localStorage.removeItem(PREFIX + key);
}

export function getTokenCache(): string {
  return getCache(CacheEnum.TOKEN) as string;
}

export function setTokenCache(token?: string): void {
  return setCache(CacheEnum.TOKEN, token);
}
